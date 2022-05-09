<img src="public/images/GoodMeetsLogo.png" alt="drawing" width="150"/>

## 1. LP

Med epidemijo covida-19 se je zaradi proti-koronskih ukrepov druženje drastično zmanjšalo. 
Izsledki raziskave NIJZ kažejo na poslabšanje stanja na področju duševnega zdravja, zlasti med mlajšo generacijo.

Zaradi teh dejstev smo prišli na idejo, da bi razvili spletno aplikacijo, ki bi VSEM ljudem pomagala najti družbo, v kateri bi počeli tisto, kar jih veseli.<br />
Za nekatere so to razni športi, za druge pa vse od branja knjig, ogledi kulturnih dogodkov, filmski večeri, skupno učenje, udeležba na raznih zabavah ali piknikih, ter razna ostala druženja.<br />

Ravno druženje je zelo pomemben dejavnik za duševno zdravje, sploh ko počneš tisto, kar si želiš!
**Najti družbo s pomočjo GoodMeets pa je resnično enostavno!**

Aplikacija uporabnika na začetku pripelje na [uvodno stran](app_server/views/homepage.hbs), kjer si lahko prebere ključne informacije.<br >
Za vse ostale funkcionalnosti pa je potrebna [prijava](app_server/views/login.hbs). Če uporabnik še nima uporabniškega računa, pa ga je potrebno [ustvariti](app_server/views/signup.hbs). Vse osebne podatke lahko uporabnik seveda [spremeni](app_server/views/account_Settings.hbs) tudi kasneje!

Prijavljeni uporabniki lahko na [glavni strani](app_server/views/events.hbs) najdejo vse aktualne dogodke, katerih se lahko udeležijo.
Če je dogodkov preveč, jih lahko filtrirajo ali pa iščejo po ključnih besedah.
O njih so vidne glavne informacije npr: lokacija, čas dogodka, aktualno vremensko napoved, vrsta, število prostih mest in ostale podrobnosti v zavihku več. <br />
Če pa jih noben dogodek ne veseli, pa ga lahko [ustvarijo tudi sami](app_server/views/create_event.hbs).<br />

Pod zavihkom [MOJI DOGODKI](app_server/views/created_events.hbs) imajo uporabniki pregled nad ustvarjenim dogodki. Le-te lahko po potrebi uredijo in izbrišejo. Pregled imajo pa tudi nad vsemi dogodki, v katere so se pridružili.<br />

Ker je včasih potrebno, poleg potrditve udeležbe, se tudi kaj dogovoriti, npr. kdo bo prinesel košarkaško žogo ali kje točno je zbirno mesto, je na voljo [klepet](app_server/views/specific_chat.hbs), kjer uporabniki najdejo skupinski pogovor za vsak aktualen dogodek posebej.<br />

Ker je organizacija kakšnih dogodkov lahko precej draga, ima uporabnik možnost, da prispeva finančna sredstva za organizacijo, npr. za hrano in pijačo. Ta funkcionalnost deluje s tehnologijo veriženja blokov.<br />

### Ostale predvidene funkcionalnosti
* Poleg navadnega uporabnika, bo na voljo še en ali več admin računov, kjer lahko admin briše vse dogodke, ki so morda neprimerni ali lažni.
* e-mail obveščanje pri registraciji ali ob drugih akcijah, autocomplete pri iskanju, možnost interakcije med uporabniki.

## 2. LP

Dinamična spletna aplikacija z logiko na strani strežnika in povezovanje na podatkovno bazo<br />

Seznam dovoljenih vnosov za posamezna vnosna polja: </br>
**Registracija**
* z regexom preverjamo da je veljavna oblika **e-naslova** po standardu ime@naslov.domena
* **geslo** mora imeti vsaj 1 veliko črko, 1 malo črko in 1 številko in se mora pri potrditi ujemati
* **e-naslov** in **uporabniško ime** ne smeta biti že zasedena, prav tako mail ni občutljiv na velike črke, uporabniško ime pa je
* ostala polja ne smejo ostati prazna

**Prijava:**
* validacija e-naslova ter gesla se pri **prijavi** preverja enako kot pri registraciji.

**Nastavitve računa**
* vnosna polja morajo imeti enako obliko kot pri registraciji
* v primeru, da uporabnik spremeni e-naslov ali uporabniško ime, le ta ne smeta biti že zasedena

