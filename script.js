console.log("Skrypt API v4.1 - Final (SPA + LocalStorage + Sortowanie + Czysty HTML + Formatowanie Ksyw w Nawiasy)");

//Przykładowi maniacy żeby nie było pusto

const domyslniManiacy = [
    { imie: "Janusz (Rozpruwacz)", wyjscia: 42, szpital: 38, waga: "95", uderzenia: 148, obrazenia: 12 },
    { imie: "Mati (Kompilator)", wyjscia: 29, szpital: 31, waga: "84", uderzenia: 120, obrazenia: 7 },
    { imie: "Tomek (Terminator)", wyjscia: 35, szpital: 44, waga: "90", uderzenia: 115, obrazenia: 22 },
    { imie: "Krzysiek (Gladiator)", wyjscia: 27, szpital: 29, waga: "88", uderzenia: 102, obrazenia: 31 },
    { imie: "Paweł (Destroyer)", wyjscia: 31, szpital: 36, waga: "92", uderzenia: 97, obrazenia: 18 },
    { imie: "Marek (Stalker)", wyjscia: 38, szpital: 27, waga: "86", uderzenia: 91, obrazenia: 44 },
    { imie: "Seba (Kreator)", wyjscia: 15, szpital: 24, waga: "78", uderzenia: 89, obrazenia: 45 },
    { imie: "Darek (Phantom)", wyjscia: 24, szpital: 19, waga: "76", uderzenia: 74, obrazenia: 29 },
    { imie: "Radek (Shadow)", wyjscia: 22, szpital: 15, waga: "72", uderzenia: 58, obrazenia: 63 },
    { imie: "Piotrek (Rookie)", wyjscia: 19, szpital: 8, waga: "70", uderzenia: 34, obrazenia: 77 }
];

let maniacyData = JSON.parse(localStorage.getItem('bazaManiakow')) || domyslniManiacy;
localStorage.setItem('bazaManiakow', JSON.stringify(maniacyData));

