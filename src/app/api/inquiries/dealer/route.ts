import { NextRequest, NextResponse } from 'next/server';
import { transporter, MAIL_FROM, MAIL_TO } from '@/lib/mailer';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, business_name, mobile, email, state, city, message } = body;

    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    const logoUrl = `${baseUrl}/assets/sb-logo.png`;

    /* ── Validation ── */
    if (!name || !business_name || !mobile || !email || !state || !city) {
      return NextResponse.json(
        { error: 'Missing required fields: name, business_name, mobile, email, state, and city are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    const mobileClean = mobile.replace(/[\s\-\+]/g, '');
    if (!/^\d{10,15}$/.test(mobileClean)) {
      return NextResponse.json({ error: 'Invalid mobile number format.' }, { status: 400 });
    }

    const receivedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    /* ── Email to owner ── */
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #001a3a, #003580); padding: 28px 32px; }
    .header h1 { color: #00b4d8; margin: 0 0 4px; font-size: 22px; }
    .header p { color: #90caf9; margin: 0; font-size: 13px; }
    .badge { display: inline-block; background: #f59e0b; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; margin-bottom: 20px; letter-spacing: 0.08em; text-transform: uppercase; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
    .value { font-size: 15px; color: #1f2937; font-weight: 600; word-break: break-word; }
    .highlight { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; }
    .highlight p { margin: 0; font-size: 14px; color: #92400e; }
    .message-box { background: #f8fafc; border-left: 4px solid #f59e0b; border-radius: 6px; padding: 14px 16px; font-size: 14px; color: #374151; line-height: 1.6; margin-top: 4px; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; }
    .footer { background: #f8fafc; padding: 16px 32px; text-align: center; font-size: 12px; color: #9ca3af; }
    .footer a { color: #00b4d8; text-decoration: none; }
    .location { display: inline-block; background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; border-radius: 20px; padding: 4px 14px; font-size: 13px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
        <img src="${logoUrl}" alt="Shark Bond Logo" style="height: 32px; width: auto; object-fit: contain;" />
        <h1 style="margin: 0;">New Dealership Application</h1>
      </div>
      <p>Shark Bond — Chemseal Industries Website</p>
    </div>
    <div class="body">
      <span class="badge">⭐ Dealer Partnership Inquiry</span>

      <div class="highlight">
        <p>A new dealer application has been received from <strong>${city.trim()}, ${state.trim()}</strong>. Please review and follow up within 48 hours.</p>
      </div>

      <div class="field">
        <div class="label">👤 Applicant Name</div>
        <div class="value">${name.trim()}</div>
      </div>
      <div class="field">
        <div class="label">🏢 Business / Firm Name</div>
        <div class="value">${business_name.trim()}</div>
      </div>
      <div class="field">
        <div class="label">📱 Mobile Number</div>
        <div class="value"><a href="tel:${mobile.trim()}" style="color:#00b4d8">${mobile.trim()}</a></div>
      </div>
      <div class="field">
        <div class="label">✉️ Email Address</div>
        <div class="value"><a href="mailto:${email.trim()}" style="color:#00b4d8">${email.trim()}</a></div>
      </div>

      <hr class="divider" />

      <div class="field">
        <div class="label">📍 Location</div>
        <div class="value">
          <span class="location">📌 ${city.trim()}, ${state.trim()}</span>
        </div>
      </div>

      ${message ? `
      <hr class="divider" />
      <div class="field">
        <div class="label">💬 Additional Information</div>
        <div class="message-box">${message.trim().replace(/\n/g, '<br/>')}</div>
      </div>` : ''}

      <hr class="divider" />

      <div class="field">
        <div class="label">🕒 Received At</div>
        <div class="value" style="font-size:13px;color:#6b7280;">${receivedAt} (IST)</div>
      </div>
    </div>
    <div class="footer">
      This email was automatically generated by the Shark Bond dealership application form.<br/>
      <a href="https://wa.me/918866604466">Reply via WhatsApp</a> &nbsp;|&nbsp;
      <a href="mailto:${email.trim()}">Reply to ${name.trim()}</a>
    </div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email.trim(),
      subject: `🤝 New Dealership Application — ${business_name.trim()}, ${city.trim()}, ${state.trim()}`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true, message: 'Application submitted successfully' });

  } catch (error) {
    console.error('Dealer inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to process application. Please try again later.' },
      { status: 500 }
    );
  }
}
