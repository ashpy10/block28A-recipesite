import React from "react"; 
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);


    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <img src="" />
                    <h1>Recipe Rewind</h1>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {!user && (
                        <li>
                        <Link to="/login">Login</Link>
                        </li>
                    )}
                    {user && (
                        <>
                        <li>
                            <Link to="/favorites">My Favorites</Link>
                        </li>
                        <li>
                            <button className="exit-button" onClick={logout}>
                            🚪 EXIT ONLY
                            </button>
                        </li>
                        </>
                    )}
                </ul>
                </div>
        </nav>
    );
};

export default NavBar;