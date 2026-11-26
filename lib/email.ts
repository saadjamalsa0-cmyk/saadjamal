import { Resend } from "resend";
import { COMPANY } from "../config/company";

export type EmailEnv = {
  /** Secret. Set with `npx wrangler secret put RESEND_API_KEY`. */
  RESEND_API_KEY?: string;
  /** Sender on a domain verified in Resend. */
  RESEND_FROM_EMAIL?: string;
  /** Where enquiries are delivered. */
  NOTIFICATION_EMAIL?: string;
};

export type ContactData = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  location?: string;
  message: string;
  locale: "ar" | "en";
};

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

/** Sends the enquiry to the company, then a short acknowledgement to the visitor if they left an email. */
export async function sendContactEmails(data: ContactData, env: EmailEnv) {
  if (!env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
  const resend = new Resend(env.RESEND_API_KEY);
  const from = `${COMPANY.brand.en} <${env.RESEND_FROM_EMAIL || COMPANY.email}>`;
  const to = env.NOTIFICATION_EMAIL || COMPANY.email;

  const rows: [string, string | undefined][] = [
    ["Name", data.name],
    ["Mobile", data.phone],
    ["Email", data.email],
    ["Service", data.service],
    ["Project location", data.location],
    ["Page language", data.locale === "ar" ? "Arabic" : "English"],
  ];
  const filled = rows.filter((r): r is [string, string] => Boolean(r[1]));

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email || undefined,
    subject: oneLine(`Quote request: ${data.service || "General"} - ${data.name}`),
    text: `${filled.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`,
    html: `<h2>New quote request from ${COMPANY.domain}</h2><table cellpadding="6">${filled
      .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
      .join("")}</table><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
  });
  if (error) throw new Error(`Resend: ${error.message}`);

  if (!data.email) return;
  // Fixed wording only: nothing the sender typed is echoed, so the form can't be used to mail others.
  const ack =
    data.locale === "ar"
      ? { subject: "استلمنا طلبكم - سعد جمال للمقاولات", text: `شكرًا لتواصلكم. استلمنا طلبكم وسنعود إليكم.\n${COMPANY.legalName.ar}\n${COMPANY.phone}` }
      : { subject: "We received your request - Saad Jamal Contracting", text: `Thank you for contacting us. We have received your request and will get back to you.\n${COMPANY.legalName.en}\n${COMPANY.phone}` };
  const reply = await resend.emails.send({ from, to: data.email, replyTo: COMPANY.email, ...ack });
  // The enquiry is already delivered; a failed acknowledgement must not look like a failed submission.
  if (reply.error) console.warn(`Acknowledgement not sent: ${reply.error.message}`);
}
