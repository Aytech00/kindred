import Image from 'next/image';
import React from 'react'
import circles from "../../../public/circles.png"
export default function LeftSideBar() {
  return (
    <aside className="w-60 hidden md:block bg-kindred-primary border-r border-gray-200 flex flex-col">
   
      <div className="flex justify-center py-4">
        <Image src={circles} width={70} height={70} alt='circle' />
      </div>

      <div className="p-6 text-center border-gray-200">
      
        <h2 className="text-lg font-semibold mb-1">Unified Persona</h2>
        <p className="text-sm text-gray-500">Type your name here</p>
      </div>
    </aside>
  );
}
