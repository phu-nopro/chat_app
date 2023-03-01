import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { async, uuidv4 } from '@firebase/util';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Input = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [text, setText] = useState("");

    const handleSend = async () => {
        try {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                }),
            })
            // await updateDoc(doc(db, "userChats", currentUser.uid), {
            //     [data.chatId + ".lastMessage"]: {
            //         text,
            //     },
            //     [data.chatId + ".date"]: serverTimestamp(),
            // });

            // await updateDoc(doc(db, "userChats", data.user.uid), {
            //     [data.chatId + ".lastMessage"]: {
            //         text,
            //     },
            //     [data.chatId + ".date"]: serverTimestamp(),
            // });

            setText("");
        } catch (e) {
            console.log(e);
        }

    }
    const handleKey = (e) => {
        e.code === "Enter" && handleSend();
        console.log("code:", e.code)
    }

    return (
        <>
            <div className='input_chat'>
                <input type="text" placeholder='Type something' onChange={(e) => setText(e.target.value)} value={text} onKeyDown={handleKey} />
                <div className="icon_chat">
                    <FontAwesomeIcon icon={faFolderPlus} />
                    <FontAwesomeIcon icon={faImage} />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </>

    )
}

export default Input

