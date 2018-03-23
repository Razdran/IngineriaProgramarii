package clase;
public class Utilizator {

  private int id_utilizator;
  private String nume;
  private String adresa;
  private Istoric istoric;
  private static int count=0;
  public Utilizator(String name,String adresa){
	 this.istoric=Istoric.getInstance();
	  this.id_utilizator=count;
	  this.nume=name;
	  this.adresa=adresa;
	  count++;
  }
public int getId_utilizator() {
	return id_utilizator;
}

public void setId_utilizator(Integer id_utilizator) {
	this.id_utilizator = id_utilizator;
}

public String getNume() {
	return nume;
}

public void setNume(String nume) {
	this.nume = nume;
}

public String getAdresa() {
	return adresa;
}

public void setAdresa(String adresa) {
	this.adresa = adresa;
}
public Istoric getIstoric(){
	return istoric;
}

}