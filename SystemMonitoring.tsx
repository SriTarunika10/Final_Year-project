import React, { useState, useEffect } from 'react';

interface SystemMonitoringProps {
    navigate: (route: string) => void;
}

const SystemMonitoring: React.FC<SystemMonitoringProps> = ({ navigate }) => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [weatherError, setWeatherError] = useState<string | null>(null);

    const [prediction, setPrediction] = useState<any>(null);
    const [predictionLoading, setPredictionLoading] = useState(true);
    const [predictionError, setPredictionError] = useState<string | null>(null);
    const [monitoringData, setMonitoringData] = useState<any[]>([]);
    const [monitoringLoading, setMonitoringLoading] = useState(true);
    const [monitoringError, setMonitoringError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setWeatherLoading(true);
            setWeatherError(null);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                const sampleWeatherData = {
                    main: { temp: 300.15, humidity: 80, pressure: 1012 },
                    wind: { speed: 5.2 },
                    rain: { '1h': 2.5 },
                    clouds: { all: 60 },
                    weather: [{ description: 'moderate rain' }],
                    dt: Date.now() / 1000,
                };

                setWeatherData(sampleWeatherData);
            } catch (error: any) {
                setWeatherError(error.message || 'Failed to load weather data.');
            } finally {
                setWeatherLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    useEffect(() => {
        const fetchPrediction = async () => {
            setPredictionLoading(true);
            setPredictionError(null);
            if (!weatherData) {
                setPredictionLoading(false);
                return;
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                let cloudburstPrediction = 'No';
                let confidence = 0.2;
                if (weatherData.rain && weatherData.rain['1h'] > 5 && weatherData.clouds.all > 70) {
                    cloudburstPrediction = 'Yes';
                    confidence = 0.8;
                } else if (weatherData.rain && weatherData.rain['1h'] > 2 && weatherData.clouds.all > 50) {
                    cloudburstPrediction = 'Yes';
                    confidence = 0.5
                }

                setPrediction({ cloudburst: cloudburstPrediction, confidence: confidence });
            } catch (error: any) {
                setPredictionError(error.message || 'Failed to get prediction.');
            } finally {
                setPredictionLoading(false);
            }
        };

        fetchPrediction();
    }, [weatherData]);

    useEffect(() => {
        const fetchMonitoringData = async () => {
            setMonitoringLoading(true);
            setMonitoringError(null);
            try {
                await new Promise(resolve => setTimeout(resolve, 750));

                const sampleMonitoringData = [
                    { status: 'OK', message: 'System is running', timestamp: Date.now() },
                    { status: 'WARNING', message: 'High CPU usage', timestamp: Date.now() - 1000 * 60 * 10 },
                    { status: 'OK', message: 'Database connected', timestamp: Date.now() - 1000 * 60 * 60 },
                ];

                setMonitoringData(sampleMonitoringData);
            } catch (error: any) {
                setMonitoringError(error.message || 'Failed to load monitoring data.');
            } finally {
                setMonitoringLoading(false);
            }
        };

        fetchMonitoringData();
    }, [navigate]);


    return (
        <div className="admin-dashboard-content-section space-y-6 p-4">
            <h2 className="text-2xl font-bold">System Monitoring</h2>
            <p className="text-gray-600">Real-time system health and cloudburst prediction.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">Live Weather Data</h3>
                    <p className="text-gray-500 mb-4">Current weather conditions</p>
                    {weatherLoading ? (
                        <p>Loading weather data...</p>
                    ) : weatherError ? (
                        <p className="text-red-500">Error: {weatherError}</p>
                    ) : weatherData ? (
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-medium">Temperature:</span> {weatherData.main.temp.toFixed(2)} K</li>
                            <li><span className="font-medium">Humidity:</span> {weatherData.main.humidity}%</li>
                            <li><span className="font-medium">Pressure:</span> {weatherData.main.pressure} hPa</li>
                            <li><span className="font-medium">Wind Speed:</span> {weatherData.wind.speed} m/s</li>
                            <li><span className="font-medium">Rain (1h):</span> {weatherData.rain ? weatherData.rain['1h'] : '0'} mm/h</li>
                            <li><span className="font-medium">Cloud Cover:</span> {weatherData.clouds.all}%</li>
                            <li><span className="font-medium">Description:</span> {weatherData.weather[0].description}</li>
                            <li><span className="font-medium">Timestamp:</span> {new Date(weatherData.dt * 1000).toLocaleTimeString()}</li>
                        </ul>
                    ) : (
                        <p>No weather data available.</p>
                    )}
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">Cloudburst Prediction</h3>
                    <p className="text-gray-500 mb-4">Real-time prediction</p>
                    {predictionLoading ? (
                        <p>Loading prediction...</p>
                    ) : predictionError ? (
                        <p className="text-red-500">Error: {predictionError}</p>
                    ) : prediction ? (
                        <div className="space-y-4">
                            <p className="text-xl">
                                <span className="font-bold">Cloudburst is:</span>{' '}
                                <span
                                    className={
                                        prediction.cloudburst === 'Yes' ? 'text-red-500' : 'text-green-500'
                                    }
                                >
                                    {prediction.cloudburst}
                                </span>
                            </p>
                             <p>
                                <span className="font-medium">Confidence:</span> {prediction.confidence ? (prediction.confidence * 100).toFixed(0) + "%" : 'N/A'}
                            </p>

                        </div>
                    ) : (
                        <p>Waiting for prediction...</p>
                    )}
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">System Status</h3>
                    <p className="text-gray-500 mb-4">Current health of the system</p>
                    {monitoringLoading ? (
                        <p>Loading system status...</p>
                    ) : monitoringError ? (
                        <p className="text-red-500">Error: {monitoringError}</p>
                    ) : (
                        monitoringData.length === 0 ? (
                            <p>No monitoring data available.</p>
                        ) : (
                            <ul className="list-disc list-inside space-y-2">
                                {monitoringData.map((item, index) => (
                                    <li key={index}>
                                        <span className="font-medium">Status:</span>
                                        <span
                                            className={
                                                item.status === 'OK'
                                                    ? 'text-green-500'
                                                    : item.status === 'WARNING'
                                                        ? 'text-yellow-500'
                                                        : 'text-red-500'
                                            }
                                        >
                                            {item.status}
                                        </span>
                                        {' - '}
                                        <span className="font-medium">Message:</span> {item.message}
                                         {' - '}
                                        <span className="font-medium">Timestamp:</span>
                                        {item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : 'N/A'}
                                    </li>
                                ))}
                            </ul>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SystemMonitoring;
