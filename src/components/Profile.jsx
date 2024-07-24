import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import user from '../assets/user.png';
import mail from '../assets/mail.png';
import status from '../assets/status.png';
import back from '../assets/back.png';
import phone from '../assets/phone.png';
import { decodeJWT } from '../utils/helper';
import EditPage from './EditPage';
import Confirmation from './Confirmation';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('token');
    const [isEditOpen, setEditOpen] = useState(false);
    const [confirmDelete, setconfirmDelete] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = decodeJWT(token);
                    const userId = response.userId;
                    const userDataResponse = await axios.get(`https://chat-app-backend-mgkx.onrender.com/api/v1/users/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    setUserData(userDataResponse?.data?.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }else{
                window.location = '/';
            }
        };

        fetchData();
    }, [token]);

    const handleClick = () => {
        setEditOpen(!isEditOpen)
    };

    const handleDelete = async () => {
        localStorage.clear('token')
        try {
            const response = decodeJWT(token);
            const userId = response.userId;
            const userDataResponse = await axios.delete(`http://localhost:3001/api/v1/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setUserData(null)
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting user data:', error);
        }

    };


    if (!localStorage.getItem('token')) {
        return window.location = '/'
    }
    return (
        <div className='h-screen w-screen'>
            <div className='h-14 w-screen flex px-3 justify-between items-center shadow-sm'>
                <h1 className='text-xl uppercase font-bold transition-all'>Convocave</h1>
            </div>
            <div className='h-fit w-fit p-3'>
                <Link to='/chats'>
                    <img className='w-8' src={back} alt='Go back' />
                </Link>
            </div>
            <div className='min-h-[40vh]  w-full flex flex-col justify-center items-center'>
                <img className='h-[25vh] md:h-[35vh] bg-gray-500 rounded-full' src={user} alt='Profile' />
            </div>
            <div className='flex flex-col px-5 gap-5 justify-center items-center h-fit w-full'>
                <div className='flex flex-col gap-5 h-fit w-fit'>
                    <div className='flex gap-5 items-center'>
                        <img className='w-8' src={user} alt='Name' />
                        <h2 className='text-2xl font-semibold'>{userData?.name || 'User Name'}</h2>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <img className='w-8' src={mail} alt='Mail' />
                        <h2 className='text-md font-semibold'>{userData?.email || 'Email Address'}</h2>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <img className='w-8' src={phone} alt='Phone' />
                        <h2 className='text-lg font-semibold'>{userData?.phone || 'Phone Number'}</h2>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <img className='w-8' src={status} alt='Status' />
                        <h2 className='text-lg font-semibold'>{token ? "Online" : "Offline"}</h2>
                    </div>
                </div>
                <div className='flex gap-5 h-fit w-full justify-center items-center'>
                    <button
                        className='h-10 w-28 border-2 border-black rounded-lg text-md font-semibold hover:bg-black hover:text-white uppercase tracking-wide'
                        onClick={handleClick}
                    >
                        Edit
                    </button>
                    <button
                        className='h-10 w-28 border-2 border-black rounded-lg text-md font-semibold hover:bg-black hover:text-white uppercase tracking-wide'
                        onClick={() => setconfirmDelete(!confirmDelete)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            {isEditOpen && <EditPage trigger={isEditOpen} setTrigger={setEditOpen} />}
            {confirmDelete && <Confirmation trigger={confirmDelete} setTrigger={setconfirmDelete} handleDelete={handleDelete} />}
        </div>
    );
};

export default Profile;