// funkcje do zabezpieczenia przed wprowadzeniem nieporządanych zmian
function zabezpieczTekst(tekst) {
    if (!tekst) return "";
    return tekst
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

//możliwość przechodzenia przez podstrony

function nawigacja(strona) {
    switch (strona) {
        case 'index':      renderujGlowna();      break;
        case 'oprawy':     renderujOprawy();      break;
        case 'statystyki': renderujStatystyki();  break;
        case 'sklep':      renderujSklep();       break;
    }
    window.scrollTo(0, 0);
}

function budujStrone(tytulNaglowka, zawartoscPodstrony) {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="naglowek">
            <h1>${tytulNaglowka}</h1>
            <div class="wybor">
                <button onclick="nawigacja('index')">Główna strona</button>
                <button onclick="nawigacja('oprawy')">Oprawy</button>
                <button onclick="nawigacja('statystyki')">Statystyki</button>
                <button onclick="nawigacja('sklep')">Sklep</button>
            </div>
        </div>
        ${zawartoscPodstrony}
    `;
}

//glowna
function renderujGlowna() {
    const zawartosc = `
        <div class="srodek">
            <div class="blok1">
                <center>NAJBLIŻSZY MECZ: </center><br>
                2023 <br>
               <span id="dane-mecz">Ładowanie danych...</span>
            </div>
            <div class="blok2">
                <center>NAJLEPSZA DRUŻYNA: </center><br>
                2023 <br>
                <span id="dane-druzyna">Ładowanie danych...</span>
            </div>
            <div class="blok3">
                <center>NAJLEPSZY STRZELEC: </center><br>
                2023 <br>
                <span id="dane-strzelec">Ładowanie danych...</span>
            </div>
        </div>
    `;
    budujStrone('Ostatni bastion fanatyzmu, tu rządzą zasady, nie prawo', zawartosc);
    pobierzDanePilkarskie();
}

//oprawy
function renderujOprawy() {
    const zawartosc = `
        <div class="srodek-oprawy">
            <center><h2>GALERIA OPRAW</h2></center>
            <div class="grid-opraw">
                <img src="oprawa-1.jpg" alt="Oprawa meczowa mistrz polski" >
                <img src="oprawa-3.jpg" alt="Oprawa meczowa legia to stara *****" >
                <img src="oprawa-2.jpg" alt="Oprawa meczowa probierz" >
                <img src="oprawa-5.jpg" alt="Oprawa meczowa ultras" >
            </div>
        </div>
    `;
    budujStrone('Race flary nasze dary', zawartosc);
}

//tabela maniacy
function renderujStatystyki() {
    const zawartosc = `
        <div class="kontener-tabeli">
            
            <div class="formularz-maniakow">
                <input type="text" id="nowe-imie" placeholder="Imię i ksywa" class="input-maniak">
                <input type="number" id="nowe-wyjscia" placeholder="Wyjścia" class="input-maniak krotki-input">
                <input type="number" id="nowy-szpital" placeholder="Pobyty w szpitalu" class="input-maniak szpital-input">
                <input type="number" id="nowa-waga" placeholder="Waga w kg" class="input-maniak waga-input">
                <input type="number" id="nowe-uderzenia" placeholder="Uderzenia" class="input-maniak sredni-input">
                <input type="number" id="nowe-obrazenia" placeholder="Obrażenia" class="input-maniak sredni-input">
                <button onclick="dodajManiaka()" class="btn-dodaj">DODAJ</button>
            </div>

            <div class="wyszukiwarka-kontener">
                <input type="text" placeholder="Wyszukaj maniaka po imieniu..." oninput="wyszukajManiaka(this.value)" class="input-wyszukiwarka">
            </div>

            <table class="tabela-maniakow">
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Wyjścia</th>
                        <th>Pobyty w szpitalu</th>
                        <th>Waga</th>
                        <th class="kolumna-hit">Uderzenia maczetą</th>
                        <th class="kolumna-hit">Otrzymane obrażenia</th>
                    </tr>
                </thead>
                <tbody id="tabela-maniakow-body">
                </tbody>
            </table>
        </div>
    `;
    budujStrone('Najelpsi maniacy', zawartosc);
    generujWierszeManiakow(maniacyData);
}

//sklepik
function renderujSklep() {
    const zawartosc = `
        <div class="srodeks">
            <div class="blok1s">
                <center><h2>Maczety</h2></center>
                <div class="produkt">
                    <a href="https://militaria.pl/p/maczeta-kershaw-camp-10-tan-28326" target="_blank"><img class="produkt-zdjecie" src="maczeta1.jpg" alt="Maczeta Kershaw Camp 10 Tan"></a>
                    <h3 class="produkt-nazwa">Maczeta Kershaw Camp 10 Tan</h3>
                    <p class="produkt-cena">299,00 zł</p>
                    <p class="produkt-ilosc">Dostępnych sztuk: 12</p>
                </div>   
                <div class="produkt">
                    <a href="https://militaria.pl/p/maczeta-mfh-taifun-black-70273" target="_blank"><img class="produkt-zdjecie" src="maczeta2.jpg" alt="Maczeta MFH Taifun Black"></a>
                    <h3 class="produkt-nazwa">Maczeta MFH Taifun Black</h3>
                    <p class="produkt-cena">149,99 zł</p>
                    <p class="produkt-ilosc">Dostępnych sztuk: 5</p>
                </div> 
                <div class="produkt">
                    <a href="https://militaria.pl/p/maczeta-umarex-elite-force-ef712-19400" target="_blank"><img class="produkt-zdjecie" src="maczeta3.jpg" alt="Maczeta Umarex Elite Force EF712"></a>
                    <h3 class="produkt-nazwa">Maczeta Umarex Elite Force EF712</h3>
                    <p class="produkt-cena">199,00 zł</p>
                    <p class="produkt-ilosc">Dostępnych sztuk: 8</p>
                </div> 
            </div>

            <div class="blok2s">
                <center><h2>Koszulki</h2></center>
                <div class="produkt">
                    <a href="https://sklep.jagiellonia.pl/koszulki-meczowe/56920-66065-koszulka-meczowa-25-26-pasiak-kombat-pro.html#/190-rozmiar-s" target="_blank"><img class="produkt-zdjecie" src="koszulka1.jpg" alt="Koszulka meczowa 2025/2026 Pasiak kombat Premium"></a>
                    <h3 class="produkt-nazwa">Koszulka meczowa 2025/2026 Pasiak kombat Premium</h3>
                    <p class="produkt-cena">399,00 zł</p>
                    <p class="produkt-rozmiar">Dostępne rozmiary: S, M, L, XL</p>
                    <p class="produkt-ilosc">Mało sztuk w magazynie</p>
                </div>
                <div class="produkt">
                    <a href="https://sklep.jagiellonia.pl/koszulki-meczowe/56920-66065-koszulka-meczowa-25-26-pasiak-kombat-pro.html#/190-rozmiar-s" target="_blank"><img class="produkt-zdjecie" src="koszulka2.jpg" alt="Koszulka meczowa 2025/2026 Pasiak kombat Premium"></a>
                    <h3 class="produkt-nazwa">Koszulka meczowa 2025/2026 Pasiak kombat Premium</h3>
                    <p class="produkt-cena">399,00 zł</p>
                    <p class="produkt-rozmiar">Dostępne rozmiary: S, M, L, XL</p>
                    <p class="produkt-ilosc">Mało sztuk w magazynie</p>
                </div>
                <div class="produkt">
                    <a href="https://sklep.jagiellonia.pl/swieto-ultry/57055-66320-koszulka-kappa-swieto-ultry-2026.html#/190-rozmiar-s" target="_blank"><img class="produkt-zdjecie" src="koszulka3.jpg" alt="Koszulka KAPPA Święto Ultry 2026"></a>
                    <h3 class="produkt-nazwa">Koszulka KAPPA Święto Ultry 2026</h3>
                    <p class="produkt-cena">442,00 zł</p>
                    <p class="produkt-rozmiar">Dostępne rozmiary: S, M, L, XL</p>
                    <p class="produkt-ilosc">Dużo sztuk w magazynie</p>
                </div>
            </div>

            <div class="blok3s">
                <center><h2>Gadżety</h2></center>
                <div class="produkt">
                    <a href="https://sklep.jagiellonia.pl/do-domu/56536-kubek-czerwony-5905454175500.html" target="_blank"><img class="produkt-zdjecie" src="gadzet1.jpg" alt="Kubek Jagiellonia czerwony"></a>
                    <h3 class="produkt-nazwa">Kubek Jagiellonia czerwony</h3>
                    <p class="produkt-cena">39,00 zł</p>
                    <p class="produkt-ilosc">Dostępnych sztuk: 800</p>
                </div> 
                <div class="produkt">
                    <a href="https://sklep.jagiellonia.pl/do-domu/56528-maskotka-pszczola-5905454175975.html" target="_blank"><img class="produkt-zdjecie" src="gadzet1.jpg" alt="Maskotka Pszczoła"></a>
                    <h3 class="produkt-nazwa">Maskotka Pszczoła</h3>
                    <p class="produkt-cena">129,00 zł</p>
                    <p class="produkt-ilosc">Dostępnych sztuk: 120</p>
                </div>
                <div class="produkt">
                    <a href="https://sklep.jagiellonia.pl/do-domu/56577-zapalniczka-zippo-jagiellonia-191693594836.html" target="_blank"><img class="produkt-zdjecie" src="gadzet3.jpg" alt="Zapalniczka Zippo Jagiellonia"></a>
                    <h3 class="produkt-nazwa">Zapalniczka Zippo Jagiellonia</h3>
                    <p class="produkt-cena">249,00 zł</p>
                    <p class="produkt-ilosc">Dostępnych sztuk: 90</p>
                </div>
            </div>

            <div class="blok4s">
                <center><h2>Szaliki i czapki</h2></center>
                <div class="produkt">
                    <a href="https://sklep.jagiellonia.pl/czapki-zimowe/56653-czapka-pasiak-z-bablem-5906599555240.html" target="_blank"><img class="produkt-zdjecie" src="czapkaszalik1.jpg" alt="Czapka pasiak z pomponem"></a>
                    <h3 class="produkt-nazwa">Czapka pasiak z pomponem</h3>
                    <p class="produkt-cena">51,75 zł</p>
                    <p class="produkt-ilosc">Dostępnych sztuk: 20</p>
                </div>
                <div class="produkt">
                    <a href="https://sklep.jagiellonia.pl/szale/56538-szalik-pasiak-cienki-5905454176873.html" target="_blank"><img class="produkt-zdjecie" src="czapkaszalik2.jpg" alt="Szalik pasiak cienki"></a>
                    <h3 class="produkt-nazwa">Szalik pasiak cienki</h3>
                    <p class="produkt-cena">50,00 zł</p>
                    <p class="produkt-ilosc">Dostępnych sztuk: 1000</p>
                </div>
                <div class="produkt">
                    <a href="https://sklep.jagiellonia.pl/szale/56975-szalik-fioletowy-slonce-5907419688926.html" target="_blank"><img class="produkt-zdjecie" src="czapkaszalik3.jpg" alt="Szalik Fioletowy SŁOŃCE..."></a>
                    <h3 class="produkt-nazwa">Szalik Fioletowy SŁOŃCE...</h3>
                    <p class="produkt-cena">50,00 zł</p>
                    <p class="produkt-ilosc">Dostępnych sztuk: 90</p>
                </div>
            </div>  
        </div>
    `;
    budujStrone('Sklep', zawartosc);
}

//wyszukiwania i formularz do wprowadzania nowych ziomków

function generujWierszeManiakow(daneDoWyswietlenia) {
    const tbody = document.getElementById('tabela-maniakow-body');
    if (!tbody) return;

    tbody.innerHTML = ''; 

    if (daneDoWyswietlenia.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="komunikat-pusty">Brak maniaków pasujących do wyszukiwania.</td></tr>`;
        return;
    }

    daneDoWyswietlenia.sort((a, b) => {
        const bilansA_prawdziwy = a.uderzenia - a.obrazenia;
        const bilansB_prawdziwy = b.uderzenia - b.obrazenia;
        return bilansB_prawdziwy - bilansA_prawdziwy; 
    });

    daneDoWyswietlenia.forEach(maniak => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${zabezpieczTekst(maniak.imie)}</td>
            <td>${maniak.wyjscia}</td>
            <td>${maniak.szpital}</td>
            <td>${zabezpieczTekst(maniak.waga)}</td>
            <td class="dane-hit">${maniak.uderzenia}</td>
            <td class="dane-hit">${maniak.obrazenia}</td>
        `;
        tbody.appendChild(tr);
    });
}

function wyszukajManiaka(wpisanaFraza) {
    const szukaneHaslo = wpisanaFraza.toLowerCase(); 
    const przefiltrowaniManiacy = maniacyData.filter(maniak => {
        return maniak.imie.toLowerCase().includes(szukaneHaslo);
    });
    generujWierszeManiakow(przefiltrowaniManiacy);
}

function dodajManiaka() {
    let imie = document.getElementById('nowe-imie').value.trim();
    const wyjscia = document.getElementById('nowe-wyjscia').value;
    const szpital = document.getElementById('nowy-szpital').value;
    const waga = document.getElementById('nowa-waga').value;
    const uderzenia = document.getElementById('nowe-uderzenia').value;
    const obrazenia = document.getElementById('nowe-obrazenia').value;

    if (!imie) {
        alert("Hola, hola! Maniak musi mieć imię lub ksywę! Wypełnij to pole.");
        return;
    }

    if (imie.includes(' ') && !imie.match(/[\(\"\'„”]/)) {
        const czesci = imie.split(' ');
        const pierwszeImie = czesci[0]; 
        const ksywa = czesci.slice(1).join(' '); 
        imie = `${pierwszeImie} (${ksywa})`; 
    }

    const nowyManiak = {
        imie: imie,
        wyjscia: parseInt(wyjscia) || 0,
        szpital: parseInt(szpital) || 0,
        waga: parseInt(waga) || 0,
        uderzenia: parseInt(uderzenia) || 0,
        obrazenia: parseInt(obrazenia) || 0
    };

    maniacyData.push(nowyManiak);
    localStorage.setItem('bazaManiakow', JSON.stringify(maniacyData));
    generujWierszeManiakow(maniacyData);

    document.getElementById('nowe-imie').value = '';
    document.getElementById('nowe-wyjscia').value = '';
    document.getElementById('nowy-szpital').value = '';
    document.getElementById('nowa-waga').value = '';
    document.getElementById('nowe-uderzenia').value = '';
    document.getElementById('nowe-obrazenia').value = '';
    
    alert(`Dodano do bazy: ${imie}`);
}

//API

const apiKey = "489c2f503dfb86e5144c2502f98a2e09"; 
const baseUrl = "https://v3.football.api-sports.io";
const leagueId = 106; 
const season = 2023; 

async function pobierzDanePilkarskie() {
    console.log("Funkcja pobierzDanePilkarskie wystartowała.");
    const elementMecz = document.getElementById('dane-mecz');
    const elementDruzyna = document.getElementById('dane-druzyna');
    const elementStrzelec = document.getElementById('dane-strzelec');
    const headers = { "x-apisports-key": apiKey };

    try {
        console.log("Pobieram mecze z API...");
        const response = await fetch(`${baseUrl}/fixtures?league=${leagueId}&season=${season}`, { headers });
        const data = await response.json();
        
        if (data.response && data.response.length > 0) {
            const zakonczoneMecze = data.response.filter(mecz => mecz.fixture.status.short === 'FT');
            const ostatnie5 = zakonczoneMecze.slice(-5).reverse();

            let htmlMecze = "<ul class='api-lista'>";
            ostatnie5.forEach(mecz => {
                const dataMeczu = new Date(mecz.fixture.date).toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
                const bramkiDom = mecz.goals.home !== null ? mecz.goals.home : "-";
                const bramkiWyjazd = mecz.goals.away !== null ? mecz.goals.away : "-";
                
                htmlMecze += `<li class="api-element-listy"><small>${dataMeczu}</small><br><strong>${mecz.teams.home.name} ${bramkiDom}:${bramkiWyjazd} ${mecz.teams.away.name}</strong></li>`;
            });
            htmlMecze += "</ul>";
            if(elementMecz) elementMecz.innerHTML = htmlMecze;
        }
    } catch (error) {
        console.warn("Błąd (Mecze):", error.message);
        if(elementMecz) elementMecz.innerHTML = `<p class="api-blad">Brak danych</p>`;
    }

    try {
        console.log("Pobieram tabelę z API...");
        const response = await fetch(`${baseUrl}/standings?league=${leagueId}&season=${season}`, { headers });
        const data = await response.json();
        
        if (data.response && data.response.length > 0) {
            const standings = data.response[0].league.standings[0].slice(0, 10);
            let htmlTabela = "<table class='api-tabela'><tr><th>#</th><th>Drużyna</th><th>M</th><th>Pkt</th></tr>";
            standings.forEach(wiersz => {
                htmlTabela += `<tr><td>${wiersz.rank}</td><td><strong>${wiersz.team.name}</strong></td><td>${wiersz.all.played}</td><td>${wiersz.points}</td></tr>`;
            });
            htmlTabela += "</table>";
            if(elementDruzyna) elementDruzyna.innerHTML = htmlTabela;
        }
    } catch (error) {
        console.warn("Błąd (Tabela):", error.message);
        if(elementDruzyna) elementDruzyna.innerHTML = `<p class="api-blad">Brak danych</p>`;
    }

    try {
        console.log("Pobieram strzelców z API...");
        const response = await fetch(`${baseUrl}/players/topscorers?league=${leagueId}&season=${season}`, { headers });
        const data = await response.json();
        
        if (data.response && data.response.length > 0) {
            const topStrzelcy = data.response.slice(0, 10);
            let htmlStrzelcy = "<table class='api-tabela'><tr><th>#</th><th>Zawodnik</th><th>Gole</th></tr>";
            topStrzelcy.forEach((strzelec, index) => {
                htmlStrzelcy += `<tr><td>${index + 1}</td><td><strong>${strzelec.player.name}</strong></td><td>${strzelec.statistics[0].goals.total}</td></tr>`;
            });
            htmlStrzelcy += "</table>";
            if(elementStrzelec) elementStrzelec.innerHTML = htmlStrzelcy;
        }
    } catch (error) {
        console.warn("Błąd (Strzelcy):", error.message);
        if(elementStrzelec) elementStrzelec.innerHTML = `<p class="api-blad">Brak danych</p>`;
    }
}

//warunek aby aplikacja nie wyprzedziła html

window.addEventListener('DOMContentLoaded', () => {
    nawigacja('index');
});