import assert from "node:assert/strict";
import { test } from "node:test";
import { POST } from "../server/api/contact.ts";

const env = { RESEND_API_KEY: "re_test_not_a_real_key" };
let ip = 0;
const post = (body, headers = {}) =>
  new Request("https://www.saadjamal.sa/api/contact", {
    method: "POST",
    headers: { "cf-connecting-ip": `10.0.0.${++ip}`, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
const valid = { name: "Test Buyer", phone: "+966500000000", email: "buyer@example.com", service: "Welder Supply", message: "Need <b>2</b> welders", locale: "en" };

/** Replaces the network so nothing is ever sent; returns what would have gone to Resend. */
async function withResend(fn, status = 200) {
  const sent = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    sent.push({ url: String(url), body: JSON.parse(init.body) });
    return new Response(JSON.stringify(status === 200 ? { id: "x" } : { name: "validation_error", message: "bad" }), { status, headers: { "content-type": "application/json" } });
  };
  try {
    return { response: await fn(), sent };
  } finally {
    globalThis.fetch = original;
  }
}

test("a valid request is emailed to the company and acknowledged", async () => {
  const { response, sent } = await withResend(() => POST(post(valid), env));
  assert.equal(response.status, 200);
  assert.equal(sent.length, 2);
  assert.ok(sent[0].url.startsWith("https://api.resend.com/"));
  assert.deepEqual([sent[0].body.to, sent[0].body.reply_to], ["info@saadjamal.sa", "buyer@example.com"]);
  assert.ok(sent[0].body.html.includes("&lt;b&gt;2&lt;/b&gt;"), "visitor text must be escaped");
  assert.equal(sent[1].body.to, "buyer@example.com");
  assert.ok(!sent[1].body.text.includes("welders"), "acknowledgement must not echo visitor text");
});

test("without an email address only the company is mailed", async () => {
  const { sent } = await withResend(() => POST(post({ ...valid, email: "" }), env));
  assert.equal(sent.length, 1);
});

test("bad input and bots send nothing", async () => {
  for (const [body, status] of [[{ ...valid, phone: "" }, 400], [{ ...valid, email: "nope" }, 400], ["not json", 400], [{ ...valid, company_website: "spam" }, 200]]) {
    const { response, sent } = await withResend(() => POST(post(body), env));
    assert.equal(response.status, status);
    assert.equal(sent.length, 0);
  }
  const foreign = await withResend(() => POST(post(valid, { origin: "https://evil.example" }), env));
  assert.equal(foreign.response.status, 403);
});

test("a missing key or a Resend error is reported, never a false success", async () => {
  assert.equal((await POST(post(valid), {})).status, 502);
  const { response } = await withResend(() => POST(post(valid), env), 422);
  assert.equal(response.status, 502);
});

test("one address is limited to five requests in ten minutes", async () => {
  const same = () => post(valid, { "cf-connecting-ip": "192.0.2.1" });
  const { response } = await withResend(async () => {
    for (let i = 0; i < 5; i++) await POST(same(), env);
    return POST(same(), env);
  });
  assert.equal(response.status, 429);
});
