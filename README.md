# MERN2022 suoritustehtävät
Tämä tehtävä sisältää sekä frontendin (client) että backendin (server) toteutusta.
Tee React-osuudet frontend-kansioon, käytä haluamiasi alikansioita.
Tee Node-osuudet backend-kansioon, käytä haluamiasi alikansioita.
Frontendin muotoiluun voit käyttää joko React-Bootstrapia tai 
Material-UI-kirjastoa
HUOM! Muut UI-kirjastot eivät kelpaa!

Jokaiseen tehtävään on merkitty, kuuluuko se C(lient) vai S(erver)-tehtäviin. Kurssin läpäisy edellyttää että saat sekä riittävästi pisteitä yhteensä (50p) että myös riittävästi pisteitä (20p) molemmista C-ja S-osioista. Kokonaisuudessa pisteitä on jaossa Client-tehtävistä 53p ja Server-tehtävistä 47p. Lisäksi on bonustehtävänä kuvien lataaminen palvelimelle tiedostona, josta voi saada 6 pistettä. Niillä voi korvata sekä Client- että Server-tehtävien mahdollisia pistepuutoksia.

Tehtävät on suunniteltu siten, että voit edetä loogisessa järjestyksessä helpoimmasta päästä aloittaen. Alkupään tehtävät opettavat perusteet web-sovelluksen tekemisestä. Loppupään tehtävät ovat työläämpiä ja niissä opit luomaan tuotantokelpoisemman sovelluksen. Tee siis ensin toimiva pelkistetty koodi ja lisää sitten ajan kanssa siihen loppupään muotoiluja, autentikointeja, kuvien lisäämistä yms.

Harjoituksen sisältö: Tee MERN-stackilla single page-sovellus 
PYÖRÄRETKET, jolla voit selata kirjautuneiden käyttäjien tekemiä pyöräretkiä ja lisätä niitä itse. Frontend ja backend saavat kommunikoida keskenään vain REST-tyyppisen APIn kautta. Frontendistä ei esimerkiksi saa tehdä tietokantakutsuja tai viitata serverin koodiin.

Oheisissa kuvissa on hahmoteltu sovelluksen näyttöjen sisältöjä. Voit muotoilla lopullisen sovelluksesi paremman näköiseksi lisäämällä haluamasi värit, tyylimäärittelyt ym. Voit myös lisätä vaadittuja enemmän toiminnallisuutta, mainitse niistä yhteenvetotiedoissa. Esimerkiksi syötetarkistuksista, kaikkien tilanteiden käsittelystä, navigointilinkeistä ym. on tingitty peruskuvauksissa. 

**Käyttöliittymän sivut ja reititys:**

![Sivukartta](assets/pages.jpg?raw=true "Sivut ja navigointi käyttöliittymässä")

**Backendin endpointit:**

![Endpointit](assets/endpoints.jpg?raw=true "Backendin päätepisteet")

**Kotisivu = landing page = home page**
![Kotisivu](assets/homepage.jpg??raw=true "Kotisivu")

**Users page**
![Users](assets/users.jpg??raw=true "Käyttäjät-sivu")

**Stories page**
![Stories](assets/stories.jpg??raw=true "Käyttäjän retkitarinat")

**Edit story page**
![Edit story](assets/editstory.jpg??raw=true "Tarinan editointi")

**New story page**
![New story](assets/editstory.jpg??raw=true "Tarinan lisääminen")

**Signup page**
![Signup](assets/signup.jpg??raw=true "Rekisteröityminen")

**Login page**
![Login](assets/login.jpg??raw=true "Kirjautuminen")

MongoDB-tietokannan collectionit voisi koota monella eri tavalla. Tässä on esitetty kaksi collectionia: users ja stories. Voit halutessasi muuttaa niitä tai tehdä uusia.

Kotisivun tekstit ja kuvat voivat olla staattisia eikä niitä silloin haeta tietokannasta. Voit halutessasi tehdä kotisivun Poimintoja-kohdan tarinavalinnat myös sellaisiksi että ne tuodaan tietokannasta, tämä on oma tehtävänsä.

