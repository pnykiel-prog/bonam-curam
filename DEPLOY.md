# Wdrożenie na Vercel — Bonam Curam

Witryna jest statyczna (HTML/CSS/JS, bez kroku build). Repozytorium jest gotowe
do importu na Vercel.

## Wariant 1: Import przez panel Vercel (zalecany)

1. Wejdź na https://vercel.com/new
2. Wybierz repozytorium `pnykiel-prog/bonam-curam` i branch `claude/compassionate-dijkstra-37z8rj`
   (po scaleniu do `main` deploy będzie szedł automatycznie z `main`).
3. Ustawienia projektu:
   - **Framework Preset:** `Other`
   - **Build Command:** *(puste)*
   - **Output Directory:** *(puste — serwowany jest katalog główny)*
4. Kliknij **Deploy**.

Vercel rozpozna pliki statyczne w katalogu głównym i opublikuje stronę.
Konfiguracja nagłówków i routingu jest w `vercel.json`.

## Wariant 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel        # podgląd (preview)
vercel --prod # produkcja
```

## Uwaga o grafikach

Strona odwołuje się do plików w katalogu `assets/` (zdjęcia ekspertów, logo,
mapy, logotypy partnerów). Grafiki są już dołączone do repozytorium.

## Formularz kontaktowy (SMTP)

Formularz na `kontakt.html` wysyła zgłoszenia przez funkcję serverless
`api/send.js` (Nodemailer, ten sam mechanizm co na stronie Fundacji DivideYou).
Aby działał, ustaw w panelu Vercel (**Project → Settings → Environment
Variables**) następujące zmienne:

| Zmienna | Opis | Przykład |
|---|---|---|
| `SMTP_HOST` | host serwera SMTP | `smtp.example.com` |
| `SMTP_PORT` | port SMTP | `587` (lub `465`) |
| `SMTP_SECURE` | `true` dla portu 465, w innym wypadku `false` | `false` |
| `SMTP_USER` | login SMTP (zwykle adres e-mail) | `office@bonamcuram.com` |
| `SMTP_PASS` | hasło / hasło aplikacji SMTP | `••••••••` |
| `MAIL_TO` | adres odbiorcy zgłoszeń | `office@bonamcuram.com` |
| `MAIL_FROM` | adres nadawcy (musi być dozwolony przez serwer SMTP) | `office@bonamcuram.com` |

Po dodaniu zmiennych zrób **Redeploy**. Można użyć tych samych danych SMTP,
które obsługują formularz Fundacji DivideYou — zmienne mają identyczne nazwy.

### Ustawienia dla poczty OVH

| Zmienna | Wartość |
|---|---|
| `SMTP_HOST` | `ssl0.ovh.net` |
| `SMTP_PORT` | `465` (alternatywnie `587`) |
| `SMTP_SECURE` | `true` dla portu 465, `false` dla 587 |
| `SMTP_USER` | `office@bonamcuram.com` (realna skrzynka OVH) |
| `SMTP_PASS` | hasło skrzynki |
| `MAIL_TO` | `office@bonamcuram.com` |
| `MAIL_FROM` | `office@bonamcuram.com` (ten sam adres co `SMTP_USER`) |

`ssl0.ovh.net` to uniwersalny serwer SMTP OVH (MX Plan i Email Pro). OVH nie
pozwala wysyłać z adresu innego niż uwierzytelniona skrzynka, więc `MAIL_FROM`
musi być równy `SMTP_USER`.

Endpoint zwraca: `200` (wysłano), `400` (błąd walidacji), `405` (zła metoda),
`500` (brak konfiguracji SMTP), `502` (błąd wysyłki). Wbudowany honeypot
(`bc_hp`) odrzuca spam botów.
