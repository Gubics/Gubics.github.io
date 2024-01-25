var lottoszamok = [];
var jatekosszamok = [[], [], []];
var fizetendo = 0;
var nyeremeny = 0;
var evek = 0;

function generalas()
{
    for (let i = 0; i < 52; i++) {
        lottoszamok[i] = [];
        for(let j = 0; j < 5; j++) {
            let rnd;
            do {
                rnd = Math.floor(Math.random() * 89) + 1;
            } while (lottoszamok[i].includes(rnd))
            lottoszamok[i][j] = rnd;
        }
    }
    
    //lottoszamok.forEach(het => het.sort((a, b) => a - b));
    
    for(let i = 0; i < 52; i++)
    {
        let i2 = lottoszamok[i].length;
    
        while (i2 >= 1)
        {
        let cs = 0;
        for (let j = 0; j < i2; j++)
        {
            if(lottoszamok[i][j] > lottoszamok[i][j + 1])
            {
            let seged = lottoszamok[i][j];
            lottoszamok[i][j] = lottoszamok[i][j + 1];
            lottoszamok[i][j + 1] = seged;
            cs = j;
            }
        }
        i2 = cs;
        }
    }

    //console.log(lottoszamok);
}

generalas();

//console.log(lottoszamok);

function tordeles(temp)
{
    return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ");
}

function check(temp, szelveny)
{
    var szamok;
    var id = document.getElementById(`${temp}${szelveny}`);
    if (temp >= 1 && temp <= 90 && !jatekosszamok[szelveny].includes(temp) && jatekosszamok[szelveny].length < 5) {
        jatekosszamok[szelveny].push(temp);
        id.style.backgroundColor = "rgba(68, 65, 65, 0.5)";
    } else if(jatekosszamok[szelveny].includes(temp)) {
        jatekosszamok[szelveny] = jatekosszamok[szelveny].filter(szam => szam !== temp);
        id.style.backgroundColor = "";
    } else {
        alert('Nem tud megadni több számot!');
    }
    
    //jatekosszamok[szelveny].sort((a, b) => a - b);
    for(let f = 0; f < 3; f++)
    {
        for (let i = 0; i < jatekosszamok[f].length - 1; i++)
        {
            for (let j = i + 1; j < jatekosszamok[f].length; j++)
            {
                if(jatekosszamok[f][i] > jatekosszamok[f][j])
                {
                    let seged = jatekosszamok[f][i];
                    jatekosszamok[f][i] = jatekosszamok[f][j];
                    jatekosszamok[f][j] = seged;
                }
            }
        }
    }
    
    szamok = jatekosszamok[szelveny].join(', ');
    document.getElementById('szamaid'+szelveny).innerHTML = 'Számaid: ' + szamok;
}

function ellenorzes()
{
    var talalatok = [0, 0, 0, 0];
    //var nyertesszamok = [[], [], [], []];
    var fizetendoev = 0;
    var nyeremenyev = 0;
    var bevetelev = 0

    if(jatekosszamok[0].length == 0 && jatekosszamok[1].length == 0 && jatekosszamok[2].length == 0) {
        alert("Nem jelölt be számot!");
    } else if(jatekosszamok[0].length < 2 && jatekosszamok[0].length > 0 || jatekosszamok[1].length < 2 && jatekosszamok[1].length > 0 || jatekosszamok[2].length < 2 && jatekosszamok[2].length > 0) {
        alert("Nem jelölt be elég számot!");
    } else {
        evek++;
        for(let i = 0; i < 3; i++) {
            let db = 0;
            for (let j = 0; j < 52; j++) {
                for(let n = 0; n < jatekosszamok[i].length; n++)
                {
                    if(lottoszamok[j].includes(jatekosszamok[i][n]))
                    {
                        db++;
                    }
                }
                if(db == 2) {
                    talalatok[0]++;
                    //nyertesszamok[0].push(lottoszamok[j]);
                } else if(db == 3) {
                    talalatok[1]++;
                    //nyertesszamok[1].push(lottoszamok[j]);
                } else if(db == 4) {
                    talalatok[2]++;
                    //nyertesszamok[2].push(lottoszamok[j]);
                } else if(db == 5) {
                    talalatok[3]++;
                    //nyertesszamok[3].push(lottoszamok[j]);
                }
                db = 0;
            }
        }
    
        for(let i = 0; i < 3; i++)
        {
            if(jatekosszamok[i].length > 0)
            {
                fizetendo += 400 * 52;
                fizetendoev += 400 * 52;
            }
        }
    
        nyeremeny += talalatok[0] * 3500 + talalatok[1] * 30000 + talalatok[2] * 1900000 + talalatok[3] * 5300000000;
        nyeremenyev += talalatok[0] * 3500 + talalatok[1] * 30000 + talalatok[2] * 1900000 + talalatok[3] * 5300000000;
        
        var bevetel = nyeremeny - fizetendo;
        bevetelev = nyeremenyev - fizetendoev;
    
        document.getElementById('eredmeny').innerHTML = 
        `
            <p>Kettes találatok: ${talalatok[0]}</p>
            <p>Hármas találatok: ${talalatok[1]}</p>
            <p>Négyes találatok: ${talalatok[2]}</p>
            <p>Ötös találatok: ${talalatok[3]}</p>
            <div class="row">
                <div class="col-lg-6 col-sm-12"><p>Ennyibe került volna összesen: ${tordeles(fizetendo)} Ft</p></div>
                <div class="col-lg-6 col-sm-12"><p>Ennyibe került volna ebben az évben: ${tordeles(fizetendoev)} Ft</p></div>
                <div class="col-lg-6 col-sm-12"><p>Össes nyeremény: ${tordeles(nyeremeny)} Ft</p></div>
                <div class="col-lg-6 col-sm-12"><p>Éves nyeremény: ${tordeles(nyeremenyev)} Ft</p></div>
                <div class="col-lg-6 col-sm-12"><p>Összes nyereség/veszteség: ${tordeles(bevetel)} Ft</p></div>
                <div class="col-lg-6 col-sm-12"><p>Éves nyereség/veszteség: ${tordeles(bevetelev)} Ft</p></div>
            </div>
            <p>Eltelt évek: ${evek}</p>
        `;

        /*document.getElementById('nyeroszamok').innerHTML = '<p>Hármas találatok:</p>';

        
        let hozzaad = "";
        for(let i = 0; i > 3; i++) {
            hozzaad += "<p>";
            for (let n = 0; n > jatekosszamok[i].length; n++) {
                if(nyertesszamok[1].includes(jatekosszamok[i][n])) {
                    hozzaad += `<b>${nyertesszamok[1][n]}</b>` ;
                } else {
                    hozzaad += `${nyertesszamok[1][n]}`;
                }
            }
            hozzaad += "</p>";
        }

        console.log(hozzaad);

        document.getElementById('nyeroszamok').innerHTML += hozzaad;
        */

        generalas();
    }
}