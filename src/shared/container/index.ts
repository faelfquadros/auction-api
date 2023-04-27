import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AuctionsProductsBidsRepository } from "@modules/auctions/infra/typeorm/repositories/AuctionsProductsBidsRepository";
import { AuctionsProductsRepository } from "@modules/auctions/infra/typeorm/repositories/AuctionsProductsRepository";
import { AuctionsRepository } from "@modules/auctions/infra/typeorm/repositories/AuctionsRepository";
import { IAuctionsProductsBidsRepository } from "@modules/auctions/repositories/IAuctionsProductsBidsRepository";
import { IAuctionsProductsRepository } from "@modules/auctions/repositories/IAuctionsProductsRepository";
import { IAuctionsRepository } from "@modules/auctions/repositories/IAuctionsRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<IAuctionsRepository>(
  "AuctionsRepository",
  AuctionsRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<IAuctionsProductsRepository>(
  "AuctionsProductsRepository",
  AuctionsProductsRepository
);

container.registerSingleton<IAuctionsProductsBidsRepository>(
  "AuctionsProductsBidsRepository",
  AuctionsProductsBidsRepository
);
