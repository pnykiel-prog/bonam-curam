// Serverless endpoint obsługujący formularz kontaktowy (POST /api/send).
// Wysyła wiadomość e-mail przez SMTP (Nodemailer). Konfiguracja w zmiennych
// środowiskowych projektu Vercel:
//   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM
const nodemailer = require('nodemailer');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function readBody(req) {
  if (req.body) {
    if (typeof req.body === 'string') {
      try { return JSON.parse(req.body); } catch (_) { return {}; }
    }
    return req.body;
  }
  return await new Promise((resolve) => {
    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); } catch (_) { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const data = await readBody(req);

  // Honeypot — jeśli wypełniony, udajemy sukces i nic nie wysyłamy.
  if (data.bc_hp) {
    return res.status(200).json({ ok: true });
  }

  const name = (data.name || '').toString().trim();
  const email = (data.email || '').toString().trim();
  const phone = (data.phone || '').toString().trim();
  const profil = (data.profil || '').toString().trim();
  const msg = (data.msg || '').toString().trim();

  if (!name) {
    return res.status(400).json({ ok: false, error: 'Brak imienia i nazwiska' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Nieprawidłowy adres e-mail' });
  }

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.MAIL_TO || 'office@bonamcuram.com';
  const from = process.env.MAIL_FROM || user;

  if (!host || !user || !pass) {
    return res.status(500).json({ ok: false, error: 'Brak konfiguracji SMTP' });
  }

  const lines = [
    'Nowe zgłoszenie z formularza kontaktowego — Bonam Curam',
    '',
    'Imię i nazwisko: ' + name,
    'E-mail: ' + email,
    'Telefon: ' + (phone || '—'),
    'Profil: ' + (profil || '—'),
    '',
    'Wiadomość:',
    msg || '—',
  ];
  const text = lines.join('\n');
  const html =
    '<h2>Nowe zgłoszenie z formularza kontaktowego — Bonam Curam</h2>' +
    '<p><strong>Imię i nazwisko:</strong> ' + esc(name) + '</p>' +
    '<p><strong>E-mail:</strong> ' + esc(email) + '</p>' +
    '<p><strong>Telefon:</strong> ' + esc(phone || '—') + '</p>' +
    '<p><strong>Profil:</strong> ' + esc(profil || '—') + '</p>' +
    '<p><strong>Wiadomość:</strong><br>' + esc(msg || '—').replace(/\n/g, '<br>') + '</p>';

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: 'Kontakt — ' + name,
      text,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Mail send error:', err);
    return res.status(502).json({ ok: false, error: 'Nie udało się wysłać wiadomości' });
  }
};
