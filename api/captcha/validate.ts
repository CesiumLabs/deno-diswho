import { signJwt } from '../[lib]/jwt.ts';
import { CAPTCHA_PRIVATE_KEY, SESSION_DURATION, JWT_SECRET, ServerRequest } from "../../deps.ts";

export default async function (req: ServerRequest) {
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