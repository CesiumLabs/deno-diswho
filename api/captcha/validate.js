import { signJwt } from '../[lib]/jwt.js';
import { CAPTCHA_PRIVATE_KEY, SESSION_DURATION, JWT_SECRET } from "../../deps.js";

export default async function (req) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const {
        success,
        score
    } = await(await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_PRIVATE_KEY}&response=${req.url.split("?token=")[1]}`)).json();
    console.log(`Receiving a request reaching a score of ${score}`);
    if (!success || score < 0.7) return req.respond({
        body: JSON.stringify({
            success: false
        }),
        headers
    });
    else return req.respond({
        body: JSON.stringify({
            success: true,
            jwt: await signJwt(
                {
                    expirationTimestamp: Date.now() + parseInt(SESSION_DURATION)
                },
                JWT_SECRET
            )
        }),
        headers
    });
}