import React, { useState } from 'react'
import hamburg from '../assets/hamburg.png'
import login from '../assets/login.png'
import MainLogo from '../assets/MainLogo.png'
import Signin from './Signin'

const NavBar = ({trigger, setTrigger}) => {
    return (
        <div className='absolute top-0 left-0 bg-white h-screen w-screen px-5 py-2'>
            <div className='h-14 flex justify-end items-center'>
                <button className='h-10 w-10 text-base text-white bg-black hover:bg-white hover:text-black hover:border-2 hover:border-black rounded-lg font-bold' onClick={() => setTrigger(!trigger)}>X</button>
            </div>
            <h1 className='text-2xl uppercase font-bold'>Convocave</h1>
            <ul className='h-fit py-10 w-full flex flex-col gap-5'>
                <li className='text-3xl border-b-2 font-semibold'>Home</li>
                <li className='text-3xl hover:border-b-2 hover:font-semibold'>About Us</li>
                <li className='text-3xl hover:border-b-2 hover:font-semibold'>Services</li>
                <li className='text-3xl hover:border-b-2 hover:font-semibold'>Contact</li>
            </ul>
        </div>
    )
}

const Homepage = () => {
  const [isSignInOpen, setSignInOpen] = useState(false)
  const [isNavOpen, setNavOpen] = useState(false);
  function handleClick(){
    setSignInOpen(!isSignInOpen)
  }
  return (
    <div className='min-h-screen w-screen'>
        <div className='bg-white h-12 w-screen flex p-1.5 justify-between items-center'>
            <img className='h-9' src={hamburg} alt='#' onClick={() => setNavOpen(!isNavOpen)}/>
            <h1 className='text-xl uppercase font-bold'>Convocave</h1>
            <img className='h-7' src={login} alt='#' onClick={() => handleClick()}/>
        </div>
        <div className=' min-h-[50vh] flex flex-col items-center justify-center py-10 px-5 gap-2'>
            <img className='w-[50%]' src={MainLogo} alt='Image'/>
            <p className='text-4xl font-bold uppercase'>CONVOCAVE</p>
            <p className='text-lg text-gray-600'>a new era of talking</p>
            <div className='h-fit w-full text-center py-5'>
                <p>Let's start talking with our <span className='text-lg font-bold'>Convocave</span> – where every conversation weaves a story.</p>
            </div>
            <div className='h-fit w-full flex justify-center py-5'>
                <button className='h-12 w-32 border-2 border-black rounded-lg text-xl font-semibold hover:bg-black hover:text-white uppercase tracking-wide' onClick={() => handleClick()}>GetIn</button>
            </div>
        </div>
        {isSignInOpen && <Signin trigger = {isSignInOpen} setTrigger = {setSignInOpen}/>}
        {isNavOpen && <NavBar trigger={isNavOpen} setTrigger = {setNavOpen}/>}
    </div>
  )
}

export default Homepage