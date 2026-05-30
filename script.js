<<<<<<< HEAD
console.log("Skrypt API v2 - Start");

const apiKey = "960c191a5beba95dfa90072fe4420812";
const baseUrl = "https://v3.football.api-sports.io";

// Ustawiamy sztywno sezon 2024, żeby pasował do Twojego HTML
const leagueId = 106; 
const season = 2024; 

async function pobierzDanePilkarskie() {
    console.log("Funkcja pobierzDanePilkarskie wystartowała.");
    
    const elementMecz = document.getElementById('dane-mecz');
    const elementDruzyna = document.getElementById('dane-druzyna');
    const elementStrzelec = document.getElementById('dane-strzelec');

    const headers = { "x-apisports-key": apiKey };

    // --- 1. MECZ ---
    try {
        console.log("Pobieram mecz z API...");
        const response = await fetch(`${baseUrl}/fixtures?league=${leagueId}&season=${season}&last=1`, { headers });
        const data = await response.json();
        
        if (data.response && data.response.length > 0) {
            const mecz = data.response[0];
            elementMecz.innerHTML = `<strong>${mecz.teams.home.name} vs ${mecz.teams.away.name}</strong><br><small>Wynik: ${mecz.goals.home}:${mecz.goals.away}</small>`;
        } else {
            throw new Error("Brak meczów w API");
        }
    } catch (error) {
        console.warn("Błąd API (Mecz), ładuję dane awaryjne:", error);
        // DANE AWARYJNE JEŚLI API NIE DZIAŁA:
        if (elementMecz) elementMecz.innerHTML = "<strong>Real Madryt vs Borussia D.</strong><br><small>Finał LM (Zakończony)</small>";
    }

    // --- 2. DRUŻYNA ---
    try {
        console.log("Pobieram tabelę z API...");
        const response = await fetch(`${baseUrl}/standings?league=${leagueId}&season=${season}`, { headers });
        const data = await response.json();
        
        if (data.response && data.response.length > 0) {
            const lider = data.response[0].league.standings[0][0]; 
            elementDruzyna.innerHTML = `<strong>${lider.team.name}</strong><br>Punkty: ${lider.points}`;
        } else {
            throw new Error("Brak tabeli w API");
        }
    } catch (error) {
        console.warn("Błąd API (Tabela), ładuję dane awaryjne:", error);
        if (elementDruzyna) elementDruzyna.innerHTML = "<strong>Manchester City</strong><br>Mistrz Sezonu";
    }

    // --- 3. STRZELEC ---
    try {
        console.log("Pobieram strzelców z API...");
        const response = await fetch(`${baseUrl}/players/topscorers?league=${leagueId}&season=${season}`, { headers });
        const data = await response.json();
        
        if (data.response && data.response.length > 0) {
            const topStrzelec = data.response[0];
            elementStrzelec.innerHTML = `<strong>${topStrzelec.player.name}</strong><br>Gole: ${topStrzelec.statistics[0].goals.total}`;
        } else {
            throw new Error("Brak strzelców w API");
        }
    } catch (error) {
        console.warn("Błąd API (Strzelec), ładuję dane awaryjne:", error);
        if (elementStrzelec) elementStrzelec.innerHTML = "<strong>Erling Haaland</strong><br>Gole: 27";
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM w pełni załadowany. Odpalam API.");
    pobierzDanePilkarskie();
});
=======
localStorage.setItem("login", "twojlogin");
const nick = localStorage.getItem("login");
console.log("Witaj ponownie, " + nick);


function wczytajOprawy() {
    const kontener = document.getElementById("kontener-opraw");
    
    if (!kontener) return; 

 
    const daneOpraw = [
        { tytul: "Sezon prawie mistrzowski", data: "18.05.2018", zdjecie: "./images/oprawa-1.jpg" },
        { tytul: "Oprawa Ultras", data: "22.06.2018", zdjecie: "./images/oprawa-2.jpg" },
        { tytul: "Kategoria: Wiedza Powszechna", data: "05.11.2022", zdjecie: "./images/oprawa-3.jpg" }
    ];
    
    kontener.innerHTML = '';

    
    daneOpraw.forEach(oprawa => {
        const karta = document.createElement('div');
        karta.className = 'karta-oprawy';
        
        karta.innerHTML = `
            <h3>${oprawa.tytul}</h3>
            <p><strong>Data:</strong> ${oprawa.data}</p>
            <img src="${oprawa.zdjecie}" alt="Zdjęcie oprawy">
        `;
        
        kontener.appendChild(karta);
    });
}


document.addEventListener("DOMContentLoaded", wczytajOprawy);
>>>>>>> 5825477e7379ab8ddba3819993261f983b8be73c
