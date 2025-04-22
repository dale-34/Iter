import React, { useState, useEffect } from "react";
import "../css/Recap.css";

const Recap = ({
    vacationPlan = { vacation: {} },
    startDate,
    endDate,
    destination,
    budget,
    startLocation,
}) => {
    const placeholder = "/images/roadtrip.jpg";
    const [imgSrc, setImgSrc] = useState(placeholder);
    const [isPlaceholder, setIsPlaceholder] = useState(true);

    useEffect(() => {
        const url = vacationPlan.vacation.image;
        if (!url) return;

        setIsPlaceholder(false);
        setImgSrc(
            `http://localhost:3001/photo-proxy?url=${encodeURIComponent(
                url
            )}&t=${Date.now()}`
        );
    }, [vacationPlan.vacation.image]);

    const handleImgError = (e) => {
        e.target.onerror = null;
        setImgSrc(placeholder);
        setIsPlaceholder(true);
    };

    console.log("VACATION IMAGE: ", vacationPlan.vacation.image);
    return (
        <div className="recap-container">
            <h2 className="section-title">Overview</h2>
            <div className="recap-card">
                <div className="recap-text">
                    <p>
                        <strong>Start Destination:</strong> {startLocation}
                    </p>
                    <p>
                        <strong>End Destination:</strong> {destination}
                    </p>
                    <p>
                        <strong>Dates:</strong>
                        {startDate.toISOString().split("T")[0] ===
                            "2099-12-31" ||
                        endDate.toISOString().split("T")[0] === "2099-12-31"
                            ? " Whenever you want"
                            : ` ${startDate.toDateString()} - ${endDate.toDateString()}`}
                    </p>
                    <p>
                        <strong>Budget:</strong> ${parseInt(budget[0])} - $
                        {parseInt(budget[1])}
                    </p>
                    <p>
                        <strong>Weather:</strong>{" "}
                        {vacationPlan.vacation.climate}{" "}
                    </p>
                </div>
                <div className="trip-picture">
                    {/* <img src={vacationPlan.vacation.image || "/images/roadtrip.jpg"} alt="Road trip" /> */}
                    <img
                        src={imgSrc}
                        alt="Road trip"
                        onError={handleImgError}
                        style={{
                            width: isPlaceholder ? 350 : "100%",
                            height: isPlaceholder ? 300 : 220,
                            objectFit: isPlaceholder ? "contain" : "cover",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Recap;
