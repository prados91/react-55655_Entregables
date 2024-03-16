import CustomRouter from "../CustomRouter.js";

class FormsRouter extends CustomRouter {
    init() {
        this.read("/", ["ADMIN"], async (req, res, next) => {
            try {
                return res.render("forms", { title: "NEW" });
            } catch (error) {
                next(error);
            }
        });
    }
}

const formsRouter = new FormsRouter();
export default formsRouter.getRouter();
