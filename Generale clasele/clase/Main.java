package clase;

public class Main {

	public static void main(String[] args) {
		Utilizator user1 = new Utilizator("Popescu","Nr.8");
		Comanda c1 = new Comanda();
		user1.getIstoric().setComanda(c1);
		c1.setStatus();
		

	}

}
