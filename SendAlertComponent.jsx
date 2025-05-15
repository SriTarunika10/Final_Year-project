import React, { useState, useEffect } from 'react';

const SendAlertComponent = () => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [alertMessage, setAlertMessage] = useState('Possible cloudburst detected. Take necessary precautions.');
    const [availableLocations, setAvailableLocations] = useState([]);
    const [isSendingAlert, setIsSendingAlert] = useState(false);
    const [alertError, setAlertError] = useState<string | null>(null);
    const [alertSuccessMessage, setAlertSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        // Pre-populate with cloudburst-prone areas
        const locationsFromDB = [
            'Jammu & Kashmir',
            'Ladakh',
            'Sonamarg (J&K)',
            'Baltal (J&K)',
            'Amarnath (J&K)',
            'Gurez Valley (J&K)',
            'Leh (Ladakh)',
            'Kargil (Ladakh)',
            'Himachal Pradesh',
            'Kullu (HP)',
            'Manali (HP)',
            'Chamba (HP)',
            'Kinnaur (HP)',
            'Lahaul-Spiti (HP)',
            'Kangra (HP)',
            'Uttarakhand',
            'Kedarnath (UK)',
            'Badrinath (UK)',
            'Chamoli (UK)',
            'Rudraprayag (UK)',
            'Pithoragarh (UK)',
            'Tehri Garhwal (UK)',
            'Sikkim',
            'Gangtok (Sikkim)',
            'North Sikkim (Sikkim)',
            'Darjeeling (WB)',
            'Kalimpong (WB)',
            'Arunachal Pradesh',
            'Meghalaya',
            'Cherrapunji (Meghalaya)',
            'Mawsynram (Meghalaya)',
            'Nagaland'
            // ... add more specific locations as needed
        ];
        setAvailableLocations(locationsFromDB);
    }, []);

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleMessageChange = (event) => {
        setAlertMessage(event.target.value);
    };

    const handleSendAlert = async () => {
        if (!selectedLocation) {
            setAlertError('Please select a location to send the alert.');
            return;
        }

        setIsSendingAlert(true);
        setAlertError(null);
        setAlertSuccessMessage(null);

        try {
            const response = await fetch('/api/send-alert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    location: selectedLocation,
                    message: alertMessage,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAlertSuccessMessage(data.message || `Alert sent successfully to people in ${selectedLocation}.`);
                setSelectedLocation('');
                setAlertMessage('Possible cloudburst detected. Take necessary precautions.');
            } else {
                const errorData = await response.json();
                setAlertError(errorData.error || `Failed to send alert to ${selectedLocation}.`);
            }
        } catch (error) {
            console.error('Error sending alert:', error);
            setAlertError('Failed to send alert. Please try again.');
        } finally {
            setIsSendingAlert(false);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Send Alert</h3>
            <label htmlFor="alertLocation" className="block text-gray-700 text-sm font-bold mb-2">
                Select Location:
            </label>
            <select
                id="alertLocation"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedLocation}
                onChange={handleLocationChange}
            >
                <option value="">-- Select a Location --</option>
                {availableLocations.map((loc) => (
                    <option key={loc} value={loc}>
                        {loc}
                    </option>
                ))}
            </select>

            <label htmlFor="alertMessage" className="block text-gray-700 text-sm font-bold mb-2">
                Alert Message:
            </label>
            <textarea
                id="alertMessage"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={alertMessage}
                onChange={handleMessageChange}
                rows={3}
            />

            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSendAlert}
                disabled={isSendingAlert}
            >
                {isSendingAlert ? 'Sending...' : 'Send Alert'}
            </button>

            {alertError && <p className="text-red-500 mt-2">{alertError}</p>}
            {alertSuccessMessage && <p className="text-green-500 mt-2">{alertSuccessMessage}</p>}
        </div>
    );
};

export default SendAlertComponent;