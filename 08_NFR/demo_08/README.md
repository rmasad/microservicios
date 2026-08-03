# Demo: retry con backoff y jitter

Un servicio HTTP local falla el 70% de las veces; el cliente reintenta con backoff exponencial y jitter usando [tenacity](https://tenacity.readthedocs.io/).

```bash
pip install tenacity requests
python3 retry_demo.py
```

Córranlo varias veces y fíjense en la cantidad de reintentos que reporta al final.
