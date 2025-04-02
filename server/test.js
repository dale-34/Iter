import { pool } from './iterdb.js';  // Import the pool from your iterdb.js file
import { insertPlan } from './iterdb.js';  // Import the insertPlan function

// Mock user inputs and vacation plan for testing
const userInputs = [
    'Mon Apr 01 2025',  // startDate
    'MWed Apr 03 2025',  // endDate
    [1000, 2000],       // budget
    'New York',      // destination
    'Gainesville'  // starting location
];

const userId = 1;  // Example user ID

// Example vacation plan structure
const vacationPlan = {
    accomodations: {
        reservations: [
        {
            name: "The New Yorker, A Wyndham Hotel",
            type: "hotel",
            estimated_cost: "$600",
            description: "Centrally located hotel near Times Square offering comfortable rooms and great amenities.",
            reservation_link: "https://www.wyndhamhotels.com/wyndham/the-new-yorker-a-wyndham-hotel"
        }
        ],
        transportation: [
        {
            "name": "Delta Airlines",
            "type": "flight",
            "estimated_cost": "$300",
            "description": "Round trip flight from Gainesville to New York City.",
            "reservation_link": "https://www.delta.com/"
        }
        ]
    },
    vacation: {
        climate: "March in New York City is generally cool, with temperatures ranging from 40°F to 55°F. Layered clothing recommended.",
        day1: {
        day_description: "Arrive in New York City and explore Times Square and Central Park.",
        activities: [
            {
            type: "food",
            title: "Katz's Delicatessen",
            description: "Famous deli known for its pastrami sandwiches.",
            cost: 20,
            day: 1,
            relevant_link: "https://www.katzsdelicatessen.com/"
            },
            {
            type: "food",
            title: "Shake Shack",
            description: "Popular fast-casual burger chain with delicious shakes.",
            cost: 15,
            day: 1,
            relevant_link: "https://www.shakeshack.com/"
            },
            {
            type: "activity",
            title: "Visit Central Park",
            description: "Stroll through the iconic park known for its natural beauty.",
            cost: 0,
            day: 1,
            relevant_link: "https://www.centralparknyc.org/"
            },
            {
            type: "activity",
            title: "Explore Times Square",
            description: "Experience the bright lights and hustle of New York's most famous square.",
            cost: 0,
            day: 1,
            relevant_link: "https://www.timessquarenyc.org/"
            }
        ]
        },
        day2: {
        day_description: "Visit the Statue of Liberty and explore the 9/11 Memorial.",
        activities: [
            {
            type: "food",
            title: "Grimaldi's Pizzeria",
            description: "Famous for their coal-fired pizzas.",
            cost: 25,
            day: 2,
            relevant_link: "http://www.grimaldis.pizza/"
            },
            {
            type: "food",
            title: "Eataly NYC Downtown",
            description: "Italian market and dining experience with fresh food essentials.",
            cost: 30,
            day: 2,
            relevant_link: "https://www.eataly.com/us_en/stores/new-york-downtown/"
            },
            {
            type: "activity",
            title: "Statue of Liberty Tour",
            description: "Visit the iconic statue and learn about its history.",
            cost: 23.5,
            day: 2,
            relevant_link: "https://www.statuereservations.com/"
            },
            {
            type: "activity",
            title: "9/11 Memorial & Museum",
            description: "A moving tribute to the lives lost on September 11, 2001.",
            cost: 28,
            day: 2,
            relevant_link: "https://www.911memorial.org/"
            }
        ]
        },
        day3: {
        day_description: "Explore the Metropolitan Museum of Art and enjoy a Broadway show.",
        activities: [
            {
            type: "food",
            title: "Café Sabarsky",
            description: "Viennese café with a stunning ambiance and delicious pastries.",
            cost: 35,
            day: 3,
            relevant_link: "https://www.neuegalerie.org/cafe-sabarsky/"
            },
            {
            type: "food",
            title: "Joe's Pizza",
            description: "Renowned spot for classic New York-style pizza.",
            cost: 3,
            day: 3,
            relevant_link: "https://www.joespizza.com/"
            },
            {
            type: "activity",
            title: "Metropolitan Museum of Art",
            description: "One of the largest and most prestigious art museums in the world.",
            cost: 25,
            day: 3,
            relevant_link: "https://www.metmuseum.org/"
            },
            {
            type: "activity",
            title: "Broadway Show",
            description: "Experience the magic of a Broadway musical or play.",
            cost: 120,
            day: 3,
            relevant_link: "https://www.broadway.com/"
            }
        ]
        },
        day4: {
        day_description: "Visit the High Line and explore Chelsea Market before departure.",
        activities: [
            {
            type: "food",
            title: "Chelsea Market",
            description: "Indoor food market with a variety of gourmet vendors.",
            cost: 20,
            day: 4,
            relevant_link: "https://www.chelseamarket.com/"
            },
            {
            type: "food",
            title: "Los Tacos No. 1",
            description: "Famous for authentic Mexican tacos.",
            cost: 12,
            day: 4,
            relevant_link: "https://www.lostacos1.com/"
            },
            {
            type: "activity",
            title: "Walk the High Line",
            description: "An elevated linear park on a former railroad track with gardens and art.",
            cost: 0,
            day: 4,
            relevant_link: "https://www.thehighline.org/"
            },
            {
            type: "activity",
            title: "Explore the Whitney Museum",
            description: "Museum dedicated to 20th- and 21st-century American art.",
            cost: 25,
            day: 4,
            relevant_link: "https://whitney.org/"
            }
        ]
        }
    }
};

// Function to test the database connection and insertPlan function
async function testInsertPlan() {
    try {
        // Test the connection first
        await pool.promise().query("SELECT 1");
        console.log("Database connected successfully!");

        // Now test the insertPlan function
        await insertPlan(vacationPlan, userId, userInputs);
        console.log("Vacation plan inserted successfully!");
    } catch (err) {
        console.error("Error during test:", err);
    } finally {
        // Close the pool when done
        pool.end();
    }
}

// Run the test
testInsertPlan();
