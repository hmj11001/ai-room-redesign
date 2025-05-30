import Image from 'next/image'
import React, { useState } from 'react'

function DesignType({selectedDesignType}) {
    const Designs=[
        {
            name: 'Modern',
            image: '/modern.png',
        },
        {
            name: 'Traditional',
            image: '/traditional.png',
        },
        {
            name: 'Rustic',
            image: '/rustic.png',
        },
        {
            name: 'Minimalist',
            image: '/minimalist.png',
        },
        {
            name: 'Industrial',
            image: '/industrial.png',
        },
        {
            name: 'Bohemian',
            image: '/bohemian.png',
        }
    ]
    const [selectedOption,setSelectedOption]=useState();
  return (
    <div className='mt-5'>
        <label className='text-gray-500'>Select Interior Design Style</label>
        <div className='grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {Designs.map((design,index)=>(
                <div key={index} onClick={()=>{setSelectedOption(design.name);selectedDesignType(design.name)}}>
                    <Image src={design.image} width={100} height={100} alt='Example interior'
                    className={`h-[100px] w-[100px] rounded-md hover:scale-105 transition-all cursor-pointer' ${design.name==selectedOption&&'border-2 border-purple-500 rounded-md p-1'} `}/>
                    <h2>{design.name}</h2>
                    </div>
            ))}
        </div>
    </div>
  )
}

export default DesignType