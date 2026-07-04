import nodemailer from 'nodemailer';

// Transporter is created once and reused (server-side only)
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // TLS via STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const MAIL_FROM = `"Shark Bond Website" <${process.env.SMTP_USER}>`;
export const MAIL_TO = process.env.SMTP_TO || '';
