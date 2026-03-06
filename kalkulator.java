import java.util.Scanner;

public class kalkulator {
    public static void main(String [] args) {
        Scanner skaner = new Scanner(System.in);

        System.out.println("Podaj pierwszą liczbę: ");
        double a = skaner.nextDouble();
        System.out.println("Podaj drugą liczbę: ");
        double b = skaner.nextDouble();

        double suma = a + b;
        double rozinca = a - b;
        double mnozenie = a * b;
        double dzielenie = a / b;

        System.out.println("Wybierz działanie( + - x / ): ");
        char znak = skaner.next().charAt(0);
        switch (znak) {
            case '+':
                System.out.println("Wynik sumy to: " + suma);
                    break;
            case '-':
                System.out.println("Wynik różnicy to: " + rozinca);
                    break;
            case 'x':
                System.out.println("Wynik mnożenia to: " + mnozenie);
                    break;
            case '/':
                if (b != 0) {
                    System.out.println("Wynik dzielenia to: " + dzielenie);
                } else {
                    System.out.println("Nie można dzielić przez zero!");
                        break;

        }

    }
}
}