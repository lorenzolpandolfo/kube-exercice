const amqp = require('amqplib/callback_api');

const RABBIT_URL = 'amqp://rabbitmq-service';
const QUEUE = 'messages';

amqp.connect(RABBIT_URL, (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, ch) => {
    if (err) throw err;
    ch.assertQueue(QUEUE, { durable: false });
    setInterval(() => {
      const msg = `Mensagem enviada: ${new Date()}`;
      ch.sendToQueue(QUEUE, Buffer.from(msg));
      console.log(`📤 Enviado: ${msg}`);
    }, 3000);
  });
});

