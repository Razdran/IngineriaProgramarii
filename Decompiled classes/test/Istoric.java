// Decompiled by Jad v1.5.8f. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Istoric.java

package clase;

import java.util.ArrayList;
import java.util.List;

// Referenced classes of package clase:
//            Utilizator, Comanda

public class Istoric
{

    private Istoric()
    {
        user1 = new ArrayList();
        user2 = new ArrayList();
        comenzi = new ArrayList();
    }

    public static Istoric getInstance()
    {
        if(Instanta == null)
            Instanta = new Istoric();
        return Instanta;
    }

    public List getIstoric(Integer id_utilizat)
    {
        return comenzi;
    }

    public void setComanda(Comanda comanda, Utilizator u)
    {
        comenzi.add(comanda);
        if(u.getNume().equals("user1"))
            user1.add(comanda);
        else
            user2.add(comanda);
    }

    private static Istoric Instanta;
    private static List comenzi;
    private List user1;
    private List user2;
}
