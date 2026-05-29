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