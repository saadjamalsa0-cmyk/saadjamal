// Worker entry (wrangler.toml), as on gulforbit.sa. Only /api/* reaches this code;
// every other request is a static file from out/.
import type { EmailEnv } from "../lib/email";
import { POST as contact } from "../server/api/contact";

type Env = EmailEnv & { ASSETS: { fetch: (request: Request) => Promise<Response> } };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname !== "/api/contact") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
    return contact(request, env);
  },
};
