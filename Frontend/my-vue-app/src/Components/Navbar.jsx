import React from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../assets/logo.png';
import logogreen from '../assets/logo-green.png';
import '../index.css';
import { toast } from "react-toastify";

const Navbar = ({ userName="Guest" }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        toast.success(
            "You have successfully logged out",
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        )
        navigate("/");
    };

    const profile = () => {
        navigate("/profile")
    }

    return (
        <header className="header">
            <nav>
                <img src={logogreen} className="logogreen" alt="Logo" />
            </nav>
            <nav className="nav nav--user">
                <div className="dropdown" >
                    <button className="nav__el" onClick={logout}>Logout</button>
                    <button className="nav__el" onClick={profile}>
                        <img src={image} alt="User photo" className="nav__user-img" />
                        <span>{userName || 'user'}</span> 
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
