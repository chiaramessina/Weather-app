import unittest
from main import get_weather  # Importa dal tuo file principale

class TestWeatherApp(unittest.TestCase):

    def test_city_valid(self):
        """Test con una città reale"""
        result = get_weather("Milano")
        # Verifichiamo che il risultato contenga il nome della città e la temperatura
        self.assertIn("Milano", result)
        self.assertIn("ci sono attualmente", result)

    def test_city_invalid(self):
        """Test con una città che non esiste"""
        citta_falsa = "NonEsisto12345"
        result = get_weather(citta_falsa)
        # Ora il messaggio include il nome della città cercata
        self.assertEqual(result, f"Città '{citta_falsa}' non trovata. Riprova!")

    def test_empty_input(self):
        """Test con stringa vuota"""
        result = get_weather("")
        # Ora il messaggio è specifico per l'input vuoto
        self.assertIn("non può essere vuoto", result.lower())

if __name__ == "__main__":
    unittest.main()