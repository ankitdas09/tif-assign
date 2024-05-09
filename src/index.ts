import Env from "./loaders/v1/env";
import server from "./server";
import Logger from "./universe/v1/libraries/logger";

(async () => {
    const app = await server()

    app.listen(Env.variable.PORT, () => {
        Logger.instance.info(`Running on PORT ${Env.variable.PORT}`)
    })
})();
