import express from "express";
import bodyParser from "body-parser"
import connectToMongo from "./config/db.js";
import inventoryRoute from "./routes/inventory.js";
const server = express();
const PORT = 9000;
connectToMongo();
server.get("/",(req,res) => {
    res.send("Hello World");
});


server.use(bodyParser.json());
 server.use("/",inventoryRoute);

server.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});


