import env from "../utils/env.utils.js"
import { createTransport } from "nodemailer";

async function sendEmail(data) {
    try {
        console.log(data);
        const transport = createTransport({
            service: "gmail",
            port: env.PORT,
            auth: {
                user: env.GOOGLE_EMAIL,
                pass: env.GOOGLE_PASSWORD,
            },
        });
        await transport.sendMail({
            from: `CODER <${env.GOOGLE_EMAIL}>`,
            to: data.email,
            subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
            html: `
        <h1>USER REGISTERED!<h1>
        <p>VERIFY CODE: ${data.verifiedCode}</p>
      `,
            attachments: [
                {
                    filename: "logoWeb.png",
                    path: __dirname + "/public/logoWeb.png",
                    cid: "weblogo",
                },
            ],
        });
    } catch (error) {
        throw error;
    }
}

export default sendEmail;
