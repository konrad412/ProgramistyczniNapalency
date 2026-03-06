tekst = "";
a = 51;
let stan = false;
function stoper() {
    stan = !stan;
    if (stan) {
        pocz = Date.now() 
       
        czasdrugi();
    } else {
        
        clearTimeout(za);
    }

}


function czasdrugi() {
    const kon = Date.now();
    const uplynelo = kon - pocz;
    const minuty = Math.floor(uplynelo / 60000);
    const sekundy = Math.floor((uplynelo % 60000) / 1000);
    const setne = ((uplynelo % 1000) / 10).toFixed(0);
    const setneStr = setne < 10 ? "0" + setne : setne;
    const sekundyStr = sekundy < 10 ? "0" + sekundy : sekundy;
    const minutyStr = minuty < 10 ? "0" + minuty : minuty;

    document.getElementById("czas").innerHTML = minutyStr + ":" + sekundyStr + ":" + setneStr;
        
    za = setTimeout(czasdrugi, 10);
    }

    const elements = document.querySelectorAll(".sr");

    elements.forEach(function(element) {
        element.addEventListener("click", function() {


            element.classList.add("ka"); 

            a--

            if (a == 50) {stoper()
            
            };

            if ( a == 1) {

                stoper()

                tekst = "Brawo ! Twój czas: "; 

                const kon = Date.now(); 
                const uplynelo = kon - pocz; 
                const minuty = Math.floor(uplynelo / 60000);
                const sekundy = Math.floor((uplynelo % 60000) / 1000);
                const setne = ((uplynelo % 1000) / 10).toFixed(0);
                const setneStr = setne < 10 ? "0" + setne : setne;
                const sekundyStr = sekundy < 10 ? "0" + sekundy : sekundy;
                const minutyStr = minuty < 10 ? "0" + minuty : minuty;

                document.getElementById("czas").innerHTML = tekst + minutyStr + " min. " + sekundyStr + " sek. " + setneStr + " set.";

            }

        });
});

   function reset() {

    location.reload();

   }


