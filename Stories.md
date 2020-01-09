# 1 Inledning
## 1.1 Bakgrund
I detta projekt finns det mycket material att utgå från då projektet har funnits ett flertal år där flera projektgrupper har arbetat med projektet. Föregående grupper har gjort mycket av grundarbetet, där de hämtar data från Trafikverkets API lägger det på en server och sedan tar datan från servern till en hemsida/webbserver. På hemsidan visualiseras datan på en karta där det enkelt går att se alla sensorer som finns. klicka på sensorerna för att se den senaste bilden sensorn har tagit och mätdatan från sensorn. Det behov som behöver mötas är att förbättra den nuvarande lösning med till exempel felhantering även så behövs en utveckling av den nuvarande lösning. Denna utveckling är inte fastställd än men det finns ett flertal ideér såsom att implementera vägar på kartan och färger på vägarna beronde på väg temperaturen. 

## 1.2 Problembeskrivning
Projektet bygger vidare på en tidigare lösning. Trafikverket var nöjd med denna lösning och vill vidareutveckla den. Problematiken blir att ta ägandeskap av nuvarande lösning och sedan förbättra och utveckla lösningen.


## 1.3 Uppgift
Uppgiften i detta projekt består av att vidareutveckla projektet “Road condition monitoring and visualization” som har utvecklats i kursen D0020E under tidigare år. Projektet går ut på att skapa ett verktyg för aggregation och analys av data för vägförhållanden. Första steget för att kunna vidareutveckla projektet är att studera det tidigare arbetet, förstå hur de har arbetat, förstå hur deras kod hänger samman och sen även att lära sig om programmeringsspråken som de har använt. Sedan skall en intervju med områdes-experten äga rum för att reda på vilka funktioner hon önskar samt så ska den föregående gruppens backlog tas del av. Det för att få en bra uppfattning utav framtida utvecklingar vi kan implementera i projektet. Efter jul börjar utvecklingsfasen där de önskade funktionerna implementeras och testas.
 

## 1.4 Avgränsning
Projektgruppen kommer inte göra några flera moduler då dem är redan färdiga. Det är ej tänkt att göra några större ändringar i backend och databasen. Istället så skall fokuset ligga på att utveckla funktionalitet samt att förfina existerande funktioner såsom grafer.

<br/><br/>
<br/><br/>

# 2 Systemdesign
Figuren nedan är ett modul-diagram över nuvarande lösning. Då uppgiften är att förbättra/bygga på denna lösning så kommer den ha samma struktur fast med några ändrade detaljer. Diagrammet beskriver hur en backend kommunicerar med trafikverkets API Datex II och fyller i en databas. APIet är skrivet i programmeringsspråket Rust. Frontend vilket är skrivet i JavaScript kommunicerar med databasen och använder sig av paket som OpenStreetMap för att visa en karta över Sverige.


<img src="ModulDiagram.png"
     alt="Modul-diagram"
     style="float: left; margin-right: 10px;" />

### 4.2.2 Regressionsrisker
En regression är då en av systemets funktioner upphör att fungera i samband med att kod i systemet ändrats. Det finns tre huvudsakliga typer av regression som är aktuella för projektet.

Local, remote och unmasked. 

* Local: När en bugg upptäcks i den kod som uppdateras.

* Remote: När en bugg upptäcks i en annan del än den som blir uppdaterad.

* Unmasked: När en bugg som redan existerar blir ett problem på grund av den nya och uppdaterade koden.


Den största och mest uppenbara risken utifall det skulle ske en regression är att systemet havererar. Hemsidan, servern eller databasen kan sluta funktionera som planerat och därmed göra hemsidan obruklig eller ha nedsatt funktionalitet. För att motverka det så bör man fokusera på de följande områdena:

* Kodstycken där problem ofta uppstår 

* Kod som nyligen förändrats.  

* De mest fundamentala delarna av systemet


Det här systemets kritiska delar är kartvyn och databasen. Ifall man ej kan se kartan så kommer inte systemet ha möjlighet att förmedla datan till användaren. Det andra känsliga området är databasen, ifall databasen ej lyckas hämta data från Datex så kommer användaren inte ha möjlighet att analysera någon information. I praktiken bör kartvyn fungera utan trafikinformationen men oväntade problem kan eventuellt uppstå.

