require('dotenv').config()
const moongoose=require('mongoose')
const db=async () =>{
    try {
        await moongoose.connect(process.env.DB_URL)
        console.log("succesfully connected")
    } catch (error) {
        console.log(`connection failed `+error)
    }
}
module.exports = db