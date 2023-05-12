const db =require('./config/dbConnection')
const app = require('express')()

db()
app.listen(8080,()=>{
    console.log("listning on port 8080 🚀")
})