let keystrokeTimes = [];
let mouseMovements = [];

// Capture keystroke timings
document.addEventListener("keydown", () => {
    keystrokeTimes.push(Date.now());
});

// Capture mouse movements
document.addEventListener("mousemove", (event) => {
    mouseMovements.push({ x: event.clientX, y: event.clientY, time: Date.now() });
});

// Calculate keystroke delay
function calculateKeystrokeDelay() {
    if (keystrokeTimes.length < 2) return 0.1;  
    let delays = keystrokeTimes.slice(1).map((time, i) => time - keystrokeTimes[i]);
    return (delays.reduce((a, b) => a + b, 0) / delays.length) / 1000;
}

// Authenticate user with AI model
async function authenticateUser() {
    const typingSpeed = Math.floor(Math.random() * 50) + 100;  
    const keystrokeDelay = calculateKeystrokeDelay();
    const mouseMovement = mouseMovements.length > 0 ? mouseMovements.length : 0;  

    console.log("Sending to backend:", { typingSpeed, keystrokeDelay, mouseMovement });

    const response = await fetch("http://127.0.0.1:5000/authenticate", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ typingSpeed, keystrokeDelay, mouseMovement })
    });

    const data = await response.json();
    document.getElementById("status").innerText = data.message;
}
