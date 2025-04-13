import React from 'react';
import { Header } from '../components/header';
import { WorldMap } from '../components/WorldMap';
import '../css/ProfilePage.css';

const ProfilePage = () => {
    return (
        <div>
            <Header />
            <div className='profile-container'>
                <div className='profile-info'>
                    <img src='./images/island.jpg' alt='Profile Background' className='profile-bg'/>
                    <img src="./images/albert.png" alt="Profile Picture" className="profile-pic"/>
                    <h1>Welcome, <br />FirstName LastName!</h1>
                </div>
            </div>
            <div className = 'map'>
                <h1>Your Trips</h1>
                <WorldMap />
            </div>
            <div className='upcoming-trips'>

            </div>
        </div>
    );
};

export default ProfilePage;
