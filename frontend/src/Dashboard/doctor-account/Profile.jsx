/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {AiOutlineDelete} from "react-icons/ai";
// import { Select, Option } from "@material-tailwind/react";
import { BASE_URL, token } from "../../config";
import {toast} from "react-toastify";

const Profile = ({doctorData}) => {
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        bio:"",
        gender:"",
        specialization:"",
        ticketPrice:0,
        qualifications:[],
        // experiences:[],
        timeSlots:[],
        about:''
    });


    useEffect(() => {
      setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?. about,
    });
  },[doctorData]);


    const handleInputChange = e =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    };

    const updateProfileHandler = async e =>{
      e.preventDefault();


      try{
        const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
                  method:'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-token': token,
                    },
                    body:JSON.stringify(formData)
        })
        const result = await res.json()
        if(!res.ok){
          throw Error(result.message)
        }
        toast.success(result.message);
      }catch(err){
        toast.error(err.message);
      }
    };


    //reusable function for adding item
    const addItem = (key, item)=>{
      setFormData(prevFormData => ({...prevFormData, [key]:[...prevFormData[key],item]}))
    }
    
    // reusable input change function
    const handleReusableInputChangeFunc = (key, index, event) =>{
      const {name, value} = event.target
      setFormData(prevFormData =>{
        const updateItems = [...prevFormData[key]]
        updateItems[index][name] = value;
        return{
          ...prevFormData,
          [key]:updateItems,
        };
      });
    };


    //reusable function for deletingitem
    const deleteItem = (key, index) =>{
      setFormData(prevFormData => ({
        ...prevFormData,
        [key] : prevFormData[key].filter((_, i)=>i != index),
      }));
    };


    // for timeslots
    const addTimeSlot = e =>{
      e.preventDefault();

      addItem('timeSlots',{day:'', startingTime:'', endingTime:''})
    };

    const handleTimeSlotChange = (event, index) =>{
      handleReusableInputChangeFunc('timeSlots', index, event)
    };

    const deleteTimeSlot  = (e, index) =>{
      e.preventDefault()
      deleteItem('timeSlots',index)
    };


    // for qualification
    const addQualification = e =>{
      e.preventDefault();

      addItem('qualifications',{
        startingDate:'', endingDate:'', degree:'', university:''
      })
    };

    const handleQualificationChange = (event, index) =>{
      handleReusableInputChangeFunc('qualifications', index, event)
    };

    const deleteQualification = (e, index) =>{
      e.preventDefault()
      deleteItem('qualifications',index)
    };

  return (
    <div>
        <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
            Profile Information 
        </h2>

        <form>
          <div className="mb-5">
          <label className="block text-sm font-medium mb-2 ">Name*</label>
          <input className="shadow focus:ring-blue-500 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:shadow-outline " type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name"/>
          </div>

          <div className="mb-5">
          <label className="block text-sm font-medium mb-2 ">Email*</label>
          <input className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" readOnly aria-readonly disabled="true"/>
          </div>

          <div className="mb-5">
          <label className="block text-sm font-medium mb-2 ">Phone*</label>
          <input className="shadow appearance-none focus:ring-blue-500 border rounded w-full py-3 px-3 text-gray-700 leading-tight  focus:shadow-outline" type="number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number"/>
          </div>

          <div className="mb-5">
          <label className="block text-sm font-medium mb-2 ">Bio*</label>
          <input className="shadow  border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline" type="text" name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Bio" maxLength={100}/>
          </div>

          <div className="mb-5">
            <div className="grid grid-cols-3 gap-5 mb-[30px]">
              <div>
              <label className="block text-sm font-medium mb-2 ">Gender*</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="shadow border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline" >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
              </div>

              <div>
              <label className="block text-sm font-medium mb-2 ">Specialization*</label>
                  <select name="specialization" value={formData.specialization} onChange={handleInputChange} className="shadow border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline" >
                    <option value="">Select</option>
                    <option value="surgeon">Surgeon</option>
                    <option value="neurologist">Neurologist</option>
                    <option value="dermatologist">Dermatologist</option>
                  </select>
              </div>

              <div>
              <label className="block text-sm font-medium mb-2 ">Ticket Price*</label>
              <input className="shadow  border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline" type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleInputChange} placeholder="100"/>
              </div>
            </div>
          </div>

          <div className="mb-5">
          <label className="block text-sm font-medium mb-2 ">Qualifications*</label>
          {formData.qualifications?.map((item, index) => (
          <div key={index}>
            <div>
              <div className="grid grid-cols-2 gap-5">
                  <div>
                  <label className="block text-sm font-medium mb-2 ">Starting Date*</label>
                  <input className="shadow  border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline" type="date" name="startingDate" value={item.startingDate} onChange={e=>handleQualificationChange(e, index)}/>
                  </div>

                  <div>
                  <label className="block text-sm font-medium mb-2 ">Ending Date*</label>
                  <input className="shadow  border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline" type="date" name="endingDate" value={item.endingDate} onChange={e=>handleQualificationChange(e, index)}/>
                  </div>
              </div>


              <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                  <label className="block text-sm font-medium mb-2 ">Degree*</label>
                  <input className="shadow  border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline" type="text" name="degree" value={item.degree} onChange={e=>handleQualificationChange(e, index)}/>
                  </div>

                  <div>
                  <label className="block text-sm font-medium mb-2 ">University*</label>
                  <input className="shadow  border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline" type="text" name="university" value={item.university} onChange={e=>handleQualificationChange(e, index)}/>
                  </div>
              </div>


              <button onClick={e=>deleteQualification(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"><AiOutlineDelete /></button>
            </div>
          </div>))}

          <button onClick={addQualification} className="bg-[#000]   py-2 px-5 rounded text-white h-fit cursor-pointer">Add Qualification</button>
          </div>

          <div className="mb-5">
          <label className="block text-sm font-medium mb-2 ">Time Slots*</label>
          {formData.timeSlots?.map((item, index) => (
          <div key={index}>
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                  <label className="block text-sm font-medium mb-2 ">Day*</label>
                  <select name="day" value={item.day} onChange={e=>handleTimeSlotChange(e, index)} className="shadow border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline" >
                    <option value="">Select</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                  </select>
                  </div>
                 

                  <div>
                    <label className="block text-sm font-medium mb-2">Starting Time*</label>
                    <input
                      className="shadow border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline"
                      type="time"
                      value={item.startingTime || ''}
                      name="startingTime"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>

                  <div>
                  <label className="block text-sm font-medium mb-2 ">Ending Time*</label>
                  <input className="shadow  border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:shadow-outline" type="time" name="endingTime" value={item.endingTime || ''}  onChange={e=>handleTimeSlotChange(e, index)}/>
                  </div>

                  <div className="flex items-center">
                  <button onClick={e=>deleteTimeSlot(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer mt-6"><AiOutlineDelete /></button>
                  </div>

              </div>
            </div>
          </div>))}

          <button onClick={addTimeSlot} className="bg-[#000]   py-2 px-5 rounded text-white h-fit cursor-pointer">Add TimeSlot</button>
          </div>

          <div className="mb-5">
          <label className="block text-sm font-medium mb-2 ">About*</label>
          <textarea name="about" rows={5} value={formData.about} placeholder="Write about your Hospital" onChange={handleInputChange}
          className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
          </div>

          <div className="mt-7">
          <button  type="submit" onClick={updateProfileHandler} className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">
    Update Profile
</button>

          </div>
        </form>

    </div>
  )
}

export default Profile
