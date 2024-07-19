import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import back from '../assets/back.png'
import { users } from '../constant'
import send from '../assets/send.png'
import MessageCard from './MessageCard'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/userChatsSlice'
import userChatsSlice from '../utils/userChatsSlice'
const ChatPage = () => {
  const [message, setMessage] = useState('');
  const chatMessages = useSelector(store => store.userChats.messages)
  const dispatch = useDispatch()
  function handleChange(e){
    setMessage(e.target.value);
  }
  function handleClick(){
    if(message.length > 0){
        dispatch(addMessage(message));
        console.log(chatMessages)
        setMessage('')
    }
  }
  return (
    <div className='h-screen w-screen'>
        <div className='h-[89] w-full p-3 flex gap-5 items-center border-b-2 border-black'>
            <Link to={'/chats'}><img className='w-7' src={back} alt='Go back' /></Link>
            <div className='flex h-fit w-full items-center gap-3'>
                <img className='w-10 rounded-full' src={users[0]?.img} alt='User Logo'/>
                <p className='text-xl'>Rishabh Pandey</p>
            </div>
        </div>
        <div className='h-[82%] py-2 px-3 w-full overflow-scroll flex flex-col flex-shrink-0 gap-2'>
            {
                chatMessages && chatMessages.map((message, index) => {
                    return <MessageCard key={index} message = {message}/>
                })
            }            
        </div>
        <div className='fixed bottom-0 left-0 h-[10%] bg-white w-full flex items-center justify-between px-3'>
            <input className='h-11 w-[85%] text-lg px-4 outline-none transition-all rounded-full border-2 bg-gray-300' type='text' name='search' placeholder='type message...' value={message} onChange={(e) => handleChange(e)}/>
            <img className='w-7' src={send} alt='send' onClick={() => handleClick()}/>
        </div>
    </div>
  )
}

export default ChatPage