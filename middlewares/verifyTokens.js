const jwt = require("jsonwebtoken")

const verifytoken = (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.redirect('/login')
    }

    jwt.verify(token,process.env.SECRETKEY, async (err, data)=>{
        if(err){
            return res.status(403).json("token is not valid")
        }

        req.userId = data._id;
        req.name = data.name;

        next();
    })
}

module.exports = verifytoken;