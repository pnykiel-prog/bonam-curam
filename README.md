# Handoff: Bonam Curam — Europejskie Centrum Seniora (witryna wielostronicowa)

## Overview
Kompletna, wielostronicowa witryna marketingowa **Konsorcjum Senioralnego Bonam Curam / Europejskie Centrum Seniora** — organizacji łączącej operacje, technologię, medycynę, prawo i finanse w jeden model dla sektora senioralnego. Witryna prezentuje ofertę konsorcjum, ekspertów, partnerów oraz cztery obszary współpracy, z osobnymi podstronami dla każdej grupy odbiorców (właściciele obiektów, inwestorzy, samorządy, rynek niemiecki) plus dokumenty prawne (Polityka Prywatności, Regulamin).

Język interfejsu: **polski**. Layout: **desktop-first, responsywny** (breakpointy 1080 / 980 / 820 / 760 / 620 / 560 px).

## About the Design Files
Pliki w tej paczce to **referencje projektowe wykonane w HTML/CSS/JS (vanilla)** — prototypy pokazujące docelowy wygląd i zachowanie, **nie** kod produkcyjny do skopiowania 1:1. Zadaniem jest **odtworzenie tych projektów w docelowym środowisku** (np. Next.js/React, Astro, Vue, WordPress, itp.) z użyciem przyjętych w nim wzorców i bibliotek. Jeśli środowisko nie istnieje, należy wybrać framework najlepiej pasujący do prostej, w większości statycznej witryny marketingowej (rekomendacja: **Astro** lub **Next.js (App Router, statyczny eksport)** — treść jest głównie statyczna, z jednym formularzem kontaktowym).

Obecna implementacja referencyjna jest celowo „frameworkless": jeden plik `styles.css` (design system), jeden `site.js` (wspólny nagłówek/stopka/logo/animacje, wstrzykiwane przez JS) i osobny plik HTML na stronę. W docelowym kodzie nagłówek/stopka powinny stać się komponentami współdzielonymi, a dane (eksperci, partnerzy, obszary) — strukturami danych renderowanymi w pętli.

## Fidelity
**High-fidelity (hi-fi).** Finalne kolory, typografia, odstępy, cienie i interakcje. Odtwórz UI pixel-perfect, korzystając z tokenów wymienionych niżej. Wszystkie wartości są w `styles.css` (`:root`) oraz w blokach `<style id="page-...">` na końcu każdego pliku HTML.

---

## Tech / architektura referencyjna

| Plik | Rola |
|---|---|
| `styles.css` | Globalny design system: tokeny `:root`, typografia, przyciski, nagłówek, stopka, karty (`.panel`), siatki, tabela porównawcza, formularz, animacje reveal. Importuje Google Fonts. |
| `site.js` | Wstrzykuje wspólny **nagłówek** (`#site-header`), **stopkę** (`#site-footer`), **logo-emblemat** (SVG/PNG), menu mobilne (drawer), meta/OG tagi, favicon oraz obserwator animacji „reveal". Każda strona zawiera puste `<div id="site-header"></div>` i `<div id="site-footer"></div>`, które skrypt zastępuje. |
| `image-slot.js` | Web component `<image-slot>` — placeholder na zdjęcie przeciągane przez użytkownika (używany tylko w prototypie; w produkcji zastąp zwykłym `<img>`). |
| `*.html` | Po jednej stronie na plik. Każdy ma na końcu blok `<style id="page-...">` ze stylami specyficznymi dla strony. |

**Nawigacja** (kolejność w menu, definiowana w `site.js` → `NAV`):
1. `index.html` — Strona główna
2. `oferta.html` — Oferta
3. `optymalizacja.html` — Optymalizacja
4. `klientde.html` — Klient DE
5. `operator.html` — Operator
6. `dlajst.html` — Dla JST
7. `digitalcare.html` — Digital care
8. `kontakt.html` — Kontakt

Dodatkowo (linkowane ze stopki): `polityka-prywatnosci.html`, `regulamin.html`.

---

## Design Tokens (z `styles.css :root`)

