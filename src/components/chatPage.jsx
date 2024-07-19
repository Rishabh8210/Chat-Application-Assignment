import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import back from '../assets/back.png'
import { users } from '../constant'
import userImg from './../assets/user.png'
import send from '../assets/send.png'
import ReveiverMessageCard from './ReveiverMessageCard'
import SenderMessageCard from './SenderMessageCard'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/userChatsSlice'
import userChatsSlice from '../utils/userChatsSlice'
import axios from 'axios'
import { decodeJWT } from '../utils/helper'
import { io } from 'socket.io-client'
const ChatPage = () => {
  const {id} = useParams()
  const [chatMessages, setChatMessages] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('')
  // const token = localStorage.getItem('token');
  const token = localStorage.getItem('token')
  
  
  const [userId, setUserId] = useState(null)
  const [isNavOpen, setNavOpen] = useState(false);
  const [socket, setSocket] = useState(null)
  
  useEffect(() => {
    setSocket(io('http://localhost:8000'))
  }, [])
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      const response = decodeJWT(token)
      setUserId(response?.userId)
      console.log(response?.userId)
      socket?.emit("addUser", response?.userId);
      socket?.on("getUsers", (users) => {
        console.log("Online Users:", users);
      });
      socket?.on('getMessage', (data) => {
        console.log("Receiverd data", data);
        setChatMessages(prevMessages => [...prevMessages, data]);
      })
    }
  }, [socket]);
  useEffect(() => {
    async function getDetails(){
      try{
        const currUser = await axios.get(`http://localhost:3001/api/v1/users/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        // console.log(currUser?.data?.data)
        setUser(currUser?.data?.data)
      }catch(err){
        console.log(err)
      }
    } 
    getDetails();
  }, [id])
  
  useEffect(() => {
    async function fetchMessages(){
      try {
        const fetchedMessages = await axios.get(`http://localhost:3001/api/v1/conversations/${id}`, {
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

  // const dispatch = useDispatch()
  function handleChange(e){
    setMessage(e.target.value);
  }
  async function handleClick(){

    if(message.length > 0){
      console.log(userId, id, message)
      socket?.emit('sendMessage', {
        senderId: userId,
        receiverId: parseInt(id),
        message: message
      })
      const data = {
        receiverId: id,
        message: message
      }
      try {
        const saveMessage = await axios.post(`http://localhost:3001/api/v1/conversations`,data, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        console.log(saveMessage?.data?.data);
        // setChatMessages(saveMessage?.data?.data);
      } catch (error) {
        console.log(error)
      }
      setMessage('');
    }
  }
  if(!token) {
    return window.location = '/'
  }
  return (
    <div className='h-screen w-screen'>
        <div className='h-[89] w-full p-3 flex gap-5 items-center border-b-2 border-black'>
            <Link to={'/chats'}><img className='w-7' src={back} alt='Go back' /></Link>
            <div className='flex h-fit w-full items-center gap-3'>
                <img className='w-10 rounded-full' src={userImg} alt='User Logo'/>
                <p className='text-xl'>{user?.name}</p>
            </div>
        </div>
        <div className='h-[82%] py-2 px-3 w-full overflow-scroll flex flex-col flex-shrink-0 gap-2'>
            {
                chatMessages && chatMessages.map((message, index) => {
                    if(message?.receiverId != id)
                       return <ReveiverMessageCard key={message?.id} message={message} />
                    else
                      return <SenderMessageCard key={message?.id} message = {message}/>
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


// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import back from '../assets/back.png';
// import userImg from './../assets/user.png';
// import send from '../assets/send.png';
// import ReceiverMessageCard from './ReveiverMessageCard';
// import SenderMessageCard from './SenderMessageCard';
// import axios from 'axios';
// import { decodeJWT } from '../utils/helper';
// import { io } from 'socket.io-client';

// const ChatPage = () => {
//   const { id } = useParams();
//   const [chatMessages, setChatMessages] = useState([]);
//   const [user, setUser] = useState('');
//   const [message, setMessage] = useState('');
//   const token = localStorage.getItem('token');
//   const [userId, setUserId] = useState(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:8000');
//     setSocket(newSocket);
//     return () => newSocket.close();
//   }, []);

//   useEffect(() => {
//     if (token) {
//       const response = decodeJWT(token);
//       setUserId(response?.userId);
//     }
//   }, []);

//   useEffect(() => {
//     if (socket && userId) {
//       console.log(userId)
//       socket.emit('addUser', userId);
//       socket.on('getUsers', (users) => {
//         console.log('Online Users:', users);
//       });

//       socket.on('getMessage', (data) => {
//         console.log('Received data', data, chatMessages);
//         setChatMessages((prevMessages) => [...prevMessages, data]);
//       });

//       return () => {
//         socket.off('getUsers');
//         socket.off('getMessage');
//       };
//     }
//   }, [socket]);

//   useEffect(() => {
//     async function getDetails() {
//       try {
//         const currUser = await axios.get(`http://localhost:3001/api/v1/users/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(currUser?.data?.data);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     getDetails();
//   }, []);

//   useEffect(() => {
//     async function fetchMessages() {
//       try {
//         const fetchedMessages = await axios.get(`http://localhost:3001/api/v1/conversations/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setChatMessages(fetchedMessages?.data?.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchMessages();
//   }, []);

//   function handleChange(e) {
//     setMessage(e.target.value);
//   }

//   async function handleClick() {
//     if (message.length > 0) {
//       const data = {
//         senderId: userId,
//         receiverId: parseInt(id),
//         message: message,
//       };
//       socket?.emit('sendMessage', data);

//       try {
//         await axios.post('http://localhost:3001/api/v1/conversations', data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setChatMessages((prevMessages) => [...prevMessages, data]);
//         setMessage('');
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }

//   if (!token) {
//     return (window.location = '/');
//   }

//   return (
//     <div className='h-screen w-screen'>
//       <div className='h-[89] w-full p-3 flex gap-5 items-center border-b-2 border-black'>
//         <Link to={'/chats'}>
//           <img className='w-7' src={back} alt='Go back' />
//         </Link>
//         <div className='flex h-fit w-full items-center gap-3'>
//           <img className='w-10 rounded-full' src={userImg} alt='User Logo' />
//           <p className='text-xl'>{user?.name}</p>
//         </div>
//       </div>
//       <div className='h-[82%] py-2 px-3 w-full overflow-scroll flex flex-col flex-shrink-0 gap-2'>
//         {chatMessages &&
//           chatMessages.map((message, index) => {
//             if (message.senderId === userId) {
//               return <SenderMessageCard key={message.id} message={message} />;
//             } else {
//               return <ReceiverMessageCard key={message.id} message={message} />;
//             }
//           })}
//       </div>
//       <div className='fixed bottom-0 left-0 h-[10%] bg-white w-full flex items-center justify-between px-3'>
//         <input
//           className='h-11 w-[85%] text-lg px-4 outline-none transition-all rounded-full border-2 bg-gray-300'
//           type='text'
//           name='search'
//           placeholder='type message...'
//           value={message}
//           onChange={(e) => handleChange(e)}
//         />
//         <img className='w-7' src={send} alt='send' onClick={() => handleClick()} />
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
