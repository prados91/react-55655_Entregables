import CustomRouter from "../CustomRouter.js";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

export default class SessionRouter extends CustomRouter {
    init() {
        //register
        this.create(
            "/register",
            ["ADMIN", "PREM", "PUBLIC"],
            has8char,
            passCallBack("register"),
            async (req, res, next) => {
                try {
                    return res.json({
                        statusCode: 201,
                        message: "Registered!",
                    });
                } catch (error) {
                    return next(error);
                }
            }
        );

        //login
        this.create("/login", ["ADMIN", "PREM", "PUBLIC"], passCallBack("login"), async (req, res, next) => {
            try {
                return res
                    .cookie("token", req.token, {
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                    })
                    .json({
                        statusCode: 200,
                        message: "Logged in!",
                    });
            } catch (error) {
                return next(error);
            }
        });

        //google
        this.create(
            "/google",
            ["ADMIN", "PREM", "PUBLIC"],
            passport.authenticate("google", { scope: ["email", "profile"] })
        );

        //google-callback
        this.read(
            "/google/callback",
            ["ADMIN", "PREM", "PUBLIC"],
            passport.authenticate("google", {
                session: false,
                failureRedirect: "/api/sessions/badauth",
            }),
            async (req, res, next) => {
                try {
                    return res.json({
                        statusCode: 200,
                        message: "Logged in with google!",
                        session: req.session,
                    });
                } catch (error) {
                    return next(error);
                }
            }
        );

        //github
        this.create("/github", ["ADMIN", "PREM", "PUBLIC"], passport.authenticate("github", { scope: ["user:email"] }));

        //github-callback
        this.read(
            "/github/callback",
            ["ADMIN", "PREM", "PUBLIC"],
            passport.authenticate("github", {
                session: false,
                failureRedirect: "/api/sessions/badauth",
            }),
            async (req, res, next) => {
                try {
                    return res.json({
                        statusCode: 200,
                        message: "Logged in with github!",
                        session: req.session,
                    });
                } catch (error) {
                    return next(error);
                }
            }
        );

        //me
        this.create("/", ["ADMIN", "PREM", "PUBLIC"], passCallBack("jwt"), async (req, res, next) => {
            try {
                const user = {
                    email: req.user.email,
                    role: req.user.role,
                    photo: req.user.photo,
                };
                return res.json({
                    statusCode: 200,
                    response: user,
                });
            } catch (error) {
                return next(error);
            }
        });

        //signout
        this.create("/signout", ["ADMIN", "PREM", "PUBLIC"], passCallBack("jwt"), async (req, res, next) => {
            try {
                return res.clearCookie("token").json({
                    statusCode: 200,
                    message: "Signed out!",
                });
            } catch (error) {
                return next(error);
            }
        });

        //badauth
        this.read("/badauth", ["ADMIN", "PREM", "PUBLIC"], (req, res, next) => {
            try {
                return res.json({
                    statusCode: 401,
                    message: "Bad auth",
                });
            } catch (error) {
                return next(error);
            }
        });

        //signout/cb
        this.read("/signout/cb", ["ADMIN", "PREM", "PUBLIC"], (req, res, next) => {
            try {
                return res.json({
                    statusCode: 400,
                    message: "Already done",
                });
            } catch (error) {
                return next(error);
            }
        });
    }
}