### Kolory
| Token | Hex / wartość | Zastosowanie |
|---|---|---|
| `--ink` | `#27333c` | Główny tekst, nagłówki |
| `--ink-soft` | `#414c56` | Tekst akapitowy |
| `--ink-faint` | `#727c86` | Tekst drugorzędny, klucze meta |
| `--gold` | `#b1903f` | Akcent podstawowy, przyciski primary, linie |
| `--gold-deep` | `#937431` | Akcent ciemniejszy (tekst na jasnym, hover) |
| `--gold-soft` | `#cdb277` | Akcent jasny (tekst/linie na granacie) |
| `--paper` / `--bg` | `#ffffff` | Tło stron i kart |
| `--bg-alt` | `#f6f4ef` | Tło sekcji naprzemiennych (kremowe) |
| `--bg-alt2` | `#f1eee7` | Tło sekcji „band" |
| `--footer` | `#36312b` | Tło stopki (ciemny brąz) |
| `--footer-soft` | `#b8b0a3` | Tekst w stopce |
| `--line` | `#d9d4c9` | Obramowania standardowe |
| `--line-soft` | `#e7e3d9` | Obramowania delikatne |
| `--line-strong` | `#c6bfae` | Obramowania mocniejsze |
| `--navy` | `#15243d` | **Akcent granatowy**: paski statystyk, karty na ciemnym tle, paski u góry nagłówka/kart |
| `--navy-soft` | `#1d3052` | Granat jaśniejszy (karty akcentowane) |
| `--navy-line` | `rgba(21,36,61,.18)` | Obramowania hover |
| `--navy-rule` | `rgba(21,36,61,.22)` | Mocne linie separujące (paski statystyk, nagłówki tabel) |
| `--navy-chip` | `rgba(21,36,61,.06)` | Tło chipów |

### Typografia
- **`--font-eng`**: `'Cinzel', Georgia, serif` — font inskrypcyjny (kapitaliki) do nagłówków, etykiet, nawigacji, przycisków, liczb.
- **`--font-serif`**: `'Cormorant Garamond', Georgia, 'Times New Roman', serif` — tekst akapitowy (zapis zdaniowy).
- Wczytywane z Google Fonts: `Cinzel` (400,500,600,700) + `Cormorant Garamond` (400,500,600,700 + italic).
- Bazowy `body`: 18px / line-height 1.5.

