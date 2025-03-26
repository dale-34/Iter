import React from 'react';
import Slider from 'react-slick';
import ActivityCard from './activityCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FoodCarousel = () => {
    const food = [
        {
            id: 1,
            title: 'Luigi’s Pizzeria',
            description: 'A family-owned pizzeria known for its wood-fired pizzas and cozy atmosphere.',
            cuisine: 'Italian',
            location: 'New York, USA',
            image: '/images/pizza.jpg',
        },
        {
            id: 2,
            title: 'Tokyo Sushi Bar',
            description: 'Traditional Japanese sushi and sashimi, freshly made daily.',
            cuisine: 'Japanese',
            location: 'Tokyo, Japan',
            image: '/images/sushi.jpg',
        },
        {
            id: 3,
            title: 'Grill House',
            description: 'Grilled steaks, burgers, and a variety of barbecue options.',
            cuisine: 'American',
            location: 'Austin, USA',
            image: '/images/steak.webp',
        },
        {
            id: 4,
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
            <h2>Food and Restaurants</h2>
            <Slider {...settings}>
                {food.map((food) => (
                    <ActivityCard
                        key={food.id}
                        title={food.title}
                        description={food.description}
                        image={food.image}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default FoodCarousel;
