import streamlit as st
import joblib
import pandas as pd
from twilio.rest import Client
import mysql.connector

# --- Twilio API Configuration ---
ACCOUNT_SID = "AC518ef82a19fe49fa83a92a4e64654d48"
AUTH_TOKEN = "abee09804cbcbac545558f471e406132"
TWILIO_PHONE_NUMBER = "+12292980215"

# --- MySQL Config ---
DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = "sritarunika10"
DB_NAME = "cloudburst_alert"

# --- Simulated in-memory data for people in locations
if 'people_data' not in st.session_state:
    st.session_state.people_data = {
        "Coimbatore": ["Tarunika", "Ajay", "Divya"],
        "Nilgiris": ["Rahul", "Nandhini"],
        "Chennai": [],
        "Erode": []
    }

# --- Session State for Login ---
if 'logged_in' not in st.session_state:
    st.session_state.logged_in = False

if 'username' not in st.session_state:
    st.session_state.username = ""

# --- DB Utility ---
def get_users_from_db():
    conn = mysql.connector.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT name, phone_number FROM users")
    users = cursor.fetchall()
    conn.close()
    return users

def send_alert_to_users(message):
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    users = get_users_from_db()
    for name, phone in users:
        try:
            sms = client.messages.create(
                body=f"🌩️ Hello {name}, ALERT: {message}",
                from_=TWILIO_PHONE_NUMBER,
                to=f'+91{phone}'
            )
            st.success(f"📩 Alert sent to {name} ({phone}) | SMS ID: {sms.sid}")
        except Exception as e:
            st.error(f"❌ Failed to send alert to {name} ({phone}) - {e}")

# --- Load ML Model ---
@st.cache_resource
def load_model():
    model = joblib.load("cloudburst_model.pkl")
    scaler = joblib.load("scaler.pkl")
    label_encoders = joblib.load("label_encoders.pkl")
    return model, scaler, label_encoders

model, scaler, label_encoders = load_model()

# --- Login Page ---
def login_page():
    st.title("🔐 Admin Login")
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    if st.button("Login"):
        if username == "admin" and password == "admin":
            st.session_state.logged_in = True
            st.session_state.username = username
            st.success("Login successful!")
        else:
            st.error("Invalid username or password.")

