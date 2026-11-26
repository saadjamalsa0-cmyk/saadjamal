import { sendContactEmails, type EmailEnv } from "../../lib/email";
import { checkRateLimit, getClientIp } from "../../lib/rate-limit";

const LIMITS = { name: 100, phone: 30, email: 150, service: 100, location: 100, message: 4000 } as const;

const json = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request, env: EmailEnv): Promise<Response> {
  // Browsers send Origin on POST; another site's page must not submit this form.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ code: "forbidden" }, 403);

  if (!checkRateLimit(`contact:${getClientIp(request)}`, { limit: 5, windowMs: 10 * 60 * 1000 }).allowed) {
    return json({ code: "rate-limited" }, 429);
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 20_000) return json({ code: "too-large" }, 413);
    body = JSON.parse(raw);
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch {
    return json({ code: "invalid" }, 400);
  }

  // Honeypot: people never see this field. Pretend success so bots don't adapt.
  if (body.company_website) return json({ ok: true });

  const field = (key: keyof typeof LIMITS) => String(body[key] ?? "").trim().slice(0, LIMITS[key]);
  const data = {
    name: field("name"),
    phone: field("phone"),
    email: field("email"),
    service: field("service"),
    location: field("location"),
    message: field("message"),
    locale: body.locale === "en" ? ("en" as const) : ("ar" as const),
  };
  if (!data.name || !data.phone || !data.message) return json({ code: "missing-fields" }, 400);
  if (data.email && !/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(data.email)) return json({ code: "invalid-email" }, 400);

  try {
    await sendContactEmails(data, env);
    return json({ ok: true });
  } catch (error) {
    console.error(error);
    return json({ code: "send-failed" }, 502);
  }
}