### 4.2.3 Strategi för regressiontester 


#### 4.2.3.1 
* Spårbarhet(traceability) handlar om att välja tester beroende på beteendet av systemet. Krav och design tillsammans med dokumenterade kvalitets risker används för att veta vilka funktioner som ska testas. Spårbarhets-analys används för att ha kontroll på vilken del av systemet som täcks upp av ett test. Spårbarhet kan användas i projektet för att säkerställa att våra lösningar har fixat problemet.

* Förändringsanalys (Change impact analysis) är en nödvändig aktivitet för underhåll av mjukvara, där man analyserar vilka funktioner som påverkas av förändringarna i mjukvaran och endast testar det som påverkas. Analysen sker ofta via att man tittar på den strukturella förklaringen (klass- och moduldiagram) av systemet och följer hur förändringar rinner vidare genom systemet.

* Bedömning av kvalitetsrisker (Quality risk analysis) är när tester väljs beroende på vad som är viktigast för företaget/systemet. Funktioner som är kopplat till t.ex. personalsäkerhet eller kunders nöjdhet kan testas mer omfattande än andra mindre viktiga funktioner.

* Tvärfunktionell testning (Cross-functional testing) är när man testar kombinationer av funktioner som inte borde påverka varandra. Detta tillvägagångssätt kan användas till utforskande-, system-, acceptans- och enhetstester. Möjliga sätt att applicera tvärfunktionell testning kan vara att t.ex. Täcka stora områden av systemet för att göra initiala svepningar för att leta efter buggar, som sedan kan följas upp av mer fokuserade områden där buggar tidigare har upptäckts med målet att intensifiera tester i områden där nya buggar hittas.

#### 4.2.3.2 Regressionstest Applicering
Förändringsanalys vid små förändringar. kvalitetsrisker pga att trafikverkets data är känslig. Och även tvärfunktionell testning vid större systemförändringar eller sprintavslut.


### 4.2.4
Trafikverket skickar friktions-data månadsvis till individer delaktiga i projektet. Datan som skickas ska kunna laddas upp till servern via hemsidan.

**Krav:** För att testet ska kunna genomföras så ska följande kriterier vara uppfyllda
* Friktions-data ska kunna presenteras grafiskt
* Ludds DUST server ska vara uppsatt
* Trafikverket ska ha skickat Friktions-data


#### 4.2.4.1 Unit Testing
Givet en XML-Fil omvandlar till korrekt SQL-Query. 
Testet genomförs med en XML-Fil och en förväntad output, detta repeteras för 1 års av friktions-data.
Målet med testet är att testa en liten del av systemet. Kontrollera funtionalliteten hos delen externt. 
**Automatisering:** Testet gynnas inte av automatiseringm, beslutet att göra testet manuelt gjordes.
**Estimerad test utveckling:** Testet är enkelt och går fort att skapa. 

#### 4.2.4.1 System Testing
En XML-Fil skickas från en klient till servern och ska sen uppdatera vyn och visa de nya datapunkterna. I detta fall kommer de nya datapunkterna vara friktions datan från tre olika aktörer. De tre olika aktörernas data ska kunna filtreras så att klienten ska kunna välja vilken vy och vilka/vilken aktörs data de vill se.
Målet med testet är att testa en stor del av systemt. Kontrollera funtionalliteten och hastigheten hos delen externt.
**Automatisering:** Då systemtesting är omfattande kan automatisering vara fördelaktikt. 
**Estimerad test utveckling:** Ett systemtest kan vara omfattande och ta lång tid att utveckla. 


#Datagrafer
En användare ska kunna välja en datastation på kartan och i denna station kunna skapa en graf genom att välja två tidpunkter och få all data mellan dessa punkter placerade i en graf.

I nuläget går det att rita upp en graf mellan två datum, dock så finns det ingen felhantering vilket gör att programmet kraschar om det inte finns data i det valda intervallet. För att korrigera detta problem kommer gruppen implementera felhantering så att programmet inte kraschar när det saknas data utan rita upp grafen med noll värden där datan saknas. 

Detta är en implementation av föregående arbete, nu visualiserar gruppen datan i grafer som hämtas från trafikverkets API. Detta är även kopplat till uppladdningen av data från en användare då denna data också kommer användas i graferna. 