Tietokantaan talletetaan **käyttäjistä (collection users)** siis _uid, nimi, paikkakunta, sähköpostiosoite, salasana, syntymävuosi ja valokuvan nimi. (Käytä aluksi suoraan netistä löytyviä valokuvia joihin viittaan urlilla. Voit sitten lopuksi muuttaa valokuvien käsittelyn sellaiseksi että kuvat oikeasti ladataan palvelimelle ja niitä käytetään.) Käyttäjän yksilöivänä tunnisteena voit käyttää MongoDB:n tai mongoosen generoimaa _uid:ta.

Tietokantaan talletetaan **retkitarinoista (collection stories)** 
storyid, retken tekijän nimi, paikkakunta, pvm, kohteen nimi, tarinateksti ja valokuvan nimi, käyttäjän tunniste (_uid).  

Arvioin tehtäviä seuraavasti:
- Kaikki frontendin sisältö pitää olla Reactin **function-tyyppisiä** komponentteja. Voit käyttää function- sanaa tai nuolifunktiota, pääasia että komponentit eivät ole classeja.
- Jokainen sivu on oma komponentti. 
- Jos kaksi sivua näyttää samalta, niiden pitää käyttää samaa komponenttia. Esim. uuden tarinan luonti ja vanhan tarinan editointi voivat käyttää samaa komponenttia. Hallitse koodilla kummassa tilassa sivu on ja mitä lähtötietoja sivulle tuodaan.
- HTML-elementteihin ei saa olla suoria viittauksia (paitsi se yksi index.js:n viittaus)
- koodia on kommentoitu tarpeeksi. Jokaista frontendin riviä ei kannata kommentoida, mutta jos komponentti on monimutkainen tai sille tuodaan eksoottisia parametreja, niin voisi mainita parilla sanalla. Kaikki useState ja muutkin hooksit kannattaa kommentoida. Backendin puolella jokaiseen funktioon ja lohkoon voisi liittää lyhyen kommentin. 
- joissakin tehtävissä on sama asia (esim. frontendin sivu) tehty ensin yksinkertaisena käyttäen kovakoodattuja taulukoita ym. apujuttuja ja myöhemmässä tehtävässä on sama asia vaadittu tehtäväksi hakien tietoa oikeasti APIn kautta serveriltä. 

Kehityksen kannalta tämä on yleensä helpointa. Jos etenet tällä tavalla ja myöhemmin teet sen edistyneemmän "oikeaoppisen" version, joka hakee serverilta/tietokannasta, niin voit vaikka kommentoida ne kovakoodatut osiot pois käytöstä. Sinun ei tarvitse tehdä kahta eri tavalla toimivaa versiota sovelluksesta. Jos saat pisteet siitä edistyneemmästä tehtävästä, saat ne myös siitä yksinkertaisemmasta. Jätä kuitenkin sovellukseen se versio, mikä oikeasti toimii. Kommentoi tehtäväkohtaisesti toimiko ratkaisusi ja mitä puutteita siihen mahdollisesti jäi.

Esimerkkinä Tehtävä 2:ssa Users-sivulla pitää olla taulukko, jossa näytetään käyttäjiä. Voit tehdä sen map-funktiota käyttäen siten, että olet luonut kovakoodattuna USERS-arrayn ja käyt sitä läpi. Myöhemmässä tehtävässä käyttäjät pitää hakea tietokannasta APIn kautta. Silloin laitat sen USERS-arrayn kommentteihin ja muutat koodia siten, että taulukko muodostetaan serveriltä saadusta listasta.

** -- Näissä tehtävissä riittää että kentät ovat olemassa. Syöttökentät ovat lomakkeissa, niihin voi syöttää kyseisen muotoista tietoa. Elementtien ei tarvitse olla tyyleillä/tyylikirjastoilla muotoiltuja. Taulukot muodostetaan koodilla siten, että rivejä voi olla rajaton määrä. Tieto voidaan hakea kovakoodatuista muuttujista. -- **

