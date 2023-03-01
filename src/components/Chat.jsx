import React from 'react'
import Chats from './Chats'
import Finds from './Finds'
import Sidebar from './Sidebar'

const Chat = () => {
    return (
        <div className='chat'>
            <Sidebar />
            <Finds />
            <Chats />
        </div>
    )
}

export default Chat



