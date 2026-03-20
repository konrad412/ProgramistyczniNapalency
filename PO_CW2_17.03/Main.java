import java.util.Scanner;
class wizytowka {
    private String imie;
    private String nazwisko;
    private String stanowisko;
    private String firma;
    private String email;
    private String numer;

    public wizytowka(String imie, String nazwisko, String stanowisko, String firma, String email, String numer)
    {
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.stanowisko = stanowisko;
        this.firma = firma;
        this.email = email;
        this.numer = numer;
    }


public void krotka(){
    String opis = "";
    if(stanowisko != null && firma != null){    
        opis = " (" + stanowisko + " at " + firma + ")";
    } else if (stanowisko != null){
        opis = " (" + stanowisko + ")";
    } else if (firma != null){
        opis = " (" + firma + ")";
    }
    System.out.println(imie + " " + nazwisko + opis);
}

public void dluga() {
    System.out.println("===============================");
    System.out.println(imie + " " + nazwisko);

    if(stanowisko != null){
        System.out.println("-------------------------------");
        System.out.println(stanowisko);
    }

    if (firma != null){
        if (stanowisko == null) System.out.println("-------------------------------");
        System.out.println(firma);
    }

    if (email != null || numer != null) {
        System.out.println("-------------------------------");
        if (email != null) System.out.println("E-mail: " + email);
        if (numer != null) System.out.println("Numer: " + numer);
    }
    System.out.println("===============================\n");
}
}

public class Main {
    public static void main(String[] args) {

        wizytowka osoba1 = new wizytowka(
            "Konrad", "Milewski", 
            "Senior Developer", "TechCorp Solutions", 
            "konrad.m@techcorp.pl", "500-600-700"
        );

        wizytowka osoba2 = new wizytowka(
            "Robert", "Lewandowski", 
            "Junior Developer", "TechCorp Solutions", 
            "robert.l@techcorp.pl", null
        );

        wizytowka osoba3 = new wizytowka(
            "Lionel", "Messi", 
            null, "TechCorp Solutions", 
            "lionel.m@techcorp.pl", "200-300-400"
        );

        Scanner reader = new Scanner(System.in);

        System.out.println("Podaj osobę której chcesz wizytówkę:");
        System.out.println("1. Konrad Milewski");
        System.out.println("2. Robert Lewandowski");
        System.out.println("3. Lionel Messi");

        int wyborosoby = reader.nextInt();

        wizytowka wybranaosoba = null;

        switch (wyborosoby) {
            case 1: wybranaosoba = osoba1; break;
            case 2: wybranaosoba = osoba2; break;
            case 3: wybranaosoba = osoba3; break;
            default:
                System.out.println("Nieprawidłowy wybór. Proszę wybrać 1, 2 lub 3.");
                reader.close();
                return;
        }

        if(wybranaosoba != null){
            System.out.println("Wybierz format wizytówki:");
            System.out.println("1. Krótka");
            System.out.println("2. Długa");

            int wyborformatu = reader.nextInt();

            switch (wyborformatu) {
                case 1: wybranaosoba.krotka(); break;
                case 2: wybranaosoba.dluga(); break;
                default:
                    System.out.println("Nieprawidłowy wybór. Proszę wybrać 1 lub 2.");
            }
        }

    }
}