## 1. Tee Reactilla Home-sivu (C) (2p)
Sivulla ovat em. kuvissa näkyvät sisällöt. Tässä riittää vielä että sisällöt ovat staattisia. 

## 2. Tee Reactilla Users-sivu (C) (2p)
Sivulla ovat em. kuvissa näkyvät sisällöt. 

## 3. Tee Reactilla Stories-sivu (C) (2p)
Sivulla ovat em. kuvissa näkyvät sisällöt. 

## 4. Tee Reactilla Edit story / New story-sivu (C) (2p)
Sivulla ovat em. kuvissa näkyvät sisällöt. 

## 5. Tee Reactilla Stories-sivu (C) (2p)
Sivulla ovat em. kuvissa näkyvät sisällöt.

## 6. Tee Reactilla Signup-sivu (C) (2p)
Sivulla ovat em. kuvissa näkyvät sisällöt.

## 7. Tee Reactilla Login-sivu (C) (2p)
Sivulla ovat em. kuvissa näkyvät sisällöt.

## 8. Reititys frontendissa kovakoodattuna (C) (2p)
Toteuta frontendissa reititys ja navigointivalintojen näyttäminen käyttäen bootstrapin reititys- ja navigointikomponentteja (voit halutessasi käyttää myös material-ui:ta). Tässä tehtävässä saa kaikki sivut vielä näkyä kaikille. Jos osoitteeksi antaa muun kuin tuetun sivuosoitteen, niin reititetään kotisivulle.

## 9. Toteutua reititys ja navigointi frontendissa kirjautumistiedon perusteella (C) (2p)
Toteuta frontendissa reititys ja navigointivalintojen näyttäminen siten kuin sivusuunnitelmassa on kerrottu, eli navigointipalkit näkyvät/sivuille pääsee vain sen mukaan onko kirjautunut vai kirjautumaton käyttäjä. Käytä tunnistamiseen useContextissa tai vastaavassa säilömääsi tietoa onko kirjautunut käyttäjä. Jatkoa ajatellen tallettava tieto voi olla token (tässä vaiheessa siihen voi tallettaa jonkun merkkijonon 'xx' ja vain sen olemassaolo tarkistetaan). Kirjautumistieto talletetaan kun käyttäjä painaa kirjautumispainiketta Login-näytössä. Tässä tehtävässä ei tarvitse vielä tarkistaa löytyykö ko. käyttäjätietoja oikeasti backendistä. Toteuta myös Logout tyhjäämällä ko. token.

** -- Nämä tehtävät on järjestetty sillä ajatuksella, että yhden resurssin osalta 
tehdään:
- ensin frontendiin käyttöliittymä kovakoodatulla datalla
- sitten toteutetaan kyseinen serverin endpoint karkeana versiona
- sitten täydennetään frontendiä siten että se käyttää kyseistä serverin palvelua
- sitten täydennetään serverin ko. endpointin palvelu siten, että tieto haetaan/kirjoitetaan oikeasti tietokantaan ja lisätään tarvittavat virhetilanteiden käsittelyt

Ajatuksena on, että kun yhden toimintoketjun tekee alusta loppuun asti, muitten toimintojen osalta koodaaminen on enemmän tai vähemmän kopioimista. Koska tietokannassa ei ole vielä aluksi mitään tietoa haettavaksi , voit joko luoda ko. collectionit ja sinne pari dokumenttia suoraan Atlaksessa tai sitten toteuttaa ennen GETtiä ensin vastaavan POST-palvelun ja ajaa sitä vaikka Postmanilla.

Mutta tämä suoritusjärjesty ei ole pakollinen, etene siten kuin tuntuu hyvältä. 
--**

## 10. Toteuta backend-projektissa GET /api/users (S) (6p)
Luo Nodella ja Expressillä backend sovellus. Aseta se pyörimään portissa 5000. Ratkaise CORS- ym. yhteysongelmat. Toteuta mainittu endpoint siten, että se palauttaa kysyjälle kaikki käyttäjät JSONina. Tässä tehtävässä voit vielä palauttaa kovakoodattuja arvoja, käyttäjien ei tarvitse olla haettu tietokannasta.

