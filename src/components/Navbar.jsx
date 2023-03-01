import React, { useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ChatContext } from '../context/ChatContext';

const Navbar = () => {
    const { data } = useContext(ChatContext);
    console.log('data:', data)
    return (
        <div className='navbar'>
            <div className="user_chat">
                <span>{data.user.displayName}</span>
            </div>
            <div className="icon">
                <FontAwesomeIcon icon={faBars} />
            </div>
        </div>
    )
}

export default Navbar
