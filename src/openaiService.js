export async function getVacation() {
    try {
        const response = await fetch("http://localhost:3000/generate-vacation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        return data.vacation;
    } catch (error) {
        console.error("Error fetching vacation:", error);
        return "Failed to generate vacation.";
    }
}
