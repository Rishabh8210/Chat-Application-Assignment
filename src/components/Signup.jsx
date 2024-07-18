import React from "react";
// import axios from 'axios'
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/SigninSignup";
import back from '../assets/back.png'

const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
};

const Signup = ({ trigger, setTrigger }) => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: signUpSchema,
            onSubmit: async (values, action) => {
                console.log(
                    "file: Registration.jsx ~ line 11 ~ Registration ~ values",
                    values
                );
                action.resetForm();
            },
        });
    console.log(
        "file: Registration.jsx ~ line 25 ~ Registration ~ errors",
        errors
    );
    async function handleForm(event) {
        event.preventDefault();
        try {
            const data = {
                name: values.name,
                email: values.email,
                password: values.password
            }
            console.log(data)
            // const response = await axios.post('https://accredian-backend-task-ncnt.onrender.com/api/v1/user/signup', data);
            // console.log('Response from server:', response.data);
            window.location = '/';
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }
    return (
        <div className='fixed top-0 left-0 h-screen w-full px-5 flex flex-col justify-center items-center bg-zinc-800 bg-opacity-50'>
            <div className='min-h-[60vh] max-h-[95vh] w-full bg-white shadow-lg flex flex-col items-center rounded-lg py-3 px-5'>
                <div className='h-10 w-full px-2 flex justify-between items-center'>
                    <p className='font-semibold text-3xl border-b-4 border-black'>Welcome !</p>
                    <img className="h-8 text-base border-black border-2 text-white rounded-lg font-bold" src={back} alt='<-' onClick={() => setTrigger(!trigger)} />
                    {/* <button className='h-full w-10 text-base bg-black hover:bg-black text-white rounded-lg font-bold' onClick={() => setTrigger(!trigger)}>{back}</button> */}
                </div>
                <div className="w-full py-7">
                    {/* <form onSubmit={(event) => handleForm(event)}> */}
                    <form>
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
                        <div className="flex flex-col py-1 px-2 border-x border-y border-black border-opacity-30 rounded-md transition-all mb-5 focus-within:border-black focus-within:border-opacity-100">
                            <label htmlFor="password" className="text-[10px] uppercase font-bold tracking-widest transition-all">
                                Password
                            </label>
                            <input
                                className="px-0 outline-0 pl-2 text-base placeholder:text-black placeholder:text-opacity-50 focus-within:outline-none"
                                type="password"
                                autoComplete="off"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                                <p className="text-xs text-red-600">{errors.password}</p>
                            ) : null}
                        </div>
                        <div className="flex flex-col py-1 px-2 border-x border-y border-black border-opacity-30 rounded-md transition-all mb-5 focus-within:border-black focus-within:border-opacity-100">
                            <label htmlFor="role" className="text-[10px] uppercase font-bold tracking-widest transition-all">
                                Role
                            </label>
                            <select
                                className="px-0 outline-0 pl-2 text-base placeholder:text-black placeholder:text-opacity-50 focus-within:outline-none"
                                name="role"
                                id="role"
                                value={values.role}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option className="" value="" label="Select role" />
                                <option value="student" label="Student" />
                                <option value="teacher" label="Teacher" />
                                <option value="institute" label="Institute" />
                            </select>
                            {errors.role && touched.role ? (
                                <p className="text-xs text-red-600">{errors.role}</p>
                            ) : null}
                        </div>

                        <div className="flex flex-col justify-center items-center gap-4">
                            <a href="#" className="border-b-2 border-black">
                                Want to register using Gmail?
                            </a>
                            <button className="py-3 px-4 outline-0 uppercase border-0 rounded-md text-white bg-black hover:bg-black transition-all" type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Signup;