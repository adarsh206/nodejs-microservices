const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

//event listener

client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);


async function redisDataStructures() {
    try {

        await client.connect();
        console.log("Redis Client Connected");
        // String -> SET, GET, MSET, MGET

        await client.set("user:name", "Adarsh Kumar");
        const name = await client.get("user:name");
        console.log(name);

        await client.mSet(["user:email", "adarsh@example.com", "user:age", "27", "user:country", "India"]);
        const [email, age, country ] = await client.mGet(["user:email", "user:age", "user:country"]);
        console.log(email, age, country);

        // lists -> LPUSH, RPUSH, LPOP, RPOP, LRANGE

        await client.lPush("notes", ["note1", "note2", "note3"]);
        const extractAllNotes = await client.lRange("notes", 0, -1);
        console.log(extractAllNotes);

        const firstNote = await client.lPop("notes");
        console.log(firstNote);

        const remainingNotes = await client.lRange("notes", 0, -1);
        console.log(remainingNotes, "remainingNotes");


        // sets -> SADD, SMEMBERS, SISMEMBER, SREM

        await client.sAdd("user:nickName", ["john", "adam", "xyz"]);
        const extractUserNickNames = await client.sMembers("user:nickName");
        console.log(extractUserNickNames);

        const isAdamIsOneOfUserNickName = await client.sIsMember("user:nickName", "adam");
        console.log(isAdamIsOneOfUserNickName);

        await client.sRem("user:nickName", "xyz");

        const getUpdatedUserNickNames = await client.sMembers("user:nickName");
        console.log(getUpdatedUserNickNames);


        // Sorted Sets -> ZADD, ZRANGE, ZREM, ZSCORE

        await client.zAdd("cart", [
        {
            score: 100,
            value: "Cart 1",
        },
       {
            score: 150,
            value: "Cart 2",
      },
      {
            score: 10,
            value: "Cart 3",
      },
    ]);

    const getCartItems = await client.zRange("cart", 0, -1);
    console.log(getCartItems);

    const extractAllCartItemsWithScore = await client.zRangeWithScores("cart", 0, -1);
    console.log(extractAllCartItemsWithScore);

    const cartTwoRank = await client.zRank("cart", "Cart 2");
    console.log(cartTwoRank);

     //Hashes -> HSET, HGET, HGETALL, HDEL

      await client.hSet("product:1", {
      name: "Product 1",
      description: "product one description",
      rating: "5",
    });

    const getProductRating = await client.hGet("product:1", "rating");
    console.log(getProductRating);

    const getProductDetails = await client.hGetAll("product:1");
    console.log(getProductDetails);

    await client.hDel("product:1", "rating");

    const updatedProductDetails = await client.hGetAll("product:1");
    console.log(updatedProductDetails);

    } catch (error) {
        console.error(error);
    }
    finally{
        client.quit();
    }

}

redisDataStructures();