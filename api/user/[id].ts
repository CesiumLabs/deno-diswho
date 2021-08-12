import { JWT_SECRET, DISCORD_SECRET, ServerRequest } from "../../deps.ts";
import { verifyJwt } from "../[lib]/jwt.ts";

export default async function (req: ServerRequest) {
    const headers = new Headers();
    headers.append('access-control-allow-origin', '*');
    headers.append('access-control-allow-headers', '*');
    headers.append("Content-Type", "application/json");

    const response: any = {};

    try {
        const params = new URL(req.url).pathname.split("/").pop();
        const { expirationTimestamp } = await verifyJwt(req.headers.get('authorization')?.replace(/^Bearer /, '')!, JWT_SECRET);
        if (expirationTimestamp as number < Date.now()) response.status = 401;
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