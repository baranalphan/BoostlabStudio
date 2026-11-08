"use server";

import nodemailer from "nodemailer";
import { supportContact } from "@/components/sites/boostlab/content";
import type { ContactField, ContactFormState } from "@/types/boostlab";

const LIMITS = supportContact.limits;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Reads a field as a trimmed string; single-line fields also lose any line breaks. */
function readField(formData: FormData, field: ContactField) {
  const raw = formData.get(field);
  const value = typeof raw === "string" ? raw.trim() : "";
  return field === "message" ? value : value.replace(/[\r\n]+/g, " ");
}

/**
 * Sends the support form to the studio inbox over the Hostinger mailbox's SMTP. The mail
 * goes from the mailbox to itself with the visitor as Reply-To, so "Reply" answers them.
 */
export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    subject: readField(formData, "subject"),
    message: readField(formData, "message"),
  };

  // Honeypot: a hidden field people never see, so anything in it came from a bot.
  if (formData.get("company")) {
    return { status: "success", values: { name: "", email: "", subject: "", message: "" } };
  }

  const errors: ContactFormState["errors"] = {};
  for (const field of Object.keys(LIMITS) as ContactField[]) {
    if (!values[field]) errors[field] = "This field is required.";
    else if (values[field].length > LIMITS[field]) errors[field] = "This is too long.";
  }
  if (!errors.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (Object.keys(errors).length > 0) {
    return { status: "error", values, errors };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP_HOST, SMTP_USER and SMTP_PASS must be set.");
    return { status: "error", values };
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: { name: "Boostlab Website", address: SMTP_USER },
      to: CONTACT_TO ?? SMTP_USER,
      replyTo: { name: values.name, address: values.email },
      subject: `[Support] ${values.subject}`,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Subject: ${values.subject}`,
        "",
        values.message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Contact form: sending failed.", error);
    return { status: "error", values };
  }

  return { status: "success", values: { name: "", email: "", subject: "", message: "" } };
}
