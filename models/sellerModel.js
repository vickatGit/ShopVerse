const moongoose=require('mongoose')
const seller=moongoose.Schema({
    email:{
        type:String,
        required : true
    },
    sellerName:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    }
})
module.exports = moongoose.model("Seller",seller)