import jwt from "jsonwebtoken"

export async function auth(req, res, next){
    try{
        let accessToken = req.cookies?.accessToken || req?.header?.authorization?.split(" ")[1];
        if(!accessToken){
            return res.status(400).json({
                message:"You are not authorised login first.",
                error:true,
                success:false
            }) 
        }
        
        let decode = jwt.verify(accessToken, process.env.SECRET_KEY);
        
        if(!decode){
            return res.status(401).json({
                message:"You are not authorised login first.",
                error:true,
                success:false
            }) 
        }
        
        req.userId = decode.id;
        next();
    }
    catch(err){
        return res.status(500).json({
            message:err.message || err,
            error:true,
            success:false
        }) 
    }
}