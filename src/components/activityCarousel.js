import React from 'react';
import Slider from 'react-slick';
import ActivityCard from './activityCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ActivityCarousel = ({activities = []}) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
    };

    return (
        <div>
            <h2>Activities and Food</h2>
            <Slider {...settings}>
                {activities.map((activity) => (
                    <ActivityCard
                        // key={activity.id}
                        title={activity.title}
                        description={activity.description}
                        // image={activity.image}
                        cost={activity.cost}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default ActivityCarousel;
