import json
import pika
import logging

logging.getLogger("pika").setLevel(logging.ERROR)


class Emit:
    def send(self, id, action, payload):
        self.connect()
        self.publish(id, action, payload)
        self.close()

    def connect(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='demo_04_message_broker')
        )

        self.channel = self.connection.channel()
        self.channel.exchange_declare(exchange='players',
                                      exchange_type='topic')

    def publish(self, id, action, payload):
        routing_key = f"player.{action}.{id}"
        message = json.dumps(payload)

        self.channel.basic_publish(exchange='players',
                                   routing_key=routing_key,
                                   body=message)

    def close(self):
        self.connection.close()


class Receive:
    def __init__(self):
        logging.info("Waiting for messages...")
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='demo_04_message_broker')
        )

        self.channel = self.connection.channel()
        self.channel.exchange_declare(exchange='players',
                                      exchange_type='topic')

        self.channel.queue_declare('player_for_player_queue', exclusive=True)
        self.channel.queue_bind(exchange='players',
                                queue="player_for_player_queue",
                                routing_key="player.delete.*")

        self.channel.basic_consume(queue='player_for_player_queue',
                                   on_message_callback=self.callback)

        self.channel.start_consuming()

    def callback(self, ch, method, properties, body):
        body = json.loads(body)
        logging.info(f"Good by {body['name']} 👋")
        ch.basic_ack(delivery_tag=method.delivery_tag)

    def close(self):
        self.connection.close()


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s:%(levelname)s:%(name)s:%(message)s')
    Receive()
