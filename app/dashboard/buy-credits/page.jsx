"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

function BuyCredits() {
  const creditsOption = [
    { credits: 5, amount: 0.99 },
    { credits: 10, amount: 1.99 },
    { credits: 25, amount: 4.99 },
    { credits: 50, amount: 6.99 },
    { credits: 100, amount: 9.99 }
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="space-y-4">
      <h2 className='font-bold text-2xl'>Buy More Credits</h2>
      <p>Unlock endless possibilities - Buy more credits to transform every room in your space!</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {creditsOption.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 justify-center items-center border-2 rounded-xl p-4 shadow-sm transition hover:shadow-md cursor-pointer ${
              selectedOption?.credits === item.credits ? 'border-purple-600' : 'border-gray-200'
            }`}
            onClick={() => setSelectedOption(item)}
          >
            <h2 className='font-bold text-3xl'>{item.credits}</h2>
            <h3 className='font-medium text-xl'>Credits</h3>
            <Button className="w-full bg-purple-600" onClick={() => setSelectedOption(item)}>
              Buy Now
            </Button>
            <h3 className='font-medium text-purple-600'>${item.amount}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyCredits;
