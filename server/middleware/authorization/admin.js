const admin = (req, res, next)=>{
    console.log(req.user)
    if(req.user.is_admin==false){
        return res.status(403).json({status:403, error:"access denied"});
    }
    
    next();
    
}
export default admin