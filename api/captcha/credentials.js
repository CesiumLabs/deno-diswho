export default function (req) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    req.respond({
        body: JSON.stringify({
            publicKey: Deno.env.get("CAPTCHA_PUBLIC_KEY")
        }),
        headers
    });
}