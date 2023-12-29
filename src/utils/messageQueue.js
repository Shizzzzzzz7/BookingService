const amqplib = require('amqplib');

const { EXCHANGE_NAME, MESSAGE_BROKER_URL } = require("../config/serverConfig")

//Publishe ---> Exchange Distributer ---> Queue {for multiple queue we have multiple Binding key}

//This creates channel between the sender and reciever
//1 Channel can have multiple queue
const createChannel = async()=>{
    try {
        //this establish connection to a RabbitMQ Server
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        //creates a new channel on the established connection. Channels are used to isolate and multiplex different messaging flows within a single connection.
        const channel = await connection.createChannel();
        //used to declare an exchange on a channel. Exchanges in RabbitMQ are routing mechanisms that determine how messages are distributed to queues.
        await channel.assertExchange(EXCHANGE_NAME, "direct", false);
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async(channel, service, binding_key)=>{
    try {
        //ensures that a queue exists on the channel
        const applicationQueue = await channel.assertQueue('REMAINDER_QUEUE');
        //bind a queue to an exchange on a channel in RabbitMQ
        //which queue to choose to send msg
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);
        //used to start consuming messages from a specific queue
        channel.consume(applicationQueue.queue, (msg)=>{
            console.log("Message Recieved");
            console.log(msg.content.toString());
            channel.ack(msg);
        });
    } catch (error) {
        throw error;
    }
}

const publishMessage = async(channel, binding_key, message)=>{
    try {
        await channel.assertQueue('REMAINDER_QUEUE');
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}