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
            title: 'Luigi’s Pizzeria',
            description: 'A family-owned pizzeria known for its wood-fired pizzas and cozy atmosphere.',
            cuisine: 'Italian',
            location: 'New York, USA',
            image: '/images/pizza.jpg',
        },
        {
            id: 6,
            title: 'Tokyo Sushi Bar',
            description: 'Traditional Japanese sushi and sashimi, freshly made daily.',
            cuisine: 'Japanese',
            location: 'Tokyo, Japan',
            image: '/images/sushi.jpg',
        },
        {
            id: 7,
            title: 'Grill House',
            description: 'Grilled steaks, burgers, and a variety of barbecue options.',
            cuisine: 'American',
            location: 'Austin, USA',
            image: '/images/steak.webp',
        },
        {
            id: 8,
            title: 'Thai Palace',
            description: 'Authentic Thai cuisine with spicy curries and flavorful stir-fries.',
            cuisine: 'Thai',
            location: 'Bangkok, Thailand',
            image: '/images/thai.webp',
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
            <h2>Activities and Food</h2>
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