## 11. Muuta frontendiä siten, että se hakee käyttäjät serveriltä (GET /api/users) (C) (5p)
Muuta Users-sivut hakemaan tiedot oikeasti palvelimelta. Kun Users-sivu renderöidään ensimmäistä kertaa (eli kun sinne tullaan), haetaan automaattisesti kaikki käyttäjät. Käytä useEffectiä.

**--
Tästä eteenpäin palvelimen tehtävissä on mukana tarvittava kommunikointi tietokannan kanssa sekä tilakoodien, virhetilanteiden ja asynkronisuuden käsittelyt.
--**

## 12. Toteuta backend-projektissa POST /api/users/signup (S)(6p)
Toteuta backendissä käyttäjän rekisteröinti ja vieminen tietokantaan. Huolehdi tilakoodeista, virhetilanteista ym.

## 13. Muuta frontendiä siten, että käyttäjän rekisteröityminen menee kantaan (C)(5p)
Käyttäjä voi syöttää sovelluksen käyttöliittymässä rekisteröitymistiedot ja painamalla talleta, sovellus vie ne tietokantaan käyttämällä edellisen tehtävän palvelua. Käyttöliittymä huomioi vastaanottamansa tilakoodin ja viestin ja käsittelee niitä järkevällä tavalla.

## 14. Täydennä  backendin GET /api/users-palvelu (S)(5p)
Hae tieto oikeasti kannasta. Käsittele virhetilanteet, datan puuttumiset yms. Tee kaikista tarvittavista kutsuista asynkronisia. Lähetä clientille oikeaoppiset tilakoodit ja viestit kussakin tilanteessa.

## 15. Toteuta backend-projektissa POST /api/users/login (S)(6p)
Toteuta backendissä käyttäjän kirjautuminen, tarkista tietokannasta että valittu sähköposti ja salasana täsmäävät. Voit lähettää clientille tietokannasta löytyneen käyttäjätunnuksen sekä tokenin. Token voi olla tässä vaiheessa pelkkä merkkijono 'xx' , myöhemmissä tehtävissä se muutetaan oikeaksi jwt-tokeniksi.

## 16. Muuta frontend käyttämään kirjautumistietoa (C)(5p)
Muuta kirjatumissivu käyttämään edellä luotua palvelua. Talleta saamasi uid ja token esim. useContextiin, josta voit lukea sen tarvitsemissasi paikoissa. Muuta käyttöliittymän navigointi käyttämään hyväksi kirjaumistietoa (joillekin sivuille pääsee vain kirjautuneet, samoin kuin vastaavat menuvalinnat näkyvät vain kirjautuneille jne.). Kirjatumisen toedentamiseen voit käytää tieoa, onko kontekstiin talletettu token eri kuin tyhjä. Toteuta Logout, eli tyhjennä token.

## 17. Toteuta backendiin POST /api/stories (S)(5p)
Tee palvelinkoodi, joka vie saamansa tarinan tietokantaan. Tarina liitetään käyttäjään, jonka uid löytyy saadusta palvelupyynnöstä.

## 18. Tee frontendiin muutos, että tarinan luonti käyttää em. POST /api/stories palvelua (C)(5p)
Kun käyttöliittymässä valitaan Luo tarina, avataan New story-sivu tyhjänä. Tee palvelupyyntö vastaavaan, välitä tarvittavat tiedot. Käsittele saatu tilakoodi ja viesti sopivalla tavalla.

## 19. Toteuta backendiin GET /api/stories/user/:uid (S)(5p)
Tee koodi, joka hakee annetun käyttäjätunnukseen liitetyt tarinat. Haku tietokannasta, tilakoodien, virhetilanteiden ja asynkronisuuden käsittelyt.

