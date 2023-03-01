import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

const Messeges = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [chats, setChats] = useState(null);

    useEffect(() => {

        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            setChats(doc.data());
        });
        return () => {
            unsub();
        };
    }, [data.chatId]);
    //console.log('chats:', chats.messages)

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);

    return (
        <div className="container_messege">
            {chats &&
                (chats.messages.map((chat) => (
                    <div className={`messeges ${chat.senderId === currentUser.uid && "owner"}`} key={chat.id}>
                        <div className="messegesInfor">
                            {(chat.senderId === currentUser.uid) &&
                                <div className='avartar'>
                                    {currentUser.photoURL && <img src={currentUser.photoURL} alt="" />}
                                    {!currentUser.photoURL && <p>  {!currentUser.displayName ? 'N' : currentUser.displayName?.charAt(0)?.toUpperCase()}</p>}
                                </div>
                            }
                            {!(chat.senderId === currentUser.uid) &&
                                <div className='avartar'>
                                    {chat.photoURL && <img src={chat.photoURL} alt="" />}
                                    {!chat.photoURL && <p>  {!chat.displayName ? 'N' : chat.displayName?.charAt(0)?.toUpperCase()}</p>}
                                </div>
                            }

                        </div>

                        <div className="messegesContent">
                            <span>{chat.text}</span>
                        </div>
                    </div>
                )))
            }
        </div>

    )
}

export default Messeges
