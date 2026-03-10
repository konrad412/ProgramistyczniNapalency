localStorage.setItem("login", "twojlogin");
const nick = localStorage.getItem("login");
console.log("Witaj ponownie," + nick);

async function pobierzOprawy() {
    const kontener = document.getElementById("kontener-opraw");
    
    if (!kontener) return; 

    const apiUrl = 'https://api.stadionowioprawcy.net/endpoint-testowy'; 

    try {
       
        const daneZApi = [
            { tytul: "Mecz Derbowy", data: "18.06.2024", zdjecie: "https://placehold.co/300x200/660000/FFF?text=Oprawa+1" },
            { tytul: "Oprawa Ultras", data: "12.06.2024", zdjecie: "https://placehold.co/300x200/660000/FFF?text=Oprawa+2" },
            { tytul: "Wyjazd Runda Jesienna", data: "05.06.2024", zdjecie: "https://placehold.co/300x200/660000/FFF?text=Oprawa+3" }
        ];
        kontener.innerHTML = '';

   
        daneZApi.forEach(oprawa => {
            const karta = document.createElement('div');
            karta.className = 'karta-oprawy';
            
            karta.innerHTML = `
                <h3>${oprawa.tytul}</h3>
                <p><strong>Data:</strong> ${oprawa.data}</p>
                <img src="${oprawa.zdjecie}" alt="Zdjęcie oprawy">
            `;
            
            kontener.appendChild(karta);
        });

    } catch (error) {
        console.error("Błąd podczas pobierania danych z API:", error);
        kontener.innerHTML = '<center>Nie udało się załadować opraw. Brak dostępu do API.</center>';
    }
}

document.addEventListener("DOMContentLoaded", pobierzOprawy);