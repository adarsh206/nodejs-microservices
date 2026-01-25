// Redis Full Form -> Remote Dictionary Server
// Redis is an open-source, in-memory data structure store used as a database, cache, and message broker. It supports various data structures such as strings, hashes, lists, sets, and more.

const redis = require("redis");

const client = redis.createClient({
    host : 'localhost',
    port : 6379,
})

// event listener

client.on("error", (error) => {
    console.log("Redis client error occured!", error)
})

async function testRedisConnection() {
    try {
        await client.connect();
        console.log("Connected to redis");
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.quit();
    }
}

testRedisConnection();