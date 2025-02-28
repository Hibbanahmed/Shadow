import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from flask import Flask, request, jsonify

app = Flask(__name__)

# Simulated user behavior dataset
user_data = pd.DataFrame([
    {"typing_speed": 120, "keystroke_delay": 0.12, "mouse_movement": 0.9},
    {"typing_speed": 115, "keystroke_delay": 0.10, "mouse_movement": 0.95},
    {"typing_speed": 125, "keystroke_delay": 0.13, "mouse_movement": 0.85}
])

# Train Isolation Forest (Anomaly Detection)
model = IsolationForest(contamination=0.1)
model.fit(user_data)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    print("Received AI request:", data)  # Debugging

    input_data = np.array([[data["typing_speed"], data["keystroke_delay"], data["mouse_movement"]]])
    prediction = model.predict(input_data)

    # Convert NumPy bool to standard Python bool
    is_approved = bool(prediction[0] == 1)

    result = {
        "success": is_approved,
        "message": "Login Approved" if is_approved else "Suspicious Behavior Detected!"
    }

    print("AI Prediction:", result)  # Debugging
    return jsonify(result)  # Ensure JSON serialization works

if __name__ == "__main__":
    app.run(port=5001, debug=True)
