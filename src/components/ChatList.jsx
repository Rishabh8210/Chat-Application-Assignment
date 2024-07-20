import React, { useEffect, useState } from 'react'
import search from '../assets/search.png'
import dots from '../assets/dots.png'
// import { users } from '../constant'
import ChatCard from './ChatCard'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { decodeJWT } from '../utils/helper'
const ChatList = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [searchedItem, setSearchedItem] = useState('');
  const [searchedUser, setSearchedUser] = useState([]);
  const [filerSearchUser, setFilteredUser] = useState([])
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    async function getData(){
      if (!localStorage.getItem('token')) {
        return window.location = '/'
      }
      const { userId } = decodeJWT(token);
      try {
        const response = await axios.get('http://localhost:3001/api/v1/users/chats', {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        let users = response?.data?.data;
        let filteredUsers = users.filter((user) => user.id !== userId)
        setSearchedUser(filteredUsers);
        setFilteredUser(filteredUsers)
      } catch (error) {
        console.log(error)
      }
    }

    getData();
  }, [])


  const handleChange = (e) => {
    const value = e.target.value;
    setSearchedItem(value);
    // console.log(value);

    if (value.length > 0) {
      const filter = prefixFilter(filerSearchUser, value, e);
      setSearchedUser(filter);
    }
    if (value.length == 0)
      setSearchedUser(filerSearchUser);
  };

  const handleClick = () => {
    localStorage.clear('token')
    window.location = '/';
  };

  const prefixFilter = (searchedUser, value) => {
    return searchedUser.filter((user) => user.name.toLowerCase().includes(value.toLowerCase()));
  };
  if (!localStorage.getItem('token')) {
    return window.location = '/'
  }
  return (
    <div className='min-h-screen overflow-auto'>
      <div className='h-14 w-screen flex px-3 justify-between items-center shadow-sm'>
        {
          isSearchOpen ? <div className='flex flex-col w-full relative'>
            <input className='h-11 w-[75%] text-lg px-2 outline-none border-b-2 transition-all' type='text' name='search' placeholder='Search' onChange={(e) => handleChange(e)} />

          </div> :
            <h1 className='text-xl uppercase font-bold transition-all'>Convocave</h1>
        }
        <div className='h-full w-fit flex gap-5 justify-center items-center relative'>
          <img className='w-6' src={search} alt='Search' onClick={() => { setSearchOpen(!isSearchOpen) }} />
          <img className='h-7' src={dots} alt='menu' onClick={() => setMenuOpen(!isMenuOpen)} />
        </div>
        {
          isMenuOpen && <div className='h-fit bg-white w-44 px-3 py-2 flex flex-col absolute right-0 top-12 shadow-xl rounded-lg'>
            <Link to={'/profile'} className='w-full text-xl p-2 hover:font-semibold'>Profile</Link>
            <button className='w-full text-left text-xl p-2 hover:font-semibold' onClick={() => handleClick()}>Logout</button>
          </div>
        }
      </div>
      <div className='py-3 h-full w-full flex flex-col gap-1'>
        {
          searchedUser ? (searchedUser.length == 0 ? <p className='p-2 text-md font-semibold text-center text-red-700'>No user found !</p> :
            searchedUser.map((user, index) => {
              return <Link to={`/chat/${user?.id}`}><ChatCard user={user} key={user?.id} /></Link>
            })) : <></>
        }
      </div>
    </div>
  )
}

export default ChatList
