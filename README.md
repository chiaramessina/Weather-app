🌤️ Weather App

Benvenuto nella Weather App, un'applicazione completa che combina la potenza di Python per il calcolo e i test con l'eleganza di un'interfaccia Web moderna. Questo progetto è stato sviluppato seguendo le migliori pratiche di programmazione, con l'integrazione di sistemi di caching e gestione avanzata degli errori.

📖 Descrizione del Progetto
L'app permette agli utenti di conoscere il meteo di qualsiasi città del mondo istantaneamente. Utilizza le API di Open-Meteo attraverso un processo in due fasi:

Geocoding: Traduce il nome della città in coordinate geografiche.

Forecast: Recupera i dati meteorologici precisi (temperatura e condizioni) per quelle coordinate.

Caratteristiche principali:

Interfaccia Web: Design pulito e responsive con CSS moderno.

Smart Caching: I dati vengono salvati localmente per 60 minuti per velocizzare le ricerche e risparmiare chiamate API.

Test Unitari: Suite di test in Python per garantire che la logica di business sia sempre corretta.

Robustezza: Gestione dei timeout di rete e degli input non validi.

📂 Struttura della Cartella
Il progetto è organizzato nei seguenti file:

index.html: La struttura della pagina web.

style.css: Il design grafico (layout, colori e font).

meteo.js: La logica JavaScript (API, DOM e Cache).

main.py: La versione dell'app per riga di comando (CLI).

test_weather.py: I test automatici per la versione Python.

🚀 Come Eseguire l'App
1. Utilizzo dell'Interfaccia Web (Consigliato)
È il modo più semplice per vedere l'app in azione:

Assicurati che index.html, style.css e meteo.js siano nella stessa cartella.

Apri il file index.html con il tuo browser preferito (Chrome, Firefox, Edge).

2. Utilizzo della Versione Python
Se preferisci lavorare da terminale:

Apri il terminale nella cartella del progetto.

Installa la libreria necessaria:

Bash
pip install requests

Avvia l'applicazione:

Bash
python main.py

3. Esecuzione dei Test Automatici
Per verificare che tutto funzioni correttamente dopo ogni modifica:

Bash
python test_weather.py

🤖 Sviluppo con Intelligenza Artificiale
Questo progetto è il risultato di una collaborazione tra sviluppatore e IA. L'intelligenza artificiale è stata fondamentale per:

Ottimizzazione del Codice: Implementazione dei timeout e della logica raise_for_status().

UI/UX Design: Creazione del layout CSS con gradienti e ombre.

Debug: Risoluzione rapida di errori asincroni in JavaScript.

🛠️ Prossimi Passi
[ ] Aggiungere icone meteo dinamiche (sole, pioggia, nuvole).

[ ] Implementare le previsioni a 7 giorni.

[ ] Aggiungere dettagli su umidità e velocità del vento.