Ett test för detta fallet är t.ex.:
Välja en väderstation på kartan och “lägg till”
Klicka på “grafer”
Välja ett tidsintervall
Se om datan visas (korrekt)

##Tasks
###Förstå/refaktorera tidigare implementationen.
Beskrivning: Bygga en djupare förståelse för hur graferna är implementerade i projektet i sitt nuvarande tillstånd.
Referenser: Detta är första steget i storyn därav är den inte beroende av tidigare steg.
Tidsuppskattning: 8 timmar
Risk: Låg.


###Förstå vad som är fel i tidigare implementation
Beskrivning: Debugga de relevanta funktionerna för att ta reda på vilken/vilka funktioner som producerar fel i grafhämtningsprocessen.
Referenser: Detta är beroende av Task[1].
Tidsuppskattning: 8 timmar
Risk: Låg.


###Lös det
####Beskrivning: Hitta en lösning på grafhämtningsproccesens fel.
####Referenser: Detta är beroende av Task[2]
####Tidsuppskattning:8 timmar
####Risk: Låg.





###Implementation av felhantering
####Beskrivning: Bygga upp ett felhanteringssystem när en användare skapar en graf.
####Referenser: Detta är beroende av Task[3].
####Tidsuppskattning: Detta är en större Task än tidigare och får därmed betydligt mer tid 
####ca 40 timmar där testing är 3 timmar av tiden. 
####Risk: Problem med den tidigare funktionen då felhanteringen kan förändra hur 
####funktionen är implementerad, denna risk är medel. 

#Friktionsvärdesskala
Likt den redan existerande temperaturskalan så är friktionvärdeskalans uppgift att ge en visuell översyn, i detta fall över hur friktionsförhållandet mellan bil och väg ser ut över landet. Olika friktionvärdeintervall kommer att representeras utav olika färger i färgskalan.
Den bör vara lätt att avläsa, inte förbruka mycket kraft samt att designen är enhetlig med den nuvarande designen.
##Testfall:
1)
###Handling: Observera friktionvärdeskalan och dess färger och jämför dem med färgerna utritade på kartan.
###Förväntat Resultat: Friktionsvärdesskalan bör ge en visuell uppfattning om hur friktionsvärdet skiljer sig över landet. Så användaren ###lätt kan se var det är kallt och varmt.
2)
###Handling: Tryck på knappen i botten av temperatur- eller friktionvärdeskalan.
###Förväntat Resultat: Den valda skalan bör minimeras så att endast knappen kvarstår.

##Tasks:
###Beskrivning: Implementera friktionvärdeskalan visuellt på hemsidan.
Referenser: Detta är det allra första steget i storyn och är därmed ej beroende av någon annan task.
Tidsuppskattning: Utvecklingstiden ligger på cirka 3 timmar och sen testning ytterligare 1 timme för att säkerställa att det fungerar som det ska i olika vyer. Samt att utvecklaren måste sätta sig in i javascript.
####Risker: Det är en obefintlig risk att ej hinna med denna task då tiden är relativt låg och det är den första uppgiften. 
####Beskrivning: Skapa en knapp som gör det möjligt att dölja temperatur- och friktionvärdeskalan.
####Referenser: Detta kräver att friktionvärdeskalan, alltså task 1, är utvecklad.
####Tidsuppskattning: Cirka 4 timmar. Då temperaturskalan redan existerar så krävs det att omarbeta redan existerande kod för att skapa mer modulära css klasser för knappar och skalor. Testning cirka 1 timme, då en knapp är lätt att testa så gäller det mer att söka efter oväntade buggar då man omarbetar koden.
####Risker: Beroende på hur lätt koden är att omarbeta så kan tiden variera lite grann, men den bör bli färdigutvecklad under sprint 1.
####Beskrivning: Ge lämpliga friktionvärdeintervall till skalan. Innan vi får en friktiondatafil där man kan läsa av vilka de lämpligaste intervallen är så kommer platshållarvärden att användas.
####Referenser: Detta kräver att task 1 är gjord samt att en friktiondatafil finns tillgänglig.
####Tidsuppskattning: Under en timme för både implementation och testning. Det tar inte lång tid att ändra enkla värden samt att testa så de visas korrekt.
####Risker: Då denna task ej kan startas innan friktiondatafilen är tillgänglig så är det svårt exakt när den finns. Så länge filen blir tillgänglig innan sprintens slut så kommer task:en att genomföras.




