import React from 'react';
import { Header } from '../components/header';
import { WorldMap } from '../components/WorldMap';
import '../css/ProfilePage.css';
import { useAuth } from "../AuthContext";

const ProfilePage = () => {
    const { userProfile } = useAuth();

    return (
        <div>
            <Header />
            <div className='profile-page'>
                <div className='profile-container'>
                    <div className='profile-info'>
                      <img src='/images/island.jpg' alt='Profile Background' className='profile-bg'/>
                      {/* <img
                        src={
                            userProfile.profileBackground === 0
                            ? "/images/island.jpg"
                            : userProfile.profileBackground === 1
                            ? "/images/bg1.png"
                            : userProfile.profileBackground === 2
                            ? "/images/bg2.png"
                            : userProfile.profileBackground === 3
                            ? "/images/bg3.png"
                            : userProfile.profileBackground === 4
                            ? "/images/bg4.png"
                            : "/images/bg5.png"
                        }
                        alt="Profile Background"
                        className="profile-bg"
                        /> */}
                      <img src={userProfile.profilePhoto === 1 ? "/images/albert.png" : "/images/alberta.png"} alt="Profile Picture" className="profile-pic"/>
                      <h1>Welcome, <br />{userProfile.username}!</h1>
                    </div>
                </div>
                <div className = 'map'>
                    <h1>Your Trips</h1>
                    <WorldMap />
                </div>
                <div className='upcoming-trips'>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