Skala typografii (klasy w `styles.css`):
| Klasa | Rozmiar | Uwagi |
|---|---|---|
| `.display` / `.eng-xl` | `clamp(28px,4vw,44px)` | Nagłówki H1, Cinzel 600, letter-spacing .04em |
| `.eng-lg` | `clamp(22px,2.8vw,32px)` | Nagłówki sekcji |
| `.eng-md` | `clamp(17px,1.7vw,21px)` | Mniejsze nagłówki |
| `.sec-title` | `clamp(23px,3vw,34px)` | Tytuł sekcji (z `.accent` = złoty wyróżnik słowa) |
| `.lede` | `clamp(20px,2vw,24px)` | Lead/wprowadzenie |
| `.caps` | `18px` / lh 1.62 | **Tekst akapitowy — ZAPIS ZDANIOWY** (klasa historycznie nazwana „caps", ale NIE jest już uppercase) |
| `.caps.lg` | `21px` | Większy akapit/lead |
| `.body` | `18.5px` / lh 1.62 | Tekst akapitowy (nowsze podstrony) |
| `.body.sm` | `17px` | Mniejszy akapit |
| `.lbl` | `11.5px` Cinzel, uppercase, letter-spacing .18em | **Eyebrow/etykieta** z granatowym myślnikiem (`::before`, `margin-right:15px`) |

> **WAŻNA ZASADA TYPOGRAFICZNA:** wersaliki (`text-transform:uppercase`) stosujemy **wyłącznie** w krótkich etykietach: eyebrow (`.lbl`), nawigacja, przyciski (`.btn`, `.read-more`), klucze meta (`.mk`, `.cm-k`, `.mf-k`), daty, flagi. **Cały tekst akapitowy jest w zapisie zdaniowym.** Nie wprowadzać akapitów pisanych w całości wielkimi literami.

### Odstępy, promienie, cienie
- `--maxw`: `1180px` (szerszy kontener `.wrap-wide`/hero do ~1280–1360px lokalnie).
- `--gutter`: `clamp(18px,4vw,40px)` — padding poziomy kontenera.
- Sekcje: `.section` padding `clamp(48px,7vw,84px) 0`.
- `--radius`: `2px` (witryna jest celowo „ostra"/klasyczna, minimalne zaokrąglenia).
- `--shadow-sm`: `0 1px 2px rgba(21,36,61,.05), 0 2px 8px rgba(21,36,61,.06)`
- `--shadow-md`: `0 6px 16px rgba(21,36,61,.08), 0 18px 40px rgba(21,36,61,.11)`
- `--shadow-lg`: `0 30px 64px rgba(21,36,61,.18)`

### Złota linia sekcji (`.gold-rule`)
Pozioma kreska 62×3px w kolorze `--gold`, z dostawionym granatowym akcentem 20×3px (`::after`). Wariant `.gold-rule.left` wyrównuje do lewej. Używana pod nagłówkami sekcji.

---

## Komponenty wielokrotnego użytku (`styles.css`)

- **Nagłówek** (`.site-header`): sticky, tło białe z blur, **3px granatowy pasek u góry** (`border-top:3px solid var(--navy)`), dolna linia `--line-strong`. Zawiera logo-emblemat + nawigację (Cinzel uppercase 12px) + przycisk hamburger (mobile). Aktywna pozycja menu: złota kreska pod spodem.
- **Logo-emblemat**: okrągły znak z żółtym sercem i napisem na okręgu „EUROPEJSKIE CENTRUM SENIORA · BONAM CURAM". Wersja jasna = `assets/logo.png`, wersja na ciemne tło (kremowy napis) = `assets/logo-dark.png`. W `site.js` funkcja `emblem(size, theme)` wybiera wariant (`theme==='dark'` w stopce/drawerze).
- **Stopka** (`.site-footer`): ciemnobrązowe tło (`--footer`), 3-kolumnowa siatka: emblemat (dark) | mapa strony (linki uppercase serif) | kolumna prawna (Polityka prywatności, Regulamin) + kontakt e-mail. Linki: `office@bonamcuram.com`.
- **Przyciski** (`.btn`): Cinzel uppercase 13px, letter-spacing .1em, border 1.5px, radius 2px.
  - `.btn-primary`: tło `--gold`, tekst biały, hover → `--gold-deep` + cień + `translateY(-1px)`.
  - `.btn-ghost`: przezroczysty, border `--ink`, hover → wypełnienie `--ink`. Na ciemnym tle (`.bg-navy`/hero) wariant jasny.
  - `.read-more`: link-CTA „Czytaj więcej →" (Cinzel uppercase 12.5px, złota strzałka przesuwająca się w hover).
- **Karta** (`.panel`): białe tło, border `--line`, cień `--shadow-sm`, padding `clamp(22px,2.6vw,32px)`. **Hover**: `translateY(-4px)`, `--shadow-md`, border granatowy oraz **animowany 3px granatowy pasek u góry** (`::before` scaleX 0→1).
- **Siatki**: `.cols-2/3/4`, `.areas-grid` (3 kol.), `.grid-2/3/4`.
- **Pasek statystyk** (`.stat-band` / sekcje `.of-stats`, `.de-stats`, `.jst-stats`): **granatowe tło `--navy`**, liczby Cinzel w `--gold-soft` (`clamp(28px,3.2vw,44px)`), podpisy serif jasne. Linie separujące `--navy-rule` (2px).
- **Karty na granacie** (`.navy-card`, `.fin-card`, `.req-card`, `.ps-card`): tło `--navy`, nagłówek `--gold-soft` (Cinzel), opis serif jasny (`#cdd5df`). Wariant akcentowany `.accent-card`: tło `--navy-soft` + lewy złoty pasek `inset 4px`.
- **Tabela porównawcza** (`.compare` / `.compare-head`): dwie kolumny „Gdzie tracisz" (szare, prefiks „–") vs „Co zyskujesz" (ciemne pogrubione, prefiks „→" złoty). Nagłówek z 2px linią `--navy-rule`.
- **Lista z myślnikiem** (`.check-list`): elementy z krótką złotą kreską jako punktorem.
- **Duża liczba kroku** (`.num-lg`): Cinzel `clamp(40px,6vw,80px)` w kolorze `--navy` (numeracja 01–04).
- **Formularz** (`.field`, `.consent`, `.form-ok`): etykiety Cinzel uppercase 11px; inputy serif 16px, border `--line`, focus → border `--gold`. Zob. „Formularz kontaktowy / RODO".
- **Animacja „reveal"**: elementy z klasą `.reveal` pojawiają się (fade+translateY) przy wejściu w viewport. Sterowane w `site.js` przez IntersectionObserver. **Failsafe**: po 1.6s i przy `beforeprint` wszystko jest wymuszane na widoczne (`opacity:1`), więc treść nigdy nie zostaje ukryta (ważne dla druku/PDF/SSR). Respektuje `prefers-reduced-motion`.

