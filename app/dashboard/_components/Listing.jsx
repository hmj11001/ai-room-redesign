"use client"

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import EmptyState from './EmptyState';
import Link from 'next/link';
import { db } from '@/config/db';
import { AiGeneratedImage } from '@/config/schema';
import { eq } from 'drizzle-orm';
import RoomDesignCard from './RoomDesignCard';

function Listing() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      console.log("User is ready, calling GetUserRoomList");
      GetUserRoomList();
    } else {
      console.log("Waiting for user to load or sign in...");
    }
  }, [isLoaded, isSignedIn, user]);

  const GetUserRoomList = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress.toLowerCase();
      console.log("Using email for query:", email);

      const result = await db
        .select()
        .from(AiGeneratedImage)
        .where(eq(AiGeneratedImage.userEmail, email));

      console.log("Fetched rooms:", result);
      setUserRoomList(result);
    } catch (error) {
      console.error("Error fetching room list:", error);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='font-bold text-3xl'>Hello, {user?.fullName}</h2>
        <Link href='/dashboard/create-new'>
          <Button className='bg-purple-600 text-white'>Redesign Room</Button>
        </Link>
      </div>

      {userRoomList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='mt-10'>
            <h2 className='font-medium text-purple-600 text-xl mb-10'>AI Room Studio</h2>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {userRoomList.map((room, index) => (
            <RoomDesignCard key={index} room={room} />
          ))}
        </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
