import service from "../services/users.service.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

class SessionsController {
    constructor() {
        this.service = service;
    }
    register = async (req, res, next) => {
        const { email, name, verifiedCode } = req.user;
        await this.service.register({ email, name, verifiedCode });
        try {
            return res.json({
                statusCode: 201,
                message: "Registered!",
            });
        } catch (error) {
            return next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            return res
                .cookie("token", req.token, {
                    maxAge: 60 * 60 * 24 * 7,
                    httpOnly: true,
                })
                .json({
                    statusCode: 200,
                    message: "Logged in!",
                });
        } catch (error) {
            return next(error);
        }
    };
    google = async (req, res, next) => {
        try {
            return res.success200("Logged in with Google!");
        } catch (error) {
            return next(error);
        }
    };
    github = async (req, res, next) => {
        try {
            return res.success200("Logged in with Github!");
        } catch (error) {
            return next(error);
        }
    };
    current = async (req, res, next) => {
        try {
            const user = {
                email: req.user.email,
                role: req.user.role,
                photo: req.user.photo,
            };
            return res.success200(user);
        } catch (error) {
            return next(error);
        }
    };
    signout = async (req, res, next) => {
        try {
            return res.clearCookie("token").json({
                statusCode: 200,
                message: "Signed out!",
            });
        } catch (error) {
            return next(error);
        }
    };
    verifyAccount = async (req, res, next) => {
        try {
            const { email, verifiedCode } = req.body;
            const user = await service.readByEmail(email);
            if (user.verifiedCode === verifiedCode) {
                await service.update(user._id, { verified: true });
                return res.json({
                    statusCode: 200,
                    message: "Verified user!",
                });
            } else {
                CustomError.new(errors.token);
            }
        } catch (error) {
            return next(error);
        }
    };
    badauth = (req, res, next) => {
        try {
            return res.error401();
        } catch (error) {
            return next(error);
        }
    };
}

export default SessionsController;
const controller = new SessionsController();
//const { register, login, google, github, me, signout, verifyAccount, badauth } = controller;
//export { register, login, google, github, me, signout, verifyAccount, badauth };
const { register, login, signout, verifyAccount } = controller;
export { register, login, signout, verifyAccount };