---

## Strony (Screens / Views)

> Każda strona ma `<body data-page="..." data-screen-label="...">`, pusty `#site-header` na górze i `#site-footer` na dole, a przed `</body>`: `<script src="site.js"></script>` (oraz `image-slot.js` tam, gdzie były sloty na zdjęcia — w produkcji niepotrzebne).

### 1. Strona główna — `index.html`
- **Hero**: pełnoszerokie tło — **złoty rysunek liniowy spacerujących seniorów** (`assets/hero-blueprint-gold.png`, `opacity .7`, `background-position center 32%`), na nim **półprzezroczysta granatowa karta** (`rgba(18,31,52,.72)` + blur, złoty pasek u góry) z układem 2-kolumnowym: po lewej tytuł „Europejskie Centrum Seniora / Bonam Curam" + claim „Jedna struktura / Wiele kompetencji / Jeden partner"; po prawej akapit opisowy + 2 przyciski (Poznaj ofertę, Bezpłatna konsultacja). Tekst jasny.
- **Główne obszary działalności** (6 kart `.area-card`): każda z **liniową grafiką SVG** (generowaną inline w JS, obiekt `AREA_GFX`, kolory złote/`#ecc35a`) ilustrującą obszar: Optymalizacja kosztów, Cyfryzacja i digitalizacja, Zarządzanie obiektami, Klient niemiecki, Fundusze i inwestycje, Współpraca z JST. Grafiki w równych paskach 150px na górze kart; karty wyrównane (flex column). Hover jak `.panel`.
- **Łączymy Europę**: 2 kolumny — tekst (3 akapity) + **mapa Europy** (`assets/europe-map-cream.png`) na kremowym tle (granat tła mapy zamieniony na kolor sekcji `#f6f4ef`), z maską gradientową zanikającą na **prawej i górnej krawędzi** (`mask-image` 2 gradienty + `mask-composite:intersect`). Złote kraje = kraje współpracy.
- **Specjaliści** (`.experts-grid`, **2 kolumny**): 9 ekspertów. Karta = zdjęcie 96×120 (cover, top) + nazwisko (Cinzel 16px) + rola (złota, Cinzel-uppercase-ish 13px) + biogram (serif 15px). 8 osób ma zdjęcia (`assets/experts/*`), Grzegorz Kozak — bez zdjęcia (renderowany bez `<img>`). Dane w tablicy `EXPERTS` w `index.html`.
- **Członkowie i Partnerzy** (`.logo-grid`, 6 kolumn): 21 logotypów w komórkach 3:2, **grayscale + opacity .78**, hover → pełny kolor. Mapowanie nazwa→plik w obiekcie `PARTNER_LOGOS`; kolejność w `PARTNERS`. DWS ma dedykowane proporcje. Brakujące logo renderują się jako tekstowa nazwa (`.logo-name`).

