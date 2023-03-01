import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';




const Chats = () => {
    const { currentUser } = useContext(AuthContext);
    const [chats, setChats] = useState(null);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);
    console.log('chát:', chats)
    //console.log("chats:", Object.entries(chats));
    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user });
    }
    return (
        <div className='chats'>
            {chats &&
                Object.entries(chats).map((chat) => (
                    <div className="user_chat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} alt="" />
                        <div className="chatInfor">
                            <span>{chat[1].userInfo.displayName}</span>
                            <p> hello </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Chats

