import React from 'react'
import userImg from '../assets/user.png'
const ChatCard = ({user}) => {
  return (
    <div className='h-16 w-full px-3 flex justify-between items-center cursor-pointer hover:bg-gray-200'>
      {/* {console.log(user)} */}
        <div className='flex items-center gap-5 w-full text-nowrap'>
            <img className='h-9 rounded-full' src={userImg} alt='user'/>
            <p className='text-xl font-semibold'>{user && user?.name}</p>
        </div>
    </div>
  )
}

export default ChatCard