## 20. Tee frontendissä tarinoiden haku pavelimelta GET /api/stories/user/:uid (C)(4p)
Tee muutokset koodiin, että haku tapahtuu ko. palvelua käyttäen. Haku tapahtuu ainakin Users-taulun riviltä klikkaamalla henkilön nimeä. Koska nimellä haku tietokannasta ei ole hyvä idea (identtiset nimet ym.), niin katso että olet käyttäjähaussa saanut käyttäjistä myös tietokannassa käytetyn yksilöivän uid:n, jota voit käyttää tässä haussa.

## 21. Toteuta backendiin PATCH /api/stories/:storyid (S)(5p)
Tee palvelinkodi, joka päivittää tietokantaan saamansa tarinan kentät. Tarina tunnistetaan storyid:lla, jonka täytyy vastata kannasta löytyvää.
Tilakoodit, virhetilanteet yms.

# 22. Toteuta frontendiin tarinan päivitys käyttäen em. PATCH /api/stories/:storyid-palvelua (C)(3p)
Lisää Stories-sivulle jokaiseen tarinaan napit Edit ja Delete. Kun käyttäjä klikkaa Edit-nappia, siirry Edit story-sivulle ja joko vie sinne ko. tarinan tiedot vastaaviin kenttiin tai suorita hakua palvelimelta. Kun käyttäjä painaa talleta muutokset-nappia, muuttuneet tiedot lähetetään palvelimelle.

## 23. Toteuta backendiin DELETE /api/stories/:storyid (S)(5p)
Tee palvelinkodi, joka poistaa tietokannasta annetun tarinan.
Tilakoodit, virhetilanteet yms.

# 24. Toteuta frontendiin tarinan poisto käyttäen em. DELETE /api/stories/:storyid-palvelua (C)(5p)
Lisää Stories-sivulle jokaiseen tarinaan napit Edit ja Delete. Kun käyttäjä klikkaa Delete-nappia, kutsutaan ko. poistopalvelua. Käsittele saamasi vastaus asianmukaisesti.


## 25. Autorisointi backendissä (S) (4p)
a) Luo ja palauta kutsujalle token kun käyttäjä kirjautuu. Sijoita tokeniin ainakin käyttäjätunniste, käyttäjän nimi ja vanhenemisaika.  

b)Muuta kaikki valtuutusta vaativat palvelut lukemaan ja käyttämään tokenia. Kun seuraavia palveluita kutsutaan, kutsun mukana täytyy tulla tokenin. Tokenista luetaan käyttäjätunnus ha sen mukaan toiminto sallitaan tai ei.
- POST /api/stories = katsotaan että token löytyy ja siellä on uid, joka löytyy kannasta. Kantaan viedään kyseisen tarinan tekijäksi tokenista luettu käyttäjänimi
- PATCH /api/stories/:storyid = katsotaan että token löytyy ja että tietokannasta löytyy tällä stroyid:llä tarina ja sen kirjoittaja vastaa tokenista löytyvää.
- DELETE /api/stories/:storyid = katsotaan että token löytyy ja että tietokannasta löytyy tällä stroyid:llä tarina ja sen kirjoittaja vastaa tokenista löytyvää.

## 26. UI-kirjaston systemaattinen käyttö (C) (3p)
Frontendissä on käytetty jokaisella sivulla johdonmukaisesti joko React-Bootstrapia tai Material-UI-kirjastoa tarkoituksenmukaisilla tavoilla ja ulkoasu on siisti ja yhtenäinen. HUOM! Vain jompikumpi näistä kirjastoista kelpaa!!

## BONUS-tehtävä. Toteuta käyttäjän kuvien ja tarinakuvien vienti ja haku backendistä (6p jotka voi laskea kumpaan tahansa ryhmään)
Toteuta frontendiin kuvan valinta käyttäen tiedostovalintaelementtiä. Välitä kuvan nimi ja kuva esimerkiksi multer-kirjaston avulla. Luo palvelimelle images-kansio, johon kuvat talletetaan. Validoi että kuvat ovat muotoa .jpg,.jpeg,.png. Generoi kuville yksilöivä nimi esimerkiksi uuid-kirjaston avulla. 
"# MERN-project-from-HAMK" 
"# MERN-HAMK" 
