🌤️ Weather App 
Benvenuto nella Weather App, un progetto nato per esplorare l'integrazione tra Python, JavaScript e le potenzialità dell'intelligenza artificiale nello sviluppo software.

Invece di guardare fuori dalla finestra (scelta troppo rischiosa per un programmatore), questa app interroga le API di Open-Meteo per darti dati precisi e veloci.

📖 Descrizione del Progetto
L'app è composta da due "anime":

Versione Python: Un'applicazione da terminale (CLI) solida, testata e pronta all'uso.

Versione JavaScript: Un'implementazione moderna che include una logica di caching avanzata per non sprecare chiamate API e caricare i dati all'istante.

Il flusso è semplice: l'utente inserisce una città, l'app trova le coordinate geografiche e poi scarica il meteo in tempo reale.

📂 Struttura della Cartella
All'interno di WEATHER-APP troverai:

main.py: Il motore Python. Gestisce le richieste di rete, il controllo degli errori (timeout e connessione) e l'interazione con l'utente.

test_weather.py: La nostra "rete di sicurezza". Contiene test automatici per assicurarci che l'app funzioni bene anche con input errati.

meteo.js: La versione JavaScript. Qui risiede la logica di Local Storage, che salva i dati per 60 minuti per massimizzare le prestazioni.

🚀 Come Eseguire l'App
🐍 Parte Python
Assicurati di avere Python installato. Installa la libreria necessaria con:
Bash
pip install requests

Per avviare l'app:
Bash
python main.py

Per l'esecuzione dei test automatici:
Bash
python test_weather.py

⚡ Parte JavaScript
Puoi eseguire il file usando Node.js nel tuo terminale:
Bash
node meteo.js

Nota: La funzionalità di cache (localStorage) è ottimizzata per l'uso nel browser, ma il file contiene esempi di test pronti per la console.

🤖 AI-Assisted Development
Questo progetto è stato rifinito con l'aiuto dell'intelligenza artificiale, che è stata fondamentale per:

Debug: Risoluzione di problemi asincroni in JS e correzione dei test Python.

Best Practices: Implementazione di timeout nelle chiamate API per evitare blocchi infiniti.

Documentazione: Generazione di Docstrings e commenti chiari per rendere il codice leggibile anche dai junior.

🛠️ Possibili Miglioramenti
Se avessi più tempo (e litri di caffè aggiuntivi), mi piacerebbe:

Creare una dashboard grafica (HTML/CSS) colorata.

Aggiungere dettagli come la velocità del vento e l'umidità.

Implementare una mappa interattiva.
