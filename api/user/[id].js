import { JWT_SECRET, DISCORD_SECRET } from "../../deps.js";
import { verifyJwt } from "../[lib]/jwt.js";

export default async function (req) {
    const headers = new Headers();
    headers.append('access-control-allow-origin', '*');
    headers.append('access-control-allow-headers', '*');
    headers.append("Content-Type", "application/json");

    const response = {};

    try {
        const params = new URL(req.url).pathname.split("/").pop();
        const { expirationTimestamp } = await verifyJwt(req.headers.get('authorization')?.replace(/^Bearer /, ''), JWT_SECRET);
        if (expirationTimestamp < Date.now()) response.status = 401;
        else
            response.body = JSON.stringify(await(await fetch(`https://discord.com/api/v8/users/${params}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bot ${DISCORD_SECRET}`
                }
            })).json());
    }
    catch {
        response.status = 401;
    } finally {
        req.respond(response);
    }
}