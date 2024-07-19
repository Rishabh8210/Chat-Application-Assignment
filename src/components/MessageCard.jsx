import React from 'react'

const MessageCard = ({message}) => {
  return (
    <div className='h-fit w-full flex items-center justify-end'>
        <p className='w-[85%] py-2 px-3 bg-gray-300 rounded-lg'>{message}</p>
    </div>
  )
}

export default MessageCard