### 2. Oferta — `oferta.html`
- **Hero** 2-kol: tytuł „Bonam Curam nie sprzedaje pojedynczej usługi — buduje cały model…" + grafika sieci/akapit; po prawej zdjęcie seniorów (`assets/seniors/s30-1.png`).
- **Granatowy pasek statystyk**: 14 podmiotów / 6 obszarów / 25+ lat.
- **Dla kogo pracujemy**: 3 profile (Właściciel / Inwestor / JST) ze złotymi ikonami liniowymi.
- **Pełnoszerokie pasmo zdjęcia** (`assets/seniors/s27-1.png`).
- **Trzy kolumny korzyści 01/02/03** z granatowymi kartami; w kolumnie inwestorów dodatkowy blok „Projekty inwestycyjne" z 3 ikonami. **Sekcja 03 (JST)** zawiera 4 obszary spójne z podstroną „Dla JST": Mapowanie potrzeb i Digital Care / System optymalizacji kosztów / Rozwój infrastruktury / Systemy opieki rozproszonej. CTA → `dlajst.html`.
- **Co konkretnie robimy / Jak przebiega współpraca**: 2 kolumny z pionową linią; 6 obszarów (te same grafiki SVG co na stronie głównej, obiekt `DO_GFX`) + 4 kroki z ikonami.
- **CTA** „Porozmawiajmy o Twoim projekcie" + lista punktowa + zdjęcie konsultanta (`assets/consult/consult-1.png`).

### 3. Optymalizacja — `optymalizacja.html`
- **Hero** wyśrodkowany + pasek statystyk (5 obszarów / <12 mies. / 700 tys. zł).
- **Trzy fakty** (`.panel`): Energia / Personel / Sprzątanie, z kwotami strat.
- **Pięć obszarów optymalizacji** (`.area-block`, generowane z tablicy `AREAS`): każdy z metadanymi w prawym górnym rogu (`.area-meta`: Partner / Oszczędność / Zwrot), wprowadzeniem, **tabelą „Gdzie tracisz → Co zyskujesz"** (`.compare`) oraz cytatem (`.quote`, kursywa, lewy złoty pasek).
- **Suma korzyści**: wielka kwota „do 700 000 zł" (`.big-sum`, Cinzel złoty `clamp(40px,7vw,88px)`) + 4 kafelki „why" z checkmarkami.
- **Proces** (4 kroki `.panel`) + **CTA** „Umów audyt".

### 4. Klient DE — `klientde.html`
- **Hero** ze złotym akcentem + zdjęcie podpisywania kontraktu (`assets/de/signing.png`).
- **Granatowy pasek**: 80 000+ / 2–3× / 0 zł.
- **Problem DE / Szansa**: 2 granatowe karty (`.ps-card`, druga `.accent-card`).
- **Jak wygląda kontrakt na klienta DE**: 5 etapów (`.de-step`, z tablicy `DE_STEPS`) — numer, tytuł, opis, meta (czas/kto realizuje), linie separujące.
- **Trzy korzyści finansowe**: 3 granatowe karty (`.fin-card`).
- **Kto stoi za pozyskaniem klienta DE**: 2 karty partnerów (Relo Care Group + Pflegehilfe für Senioren) z listą zakresu i **logotypami wyrównanymi do dołu** (`.partner-logo`, `margin-top:auto`, równa wysokość kart) — `assets/partners/relo.png`, `assets/partners/pflegehilfe.png`.
- **Co musi spełniać obiekt**: 4 granatowe karty wymagań (`.req-card`).
- **CTA** z listą „co dostajesz po ocenie gotowości" + zdjęcie (`assets/consult/consult-3.png`).

### 5. Operator — `operator.html`
- **Hero** 2-kol + zdjęcie budynku (`assets/op/building.png`).
- **Czym jest umowa operatorska**: zdjęcie spotkania (`assets/op/meeting.png`) + tekst.
- **Pasmo zdjęcia** seniorów (`assets/seniors/s30-2.png`, kadr `object-position center 38%`, wysokość `clamp(220px,24vw,320px)`).
- **Pakiety operatorskie** (`.pkg-card`, jeden `.featured` ze złotą flagą `.pkg-flag`).
- **Mapa zasięgu**: „Działamy w całej Polsce" — **mapa Polski** (`assets/poland-map.png`, `object-fit:contain` na białym tle) + tekst.
- Oś czasu / proces + **CTA** (`assets/consult/consult-2.png`).

