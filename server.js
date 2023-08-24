const express = require("express");
require("dotenv").config();
const DB_CONNECTCION = require("./config/db");
const productRouter = require("./routes/product.routes");
const authRouter = require("./routes/user.routes");
const cartRouter = require("./routes/cart.routes");

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send("Hello bro !!");
})

app.use("/api/v1",productRouter);
app.use("/api/v1",cartRouter);
app.use("/api/v1",authRouter);

app.listen(PORT,async()=>{
    await DB_CONNECTCION;
    console.log(`Server Ran ON ${PORT}`);
})