const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

// Fix CORS policy to allow frontend requests
app.use(cors({
    origin: "http://127.0.0.1:5500",  // Allow frontend (Live Server)
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));

// Simulated user behavior data
const storedUserPattern = {
    typingSpeed: 120, 
    mouseMovement: "smooth",
};

// Authentication API
app.post("/authenticate", async (req, res) => {
    const { typingSpeed, keystrokeDelay, mouseMovement } = req.body;

    console.log("Received request:", { typingSpeed, keystrokeDelay, mouseMovement }); // Debugging

    try {
        const aiResponse = await fetch("http://127.0.0.1:5001/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                typing_speed: typingSpeed, 
                keystroke_delay: keystrokeDelay || 0.1,  // Default to 0.1 if missing
                mouse_movement: mouseMovement
            })
        });

        const aiData = await aiResponse.json();
        console.log("AI Model Response:", aiData);
        res.json(aiData);
    } catch (error) {
        console.error("Error connecting to AI model:", error);
        res.json({ success: false, message: "AI Model Unreachable" });
    }
});


app.listen(5000, () => console.log("✅ Backend running on port 5000"));


async function authenticateUser() {
    const typingSpeed = Math.floor(Math.random() * 50) + 100; 
    const mouseMovement = "smooth"; 

    const response = await fetch("http://localhost:5000/authenticate", {  // Change to 127.0.0.1 if needed
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ typingSpeed, mouseMovement })
    });

    const data = await response.json();
    document.getElementById("status").innerText = data.message;
}

