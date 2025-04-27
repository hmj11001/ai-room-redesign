import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function EmptyState() {
  return (
    <div className='flex items-center justify-center mt-10 flex-col'>
        <Image src={'/bedroom.png'} 
        width={200} height={200} alt="bedroom"/>
        <h2 className='font-medium text-lg text-gray-500'> Create New AI Room Makeover</h2>
        <Button className='bg-purple-600 text-white mt-5'>Redesign Room</Button>

    </div>
  )
}

export default EmptyState