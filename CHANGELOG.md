
Ice Finder changelog

## Version 2.0 b1 

Ny domän: icefinder.se
Ny motor: Leaflet.
Ny landyta: Sverige, Norge Finland
Nytt utsnitt.
Nya zoomlägen.
Snabbat upp processen rejält med att Satellit-data laddas ner som JPG och genereras till JPG (tidigare TIFF och PNG).
tiles.icefinder.se ligger hos HP och där ligger alla satellit-tiles.
Allt på engelska pga Norge/Finland

## Version 1.02

Tre olika bilder morfas ihop!!


## Version 1.01 

Ny logga, nya färger, ny donera-knapp!


## Version 1.0 release 

Skapat en MySQL-bas för alla satellit-lager.
Adminsida för att lägga till och ta bort lager.
Nu hämtas alla lager från SQL-databasen.


## Version 1.0 b7 

Satellit-bild-lagren skapas genom en lista och en for-loop så att det ska bli lättare att lägga till lager.

Permalänk inlagd.

I backend har jag skapat ett sh-script icefinder.sh som laddar ner data, omprojicerar, hackar upp och sen laddar upp via FTP.

## Version 1.0 b6 

Optimerat javascript-kod och css som förberedelse för automatisering. Nu sker all onclick-funktionalitet med listeners i JS-filen istället för anrop i html-koden. Mycket lättare att lägga till ett lager nu.


## Version 1.0 b5 

Fixat sidan till iphone.


## Version 1.0 b4

Gjort om utsnittet så att hela södra Sverige täcks. Lite meck att fatta koordinater och skalor. Nu 6 zoomnivåer. Gjorde även försök att generera tiles i OSM-schemat med annan tilefunktion men valde att återgå till "gamla vanliga" ändå.

 
## Version 1.0 b3

Första publika release. Skillnad mot tidigare är att det är Norsteds kartor som ligger som överlägg.


## Version 1.0 b2

Tror det var då jag skapade en egen lagerpanel för att kunna style:a lite bättre.


## Version 1.0 b1

Första fungerande version med default LayerSwitcher.