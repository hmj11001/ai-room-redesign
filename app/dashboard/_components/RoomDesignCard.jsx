import React from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

function RoomDesignCard({ room }) {
  return (
    <div className='shadow-md rounded-md p-4'>
      <ReactBeforeSliderComponent
        firstImage={{ imageUrl: room.aiImage }}
        secondImage={{ imageUrl: room.ogImage }}
      />
      <h2 className='mt-4'>
        {room.designType} {room.roomType} Makeover
      </h2>
    </div>
  );
}

export default RoomDesignCard;
