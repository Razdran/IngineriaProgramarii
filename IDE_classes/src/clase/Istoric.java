package clase;
import java.util.ArrayList;
import java.util.List;

public class Istoric {

  private static Istoric Instanta;
  private static List<Comanda> comenzi;
  private List<Comanda> user1 = new ArrayList<Comanda>();
  private List<Comanda> user2 = new ArrayList<Comanda>();
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
  public void setComanda(Comanda comanda,Utilizator u){
    comenzi.add(comanda);
    if(u.getNume().equals("user1")){
      user1.add(comanda);
    }
    else
      user2.add(comanda);
  }

}