#Uppladdning av XML-fil

En användare, Sofia får friktiondata från Trafikverket och ska kunna ladda upp datan till webbservern.

Det ska finnas en knapp som tar upp en ruta där man kan bläddra och välja en XML-fil att ladda upp. Denna ruta ska ha checkboxes som beskriver vilket format datan har. Datan ska sedan parsas och laddas upp i databasen. Om datan har fel format så ska användaren få ett lämpligt felmeddelande. Då datan som laddas upp är känslig så ska överföringen vara säker.

##Ett test för denna funktionalitet är att:
###Klicka på knappen för att ladda upp ny friktiondata
###Välj en XML-fil och rätt format för denna fil.
###Ladda upp datan.
###Se att datan har laddats upp i databasen.

##Tasks:
###Lägg till en knapp som tar upp en modal(ruta)/navigerar till en ny sida för att ladda upp en lokal XML-fil
###Beskrivning: Knappen tar upp en ruta eller navigerar till en ny sida där användaren sedan ska kunna ladda upp en XML-fil. 
####Beroende: Då resten av denna story utvecklas på i denna ruta/sida så måste det här göras först. 
####Tidsåtgång: Då utvecklarna är nybörjare inom detta område så förväntas denna uppgift ta 4 timmar.
####Risk: Låg.



Modalen
Beskrivning: Modalen ska visa en simpel vy där redan uppladdad fil syns samt en knapp “Bläddra” för att öppna ett ytterligare fönster för att välja fil
Beroende: Denna story kräver att men ska kunna ta sig till Modalen
Tidsåtgång: 1 dag, ingen av utvecklarna har gjort en Modal i node. 
Risk: Medel.


Research om lämpligt bibliotek för att kunna ladda upp lokal XML-fil
Beskrivning: En användare ska kunna ladda upp en XML-fil. För att göra detta så ska hjälp av ett lämpligt bibliotek användas. Uppgiften för utvecklare blir att leta efter ett bibliotek som klarar av denna uppgift.
Beroende: Inget beroende då research inte beror på nått.
Tidsåtgång: 2 timmar.
Risk: Då det finns en risk att det bibliotek man väljer i början inte fungerar som man vill så kan eventuellt mer tidsåtgång behövas. Risken bedöms till medel.

Välj en lokal XML-fil
Beskrivning: En användare ska kunna välja en XML fil, vid knapptryckning på “Bläddra” skall vyn för att manövrera sig i filstrukturen och välja en XML fil visas.
Beroende:
Modalen
Research om lämpligt bibliotek för att kunna ladda upp lokal XML-fil, Task[3]
Tidsåtgång: 4 timmar, 
Risk: Låg/Medel, Ifall det inte finns i färdigt i valda bibliotek.

Skicka filen till webbservern
Beskrivning: När filen har valts så ska den sparas i en variabel på webbservern innan parsing påbörjas. Rimligtvis kommer biblioteket som väljer en lokal fil lösa detta problem.
Beroende:
Välj en lokal XML-fil, Task[4].
Tidsåtgång: 0 timmar
Risk: Hög då det är osäkert hur detta kommer funka.

Kolla på ett bibliotek för att parsa XML
Beskrivning: Datan som kommer från en XML-fil måste kunna parsas. En utvecklare måste kolla och välja ett bibliotek som klarar av denna uppgift givet att filen redan finns sparad i en variabel.
Beroende: Inget beroende.
Tidsåtgång: 1 timme.
Risk: Låg.


Parsa Data
Beskrivning: Datan i XML-Filen sparas i olika arrays. Använd ett bibliotek för att parsa XML. Om formatet på filen inte matchar vad webbservern förväntar sig så ge ett lämpligt fel.
Beroende: Beror på:
Skicka filen till webbservern, Task[5].
Kolla på ett bibliotek för att parsa XML, Task[6].
Tidsåtgång: 5 timmar.
Risk: Låg




Spara i Databasen
Beskrivning: Webbservern gör om arraysen till lämpliga SQL-Queries.
Beroende: 
Parse Data Task[7]
Tidsåtgång: 4 timmar, utvecklarna är bekväma med MySQL
Risk: Låg

