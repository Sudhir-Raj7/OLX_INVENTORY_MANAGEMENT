import express from "express";
const server = express();
const PORT = 9000;

server.get("/",(req,res) => {
    res.send("Hello World");
});

server.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});


