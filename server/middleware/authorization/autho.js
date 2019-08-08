import jwt from "jsonwebtoken";
const autho = (req, res, next)=>{
    const token = req.header("token");
    if(!token) return res.status(401).send("access denied. token not found")

        const decodedToken = jwt.decode(token,/*"jwtPrivateKey"*/ "izzeddin");
        if(decodedToken === null)return res.status(400).json({status:400, error:"invalid token"});
        req.user = decodedToken;
  next()
        
}
export default autho;