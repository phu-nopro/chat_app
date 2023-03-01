import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
    const Navigate = useNavigate();
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Navigate("/")
        } catch (err) {
            // setErr(true);
        }
    }
    return (
        <div>
            <div className="formContainer">
                <div className="fromWrapper">
                    <span className="logo"> Vbook</span>
                    <span className="title" style={{ fontSize: '14px', color: 'red' }}> Register</span>
                    <form onSubmit={handleSubmitLogin} >
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="email" placeholder='Your Email' />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faLock} />
                            <input type="password" placeholder='Your Password' />
                        </div>
                        <button>LOGIN</button>
                    </form>
                    <span>You don't have an account? <Link to={'/Register'}>Register</Link> </span>
                </div>
            </div>
        </div >
    )
}

export default Login
