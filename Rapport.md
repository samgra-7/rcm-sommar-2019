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

# 4.2.2
In connection to the updated system design expected regression risks in the system shall for this assignment be estimated and described in Section 4.2.2 of the project report. Examples on expected local, remote and unmasked regression risks shall be specifically discussed in this section of the report using the updated system design as reference. These regression risks are addressed in the second and third lectures given by Ulf (both are available in Canvas).

# 4.2.3
A strategy for regression testing shall further be described in Section 4.2.3 of the draft project report. The defined strategy shall comment on the possible use of traceability, change analysis, quality risk analysis and cross-functional testing. These strategies for how and what to test are addressed in the third lecture given by Ulf.

# 4.2.4
Finally, two stories (functional descriptions, written in form of test cases) on the development of automated regression testing shall be defined and documented in Section 4.2.4 of the draft project report. These stories shall be defined in terms of test cases and be analyzed and divided into time estimated development tasks (i.e. each story shall have several tasks defined). This may (not mandatory) include approaches for which testing frameworks and tools to use. Although risk assessment as well as suggested priority are typically made by the development group on each story, this is not needed for this assignment.

One story shall be defined for automated unit level testing (e.g. support functions and structure). This testing shall be technology facing and aim at protecting internal quality. The other story shall be defined for automated system level testing (e.g. for part automated testing). This testing shall be business facing and aim at ensuring external quality (preparing for acceptance testing). The second and third lectures given by Ulf provide guidance in defining the two stories.
