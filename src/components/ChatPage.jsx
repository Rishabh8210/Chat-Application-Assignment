import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import back from '../assets/back.png'
import userImg from './../assets/user.png'
import send from '../assets/send.png'
import ReveiverMessageCard from './ReveiverMessageCard'
import SenderMessageCard from './SenderMessageCard'
import axios from 'axios'
import { decodeJWT } from '../utils/helper'
import { io } from 'socket.io-client'
const ChatPage = () => {
  const { id } = useParams()
  const [chatMessages, setChatMessages] = useState([]);
  const [user, setUser] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState('')
  const token = localStorage.getItem('token')


  const [userId, setUserId] = useState(null)
  const [isOnline, setIsOnline] = useState(false);
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('https://chat-app-backend-mgkx.onrender.com'))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = decodeJWT(token)
      setUserId(response?.userId)
      console.log(response?.userId)
      socket?.emit("addUser", response?.userId);
      socket?.on("getUsers", (users) => {
        console.log("Online Users:", users);
        setOnlineUsers(users)
      });
      socket?.on('getMessage', (data) => {
        console.log("Receiverd data", data);
        setChatMessages(prevMessages => [...prevMessages, data]);
      })
    }
  }, [socket]);
  useEffect(() => {
    function checkOnline(){
      if(onlineUsers){
        const filter = onlineUsers.filter((online) => online?.userId == id)
        if(filter.length > 0)
          setIsOnline(true);
        else{
          setIsOnline(false);
        }
      }
    }
    checkOnline();
  }, [onlineUsers])
  useEffect(() => {
    
    async function getDetails() {
      try {
        const currUser = await axios.get(`https://chat-app-backend-mgkx.onrender.com/api/v1/users/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        setUser(currUser?.data?.data)
      } catch (err) {
        console.log(err)
      }
    }
    getDetails();
  }, [id])

  useEffect(() => {
    
    async function fetchMessages() {
      try {
        const fetchedMessages = await axios.get(`https://chat-app-backend-mgkx.onrender.com/api/v1/conversations/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        console.log(fetchedMessages?.data?.data);
        setChatMessages(fetchedMessages?.data?.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessages();
  }, [])

  function handleChange(e) {
    setMessage(e.target.value);
  }
  async function handleClick() {

    if (message.length > 0) {
      console.log(userId, id, message)
      socket?.emit('sendMessage', {
        senderId: userId,
        receiverId: id,
        message: message
      })
      const data = {
        receiverId: id,
        message: message
      }
      try {
        const saveMessage = await axios.post(`https://chat-app-backend-mgkx.onrender.com/api/v1/conversations`, data, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        // console.log(saveMessage?.data?.data);
        // setChatMessages(saveMessage?.data?.data);
      } catch (error) {
        console.log(error)
      }
      setMessage('');
    }
  }
  if (!token) {
    return window.location = '/'
  }
  return (
    <div className='h-screen w-screen'>
      <div className='h-[89] w-full p-3 flex gap-5 items-center border-b-2 border-black'>
        <Link to={'/chats'}><img className='w-7' src={back} alt='Go back' /></Link>
        <div className='flex h-fit w-full items-center gap-3'>
          <img className='w-10 rounded-full' src={userImg} alt='User Logo' />
          <p className='text-xl'>{user?.name}</p>
          {
            isOnline ? <p className='font-semibold'>Online</p> : <p className='font-semibold'>Offline</p>
          }
        </div>
      </div>
      <div className='h-[82%] py-2 px-3 w-full overflow-scroll flex flex-col flex-shrink-0 gap-2'>
        {
          chatMessages && chatMessages.map((message, index) => {
            if (message?.receiverId != id)
              return <ReveiverMessageCard key={message?.id} message={message} />
            else
              return <SenderMessageCard key={message?.id} message={message} />
          })
        }
      </div>
      <div className='fixed bottom-0 left-0 h-[10%] bg-white w-full flex items-center justify-between md:justify-center md:gap-10 px-3'>
        <input className='h-11 w-[90%] text-lg px-4 outline-none transition-all rounded-full border-2 bg-gray-300' type='text' name='search' placeholder='type message...' value={message} onChange={(e) => handleChange(e)} />
        <img className='w-7' src={send} alt='send' onClick={() => handleClick()} />
      </div>
    </div>
  )
}

export default ChatPage
