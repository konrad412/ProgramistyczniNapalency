# ProgramistyczniNapalency

**Autorzy:** Konrad Milewski, Szymon Kamiński, Maciej Bałakier

---

## O co w ogóle chodzi

To jest strona kibicowska dla fanów Jagiellonii Białystok. Projekt zrobiony na zaliczenie.
Strona symuluje coś w stylu klubu ultrasów — są statystyki "maniaków", galeria opraw,
sklep z gadżetami i dane z prawdziwego API piłkarskiego.

---

## Struktura plików

```
projekt/
├── index.html          # strona główna
├── oprawy.html         # galeria opraw
├── statystyki.html     # tabela maniaków
├── sklep.html          # sklep z gadżetami
├── script.js           # cały JS, logika całej aplikacji
├── style.css           # style dla wszystkich podstron
├── baner.png           # tło strony
├── oprawa-1.jpg        # zdjęcia do galerii opraw
├── oprawa-2.jpg
├── oprawa-3.jpg
├── oprawa-5.jpg
├── maczeta1.jpg        # zdjęcia produktów w sklepie
├── maczeta2.jpg
├── maczeta3.jpg
├── koszulka1.jpg
├── koszulka2.jpg
├── koszulka3.jpg
├── czapkaszalik1.jpg
├── czapkaszalik2.jpg
└── czapkaszalik3.jpg
```

---

## Jak to działa technicznie

Strona jest zbudowana jako **SPA (Single Page Application)** — czyli wszystkie podstrony
są w jednym miejscu, a cała zawartość jest generowana dynamicznie przez JavaScript.
Nie ma żadnych przeładowań strony, wszystko dzieje się w przeglądarce.

Każdy plik HTML (`index.html`, `oprawy.html`, `statystyki.html`, `sklep.html`) to praktycznie
to samo — pusty `<div id="app">` i podłączone `script.js` + `style.css`. JavaScript sam
decyduje co wyświetlić na podstawie tego jaką podstronę kliknął użytkownik. Nawigacja
między podstronami odbywa się przez funkcję `nawigacja()`, która wywołuje odpowiednią
funkcję renderującą i przewija stronę do góry.

---

## Podstrony

### Główna (`index.html`)

Wyświetla 3 bloki z danymi z prawdziwego API piłkarskiego (`v3.football.api-sports.io`),
liga nr 106 (ekstraklasa), sezon 2023:

- **Blok 1** — ostatnie 5 zakończonych meczów z datą i wynikiem
- **Blok 2** — tabela ligowa, top 10 drużyn (miejsce, nazwa, mecze, punkty)
- **Blok 3** — najlepsi strzelcy sezonu, top 10 (miejsce, zawodnik, gole)

Dane są pobierane asynchronicznie (`async/await` + `fetch`). Każdy blok ma osobny
`try/catch` — jeśli jedno API nie odpowie, reszta dalej działa i wyświetla się
komunikat "Brak danych" zamiast crashowania całej strony.

### Oprawy (`oprawy.html`)

Prosta galeria ze zdjęciami opraw meczowych Jagiellonii. Cztery zdjęcia w układzie
flex/wrap z automatycznym zawijaniem. Nic skomplikowanego, czysto wizualna podstrona.

### Statystyki (`statystyki.html`)

Tabela z "maniakami" — fikcyjnymi kibicami z pseudonimami i statystykami bojowymi.
Kolumny: imię i ksywa, wyjścia, pobyty w szpitalu, waga, uderzenia maczetą, otrzymane obrażenia.

Co tutaj działa:

- **LocalStorage** — dane są zapisywane w przeglądarce, więc po odświeżeniu strony
  nie znikają. Przy pierwszym uruchomieniu ładuje się 10 domyślnych maniaków.
- **Formularz dodawania** — można dodać nowego maniaka przez formularz na górze.
  Jeśli wpisze się "Imię Ksywa" (z odstępem), automatycznie formatuje do "Imię (Ksywa)".
  Walidacja sprawdza czy imię nie jest puste.
- **Wyszukiwarka** — filtruje tabelę na żywo po imieniu (zdarzenie `oninput`).
- **Sortowanie** — tabela sortuje się automatycznie po bilansie: `uderzenia - obrazenia`,
  od najwyższego. Najskuteczniejsi maniacy są na górze.
- **Zabezpieczenie XSS** — funkcja `zabezpieczTekst()` escapuje znaki specjalne
  (`<`, `>`, `&`, `"`, `'`) żeby nikt nie wstrzyknął HTMLa przez formularz.

### Sklep (`sklep.html`)

Statyczna strona z produktami podzielonymi na 4 kategorie w układzie grid:

- **Maczety** — 3 modele z linkami do militaria.pl
- **Koszulki meczowe Jagiellonii** — 3 modele z linkami do oficjalnego sklepu klubu
- **Czapki** — 3 modele z linkami do oficjalnego sklepu klubu
- **Szaliki** — 3 modele z linkami do oficjalnego sklepu klubu

Każdy produkt: zdjęcie (klikalny link otwierający sklep w nowej karcie), nazwa,
cena i liczba dostępnych sztuk. Dane o produktach są wpisane na sztywno w HTML.

---

## Jak uruchomić

Wystarczy otworzyć `index.html` w przeglądarce. Nie ma żadnego backendu,
nie trzeba nic instalować ani uruchamiać serwera.

Zdjęcia (maczeta1.jpg, koszulka1.jpg, oprawa-1.jpg, baner.png itp.) muszą być
w tym samym folderze co pliki HTML. Są to pliki lokalne, nie ma ich w repozytorium.

---

## Użyte technologie

- **HTML5** — struktura stron, semantyczny markup
- **CSS3** — stylowanie, flexbox, grid, media queries (responsywność od 768px i 1024px),
  `background-attachment: fixed` dla efektu paralaksy tła
- **JavaScript (vanilla)** — logika SPA, obsługa DOM, fetch API, LocalStorage
- **API Football** (`v3.football.api-sports.io`) — zewnętrzne API z danymi piłkarskimi,
  wymaga klucza w nagłówku `x-apisports-key`

Żadnych frameworków, żadnych bibliotek, żadnego node_modules. Czyste HTML/CSS/JS.
Responsywność zrobiona przez media queries — layout zmienia się przy 768px (tablet)
i 1024px (desktop). Na mobilce bloki są pionowo, na większych ekranach obok siebie.

---

## Znane ograniczenia

- Klucz do API jest wpisany na sztywno w `script.js` — w prawdziwym projekcie
  powinien być po stronie serwera, nie w kodzie frontendowym. Na razie każdy kto
  otworzy devtools w przeglądarce może go zobaczyć.
- Dane w sklepie (ceny, stany magazynowe) są statyczne — nie aktualizują się
  automatycznie ze sklepem. Żeby zmienić cenę trzeba ręcznie edytować HTML.
- LocalStorage jest per-przeglądarka — dane maniaków nie synchronizują się
  między różnymi urządzeniami ani użytkownikami. Każdy widzi swoją lokalną bazę.
- API zwraca dane z sezonu 2023, więc informacje o meczach i strzelcach są
  już nieaktualne — to ograniczenie darmowego planu API.
- Strona nie działa offline — bez połączenia z internetem bloki na stronie głównej
  pokażą tylko "Brak danych", galeria opraw i sklep działają normalnie bo są statyczne.

Projekt nie korzysta z żadnego systemu budowania — nie ma webpacka, vite'a ani nic
podobnego. Co napisane to działa od razu po otwarciu w przeglądarce.