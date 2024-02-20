import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import { decode } from "punycode";

export const authenticate = async(req, res, next) =>{
    // get token from headers
    // const authToken = req.headers.authorization;
    let authToken = req.header('x-token');
    // console.log(authToken);

    // check token is exists
    if(!authToken){
        return res.status(401).json({success:false, message:"No token, authorization denied"});
    }
    try{
        // const token = authToken.split(" ")[1];
       
        // verify token
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        
        // let decoded = jwt.verify(authToken,'jwtSecret');
        console.log(decoded);
        req.userId = decoded.id
        req.role = decoded.role
        next();
    }catch(err)
    {
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({message: "Token is expired"});
        }
        return res.status(401).json({success:false, message:"Invalid token"});
    }
};

export const restrict =roles => async(req, res, next)=>{
    const userId = req.userId;
    let user;
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if(patient){
        user = patient;
    }
    if(doctor){
        user=doctor;
    }
    if(!roles.includes(user.role)){
        return res.status(401).json({success:false, message:"You are not authorized"});
    }
    next();
};