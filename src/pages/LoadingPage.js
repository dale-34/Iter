import axios from "axios";
import React, { useRef, useEffect } from "react";
import { Header } from "../components/header";
import "../css/LoadingPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingGlobe from "../components/LoadingGlobe";
import { useAuth } from "../AuthContext";

const LoadingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const hasFetched = useRef(false);
    const { surpriseMode } = location.state || {};

    // Fetching current userId if logged in
    const { userId } = useAuth();
    let correctuserId;

    if (!userId) {
        correctuserId = 999;
    } else {
        correctuserId = userId.userId;
    }

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        //change back to const after debugging
        let {
            startDate,
            endDate,
            budget,
            accommodation,
            transport,
            destination,
            startLocation,
        } = location.state;

        // Fetching userId if user is logged in, and if not setting userId to guest id which is 999
        const generateVacation = async () => {
            if (surpriseMode) {
                try {
                    const response = await axios.post("/openai/surprise-me", {
                        correctuserId,
                    });
                    console.log("Response tripId:", response.data.tripId); // Ensure this is logged to see if tripId is available
                    navigate("/ItineraryPage", {
                        state: {
                            vacationPlan: response.data.vacationPlan,
                            tripId: response.data.tripId,
                        },
                    });
                } catch (error) {
                    console.error("Error generating surprise vacation:", error);
                }
            } else {
                try {
                    const response = await axios.post("/openai/generate-vacation",
                        {
                            startDate,
                            endDate,
                            budget,
                            accommodation,
                            transport,
                            destination,
                            startLocation,
                            correctuserId,
                        }
                    );
                    console.log("Response tripId:", response.data.tripId); // Ensure this is logged to see if tripId is available
                    navigate("/ItineraryPage", {
                        state: {
                            vacationPlan: response.data.vacationPlan,
                            tripId: response.data.tripId,
                        },
                    });
                } catch (error) {
                    console.error("Error generating vacation:", error);
                }
            }
        };
        generateVacation();
    }, [location.state, navigate]);

    return (
        <div className="loading-container">
            <div className="header">
                <Header />
            </div>
            <div className="loading-content">
                <LoadingGlobe />
                <p className="loading-text">Curating your dream vacation...</p>
            </div>
        </div>
    );
};

export default LoadingPage;
