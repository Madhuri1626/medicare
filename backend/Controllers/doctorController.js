import BookingSchema from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";


export const updateDoctor = async(req,res)=>{
    const id = req.params.id;
    try{
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set:req.body}, {new:true});
        res.status(200).json({success:true, message:'Successfully updated', data:updatedDoctor});
    }
    catch(err)
    {
        res.status(500).json({success:false, message:'Failed to update'});
    }
}

export const deleteDoctor = async(req,res)=>{
    const id = req.params.id;
    try{
        await Doctor.findByIdAndDelete(id);
        res.status(200).json({success:true, message:'Successfully deleted',});
    }
    catch(err)
    {
        res.status(500).json({success:false, message:'Failed to delete'});
    }
}


export const getSingleDoctor = async(req,res)=>{
    const id = req.params.id;
    try{
        const doctor = await Doctor.findById(id).select("-password");
        res.status(200).json({success:true, message:'Doctor Found', data:doctor});
    }
    catch(err)
    {
        res.status(404).json({success:false, message:'No Doctor found'});
    }
}

export const getAllDoctor = async(req,res)=>{
    try{
        const doctors = await Doctor.find({}).select("-password");
        res.status(200).json({success:true, message:'Doctors found', data:doctors});
    }
    catch(err)
    {
        res.status(500).json({success:false, message:'Not found'});
    }
}



export const getDoctorProfile = async(req, res)=>{
    const doctorId = req.userId;
    try{
        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            return res.status(404).json({success:false, message:'Doctor not found'})
        }
        const {password, ...rest} = doctor._doc;
        const appointments = await BookingSchema.find({doctor:doctorId});
        console.log(appointments)
        res.status(200).json({success:true, message:'Profile info is getting', data:{...rest,appointments
        }})
    }catch(err){
        res.status(500).json({success:false, message:'Something went wrong, cannot get'});
    }
};
