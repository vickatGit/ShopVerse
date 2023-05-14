const moongoose=require('mongoose')
const consumer=moongoose.Schema({
    email:{
        type:String,
        required : true,
        unique:true
    },
    consumerName:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    }
})
module.exports = moongoose.model("Consumer",consumer)