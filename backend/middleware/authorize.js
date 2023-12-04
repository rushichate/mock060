const jwt = require("jsonwebtoken")

const verify = async (req,res,next) =>{
    const token = req.headers.authorization
    if(!token) return res.status(400).json({message:"Please Login First"})

    jwt.verify(token,"masai",function(err,decoded){
        if(decoded){
            req.body.user = decoded.userId
            next()
        }else{
            res.status(400).json({message:"Please Login First"})
        }
    })
}

module.exports={
    verify
}