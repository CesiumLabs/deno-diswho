import { ServerRequest } from "../deps.ts";

export default function (req: ServerRequest) {
    req.respond({
        body: "Hello from Deno diswho"
    });
}