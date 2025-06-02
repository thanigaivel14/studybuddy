import User from "../model/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const reg = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashPass = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({ username, email, password: hashPass });
     newUser.save().then(()=>console.log("data save")).catch((e)=>{
      console.log(e.message)
     });

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login= async(req,res)=>{
  const{email,password}=req.body;
  try{
    const user=await User.findOne({email});
    //checking user
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    //existing user
    const match=await bcrypt.compare(password,user.password)
    //checking password
       if (!match) return res.status(400).json({ message: "Invalid credentials" });
    
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ user, token });

  }
  catch(e){
    res.status(500).json({message:e.message})
  }
}
