import { pool } from './iterdb.js';  // Import the pool from your iterdb.js file
import { insertPlan } from './iterdb.js';  // Import the insertPlan function

// Mock user inputs and vacation plan for testing
const userInputs = [
    '2025-03-07',  // startDate
    '2025-03-12',  // endDate
    1000.00,       // budget
    'Hawaii'       // destination
];

const userId = 1;  // Example user ID

// Example vacation plan structure
const vacationPlan = {
    accomodations: {
        hotel: {
            type: 'hotel',
            reservation_link: 'https://www.booking.com/hotel/us/hilton-hawaiian-village-waikiki-beach-resort.html'
        },
        flight: {
            type: 'flight',
            reservation_link: 'https://www.kayak.com/flights/GNV-HNL/2025-03-07/2025-03-12'
        },
        car_rental: {
            type: 'car_rental',
            reservation_link: 'https://www.enterprise.com/en/car-rental/locations/us/honolulu-airport.html'
        }
    },
    vacation: {
        day1: {
            type: 'entertainment',
            title: 'Waikiki Beach',
            description: 'Enjoy a relaxing day on the famous Waikiki Beach, swimming and sunbathing.',
            cost: 0,
            day: 1,
            relevant_link: 'https://hawaii.com/oahu/waikiki-beach/'
        },
        day2: {
            type: 'food',
            title: "Duke's Waikiki",
            description: 'Experience iconic Hawaiian dishes and cocktails right by the beach.',
            cost: 50,
            day: 2,
            relevant_link: 'https://www.dukeswaikiki.com/'
        },
        day3: {
            type: 'entertainment',
            title: 'Diamond Head State Monument',
            description: 'Hike to the summit of this famous volcanic crater for stunning views of Oahu.',
            cost: 10,
            day: 3,
            relevant_link: 'https://dlnr.hawaii.gov/dsp/parks/oahu/diamond-head-state-monument/'
        },
        day4: {
            type: 'food',
            title: "Nico's Pier 38",
            description: 'Enjoy fresh seafood at this local favorite while overlooking the harbor.',
            cost: 40,
            day: 4,
            relevant_link: 'https://nicospier38.com/'
        },
        day5: {
            type: 'entertainment',
            title: 'Kualoa Ranch',
            description: 'Take a tour of this famous ranch, featured in many films, and enjoy outdoor activities.',
            cost: 108,
            day: 5,
            relevant_link: 'https://www.kualoa.com/'
        },
        day6: {
            type: 'food',
            title: 'Rainbow Drive-In',
            description: 'Grab a plate lunch at this beloved local diner known for its hearty portions.',
            cost: 15,
            day: 6,
            relevant_link: 'http://rainbowdriveinhawaii.com/'
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
