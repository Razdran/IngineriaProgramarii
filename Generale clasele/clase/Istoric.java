package clase;
import java.util.ArrayList;
import java.util.List;

public class Istoric {

  private static Istoric Instanta;
  private static List<Comanda> comenzi;
  private Istoric() {
	  comenzi = new ArrayList<Comanda>();

  }
  public static Istoric getInstance(){
	  if(Instanta == null)
		  Instanta = new Istoric();
	  return Instanta;
  }
  public List<Comanda> getIstoric(Integer id_utilizat) {
  return comenzi;
  }
  public void setComanda(Comanda comanda){
	  comenzi.add(comanda);
	  }

}