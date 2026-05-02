# Cloudburst Prediction & Alert System

A full-stack web application that predicts cloudburst events using a machine learning model and automatically sends SMS alerts to registered users via Twilio.

---

## Project Overview

This final year project addresses the need for an early-warning system for extreme rainfall events (cloudbursts). It combines a trained ML classification model with a web interface that allows admins to input weather parameters, get predictions, and instantly notify users in affected areas via SMS.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (JSX/TSX), CSS |
| Backend (ML App) | Python, Streamlit |
| ML Model | scikit-learn (`cloudburst_model.pkl`) |
| Database | MySQL |
| Weather Data | OpenWeatherMap Realtime API |
| SMS Alerts | Twilio API |
| Auth | Custom login (Admin & User) |

---

## Project Structure

```
Final_Year-project/
│
├── appp.py                  # Streamlit admin app (ML prediction + alerts)
├── predict.py               # Standalone prediction script
├── cloudburst_model.pkl     # Trained ML classification model
├── cloudburst_app.log       # Application logs
│
├── Home.jsx / Home.css              # Landing page
├── Login.jsx / Login.css            # User login
├── Signup.jsx / Signup.css          # User registration
├── About.js / About.css             # About page
├── Contact.js / Contact.css         # Contact page
├── ForgotPassword.js/css            # Forgot password flow
├── ResetPassword.js/css             # Password reset
│
├── Userdashboard.jsx / UserDashboard.css     # User dashboard
├── Admindashboard.jsx / AdminDashboard.css   # Admin dashboard
├── PredictCloudburst.jsx/css                 # Prediction UI
├── SendAlertComponent.jsx                    # Alert sending component
├── SystemMonitoring.tsx                      # System monitoring panel
└── dashboard.js                             # Dashboard logic
```

---

## Features

### User Side
- Register and log in securely
- View cloudburst alerts for their location
- Receive SMS notifications when a cloudburst is predicted

### Admin Side
- Secure admin login
- Input weather parameters and get ML-based cloudburst predictions
- Manage people/users by location
- Send manual SMS alerts to all registered users
- Monitor system activity

### Realtime Weather Integration
- Fetches live weather data for supported locations using the **OpenWeatherMap API**
- Automatically populates prediction inputs (temperature, humidity, pressure, wind, etc.) with current conditions
- Reduces manual data entry and improves prediction accuracy

### ML Prediction
The model accepts the following weather parameters:
- Location, Min/Max Temperature, Rainfall, Evaporation, Sunshine
- Wind Gust Direction & Speed, Wind Direction (9AM/3PM)
- Humidity, Pressure, Cloud coverage (9AM/3PM)
- Temperature at 9AM/3PM, Date (Year, Month, Day)

---

## Setup & Installation

### Prerequisites
- Python 3.8+
- Node.js & npm
- MySQL Server
- A Twilio account (for SMS)
- An OpenWeatherMap API key (for realtime weather data)

### 1. Clone the Repository
```bash
git clone https://github.com/SriTarunika10/Final_Year-project.git
cd Final_Year-project
```

### 2. Backend (Python / Streamlit)
```bash
pip install streamlit scikit-learn pandas joblib twilio mysql-connector-python requests
streamlit run appp.py
```

### 3. Database Setup
Create a MySQL database and table:
```sql
CREATE DATABASE cloudburst_alert;
USE cloudburst_alert;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone_number VARCHAR(15)
);
```

Update the DB credentials in `appp.py`:
```python
DB_HOST = "localhost"
DB_USER = "your_mysql_user"
DB_PASSWORD = "your_mysql_password"
DB_NAME = "cloudburst_alert"
```

### 4. Twilio Configuration
Update your Twilio credentials in `appp.py`:
```python
ACCOUNT_SID = "your_account_sid"
AUTH_TOKEN = "your_auth_token"
TWILIO_PHONE_NUMBER = "your_twilio_number"
```

### 5. OpenWeatherMap API
The app fetches real-time weather data to auto-populate prediction inputs. Add your API key:
```python
OPENWEATHER_API_KEY = "your_openweather_api_key"
```
Get a free key at [openweathermap.org](https://openweathermap.org/api).

### 6. Frontend (React)
```bash
npm install
npm start
```

---

##  Usage

1. Start the MySQL server and ensure the `cloudburst_alert` database is set up.
2. Run the Streamlit backend: `streamlit run appp.py`
3. Start the React frontend: `npm start`
4. Log in as **admin** (username: `admin`, password: `admin`) to access prediction and alert features.
5. Regular users can register, log in, and receive SMS alerts.

---

## ML Model Details

- **Model file:** `cloudburst_model.pkl`
- **Scaler:** `scaler.pkl`
- **Label Encoders:** `label_encoders.pkl`
- The model predicts whether a cloudburst will occur the next day (`Yes` / `No`)
- If the prediction is **Yes**, SMS alerts are automatically dispatched to all users in the affected location

---

## License

This project was developed as a Final Year academic project. All rights reserved by the author.

---

## Author

**SriTarunika** — [GitHub](https://github.com/SriTarunika10)
