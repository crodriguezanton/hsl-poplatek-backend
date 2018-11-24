import { Service } from "./utils/service";
import { settings } from "./settings";
import { UserRouter } from "./routers/user.router";
import { TrainRouter } from "./routers/train.router";

declare const global: {
  app: Service;
};

global.app = new Service(settings);

global.app.express.addRouter("/user", new UserRouter().getRouter());
global.app.express.addRouter("/train", new TrainRouter().getRouter());

const app = global.app;

export { app };
