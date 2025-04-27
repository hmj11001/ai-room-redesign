"use client" 
import React from 'react'
import ImageSelection from './_components/imageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'

function CreateNew() {

const onHandleInputChange=(value,fieldName)=>{

}

  return (
    <div>
        <h2 className='font-bold text-4xl text-purple-600 text-center'>Experience the Magic of AI Remodeling</h2>
        <p className='text-center text-gray-500'>Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your living space.</p>
        
        <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
        {/* Image selection */}
        <ImageSelection selectedImage={(value)=>onHandleInputChange(value, 'image') } />
        {/* Form input selection */}
        <div>
            {/* Room Type */}
            <RoomType selectedRoomType={(value)=>onHandleInputChange(value, 'roomType') }/>
            {/* Design Type */}
            <DesignType selectedDesignType={(value)=>onHandleInputChange(value, 'designType')}/>
            {/* Additional Requirement TextArea (optional) */}

            {/* Button To Generate Image */}
        </div>
        </div>    
    </div>
  )
}

export default CreateNew