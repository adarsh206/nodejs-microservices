// pub/sub -> publisher -> send -> channel -> subscriber will consume

const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);

async function testAdditionalFeatures() {
    try {
        
        await client.connect();

        const subscriber = client.duplicate(); // create a new client -> shares the same connection
        await subscriber.connect();

        await subscriber.subscribe("dummy-channel", (message, channel) => {
            console.log(`Received message from ${channel}: ${message}`);
        });

        // publish message to the dummy channel
        await client.publish("dummy-channel", "Some dummy data from publisher");
        await client.publish("dummy-channel", "Some new message again from publisher");

        await new Promise((resolve) => setTimeout(resolve, 3000));

        await subscriber.unsubscribe("dummy-channel");
        await subscriber.quit(); // close the subscriber connection
    } catch (error) {
        console.error(error);
    }
    finally {
        client.quit();
    }
}

testAdditionalFeatures();