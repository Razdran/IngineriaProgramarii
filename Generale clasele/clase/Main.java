package clase;

public class Main {

	public static void main(String[] args) {
		Utilizator user1 = new Utilizator("user1","Nr.8");
		Utilizator user2 = new Utilizator("user2","Nr.4");
		Comanda c1 = new Comanda();
		c1.setStatus();
		c1.setContinut("10 mere");
		c1.setContinut("10 pere");
		user1.getIstoric().setComanda(c1,user1);
		c1.afiseazaIstoric();
		

	}

}
