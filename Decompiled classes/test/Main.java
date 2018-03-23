// Decompiled by Jad v1.5.8f. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Main.java

package clase;


// Referenced classes of package clase:
//            Utilizator, Comanda, Istoric

public class Main
{

    public Main()
    {
    }

    public static void main(String args[])
    {
        Utilizator user1 = new Utilizator("user1", "Nr.8");
        Utilizator user2 = new Utilizator("user2", "Nr.4");
        Comanda c1 = new Comanda();
        c1.setStatus();
        c1.setContinut("10 mere");
        c1.setContinut("10 pere");
        user1.getIstoric().setComanda(c1, user1);
        c1.afiseazaIstoric();
    }
}
