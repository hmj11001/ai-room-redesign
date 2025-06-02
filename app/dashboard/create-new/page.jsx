"use client"
import React, { useContext, useState } from 'react'
import ImageSelection from './_components/imageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebaseConfig'
import { useUser } from '@clerk/nextjs'
import CustomLoading from './_components/CustomLoading'
import AiOutputDialog from '../_components/AiOutputDialog'
import { db } from '@/config/db'
import { Users } from '@/config/schema'
import { UserDetailContext } from '@/app/_context/UserDetailContext'

function CreateNew() {
  // Initialize formData as an object
  const {user}=useUser();
  const [formData, setFormData] = useState({
    image: null,
    roomType: '',
    designType: '',
    additionalRequirement: ''
  });
  const [loading,setLoading]=useState(false);
  const [aiOutputImage,setAiOutputImage]=useState();
  const [openOutputDialog,setOpenOutputDialog]=useState(false);
  const [ogImage,setOgImage]=useState();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  // const [outputResult,setOutputResult]=useState();
  // Handle input changes for the form fields
  const onHandleInputChange = (value, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }

  // Generate AI Image by uploading the image and sending form data
  const GenerateAiImage = async () => {
    setLoading(true);
      const rawImageUrl = await SaveRawImageToFirebase(); // Get image URL after upload
      // Send form data to your API
      const result = await axios.post('/api/redesign-room', {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        additionalReq: formData?.additionalReq,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        ogImage: rawImageUrl
    });
    console.log(result.data);
    await updateUserCredits();
    setAiOutputImage(result.data.result); // output image url
    setOpenOutputDialog(true);
    
    setLoading(false);
    
  }

  // Upload image to Firebase Storage and get the download URL
  const SaveRawImageToFirebase = async () => {
    if (!formData.image) {
      console.error('No image selected!');
      return;
    }

    const fileName = Date.now() + "_raw.png"; // Generate a unique file name
    const imageRef = ref(storage, 'room-redesign/' + fileName);
    
    // Upload the image to Firebase Storage
    await uploadBytes(imageRef, formData.image).then(() => {
      console.log('File uploaded...');
    });

    // Get the download URL of the uploaded image
    const downloadUrl = await getDownloadURL(imageRef);
    console.log('Image URL:', downloadUrl);
    setOgImage(downloadUrl);
    return downloadUrl;
  }

  const updateUserCredits=async()=>{
    const result = await db.update(Users).set({
      credits:userDetail?.credits-1
    }).returning({id:Users.id});

    if(result){
       setUserDetail(prev=>({
        ...prev,
        credits:userDetail?.credits-1
       }))
        return result[0].id
    }
  }

  return (
    <div>
      <h2 className='font-bold text-4xl text-purple-600 text-center'>
        Experience the Magic of AI Remodeling
      </h2>
      <p className='text-center text-gray-500'>
        Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your living space.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
        {/* Image selection */}
        <ImageSelection selectedImage={(value) => onHandleInputChange(value, 'image')} />

        {/* Form input selection */}
        <div>
          {/* Room Type */}
          <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')} />
          
          {/* Design Type */}
          <DesignType selectedDesignType={(value) => onHandleInputChange(value, 'designType')} />
          
          {/* Additional Requirement TextArea (optional) */}
          <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, 'additionalRequirement')} />

          {/* Button To Generate Image */}
          <Button className='mt-5 bg-purple-600' onClick={GenerateAiImage}>
            Generate
          </Button>

          <p className='text-sm text-gray-400 mt-3 mb-52'>
            NOTE: 1 Credit will be used to design the room
          </p>
        </div>
      </div>
      <CustomLoading loading={loading}/>
      <AiOutputDialog 
        openDialog={openOutputDialog} 
        closeDialog={()=>setOpenOutputDialog(false)} 
        ogImage={ogImage}
        aiImage={aiOutputImage}
        />
    </div>
  );
}

export default CreateNew;
