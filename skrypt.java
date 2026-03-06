import java.util.Scanner;

public class WitajSwiecie {
    public static void main(String[] args) {
        Scanner skaner = new Scanner(System.in);
        System.out.println("Podaj swoje imię:");
        String imie = skaner.nextLine();
        System.out.println("Witaj, " + imie + "!");
        skaner.close();
    }
}