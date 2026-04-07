/**
 * Ottiene i dati meteo di una città.
 * Sviluppato per principianti: usa nomi chiari, async/await per facilitare 
 * la lettura e commenti che spiegano ogni passaggio.
 * * @param {string} cityName - Il nome della città da cercare.
 * @returns {Promise<object>} Un oggetto JSON con città, temperatura e descrizione (o un errore).
 */
async function getMeteoCitta(cityName) {
  try {
    // 1. GESTIONE ERRORI: Controllo di base sull'input
    if (!cityName || typeof cityName !== 'string') {
      throw new Error("Input non valido. Per favore, inserisci il nome di una città.");
    }

    // 2. GEOCODING: Chiamata all'API per ottenere Latitudine e Longitudine
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=it`;
    const geoResponse = await fetch(geoUrl);
    
    // GESTIONE ERRORI: Controllo problemi di rete o server (Geocoding)
    if (!geoResponse.ok) {
      throw new Error(`Errore di rete nell'API Geocoding: ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();

    // GESTIONE ERRORI: Città non trovata
    if (!geoData.results || geoData.results.length === 0) {
      return { errore: `Città '${cityName}' non trovata. Riprova con un nome valido.` };
    }

    // Estraiamo i dati che ci servono dal risultato
    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;
    const nomeRealeCitta = geoData.results[0].name;

    // 3. METEO: Chiamata all'API Meteo usando le coordinate appena trovate
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const weatherResponse = await fetch(weatherUrl);

    // GESTIONE ERRORI: Controllo problemi di rete o server (Meteo)
    if (!weatherResponse.ok) {
      throw new Error(`Errore di rete nell'API Meteo: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();
    const currentTemp = weatherData.current_weather.temperature;
    const weatherCode = weatherData.current_weather.weathercode;

    // 4. TRADUZIONE CODICI: Open-Meteo usa dei numeri (WMO code) per descrivere il tempo.
    // Usiamo una semplice struttura condizionale per trasformarli in testo leggibile.
    let descrizioneMeteo = "Condizioni sconosciute";
    if (weatherCode === 0) descrizioneMeteo = "Cielo sereno";
    else if (weatherCode >= 1 && weatherCode <= 3) descrizioneMeteo = "Poco nuvoloso o parzialmente coperto";
    else if (weatherCode >= 45 && weatherCode <= 48) descrizioneMeteo = "Nebbia";
    else if (weatherCode >= 51 && weatherCode <= 67) descrizioneMeteo = "Pioggia o pioviggine";
    else if (weatherCode >= 71 && weatherCode <= 77) descrizioneMeteo = "Neve";
    else if (weatherCode >= 80 && weatherCode <= 82) descrizioneMeteo = "Acquazzoni";
    else if (weatherCode >= 95 && weatherCode <= 99) descrizioneMeteo = "Temporale";

    // 5. RISULTATO: Restituzione dell'oggetto JSON finale richiesto
    return {
      citta: nomeRealeCitta,
      temperatura_celsius: currentTemp,
      descrizione: descrizioneMeteo
    };

  } catch (error) {
    // 6. CATTURA ERRORI GLOBALI: Gestisce i problemi di connessione o gli errori lanciati sopra
    return { 
      errore: "Si è verificato un problema durante l'elaborazione dei dati.",
      dettaglio: error.message 
    };
  }
}

// ==========================================
// ESEMPI DI UTILIZZO (Testiamo la funzione)
// ==========================================

// Test 1: Città valida
getMeteoCitta("Roma").then(risultato => {
  console.log("--- TEST CITTÀ VALIDA ---");
  console.log(risultato);
});

// Test 2: Città non esistente (Testiamo la gestione errori)
getMeteoCitta("Atlantide123").then(risultato => {
  console.log("\n--- TEST CITTÀ NON VALIDA ---");
  console.log(risultato);
});

// Test 3: Input vuoto (Testiamo la convalida dell'input)
getMeteoCitta("").then(risultato => {
  console.log("\n--- TEST INPUT VUOTO ---");
  console.log(risultato);
});
/**localStorage, il metodo più semplice per app web e mobile**/
async function getMeteoConCache(cityName) {
  const CACHE_KEY = `weather_${cityName.toLowerCase()}`;
  const UN_ORA = 60 * 60 * 1000; // Millisecondi in un'ora
  const oraAttuale = Date.now();

  // 1. Controlla se esistono dati salvati
  const datiSalvati = localStorage.getItem(CACHE_KEY);

  if (datiSalvati) {
    const { data, timestamp } = JSON.parse(datiSalvati);

    // 2. Verifica se la cache è ancora valida (meno di un'ora)
    if (oraAttuale - timestamp < UN_ORA) {
      console.log(`Dati caricati dalla cache per: ${cityName}`);
      return data;
    }
  }

  // 3. Se non c'è cache o è scaduta, fai la chiamata API (usiamo la funzione precedente)
  console.log(`Cache scaduta o mancante. Chiamata API in corso per: ${cityName}...`);
  const nuoviDati = await getMeteoCitta(cityName);

  // 4. Salva i nuovi dati con il timestamp attuale
  if (!nuoviDati.errore) {
    const payload = {
      data: nuoviDati,
      timestamp: oraAttuale
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  }

  return nuoviDati;
}

// --- LOGICA DI COLLEGAMENTO ALL'INTERFACCIA ---

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', async () => {
    const citta = cityInput.value.trim();
    
    if (!citta) {
        resultDiv.innerHTML = "<p style='color:red;'>Per favore, inserisci un nome!</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Caricamento...</p>";

    // Usiamo la tua funzione con CACHE che hai già scritto!
    const dati = await getMeteoConCache(citta);

    if (dati.errore) {
        resultDiv.innerHTML = `<p style='color:red;'>❌ ${dati.errore}</p>`;
    } else {
        resultDiv.innerHTML = `
            <h3>${dati.citta}</h3>
            <p style="font-size: 2rem; margin: 10px 0;"><strong>${dati.temperatura_celsius}°C</strong></p>
            <p>✨ ${dati.descrizione}</p>
        `;
    }
});