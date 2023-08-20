import React from 'react'

export default function  UserProfile ({params}:any) {
  return (
    <div className='flex items-center justify-center min-h-screen' >
        <h1 className='text-3xl'>

        User Profile
         <span className='text-white bg-red-600 px-3'>
            {params.id}
        </span>
        </h1>
    </div>
  )
}
