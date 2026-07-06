import nodemailer from "nodemailer";

export function isMailerConfigured(): boolean {
  return !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function sendMail(opts: { to: string; subject: string; text: string }): Promise<void> {
  if (!isMailerConfigured()) return;
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"S-Style サイト通知" <${process.env.GMAIL_USER}>`,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
  });
}
