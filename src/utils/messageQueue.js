const amqp = require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");

let QUEUE_NAME = "post_service";

const createChannel = async () => {
  try {
    const conn = await amqp.connect(MESSAGE_BROKER_URL);
    const channel = await conn.createChannel();
    // So after the setup this broker can exchange the messages between the multiple queues so the message broker have the message and see which queue it needs to send the message (it is optional to setup exchange)
    // Setup for routing system for the messages
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    return error;
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
      channel.ack("Message received!!");
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

// EXAMPLE

// (async () => {
//   const queue = "post_service";
//   const conn = await amqp.connect("amqp://localhost");

//   //First we create channel so i can connect with other services
//   const postChannel = await conn.createChannel();

//   //Assert queue will not create queue everytime it will see if the queue is exist then work with that if not then it will create the new queue.
//   await postChannel.assertQueue(queue);

//   //Listener
//   postChannel.consume(queue, (msg) => {
//     if (msg !== null) {
//       // if we recieve the message in the queue then we can send acknowledgement for othe service
//       postChannel.ack();
//     } else {
//       console.log("::::::::errror for reciever");
//     }
//   });
// })();
