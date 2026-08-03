"""Demo unidad 8: retry con backoff exponencial y jitter usando tenacity.

Levanta un servidor HTTP local que falla el 70% de las veces y lo consulta
reintentando. Observen en la salida cómo crece la espera entre intentos.
"""
import random
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer

import requests
from tenacity import RetryError, retry, stop_after_attempt, wait_exponential, wait_random


class ServicioInestable(BaseHTTPRequestHandler):
    def do_GET(self):
        # 70% de las veces simula un fallo transitorio
        self.send_response(500 if random.random() < 0.7 else 200)
        self.end_headers()

    def log_message(self, *args):  # silenciar logs del servidor
        pass


@retry(
    stop=stop_after_attempt(6),
    # backoff exponencial (1s, 2s, 4s...) + jitter para evitar retry storms
    wait=wait_exponential(multiplier=1, max=10) + wait_random(0, 1),
)
def llamar_servicio():
    respuesta = requests.get("http://localhost:8777", timeout=2)
    respuesta.raise_for_status()  # un 5xx lanza excepción y gatilla el retry
    print("Respuesta exitosa:", respuesta.status_code)


if __name__ == "__main__":
    servidor = HTTPServer(("localhost", 8777), ServicioInestable)
    threading.Thread(target=servidor.serve_forever, daemon=True).start()
    try:
        llamar_servicio()
    except RetryError:
        print("Se agotaron los reintentos: el servicio sigue caído, tocaría degradar")
    print("Intentos usados:", llamar_servicio.statistics["attempt_number"])
