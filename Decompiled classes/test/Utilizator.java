// Decompiled by Jad v1.5.8f. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Utilizator.java

package clase;


// Referenced classes of package clase:
//            Istoric

public class Utilizator
{

    public Utilizator(String name, String adresa)
    {
        istoric = Istoric.getInstance();
        id_utilizator = count;
        nume = name;
        this.adresa = adresa;
        count++;
    }

    public int getId_utilizator()
    {
        return id_utilizator;
    }

    public void setId_utilizator(Integer id_utilizator)
    {
        this.id_utilizator = id_utilizator.intValue();
    }

    public String getNume()
    {
        return nume;
    }

    public void setNume(String nume)
    {
        this.nume = nume;
    }

    public String getAdresa()
    {
        return adresa;
    }

    public void setAdresa(String adresa)
    {
        this.adresa = adresa;
    }

    public Istoric getIstoric()
    {
        return istoric;
    }

    private int id_utilizator;
    private String nume;
    private String adresa;
    private Istoric istoric;
    private static int count = 0;

}
