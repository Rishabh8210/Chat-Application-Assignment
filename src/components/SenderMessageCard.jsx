import React from 'react'

const SenderMessageCard = ({message}) => {
  return (
    <div className='h-fit w-full flex items-center justify-end'>
        <p className='max-w-[85%] w-fit break-words py-2 px-3 bg-gray-300 rounded-lg'>{message?.message}</p>
    </div>
  )
}

export default SenderMessageCard