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
mapy, logotypy partnerów). Te pliki **nie były dołączone** do paczki z kodem —
po deployu miejsca na obrazy będą puste do czasu wgrania grafik do `assets/`
(struktura ścieżek jest opisana w `README.md`).
