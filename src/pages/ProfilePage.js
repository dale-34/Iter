import React, { useState, useEffect } from 'react';
import { Header } from '../components/header';
import { WorldMap } from '../components/WorldMap';
import '../css/ProfilePage.css';
import { useAuth } from "../AuthContext";
import axios from 'axios';

const ProfilePage = () => {
    const { userProfile, userId } = useAuth();
    const [localPhoto, setLocalPhoto] = useState(userProfile.profilePhoto);

    const handleClick = async () => {
        try {
            const newPhoto = localPhoto === 1 ? 0 : 1;
            const response = await axios.post("http://localhost:3001/db/set-profilePhoto", {
                userId: userId.userId,
                profilePhoto: newPhoto,
            });

            if (response.data.success) {
                console.log("Profile photo updated!");
                setLocalPhoto(newPhoto); // update local state for UI
            } else {
                console.error("Failed to update pfp:", response.data.message);
            }
        } catch (err) {
            console.error("Error updating pfp:", err);
        }
    };

    return (
        <div>
            <Header />
            <div className='profile-page'>
                <div className='profile-container'>
                    <div className='profile-info'>
                        <img src='/images/island.jpg' alt='Profile Background' className='profile-bg'/>
                        <img
                            src={localPhoto === 1 ? "/images/albert.png" : "/images/alberta.png"}
                            alt="Profile Picture"
                            className="profile-pic"
                            onClick={handleClick}
                        />
                        <h1>Welcome, <br />{userProfile.username}!</h1>
                    </div>
                </div>
                <div className='map'>
                    <h1>Your Trips</h1>
                    <WorldMap />
                </div>
                <div className='upcoming-trips'>
                    {/* Future trip display here */}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