**Dodajanje dogodka**
* vsa vnosna polja razen opisa dogodka so obvezna 
* **lokacijo** izberemo s klikom na zemljevid
* **datum** prav tako da možnost izbire, pri tem pa nas omeji na veljavne datume
* **oznake dogodka** morajo biti vsaj 3 različne, se med seboj ne ponavljati in vsaj 1 mora biti izbrana iz vnaprej definiranega nabora
* pri **omejitvi dogodka** mora biti številka večja od 0

Za lažjo implementacijo in delo s Handlebars predlogami smo uporabili knjižnico 
[express-handlebars](https://www.npmjs.com/package/express-handlebars), kjer smo uporabili
partials oz. poglede ustvarjene z namenom uporabe v drugih pogledih in s tem zmanjšali 
ponavljanje iste kode. 
Uporabljena je bila tudi knjižnica [nodemailer](https://www.npmjs.com/package/nodemailer)
s katero pošljemo potrditveni mail ob uspešni registraciji.

Spletna stran deluje na popularnih spletnih brskalnikih kot s Chrome, Firefox in Safari. Uporabo smo testirali tudi
na tablici Ipad in telefonih Android in Apple. 

Do spletne strani lahko na platformi Heroku dostopamo preko povezave: https://goodmeets.herokuapp.com/, kjer se prijavimo
z e-pošnim naslovom **imepriimek1@gmail.com** in nepraznim geslom.

Zagon aplikacije v okolju Docker pa izvedemo z ukazi 
* docker-compose build --no-cache
* docker-compose up --force-recreate --no-deps -d </br>

kjer na povezavi localhost:3000/db počistimo in naložimo testne podatke v podatkovno bazo. 
V samo aplikacijo se lahko prijavimo z istim e-poštnim naslovom kot pri Heroku.

## 3. LP

Do spletne strani lahko na platformi Heroku dostopamo preko povezave: https://goodmeets.herokuapp.com/

Zagon aplikacije v okolju Docker izvedemo z ukazi 
* docker-compose build --no-cache
* docker-compose up --force-recreate --no-deps -d </br>

## 4. LP

Aplikacija GoodMeets omogoča 3 vrste uporabnikov:

* Gost je neprijavljeni uporabnik. Le-ta lahko na domači strani prebere glavne informacije o spletni aplikaciji ter pregleda kategorije.
Pod zavihkom DOGODKI ima pregled nad vsemi aktualnimi dogodki. Te lahko zgolj pregleda ter razvršča, išče in filtrira. Za kreiranje novega dogodka,  pridružitev obstoječemu in ostale funkcionalnosti, pa je potrebna prijava oz. registracija za tiste, ki računa še nimajo. Tako gost postane...

* Prijavljeni (navaden) uporabnik (email: imepriimek1@gmail.com, geslo: Aa1) ima pregled na vsemi aktualnimi dogodki. Le-te lahko enako kot gost pregleda, razvršča, išče in filtira. Za razliko od gosta, pa lahko prijavljeni uporabnik: 
    * se pridruži nezasedenemu dogodku,
    * se odjavi od pridruženega dogodka ali pa donira
    * svoje dogodke lahko poišče in jih zbriše ali uredi,
    * pri dogodkih, v katerih sodeluje, lahko s klikom na ikono za klepet odpre pogovor z ostalimi člani dogodka.
    * s klikom na MOJI DOGODKI ima pregled nad ustvarjenimi dogodki, pridruženimi dogodki ter ustvari lahko nov dogodek.
    * v zgornjem desnem kotu lahko pregleda svoje osebne podatke ter spremeni: ime, priimek, uporabniško ime, email, geslo ali sliko.
    * ko se izpiše, postane ponovno gost.</br>

* Aministrator (email: admin@gmail.com geslo: aA1) se enako kot navaden uporabnik prijavi. Ob uspešni prijavi pa ga aplikacija preusmeri na adiministratorske strani, do katere gost in navaden uporabnik nimata dostopa.
Tukaj administrator lahko:
    * pregleda vse dogodke ter neprimerne izbriše,
    * pregleda vse uporabnike in jih po potrebi izbriše,
    * se odjavi in postane ponovno gost.

V okviru aplikacije smo verigo blokov integrirali tako, da lahko vsak uporabnik, ki se je pridružil dogodku, za sredstva 
donira Ether. Če je dogodek preklican ima uporabnik možnost povračila sredstev.

V okviru varnostnega pregleda so poleg modrih prisotna tudi nekatera low risk opozorila, ki so izven našega obsega.

Do spletne strani lahko na platformi Heroku dostopamo preko povezave: https://goodmeets.herokuapp.com/

Zagon aplikacije v okolju Docker izvedemo z ukazi 
* docker-compose build --no-cache
* docker-compose up --force-recreate --no-deps -d </br>