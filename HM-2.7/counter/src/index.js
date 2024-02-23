const express = require("express");
const redis = require("redis");

const app = express();
const REDIS_URL = process.env.REDIS_URL || "redis://localhost";

const client = redis.createClient({ url: REDIS_URL });

(async () => {
    await client.connect()
})()

app.post("/counter/:bookId/incr", async (req, res) => {
    const { bookId } = req.params

    try {
        const cnt = await client.incr(bookId)
        res.json({ count: cnt })
    } catch (e) {
        res.json({ errcode: 500, errmsg: "Redis error" + e })
    }
});

app.get("/counter/:bookId", async (req, res) => {
    const { bookId } = req.params

    try {
        const cnt = await client.get(bookId)
        res.json({ count: Number(cnt) })
    } catch (e) {
        res.json({ errcode: 500, errmsg: "Redis error" + e })
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Counter listening on Port ${PORT}.`)
})