### 6. Dla JST — `dlajst.html`
- **Hero** 2-kol + **panorama miasta** (`assets/jst/city.png`).
- **Pasek statystyk** + sekcja strategii/infrastruktury (`.infra-item`).
- **Cztery obszary współpracy** (`.area-row`), naprzemienny układ tekst/zdjęcie:
  1. Mapowanie potrzeb i Digital Care → `assets/jst/caremap-map-clean.png` (mapa CareMap z pinezkami, kadr cover)
  2. System optymalizacji kosztów → `assets/jst/analytics.png` (dashboard)
  3. Rozwój infrastruktury → `assets/jst/blueprints.png` (rysunki architektoniczne)
  4. Systemy opieki rozproszonej → `assets/jst/network.png` (sieć punktów nad miastem)
- **CTA** + zdjęcie (`assets/consult/consult-4.png`).

### 7. Digital care — `digitalcare.html`
- **Hero** + zdjęcie (`assets/seniors/s27-2.png`).
- Sekcje domen/modułów (`.dom-*`, `.mod-*`) opisujące cyfryzację opieki.
- **CTA** (`assets/consult/consult-1.png`).

### 8. Kontakt — `kontakt.html`
- **2 kolumny**: lewa = intro + dane kontaktowe (`.cm-row`: E-mail / Organizacja / Zakres) + lista „Z czym możemy pomóc" (`.check-list`). Prawa = **formularz** (`.contact-card`, sticky).
- Formularz: Imię i nazwisko, E-mail, Telefon (opc.), Profil (select), Wiadomość (textarea), **obowiązkowy checkbox zgody RODO** (`.consent`, `required`, niezaznaczony domyślnie) z linkiem do Polityki Prywatności, przycisk „Wyślij zgłoszenie", **klauzula informacyjna** (`.form-note`, Administrator: Fundacja DivideYou) i komunikat sukcesu (`.form-ok`).
- W prototypie `onsubmit` tylko pokazuje `.form-ok` (brak wysyłki). **W produkcji** podłącz realny backend/usługę (np. Formspree, własny endpoint, e-mail na `office@bonamcuram.com`).

### 9. Polityka prywatności — `polityka-prywatnosci.html`
Dokument z 10 numerowanymi sekcjami (Administrator: Fundacja DivideYou, KRS 0000690646; cele; dane; podstawa prawna art. 6 ust. 1 lit. f RODO; odbiorcy; retencja; prawa; cookies; EOG; zmiany). Link powrotu „← Powrót do strony głównej" u góry i przycisk u dołu. Data aktualizacji 02.06.2026.

### 10. Regulamin strony — `regulamin.html`
Dokument z 6 paragrafami (§1–§6). Te same linki powrotu. Data 04.05.2025. Kontakt `office@divideyou.com`.

---

## Interactions & Behavior
- **Sticky header** + płynne przewijanie (`scroll-behavior:smooth`).
- **Menu mobilne**: poniżej 1080px nawigacja chowa się, pojawia hamburger → otwiera pełnoekranowy granatowy drawer (`.mobile-drawer`, `transform:translateY`). Obsługa w `site.js` (open/close, blokada scrolla body).
- **Animacje reveal**: fade+slide-up elementów `.reveal` przy wejściu w viewport (IntersectionObserver, threshold .08). Failsafe na widoczność (timeout 1.6s + `beforeprint`). `@media (prefers-reduced-motion)` wyłącza animację.
- **Hover kart** (`.panel`, `.area-card`, `.expert`, `.logo-cell`): unoszą się (`translateY`), mocniejszy cień, granatowa krawędź/pasek.
- **Logotypy partnerów**: grayscale → kolor w hover.
- **Formularz kontaktowy**: walidacja HTML5 (`required` na polach + checkboxie zgody); submit w prototypie pokazuje komunikat sukcesu.
- **Linki w treści**: złote podkreślenie (`.body a`, `.caps a`), hover → granat.

