import React from 'react'

const Confirmation = ({ trigger, setTrigger, handleDelete }) => {
    return (
        <div className='fixed z-20 top-0 left-0 h-screen w-full px-5 flex flex-col justify-center items-center bg-zinc-800 bg-opacity-50'>
            <div className='min-h-[30vh] max-h-[50vh] w-full sm:w-[65%] lg:w-[45%] bg-white shadow-lg flex flex-col items-center rounded-lg p-5'>
                <div className='h-10 w-full px-2 flex justify-end'>
                    <button className='h-10 w-10 text-base text-white bg-black hover:bg-white hover:text-black hover:border-2 hover:border-black rounded-lg font-bold' onClick={() => setTrigger(!trigger)}>X</button>
                </div>
                <div className='flex flex-col gap-5 items-center'>
                    <p className='text-2xl font-bold '>Are you sure ?</p>
                    <button className='h-14 w-32 text-base text-white bg-black hover:bg-white hover:text-black hover:border-2 hover:border-black rounded-lg font-bold' onClick={() => handleDelete()}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation