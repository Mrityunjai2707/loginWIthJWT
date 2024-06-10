import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { Toast } from "primereact/toast";
import axiosInstance from './api'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const save = async () => {
        console.log(formData)
        try {
            const loginData = await axiosInstance.post("/users/login", formData);
            const username = loginData.data.data.user.name;
            localStorage.setItem("token", loginData.data.token);
            if (loginData.status === 200) {
                navigate("/alltours", { state: { username } });
                toast.success('Login Successfully');
            }
        } catch (error) {
            toast.warn(error.response.data.message);
        }
    };

    return (
        <main className="main">
            <div className="login-form">
                <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
                <form className="form">
                    <div className="form__group">
                        <label className="form__label" htmlFor="email">Email address</label>
                        <input className="form__input" id="email" name="email" value={formData.email} onChange={handleInput} type="email" placeholder="you@example.com" required="required" />
                    </div>
                    <div className="form__group ma-bt-md">
                        <label className="form__label" htmlFor="password">Password</label>
                        <div className="password-input d-flex">
                            <input className="form__input" id="password" name="password" value={formData.password} onChange={handleInput} type={showPassword ? "text" : "password"} placeholder="••••••••" required="required" />
                            <span className="d-flex justify-content-around align-items-center">
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="toggle-password-icon position-absolute me-5 fs-4" onClick={togglePasswordVisibility} />
                            </span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to="/signup">Create account</Link>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to="/forgotPassword">Forgot Password</Link>
                    </div>
                    <div className="form__group">
                        <button type="button" className="btn btn--green" onClick={save}>Login</button>
                    </div>
                </form>
            </div>
         
        </main>
    );
};

export default Login;
