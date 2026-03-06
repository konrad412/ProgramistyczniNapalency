const apiKey = '960c191a5beba95dfa90072fe4420812';
const teamId = 1067;

async function GetJagaFixtures() {
// Pobieramy konkretną kolejkę (round), co jest dozwolone w darmowym planie
const url = `https://v3.football.api-sports.io/fixtures?league=106&season=2023&round=Regular%20Season%20-%201`;

    const settings = {
        method: "GET",
        headers: {
            "x-apisports-key": apiKey
        }
    };

    try {
        const response = await fetch(url, settings);
        const result = await response.json();
        
        // Wyciągamy tablicę meczów z obiektu
        const fixtures = result.response; 

        const container = document.getElementById('lista-meczy');
        if (!container) return;
        
        container.innerHTML = '';

        // Sprawdzamy czy są jakieś mecze
        if (!fixtures || fixtures.length === 0) {
            container.innerHTML = '<p style="color: white;">Brak nadchodzących meczów Jagiellonii.</p>';
            return;
        }

        fixtures.forEach(item => {
            const date = new Date(item.fixture.date);
            const formattedDate = date.toLocaleString('pl-PL', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            // Tworzymy HTML dla każdego meczu
            const matchDiv = document.createElement('div');
            matchDiv.style.padding = "10px 0";
            matchDiv.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";

            matchDiv.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="text-align: left; flex: 1;">
                        <span style="font-weight: bold; color: white; display: block;">${item.teams.home.name}</span>
                        <span style="font-size: 0.8em; color: #aaa;">vs</span>
                        <span style="font-weight: bold; color: white; display: block;">${item.teams.away.name}</span>
                    </div>
                    <div style="text-align: right; min-width: 80px;">
                        <span style="color: #cc0000; font-weight: bold; font-size: 0.9em;">${formattedDate}</span>
                    </div>
                </div>
            `;
            container.appendChild(matchDiv);
        });

    } catch (error) {
        console.error('Błąd wyświetlania:', error);
    }
}

GetJagaFixtures();