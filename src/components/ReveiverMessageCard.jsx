import React from 'react'

const ReveiverMessageCard = ({message}) => {
  return (
    <div className='h-fit w-full flex items-center justify-start'>
        <p className='max-w-[85%] w-fit py-2 px-3 bg-gray-400 rounded-lg'>{message?.message}</p>
    </div>
  )
}

export default ReveiverMessageCard