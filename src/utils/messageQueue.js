const amqp = require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");

let QUEUE_NAME = "mail_queue";

// So how things works in the rabbit mq is that when we create the channel it will make connection between our service with the rabbitMQ server.

//         Post Service channel -------------->  RABBIT MQ SERVER <------------------- Mail Service channel

const createChannel = async () => {
  try {
    const conn = await amqp.connect(MESSAGE_BROKER_URL);
    const channel = await conn.createChannel();
    // So after the setup this broker can exchange the messages between the multiple queues so the message broker have the message and see which queue it needs to send the message (it is optional to setup exchange)
    // Setup for routing system for the messages
    await channel.assertExchange(EXCHANGE_NAME);

    // Handle connection errors
    conn.on("error", (err) => {
      console.error("Connection error:", err);
    });

    // Handle unexpected connection closures and reconnect
    conn.on("close", () => {
      console.warn("Connection to RabbitMQ closed, reconnecting...");
      setTimeout(createChannel, 1000); // Attempt to reconnect after 1 second
    });

    // Log successful connection
    console.log("Successfully connected to RabbitMQ!");

    return channel;
  } catch (error) {
    console.error("Error in creating channel:", error);
    setTimeout(createChannel, 1000); // Reattempt after 1 second on failure
  }
};

const subscribeMessage = async (channel, binding_key, service) => {
  try {
    const applicationQueue = await channel.assertQueue(QUEUE_NAME);

    // Bind queue
    // So the exchange will have the message it have binding key based on that binding key it will know which queue it needs to send the message.
    // So basically it creates the link between the Exchange and the queue.
    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    //Consume
    channel.consume(applicationQueue.queue, (msg) => {
      console.log("msggggg", msg?.content?.toString());
      // We can send specific message to services to send back to user or can call the controller according to message.

      //Acknowledgement
      channel.ack(msg);
    });
  } catch (error) {
    console.log("SUBSCRIBE_MESSAGE:::::::", error);
  }
};

const publishMessage = async (channel, binding_key, msg) => {
  try {
    await channel.assertQueue(QUEUE_NAME);
    //We can also do something like this if we have only single queue but what if we have multiple queues then we've to give bind_key, exchange name, message then exchange will receive it based on binding key it will navigate message to the perticular queue.

    // channel.sendToQueue(queue, Buffer.from(message));

    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(msg));
  } catch (error) {
    console.log("PUBLISH_MESSAGE:::::::", error);
  }
};

module.exports = { createChannel, subscribeMessage, publishMessage };
