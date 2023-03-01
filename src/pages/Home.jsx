import React from 'react'
import Chat from '../components/Chat'
import Messege from '../components/Messege'

const Home = () => {
    return (
        <div className='home'>
            <div className="container">
                <Chat />
                <Messege />
            </div>
        </div>
    )
}

export default Home
