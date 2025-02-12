import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center relative font-montserratAlternates">
            {/* Navbar Section */}
            <header className="w-full bg-primary text-white py-8 px-12 flex justify-between items-center">
                <h1 className="text-4xl font-bold text-background font-anekGujarati">Iter</h1>
                <div className="text-lg hover:opacity-80 cursor-pointer">
                    <span className="material-icons">
                    
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <div className="relative w-full max-w-10xl mt-16 px-8 flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <h1 className="BeginYourAdventureToday text-black text-[64px] font-bold font-['Montserrat Alternates'] text-center">
                        Begin Your <br /> Adventure Today
                    </h1>
                    <div className="flex mt-6 space-x-4 justify-center">
                        <Link to="/explore" className="btn">
                            Start Planning
                        </Link>
                        <Link to="/random-destination" className="btn">
                            Surprise Me
                        </Link>
                    </div>
                </div>
                
                {/* Earth Image */}
                <div className="absolute right-0 top-[163px]">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif" alt="Rotating Earth" className="w-[555px] h-[555px] rounded-full shadow-lg" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;