## State Management
Witryna jest w większości statyczna. Stan potrzebny tylko dla:
- **Menu mobilne**: open/closed (boolean).
- **Formularz kontaktowy**: wartości pól + stan „wysłano" (pokazanie potwierdzenia) + walidacja zgody.
- (Opcjonalnie) consent cookies, jeśli dodacie baner.
Dane do renderowania w pętli (przenieść do plików danych / CMS): `EXPERTS`, `PARTNERS`+`PARTNER_LOGOS`, `AREA_GFX`/`DO_GFX` (ikony obszarów), `AREAS` (optymalizacja), `DE_STEPS` (klient DE). Obecnie zdefiniowane jako tablice/obiekty JS w odpowiednich plikach HTML.

## Assets
Wszystkie w folderze `assets/` (skopiowane do tej paczki). **Pochodzenie:** logotypy, zdjęcia ekspertów, mapy i screeny platformy CareMap dostarczył klient; grafiki liniowe obszarów to inline SVG (w kodzie, nie pliki); rysunek hero i mapy zostały przetworzone kolorystycznie (przemalowane na złoto / kremowe tło).

| Ścieżka | Opis |
|---|---|
| `assets/logo.png` | Logo-emblemat (granatowy napis) — nagłówek, favicon, OG |
| `assets/logo-dark.png` | Logo na ciemne tło (kremowy napis) — stopka, drawer |
| `assets/hero-blueprint-gold.png` | Złoty rysunek liniowy seniorów — tło hero strony głównej |
| `assets/europe-map-cream.png` | Mapa Europy na kremowym tle (kraje współpracy złote) |
| `assets/poland-map.png` | Mapa Polski z punktami (sekcja zasięgu — Operator) |
| `assets/experts/*` | 8 zdjęć ekspertów (jpg/png) |
| `assets/partners/*` | 21 logotypów partnerów (png/svg), grayscale w UI |
| `assets/jst/*` | city, caremap-map-clean, analytics, blueprints, network |
| `assets/seniors/*` | zdjęcia seniorów (używane: s27-1, s27-2, s30-1, s30-2) |
| `assets/de/signing.png` | Podpisywanie kontraktu (hero Klient DE) |
| `assets/op/building.png`, `assets/op/meeting.png` | Operator: budynek + spotkanie |
| `assets/consult/consult-1..4.png` | Zdjęcia konsultanta (sekcje CTA) |

> Uwaga: w `assets/` mogą znajdować się też pliki nieużywane (np. `europe-map.png` — wersja z granatowym tłem, zastąpiona przez `-cream`). Bezpiecznie pominąć przy wdrożeniu — lista faktycznie używanych grafik jest powyżej.

**Fonty**: Google Fonts (Cinzel, Cormorant Garamond) — w produkcji rozważ self-hosting (`@fontsource`) dla wydajności i prywatności.

## Files (w tej paczce)
```
design_handoff_bonam_curam/
├── README.md                ← ten plik
├── index.html               ← strona główna
├── oferta.html
├── optymalizacja.html
├── klientde.html
├── operator.html
├── dlajst.html
├── digitalcare.html
├── kontakt.html
├── polityka-prywatnosci.html
├── regulamin.html
├── styles.css               ← design system (tokeny + komponenty)
├── site.js                  ← wspólny header/footer/logo/animacje
├── image-slot.js            ← placeholder zdjęć (tylko prototyp)
└── assets/                  ← wszystkie grafiki
```

## Rekomendacje wdrożeniowe (skrót)
1. Wynieś **header/footer/logo** do współdzielonego komponentu/layoutu (treść z `site.js`).
2. Zamień dane inline (`EXPERTS`, `PARTNERS`, `AREAS`, `DE_STEPS`) na pliki danych / kolekcje CMS.
3. Zachowaj **tokeny** 1:1 (kolory, fonty, cienie, radius 2px) — to o nie opiera się cała tożsamość wizualna.
4. Zastąp `<image-slot>` zwykłymi `<img>` z `loading="lazy"` i atrybutami `width/height` (CLS).
5. Podłącz **formularz kontaktowy** do realnej usługi; zachowaj obowiązkowy checkbox zgody i klauzulę RODO.
6. Zachowaj zasadę typografii: **wersaliki tylko w etykietach, akapity zdaniowe.**
7. Animacje `reveal` zaimplementuj z failsafe na widoczność (SSR/print nie mogą zostawić treści `opacity:0`).
8. Sprawdź responsywność na breakpointach 1080/980/820/760/620/560 px.
