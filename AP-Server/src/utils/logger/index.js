import env from "../env.utils.js";

const persistence = env.MODE || "PROD";

let winston_log;

switch (persistence) {
    case "PROD":
        const { default: winstonProd } = await import("./winstonProd.utils.js");
        winston_log = winstonProd;
        break;
    default:
        const { default: winstonDev } = await import("./winstonDev.utils.js");
        winston_log = winstonDev;
        break;
}

export default winston_log;
