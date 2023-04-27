/* eslint-disable import/no-extraneous-dependencies */
import { CronJob } from "cron";
import { inject, injectable } from "tsyringe";

import { IAuctionsProductsBidsRepository } from "@modules/auctions/repositories/IAuctionsProductsBidsRepository";
import { IAuctionsProductsRepository } from "@modules/auctions/repositories/IAuctionsProductsRepository";
import { IAuctionsRepository } from "@modules/auctions/repositories/IAuctionsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { logger } from "@utils/logger";

@injectable()
class CronTask {
  constructor(
    @inject("AuctionsRepository")
    private auctionsRepository: IAuctionsRepository,
    @inject("AuctionsProductsRepository")
    private auctionsProductsRepository: IAuctionsProductsRepository,
    @inject("AuctionsProductsBidsRepository")
    private auctionsProductsBidsRepository: IAuctionsProductsBidsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async verifyAuctions() {
    const activeAuctions = await this.auctionsRepository.listActiveAuctions();

    await Promise.all(
      activeAuctions.map(async (activeAuction) => {
        const minutesPassedSinceAuctionBeginning =
          this.dateProvider.getMinutesFromNow(activeAuction.created_at);

        if (minutesPassedSinceAuctionBeginning >= 60) {
          const auctionProducts =
            await this.auctionsProductsRepository.listByAuction(
              activeAuction.id
            );

          await Promise.all(
            auctionProducts.map(async (auctionProduct) => {
              const winner =
                await this.auctionsProductsBidsRepository.getWinner(
                  auctionProduct.id
                );
              if (!winner) {
                logger.info(
                  `There was no bid on this product (${auctionProduct.product_id}) during the auction`
                );
                logger.info("Making it available again...");
                await this.productsRepository.updateAvailableToSale(true, [
                  auctionProduct.product_id,
                ]);
              } else {
                logger.info(
                  `Iniciating transaction of this product (${auctionProduct.product_id}) to the new owner: ${winner.user_id}...`
                );
                await this.productsRepository.updateOwner(
                  auctionProduct.product_id,
                  winner.user_id
                );
                logger.info("Transaction is done");
              }
            })
          );
          logger.info("Finalizing Auction...");
          await this.auctionsRepository.updateFinalize(activeAuction.id);
        }
      })
    );
  }

  execute() {
    const job = new CronJob(
      "*/30 * * * * *",
      async () => {
        await this.verifyAuctions();
      },
      null,
      false,
      "America/Sao_Paulo"
    );

    job.start();
  }
}

export { CronTask };
