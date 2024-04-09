import express from "express";
import connectToMongo from "./config/db.js";
const server = express();
const PORT = 9000;
connectToMongo();
server.get("/",(req,res) => {
    res.send("Hello World");
});

server.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});


