import React from 'react'
import {useRouter} from 'next/navigation'

const ViewSchedule = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/schedule')
  }
  return (
    
        <div onClick={handleClick} className='w-48 h-8 rounded-full bg-offGrey text-base text-black font-subTitle flex items-center justify-center cursor-pointer active:scale-[.98] active:duration-75 hover:scale-[1.07] ease-in-out transition-all'>
            View Schedule
        </div>
    
  )
}

export default ViewSchedule