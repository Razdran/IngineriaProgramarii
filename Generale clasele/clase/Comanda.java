package clase;
import java.util.ArrayList;
import java.util.List;

public class Comanda {

  private Integer id_comanda;

  private String status;

  private List<String> continut = new ArrayList<String>();


  public Integer get_id() {
  return id_comanda;
  }

  public String get_status() {
  return status;
  }

  public List<String> get_continut() {
  return continut;
  }

  public void set_id(Integer id) {
	  this.id_comanda=id;
  }

}