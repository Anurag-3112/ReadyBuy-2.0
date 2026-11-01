import amqp from "amqplib";
import config from "./env.js";

let connection;
let channel;
let confirmChannel;

export const connectRabbitMQ = async () => {
    while (true) {
        try {
            connection = await amqp.connect(
                config.rabbitmq.url
            );

            channel = await connection.createChannel();
            confirmChannel =
                await connection.createConfirmChannel();

            console.log("RabbitMQ Connected");

            return;
        } catch (error) {
            console.error(
                "RabbitMQ not ready. Retrying in 5 seconds...",
                error.message
            );

            await new Promise((resolve) =>
                setTimeout(resolve, 5000)
            );
        }
    }
};

export const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ channel is not initialized");
    }

    return channel;
};

export const getConfirmChannel = () => {
    if (!confirmChannel) {
        throw new Error(
            "RabbitMQ confirm channel is not initialized"
        );
    }

    return confirmChannel;
};