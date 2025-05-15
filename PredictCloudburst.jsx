import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// Ensure this is imported for styling

const cloudburstProneLocations = [
    'Jammu & Kashmir',
    'Ladakh',
    'Himachal Pradesh',
    'Uttarakhand',
    'Sikkim',
    'Darjeeling',
    'Arunachal Pradesh',
    'Meghalaya',
    'Nagaland'
];

const CloudburstPrediction = () => {
    const [selectedLocation, setSelectedLocation] = useState('Uttarakhand');
    const [weatherData, setWeatherData] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [loadingPrediction, setLoadingPrediction] = useState(false);
    const [error, setError] = useState('');
    const [showWeatherData, setShowWeatherData] = useState(false);

    const fetchWeatherData = useCallback(async (location) => {
        setLoadingWeather(true);
        setError('');
        try {
            const apiKey = '26a4f919bf6d53c492c1a5bcce9dfa91'; // Replace with your actual API key.  Important!
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Weather data not found for ${location}. Status: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (e) {
            setError(e.message);
            setWeatherData(null);
        } finally {
            setLoadingWeather(false);
        }
    }, []);

    const fetchPrediction = useCallback((data) => {
        setLoadingPrediction(true);
        setError('');
        // Simulate prediction with dummy logic
        setTimeout(() => {
            if (data) {
                // Dummy prediction logic
                let dummyPrediction = "No";
                if (
                    data.main.temp > 25 &&
                    data.main.humidity > 60 &&
                    data.main.pressure < 1005
                ) {
                    dummyPrediction = "Yes";
                }
                setPrediction(dummyPrediction);
                setLoadingPrediction(false);
            } else {
                setError('No weather data to predict');
                setLoadingPrediction(false);
                setPrediction(null);
            }
        }, 500);
    }, []);


    useEffect(() => {
        fetchWeatherData(selectedLocation);
    }, [selectedLocation, fetchWeatherData]);

    useEffect(() => {
        if (weatherData) {
            fetchPrediction(weatherData);
        }
    }, [weatherData, fetchPrediction]);

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
        setShowWeatherData(false);
        setPrediction(null); // Clear previous prediction when location changes

    };

    const toggleWeatherDataDisplay = () => {
        setShowWeatherData(!showWeatherData);
    };

    return (
        <div>
            <h2>Cloudburst Prediction</h2>
            <div>
                <label htmlFor="locationSelect">Location:</label>
                <select
                    id="locationSelect"
                    value={selectedLocation}
                    onChange={handleLocationChange}
                >
                    {cloudburstProneLocations.map((loc) => (
                        <option key={loc} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
            </div>

            {loadingWeather && <p>Fetching weather data for {selectedLocation}...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && (
                <div>
                    <button onClick={toggleWeatherDataDisplay}>
                        {showWeatherData ? 'Hide' : 'Show'} Weather Data for {weatherData.name}
                    </button>
                    {showWeatherData && (
                        <div>
                            <h3>Weather Data for {weatherData.name}</h3>
                            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                            <div>
                                <p>Temperature: {weatherData.main.temp}°C</p>
                                <p>Min Temperature: {weatherData.main.temp_min}°C</p>
                                <p>Max Temperature: {weatherData.main.temp_max}°C</p>
                                 <p>Humidity: {weatherData.main.humidity}%</p>
                                <p>Pressure: {weatherData.main.pressure} hPa</p>
                                <p>Wind Speed: {weatherData.wind?.speed} m/s</p>
                                <p>Wind Direction: {weatherData.wind?.deg}°</p>
                                <p>Cloud Cover: {weatherData.clouds?.all}%</p>
                                {weatherData.rain && <p>Rainfall (1h): {weatherData.rain['1h']} mm</p>}
                                <p>Weather Condition: {weatherData.weather[0]?.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {loadingPrediction && <p>Fetching prediction...</p>}
            {prediction !== null && (
                <div>
                    <h3>Cloudburst Prediction:</h3>
                    <p>
                        {prediction === "Yes"
                            ? <span style={{ color: 'red', fontWeight: 'bold' }}>Cloudburst is likely to occur!</span>
                            : <span style={{ color: 'green', fontWeight: 'bold' }}>Cloudburst is not likely to occur.</span>
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default CloudburstPrediction;
