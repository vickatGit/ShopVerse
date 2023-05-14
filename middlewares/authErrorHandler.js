const authErrorHandler = (err,req,res,next) => {
    console.log("eror"+res.statusCode)
    const errCode=res.statusCode ? res.statusCode : 500

    switch(errCode){
        case 400:{
            res.json({
                code:400,
                message:err.message
            })
        }
        default : {
            res.json({
                code:500,
                message:"Internal Server Error"
            })
        }
    }
    next()
};
module.exports =  authErrorHandler 
