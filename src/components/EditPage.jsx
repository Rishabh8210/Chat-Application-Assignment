import React, { useState } from "react";
import axios from 'axios'
import back from '../assets/back.png'
import { decodeJWT } from "../utils/helper";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/SigninSignup";
const initialValues = {
    name: "",
    email: "",
    phone: "",
};

const EditPage = ({ trigger, setTrigger }) => {
    const [error, setError] = useState('');
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: signUpSchema,
            onSubmit: async (values, action) => {
                action.resetForm();
            },
        });
    async function handleForm(event) {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token')
            const response = decodeJWT(token);
            const userId = response.userId;
            const data = {
                name: values.name || null,
                email: values.email || null,
                phone: values.phone || null
            }
            console.log(data)
            const updatedData = await axios.patch(`http://localhost:3001/api/v1/users/${userId}`, data,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Response from server:', response);
            window.location = '/profile';
        } catch (error) {
            setError('All fields are required.')
            console.error('Error Updating user:', error);
        }
    }
    return (
        <div className='fixed top-0 left-0 h-screen w-full px-5 flex flex-col justify-center items-center bg-zinc-800 bg-opacity-50'>
            <div className='min-h-[60vh] max-h-[95vh] w-full sm:w-[65%] lg:w-[50%] bg-white shadow-lg flex flex-col items-center rounded-lg py-3 px-5'>
                <div className='h-10 w-full flex justify-between items-center'>
                    <p className='font-semibold text-3xl border-b-4 border-black'>Edit Profile </p>
                    <img className="h-8 text-base border-black border-2 text-white rounded-lg font-bold" src={back} alt='<-' onClick={() => setTrigger(!trigger)} />
                </div>
                <div className="w-full py-7">
                    <form onSubmit={(event) => handleForm(event)}>
                    {/* <form> */}
                        <div className="flex flex-col py-1 px-2 border-x border-y border-black border-opacity-30 rounded-md transition-all mb-5 focus-within:border-black focus-within:border-opacity-100">
                            <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-widest transition-all">
                                Name
                            </label>
                            <input
                                className="px-0 outline-0 pl-2 text-base placeholder:text-black placeholder:text-opacity-50 focus-within:outline-none"
                                type="text"
                                autoComplete="off"
                                name="name"
                                id="name"
                                placeholder="Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? (
                                <p className="text-xs text-red-600">{errors.name}</p>
                            ) : null}
                        </div>
                        <div className="flex flex-col py-1 px-2 border-x border-y border-black border-opacity-30 rounded-md transition-all mb-5 focus-within:border-black focus-within:border-opacity-100">
                            <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-widest transition-all">
                                Phone no
                            </label>
                            <input
                                className="px-0 outline-0 pl-2 text-base placeholder:text-black placeholder:text-opacity-50 focus-within:outline-none"
                                type="text"
                                autoComplete="off"
                                name="phone"
                                id="phone"
                                placeholder="Phone no"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.phone && touched.phone ? (
                                <p className="text-xs text-red-600">{errors.phone}</p>
                            ) : null}
                        </div>
                        <div className="flex flex-col py-1 px-2 border-x border-y border-black border-opacity-30 rounded-md transition-all mb-5 focus-within:border-black focus-within:border-opacity-100">
                            <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest transition-all">
                                Email
                            </label>
                            <input
                                className="px-0 outline-0 pl-2 text-base placeholder:text-black placeholder:text-opacity-50 focus-within:outline-none"
                                type="email"
                                autoComplete="off"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? (
                                <p className="text-xs text-red-600">{errors.email}</p>
                            ) : null}
                        </div>
                        <div className="flex flex-col justify-center items-center gap-4">
                            <button className="py-3 px-4 outline-0 uppercase border-0 rounded-md text-white bg-black hover:bg-black transition-all" type="submit">
                                Save
                            </button>
                            <p className="text-xl text-red-700 font-semibold">{error}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};
  

export default EditPage
