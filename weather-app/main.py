import requests

def get_weather(city_name):
    """
    Recupera le informazioni meteo attuali per una data città.
    
    Esegue prima una chiamata all'API di Geocoding per ottenere le coordinate,
    seguita da una chiamata all'API Forecast per i dati meteorologici.

    Args:
        city_name (str): Il nome della città da cercare.

    Returns:
        str: Una stringa formattata con il nome della città e la temperatura,
             oppure un messaggio di errore descrittivo.

    Example:
        >>> print(get_weather("Milano"))
        "A Milano ci sono attualmente 18.5°C."
    """
    # Controllo se l'input è vuoto o solo spazi
    if not city_name or not city_name.strip():
        return "Errore: Il nome della città non può essere vuoto."

    # 1. Geocoding: Prepariamo l'URL con i parametri puliti
    geo_url = "https://geocoding-api.open-meteo.com/v1/search"
    params_geo = {
        "name": city_name,
        "count": 1,
        "language": "it",
        "format": "json"
    }
    
    try:
        # Usiamo 'params' invece di scrivere tutto nell'URL, è più ordinato
        response = requests.get(geo_url, params=params_geo, timeout=10)
        response.raise_for_status() 
        data = response.json()
        
        if not data.get('results'):
            return f"Città '{city_name}' non trovata. Riprova!"

        lat = data['results'][0]['latitude']
        lon = data['results'][0]['longitude']
        name = data['results'][0]['name']

        # 2. Meteo: Recupero temperatura usando le coordinate
        weather_url = "https://api.open-meteo.com/v1/forecast"
        params_weather = {
            "latitude": lat,
            "longitude": lon,
            "current_weather": True
        }
        
        w_response = requests.get(weather_url, params=params_weather, timeout=10)
        w_response.raise_for_status()
        w_data = w_response.json()
        
        temp = w_data['current_weather']['temperature']
        # Recupero l'unità di misura (es. °C) o metto un default
        unit = w_data.get('current_weather_units', {}).get('temperature', '°C')

        return f"A {name} ci sono attualmente {temp}{unit}."

    except requests.exceptions.Timeout:
        return "Errore: La connessione è troppo lenta. Riprova più tardi."
    except requests.exceptions.RequestException as e:
        return f"Errore durante il recupero dei dati: {e}"

# --- Esecuzione dell'App ---
if __name__ == "__main__":
    print("--- Benvenuto nell'App Meteo Ottimizzata ---")
    citta = input("Inserisci il nome di una città: ")
    risultato = get_weather(citta)
    print(risultato)