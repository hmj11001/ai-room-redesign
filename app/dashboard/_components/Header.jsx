"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';

function Header() {
    const {userDetail, setUserDetails} = useContext(UserDetailContext);
  return (
    <div className='p-5 shadow-sm flex justify-between items-center'>   {/*creates the line under the header to separate sections*/}
        <div className='flex gap-2 items-center'>
        <Image src={'/logo.svg'} width={40} height={40} alt="logo"/>
        <h2 className='font-bold text-lg'>AI Room Makeover</h2>
        </div>
        <Button variant="ghost" className="rounded-full text-purple-600">Buy More Credits</Button>
        <div className='flex gap-7 items-center'>
            <div className='flex gap-2 p-1 items-center bg-slate-200 px-3 rounded-2xl'>
                <Image src={'/coin.png'} width={30} height={30} alt="coin"/>
                <h2>{userDetail?.credits}</h2>
            </div>
            <UserButton />
        </div>
    </div>
  )
}

export default Header