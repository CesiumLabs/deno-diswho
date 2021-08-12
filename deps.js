export const JWT_SECRET = Deno.env.get('JWT_SECRET') || [...crypto.getRandomValues(new Uint8Array(20))].map(item => item.toString(16)).join('');
export const CAPTCHA_PUBLIC_KEY = Deno.env.get('CAPTCHA_PUBLIC_KEY');
export const CAPTCHA_PRIVATE_KEY = Deno.env.get('CAPTCHA_PRIVATE_KEY');
export const DISCORD_SECRET = Deno.env.get('DISCORD_SECRET');
export const SESSION_DURATION = Deno.env.get('SESSION_DURATION') || "900000";
export * from "https://deno.land/std@0.104.0/http/server.ts";
export * from 'https://raw.githubusercontent.com/DevAndromeda/djwt/master/mod.ts';