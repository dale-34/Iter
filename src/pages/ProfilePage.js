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
                    <h1>FirstName LastName</h1>
                    <img src="./images/albert.png" alt="Profile Picture" className="profile-pic"/>
                </div>
                <WorldMap className='map'/>
            </div>
            <div className='upcoming-trips'>

            </div>
        </div>
    );
};

export default ProfilePage;
