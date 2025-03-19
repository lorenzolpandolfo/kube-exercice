const amqp = require('amqplib/callback_api');

const RABBIT_URL = 'amqp://rabbitmq-service';
const QUEUE = 'messages';

amqp.connect(RABBIT_URL, (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, ch) => {
    if (err) throw err;
    ch.assertQueue(QUEUE, { durable: false });
    console.log(`📥 Aguardando mensagens na fila: ${QUEUE}`);
    ch.consume(QUEUE, (msg) => {
      console.log(`📩 Recebido: ${msg.content.toString()}`);
    }, { noAck: true });
  });
});

