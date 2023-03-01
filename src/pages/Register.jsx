import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const yourName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const repeatPass = e.target[3].value;
        try {
            if (yourName && email && password && repeatPass) {
                if (password === repeatPass) {
                    const res = await createUserWithEmailAndPassword(auth, email, password);
                    try {
                        await updateProfile(res.user, {
                            displayName: yourName
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: yourName,
                            email,
                            photoURL: null,
                        })
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                    } catch (err) {
                        console.log(e);
                        setLoading(false);
                    }
                } else {
                    alert("password different !")
                    return;
                }
            }
            else {
                alert("miss parament!!")
                return
            }
            Navigate("/");
        } catch (err) {
            console.log(err);
            setLoading(false)
        }


    }
    return (
        <div>
            <div className="formContainer">
                <div className="fromWrapper">
                    <span className="logo"> Vbook</span>
                    <span className="title" style={{ fontSize: '14px', color: 'red' }}> Register</span>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <FontAwesomeIcon icon={faUser} />
                            <input type="text" placeholder='Your Name' />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="email" placeholder='Your Email' />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faLock} />
                            <input type="password" placeholder='Your Password' />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faKey} />
                            <input type="password" placeholder='Repeat your password' />
                        </div>
                        {/* <span ><input type="checkbox" />I agree all statements in <br></br>Terms of service
                        </span> */}
                        <button>REGISTER</button>
                    </form>
                    <span>You do have an account? <Link to={'/Login'}>Login now</Link></span>
                    {loading && (
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Register