# --- Dashboard ---
def dashboard():
    st.title("🌩️ Admin Dashboard")
    st.markdown(f"👋 Welcome, **{st.session_state.username}**")

    menu = st.sidebar.radio("Select Option", ["Predict Cloud Burst", "Manage People", "Send Manual Alert", "Logout"])

    if menu == "Predict Cloud Burst":
        st.subheader("☁️ Cloud Burst Prediction")
        location = st.selectbox("Location", label_encoders["Location"].classes_)
        wind_gust_direction = st.selectbox("Wind Gust Direction", label_encoders["WindGustDirection"].classes_)
        wind_direction_9am = st.selectbox("Wind Direction 9AM", label_encoders["WindDirection9am"].classes_)
        wind_direction_3pm = st.selectbox("Wind Direction 3PM", label_encoders["WindDirection3pm"].classes_)

        min_temp = st.number_input("Min Temp (°C)", value=10.0)
        max_temp = st.number_input("Max Temp (°C)", value=25.0)
        rainfall = st.number_input("Rainfall (mm)", value=5.0)
        evaporation = st.number_input("Evaporation (mm)", value=3.0)
        sunshine = st.number_input("Sunshine (hrs)", value=7.0)
        wind_gust_speed = st.number_input("Wind Gust Speed", value=50)
        wind_speed_9am = st.number_input("Wind Speed 9AM", value=10)
        wind_speed_3pm = st.number_input("Wind Speed 3PM", value=15)
        humidity_9am = st.number_input("Humidity 9AM (%)", value=80)
        humidity_3pm = st.number_input("Humidity 3PM (%)", value=60)
        pressure_9am = st.number_input("Pressure 9AM", value=1015)
        pressure_3pm = st.number_input("Pressure 3PM", value=1012)
        cloud_9am = st.number_input("Cloud 9AM", value=4)
        cloud_3pm = st.number_input("Cloud 3PM", value=3)
        temp_9am = st.number_input("Temp 9AM", value=15.0)
        temp_3pm = st.number_input("Temp 3PM", value=20.0)
        year = st.number_input("Year", value=2024)
        month = st.number_input("Month", value=3)
        day = st.number_input("Day", value=21)

        if st.button("Predict"):
            df = pd.DataFrame({
                "Location": [location],
                "MinimumTemperature": [min_temp],
                "MaximumTemperature": [max_temp],
                "Rainfall": [rainfall],
                "Evaporation": [evaporation],
                "Sunshine": [sunshine],
                "WindGustDirection": [wind_gust_direction],
                "WindGustSpeed": [wind_gust_speed],
                "WindDirection9am": [wind_direction_9am],
                "WindDirection3pm": [wind_direction_3pm],
                "WindSpeed9am": [wind_speed_9am],
                "WindSpeed3pm": [wind_speed_3pm],
                "Humidity9am": [humidity_9am],
                "Humidity3pm": [humidity_3pm],
                "Pressure9am": [pressure_9am],
                "Pressure3pm": [pressure_3pm],
                "Cloud9am": [cloud_9am],
                "Cloud3pm": [cloud_3pm],
                "Temperature9am": [temp_9am],
                "Temperature3pm": [temp_3pm],
                "Year": [year],
                "Month": [month],
                "Day": [day]
            })

            # Encoding categorical features
            for col in ["Location", "WindGustDirection", "WindDirection9am", "WindDirection3pm"]:
                df[col] = label_encoders[col].transform(df[col])

            df[df.columns] = scaler.transform(df)
            result = model.predict(df)[0]
            outcome = "Yes" if result == 1 else "No"
            st.success(f"Cloud Burst Tomorrow: {outcome}")

            if outcome == "Yes":
                # Send alert to users in the location
                send_alert_to_users(f"⚠️ Cloudburst likely tomorrow in {location}. Stay alert!")

    elif menu == "Manage People":
        st.subheader("👥 Manage People in Locations")
        action = st.radio("Select Action", ["Add Person", "Remove Person", "View People"])
        location = st.selectbox("Select Location", list(st.session_state.people_data.keys()))

        # --- Add Person ---
        if action == "Add Person":
            name = st.text_input("Enter name of person to add")
            phone = st.text_input("Enter phone number")
            if st.button("Add Person"):
                if name:
                    if name not in st.session_state.people_data[location]:
                        st.session_state.people_data[location].append(name)
                        st.success(f"{name} added to {location}")
                    else:
                        st.warning(f"{name} already exists in {location}")
                else:
                    st.error("Please enter a name.")
                   
        # --- Remove Person ---
        elif action == "Remove Person":
            if st.session_state.people_data[location]:
                name_to_remove = st.selectbox("Select person to remove", st.session_state.people_data[location])
                if st.button("Remove Person"):
                    st.session_state.people_data[location].remove(name_to_remove)
                    st.success(f"{name_to_remove} removed from {location}")
            else:
                st.info(f"No people to remove in {location}")

        # --- View People ---
        elif action == "View People":
            people_list = st.session_state.people_data[location]
            st.markdown(f"### People currently in {location}:")
            if people_list:
                for person in people_list:
                    st.write(f"- {person}")
            else:
                st.info(f"No people currently in {location}")

    elif menu == "Send Manual Alert":
        st.subheader("📲 Send Manual Alert")
        message = st.text_area("Enter message to send to all users:")
        if st.button("Send Alert"):
            send_alert_to_users(message)

    elif menu == "Logout":
        st.session_state.logged_in = False
        st.session_state.username = ""
        st.success("Logged out successfully.")

# --- Main ---
if not st.session_state.logged_in:
    login_page()
else:
    dashboard()
