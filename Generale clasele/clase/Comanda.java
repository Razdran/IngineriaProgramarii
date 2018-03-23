package clase;
import java.util.ArrayList;
import java.util.List;

public class Comanda {
	public Comanda(){
		this.id_comanda=count;
		count++;
		this.statusCurent=status[0];
	}
private static int count =0;
  private int id_comanda;
  private String [] status = {"In curs de preluare","Preluat de curier","Depozit curier","Pe drum","Livrata"};
  private String statusCurent;

  private List<String> continut = new ArrayList<String>();


  public Integer get_id() {
  return id_comanda;
  }

  public String get_status() {
  return statusCurent;
  }
  public void setContinut(String str){
	  continut.add(str);
	  
  }
  public List<String> get_continut() {
  return continut;
  } 

  public void set_id(Integer id) {
	  this.id_comanda=id;
  }
  public void setStatus(){
	  statusCurent=status[(int)(Math.random()*10)/2];
  }
  public void afiseazaIstoric(){
	  for(String i : continut){
		  System.out.println(i + " ");
	  }
	  System.out.println(statusCurent);
  }

}