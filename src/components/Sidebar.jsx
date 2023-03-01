import React from 'react'
import img from '../img/bgr-bnt.png';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



const Sidebar = () => {
    const { currentUser } = useContext(AuthContext);

    const Navigate = useNavigate();
    const handleLogout = async () => {
        await signOut(auth).then(() => {
            // Sign-out successful.
            Navigate('/Login');
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div className='sidebar'>
            <div className="logo">
                Vbook
            </div>
            <div className="user">
                <div className='avartar'>
                    {currentUser.photoURL && <img src={currentUser.photoURL} alt="" />}
                    {!currentUser.photoURL && <p>  {!currentUser.displayName ? 'N' : currentUser.displayName?.charAt(0)?.toUpperCase()}</p>}
                </div>

                <span>{currentUser.displayName ? currentUser.displayName : "No Name"}</span>
                <button onClick={handleLogout}>LogOut</button>
            </div>
        </div>
    )
}

export default Sidebar
