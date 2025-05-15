from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import pickle
import traceback
import logging
import os
from twilio.rest import Client
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- Logging Setup ---
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] - %(message)s',
    handlers=[logging.FileHandler("cloudburst_app.log"), logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# --- Load Model ---
MODEL_PATH = "cloudburst_model.pkl"

def load_model():
    try:
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
            logger.info("Model loaded successfully.")
            return model
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        return None

model = load_model()

# --- Twilio Setup ---
TWILIO_ACCOUNT_SID = os.environ.get('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.environ.get('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.environ.get('TWILIO_PHONE_NUMBER')

def send_alert(location_name, phone_numbers):
    if not all([TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER]):
        logger.warning("Twilio credentials are not set.")
        return

    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    body = f"⚠️ ALERT: Cloudburst predicted in {location_name}. Take immediate precautions!"

    for number in phone_numbers:
        try:
            message = client.messages.create(
                to=number,
                from_=TWILIO_PHONE_NUMBER,
                body=body
            )
            logger.info(f"Alert sent to {number}: {message.sid}")
        except Exception as e:
            logger.error(f"Failed to send SMS to {number}: {e}")

def get_phone_numbers(location_name):
    mapping = {
        "Coimbatore": ["+919876543210", "+918765432101"],
        "Mumbai": ["+919988776655"],
    }
    return mapping.get(location_name, [])

# --- Predict Route ---
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not available."}), 500

        input_data = request.get_json()
        if not input_data:
            return jsonify({"error": "No input data provided."}), 400

        logger.info(f"Received input: {input_data}")

        # Convert to DataFrame and remove unused fields
        df = pd.DataFrame([input_data])
        df = df.drop(columns=["location", "state", "weather_description"], errors='ignore')

        prediction = model.predict(df)[0]
        logger.info(f"Prediction: {prediction}")

        if prediction == 1:
            location = input_data.get("location", "Unknown")
            numbers = get_phone_numbers(location)
            if numbers:
                send_alert(location, numbers)

        return jsonify({"cloudburst_prediction": int(prediction)})

    except Exception as e:
        logger.error(f"Prediction error: {e}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# --- Run ---
if __name__ == '__main__':
    app.run(debug=True, port=5050)  # Use a different port like 5050
