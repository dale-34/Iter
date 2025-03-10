import React from 'react';
import Slider from 'react-slick';
import ActivityCard from './activityCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ActivityCarousel = () => {
    const activities = [
        {
            id: 1,
            title: 'Rainforest Ziplining',
            description: 'Zip through the rainforest at 35 mph!',
            image: '/images/ziplining.webp',
        },
        {
            id: 2,
            title: 'Scuba Diving',
            description: 'Explore coral reefs and exotic fish.',
            image: '/images/scubadiving.jpg',
        },
        {
            id: 3,
            title: 'Mountain Hiking',
            description: 'Experience the thrill of mountain peaks.',
            image: '/images/hiking.avif',
        },
        {
            id: 4,
            title: 'Skydiving',
            description: 'Jump from 15,000 feet and feel the rush!',
            image: '/images/skydiving.jpg',
        },
        {
            id: 5,
            title: 'Skydivings',
            description: 'Jumps from 15,000 feet and feel the rush!',
            image: '/images/skydiving.jpg',
        },
    ];

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
            <h2>Activities and Excursions</h2>
            <Slider {...settings}>
                {activities.map((activity) => (
                    <ActivityCard
                        key={activity.id}
                        title={activity.title}
                        description={activity.description}
                        image={activity.image}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default ActivityCarousel;
