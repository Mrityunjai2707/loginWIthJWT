// RegisterForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import axiosInstance from './api';
const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const save = async () => {
        try {
            const signUp = await axiosInstance.post('/users/sigUp', formData);
            console.log(signUp);
            console.log(signUp.data.token);
            if (signUp.status = 200) {
                toast.success("You have successfully signed up");
            }
            if (signUp.data) {
                navigate("/");
            }
        } catch (error) {
            console.log(error.response.data.msg.message)
            if (error.response.data.msg.code === 11000) {
                toast.warning("Email already exists")
            }
            else {
                toast.warning(error.response.data.msg.message)
            }
        }
    }
    return (
        <main className="main">
            <div className="login-form">
                <h2 className="heading-secondary ma-bt-lg">Register</h2>
                <form className="form">
                    <div className="form__group">
                        <label className="form__label">Name</label>
                        <input className="form__input" id="name" name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John" required="required" />
                    </div>
                    <div className="form__group">
                        <label className="form__label">Email address</label>
                        <input className="form__input" id="email" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="you@example.com" required="required" />
                    </div>
                    <div className="form__group">
                        <label className="form__label">Password</label>
                        <input className="form__input" id="password" name="password" value={formData.password} onChange={handleChange} type="password" placeholder="********" required="required" />
                    </div>
                    <div className="form__group">
                        <label className="form__label">Confirm Password</label>
                        <input className="form__input" id="passwordConfirm" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} type="password" placeholder="*******" required="required" />
                    </div>
                    <div className="d-flex justify-content-end">
                        <span className='span'>Already have Account..?   </span> <Link to="/">Login</Link>
                    </div>
                    <div className="form__group">
                        <button type="button" className="btn btn--green" onClick={save}>Submit</button>
                    </div>
                </form>
            </div>
        </main>
    )
};

export default RegisterForm;
