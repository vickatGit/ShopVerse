const express = require('express')
const app = express()
const db = require("./config/dbConnection");
const consumerRoutes=require('./routes/consumerRoutes')
const sellerRoutes=require('./routes/sellerRoutes')

db()

app.use(express.json())
app.use("/seller/",sellerRoutes)
app.use("/consumer/",consumerRoutes)
app.listen(8080,()=>{
    console.log("listning on port 8080 🚀")
})