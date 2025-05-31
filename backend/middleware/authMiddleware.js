import jwt from 'jsonwebtoken';
const authMiddleware =(req,res,next)=>{
    
      const authHeader = req.headers.authorization;
      
     // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: "Authentication required" });
  }
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  
  const token =  authHeader.split(' ')[1];
  try{
   const decoded= jwt.verify(token,process.env.JWT_SECRET)
   req.id=decoded.id;  
    next();

  }
  catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
export default authMiddleware;