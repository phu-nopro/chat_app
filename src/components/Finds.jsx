import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';



const Finds = () => {
    const [user, setUser] = useState(null);
    const [userNameFind, setUserNameFind] = useState("");
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const handFind = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", userNameFind)
        );
        // const q = query(collection(db,"users",where("email", "==",userNameFind)));
        console.log('q: ', q)
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            console.log(err)
            setErr(true);
            setUser(null)
        }
    }
    const handkey = (e) => {
        e.code === "Enter" && handFind();
    }
    const handleSelect = async () => {
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { }
        setUser(null);
        setUserNameFind("")
    }

    return (
        <>
            <div className='finds'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input type="text" placeholder='Finds one user' onChange={(e) => { setUserNameFind(e.target.value) }} onKeyDown={handkey} />
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="user" onClick={handleSelect} >
                    <div className="avartar" >
                        {user.photoURL && <img src={user.photoURL} alt="" />}
                        {!user.photoURL && <p>  {!user.displayName ? 'N' : user.displayName?.charAt(0)?.toUpperCase()}</p>}
                    </div>
                    <span>{user.displayName ? user.displayName : "No Name"}</span>
                </div>
            )}
        </>
    )
}

export default Finds
