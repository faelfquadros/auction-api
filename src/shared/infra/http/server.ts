import { logger } from "@utils/logger";

import { app } from "./app";

app.listen(3000, () => logger.info("Its Working !! 🔥"));
