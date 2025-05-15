import React, { useState, useEffect } from 'react'; // Import useEffect for data fetching
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css'; // Make sure this CSS file exists

// --- Placeholder Components for Each Section ---

// 1. Dashboard Home Section
const DashboardHome = () => {
    // Placeholder state for summary data
    const [summaryData, setSummaryData] = useState({
        recentAlerts: 3,
        monitoringAreas: 5,
        lastLogin: '2023-10-27 10:00 AM', // Placeholder date/time
    });

    // In a real app, you would fetch this data from your backend
    // useEffect(() => {
    //     // Fetch summary data
    //     // fetch('/api/user/dashboard-summary', { headers: { 'Authorization': `Bearer ${yourAuthToken}` } })
    //     //     .then(response => response.json())
    //     //     .then(data => setSummaryData(data))
    //     //     .catch(error => console.error('Error fetching summary data:', error));
    // }, []);

    return (
      <div className="dashboard-content-section">
        <h2>Welcome to Your Dashboard</h2>
        <p>Get a quick overview of your account and recent activities.</p>

        <div className="dashboard-summary-cards">
            <div className="summary-card">
                <h3>Recent Alerts</h3>
                <p>{summaryData.recentAlerts}</p>
                <Link to="/user/dashboard?section=alerts" className="summary-link">View Alerts</Link>
            </div>
             <div className="summary-card">
                <h3>Monitoring Areas</h3>
                <p>{summaryData.monitoringAreas}</p>
                 <Link to="/user/dashboard?section=monitoring" className="summary-link">View Monitoring</Link>
            </div>
             <div className="summary-card">
                <h3>Last Login</h3>
                <p>{summaryData.lastLogin}</p>
            </div>
        </div>

        {/* --- Added Content About the System and Usage --- */}
        <section className="dashboard-info-section">
            <h3>About SkySnap.ai</h3>
            <p>
                SkySnap.ai is your proactive defense against the unpredictable threat of cloud bursts. Our system leverages advanced AI and real-time meteorological data to provide timely predictions, helping you stay informed and prepared.
            </p>
            <p>
                 As a user, your dashboard is your central hub for accessing critical information and managing your account settings related to cloud burst monitoring and alerts in your specified locations.
            </p>
        </section>

         <section className="dashboard-info-section">
            <h3>How SkySnap.ai Works (for Users)</h3>
            <p>
                Behind the scenes, SkySnap.ai processes vast amounts of data from satellites, weather stations, and other sources. Our AI models analyze this data to identify patterns and predict potential cloud burst events.
            </p>
            <p>
                For you, the user, this translates into actionable insights available right here in your dashboard:
            </p>
            <ul>
                <li><strong>Monitoring:</strong> Track the risk level in your areas of interest.</li>
                <li><strong>Alerts:</strong> Receive timely notifications when a potential threat is detected.</li>
                <li><strong>Profile:</strong> Keep your contact information and settings up-to-date to ensure you receive critical alerts.</li>
            </ul>
        </section>

         <section className="dashboard-info-section">
            <h3>User Guidelines: Navigating Your Dashboard</h3>
            <p>Using your SkySnap.ai dashboard is simple and intuitive:</p>
            <ul>
                <li>
                    <strong>Home:</strong> This page provides a summary of your recent activity and quick links to key sections.
                </li>
                 <li>
                    <strong>Profile:</strong> View and update your personal details, including your name, email, phone number, and location. Keeping this information accurate is vital for receiving alerts.
                </li>
                <li>
                    <strong>View Monitoring:</strong> Explore detailed monitoring data and visualizations for the regions you are following. Understand the current risk levels and historical trends.
                </li>
                 <li>
                    <strong>Alerts:</strong> Review past alerts you've received. In the future, you'll be able to customize your alert preferences here.
                </li>
                 <li>
                    <strong>Change Phone Number:</strong> Use this section to update your primary contact number for alerts.
                </li>
                 <li>
                    <strong>Remove Your Account:</strong> If necessary, you can initiate the process to permanently delete your account and data from this section. Please note this action is irreversible.
                </li>
                 <li>
                    <strong>Logout:</strong> Securely log out of your account when you are finished.
                 </li>
            </ul>
             <p>Regularly check your dashboard and ensure your profile information is current to maximize the effectiveness of SkySnap.ai's alert system.</p>
        </section>
        {/* --- End Added Content --- */}

      </div>
    );
};

// 2. Profile Section
const Profile = () => {
    // Placeholder state for user profile data
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com', // Assuming email is added to signup later
        phoneNumber: '+91 98765 43210',
        location: 'Coimbatore', // This might become Area/Locality
        familyMembers: 4, // Added family members
        state: 'Tamil Nadu', // Added state
        district: 'Coimbatore', // Added district
        country: 'India', // Added country
        govtType: 'Urban', // Added government type (Urban/Rural)
        // Add other profile fields as needed
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Initialize editable data when profileData changes or editing starts
        setEditableData(profileData);
    }, [profileData]); // Depend on profileData

    // In a real app, you would fetch this data from your backend on component mount
    // useEffect(() => {
    //     // Fetch profile data
    //     // fetch('/api/user/profile', { headers: { 'Authorization': `Bearer ${yourAuthToken}` } })
    //     //     .then(response => response.json())
    //     //     .then(data => setProfileData(data))
    //     //     .catch(error => console.error('Error fetching profile data:', error));
    // }, []);


    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditableData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setMessage('');
        console.log('Saving profile data:', editableData);
        // --- Add API call to backend to update profile ---
        // Example: fetch('/api/user/profile', { method: 'PUT', body: JSON.stringify(editableData), ... });
        // Upon successful response:
        // setProfileData(editableData); // Update displayed data
        // setIsEditing(false); // Exit editing mode
        setMessage('Profile updated successfully! (Placeholder)'); // Simulate success
        setIsEditing(false); // Exit editing mode after simulated save
    };

    const handleCancel = () => {
        setEditableData(profileData); // Revert changes
        setIsEditing(false); // Exit editing mode
    };

    return (
      <div className="dashboard-content-section">
        <h2>Your Profile</h2>

        {!isEditing ? (
            <div className="profile-details">
                <p><strong>Name:</strong> {profileData.name}</p>
                <p><strong>Email:</strong> {profileData.email || 'N/A'}</p> {/* Handle nullable email */}
                <p><strong>Phone Number:</strong> {profileData.phoneNumber || 'N/A'}</p> {/* Handle nullable phone */}
                <p><strong>Location (Area/Locality):</strong> {profileData.location || 'N/A'}</p> {/* Updated label */}

                {/* --- Added Display for Family and Geographical Details --- */}
                <p><strong>Family Members:</strong> {profileData.familyMembers || 'N/A'}</p>
                <p><strong>State:</strong> {profileData.state || 'N/A'}</p>
                <p><strong>District:</strong> {profileData.district || 'N/A'}</p>
                <p><strong>Country:</strong> {profileData.country || 'N/A'}</p>
                <p><strong>Government Type:</strong> {profileData.govtType || 'N/A'}</p>
                {/* --- End Added Display --- */}

                {/* Display other profile fields */}
                <button onClick={() => setIsEditing(true)} className="button secondary">Edit Profile</button>
            </div>
        ) : (
            <form onSubmit={handleSave} className="dashboard-form">
                 <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editableData.name || ''}
                      onChange={handleEditChange}
                      required
                      className="form-control"
                    />
                 </div>
                 <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editableData.email || ''}
                      onChange={handleEditChange}
                      className="form-control"
                      // required={true} // Make required if email is mandatory
                    />
                 </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={editableData.phoneNumber || ''}
                      onChange={handleEditChange}
                      className="form-control"
                      // required={true} // Make required if phone is mandatory
                    />
                 </div>
                  <div className="form-group">
                    <label htmlFor="location">Location (Area/Locality):</label> {/* Updated label */}
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={editableData.location || ''}
                      onChange={handleEditChange}
                      className="form-control"
                       // required={true} // Make required if location is mandatory
                    />
                 </div>

                 {/* --- Added Input Fields for Family and Geographical Details --- */}
                 <div className="form-group">
                    <label htmlFor="familyMembers">Family Members:</label>
                    <input
                      type="number"
                      id="familyMembers"
                      name="familyMembers"
                      value={editableData.familyMembers || ''}
                      onChange={handleEditChange}
                      className="form-control"
                      min="1" // Assuming at least 1 person (the user)
                    />
                 </div>
                 <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={editableData.state || ''}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                 </div>
                 <div className="form-group">
                    <label htmlFor="district">District:</label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={editableData.district || ''}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                 </div>
                 <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={editableData.country || ''}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                 </div>
                  <div className="form-group">
                    <label htmlFor="govtType">Government Type:</label>
                    <select
                      id="govtType"
                      name="govtType"
                      value={editableData.govtType || ''}
                      onChange={handleEditChange}
                      className="form-control"
                    >
                        <option value="">Select Type</option>
                        <option value="Urban">Urban</option>
                        <option value="Rural">Rural</option>
                    </select>
                 </div>
                 {/* --- End Added Input Fields --- */}


                 {/* Add input fields for other profile fields */}
                 <div className="form-actions">
                    <button type="submit" className="button primary">Save Changes</button>
                    <button type="button" onClick={handleCancel} className="button secondary outline">Cancel</button>
                 </div>
            </form>
        )}
         {message && <p className="form-message">{message}</p>}
      </div>
    );
};


// 3. Change Phone Number Section
const ChangePhoneNumber = () => {
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => { // Made async for API call
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    // Basic validation
    if (!newPhoneNumber || !/^\+?[0-9]{10,15}$/.test(newPhoneNumber.replace(/\s/g, ''))) {
      setMessage('Please enter a valid phone number.');
      setIsLoading(false);
      return;
    }
    console.log('Attempting to change phone number to:', newPhoneNumber);

    // --- Add API call to backend to update phone number ---
    // Example:
    // try {
    //     const response = await fetch('/api/user/change-phone', {
    //         method: 'POST', // Or PUT
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // 'Authorization': `Bearer ${yourAuthToken}` // Include auth token
    //         },
    //         body: JSON.stringify({ newPhoneNumber: newPhoneNumber }),
    //     });
    //     const result = await response.json();
    //     if (response.ok) {
    //         setMessage('Phone number updated successfully!');
    //         setNewPhoneNumber(''); // Clear the input field
    //     } else {
    //         setMessage(result.message || 'Failed to update phone number.');
    //     }
    // } catch (error) {
    //     console.error('API call failed:', error);
    //     setMessage('Network error. Could not update phone number.');
    // } finally {
    //     setIsLoading(false);
    // }

     // Simulate API call success
     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
     setMessage('Phone number update requested. (Placeholder)'); // Simulate success/feedback
     setNewPhoneNumber('');
     setIsLoading(false);
  };

  return (
    <div className="dashboard-content-section">
      <h2>Change Phone Number</h2>
      <p>Update the phone number associated with your account.</p>
      <form onSubmit={handleSubmit} className="dashboard-form">
        <div className="form-group">
          <label htmlFor="newPhoneNumber">New Phone Number:</label>
          <input
            type="tel"
            id="newPhoneNumber"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            required
            className="form-control"
            autoComplete="tel"
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="button primary" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Phone Number'}
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

// 4. Remove Account Section
const RemoveAccount = () => {
  const [confirmText, setConfirmText] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate is used here

  const handleRemove = async (e) => { // Made async for API call
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    // Basic confirmation
    if (confirmText.toLowerCase() !== 'delete my account') {
      setMessage('Please type "delete my account" to confirm.');
      setIsLoading(false);
      return;
    }
    console.log('Attempting to remove account');

    // --- Add API call to backend to remove account ---
    // Example:
    // try {
    //     const response = await fetch('/api/user/remove-account', {
    //         method: 'POST', // Or DELETE
    //         headers: {
    //             // 'Authorization': `Bearer ${yourAuthToken}` // Include auth token
    //         },
    //         // You might send user ID or confirmation text in the body
    //         // body: JSON.stringify({ confirmation: confirmText }),
    //     });
    //     const result = await response.json();
    //     if (response.ok) {
    //         // Handle successful removal (e.g., clear auth token, redirect)
    //         console.log('Account removed successfully');
    //         // localStorage.removeItem('authToken'); // Clear token
    //         navigate('/'); // Redirect to home or a confirmation page
    //     } else {
    //         setMessage(result.message || 'Failed to remove account.');
    //     }
    // } catch (error) {
    //     console.error('API call failed:', error);
    //     setMessage('Network error. Could not remove account.');
    // } finally {
    //     setIsLoading(false);
    // }

     // Simulate API call success
     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
     setMessage('Account removal requested. (Placeholder)'); // Simulate success/feedback
     setConfirmText('');
     setIsLoading(false);
     // In a real app, upon successful backend response, redirect the user
     // navigate('/'); // Redirect to home or a confirmation page
  };

  return (
    <div className="dashboard-content-section">
      <h2>Remove Your Account</h2>
      <p className="warning-message">This action is irreversible. Deleting your account will permanently remove your data.</p>
      <form onSubmit={handleRemove} className="dashboard-form">
         <div className="form-group">
            <label htmlFor="confirmText">Type "delete my account" to confirm:</label>
            <input
              type="text"
              id="confirmText"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              required
              className="form-control"
              disabled={isLoading}
            />
         </div>
        <button type="submit" className="button danger" disabled={isLoading}>
            {isLoading ? 'Removing...' : 'Remove Account'}
        </button>
         {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

// 5. View Monitoring Section
const ViewMonitoring = () => {
    // Placeholder state for monitoring data
    const [monitoringData, setMonitoringData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // In a real app, fetch monitoring data from your backend
        // fetch('/api/user/monitoring-data', { headers: { 'Authorization': `Bearer ${yourAuthToken}` } })
        //     .then(response => {
        //         if (!response.ok) throw new Error('Failed to fetch monitoring data');
        //         return response.json();
        //     })
        //     .then(data => {
        //         setMonitoringData(data);
        //         setIsLoading(false);
        //     })
        //     .catch(err => {
        //         console.error('Error fetching monitoring data:', err);
        //         setError('Failed to load monitoring data.');
        //         setIsLoading(false);
        //     });

         // Simulate data fetching with more detailed parameters
         const simulatedData = [
             { id: 1, area: 'Area A', status: 'Normal', lastUpdated: '2023-10-27 10:05 AM', rainfallIntensity: '0.5 mm/hr', cloudBaseHeight: '2000m', humidity: '70%', pressure: '1012 hPa' },
             { id: 2, area: 'Area B', status: 'High Risk', lastUpdated: '2023-10-27 10:10 AM', rainfallIntensity: '50 mm/hr', cloudBaseHeight: '500m', humidity: '95%', pressure: '1005 hPa' },
             { id: 3, area: 'Area C', status: 'Low Risk', lastUpdated: '2023-10-27 10:12 AM', rainfallIntensity: '2 mm/hr', cloudBaseHeight: '1500m', humidity: '80%', pressure: '1010 hPa' },
         ];
         setTimeout(() => {
             setMonitoringData(simulatedData);
             setIsLoading(false);
         }, 1500); // Simulate network delay

    }, []);


    if (isLoading) return <div className="dashboard-content-section">Loading monitoring data...</div>;
    if (error) return <div className="dashboard-content-section form-message error">{error}</div>;

    return (
      <div className="dashboard-content-section">
        <h2>Monitoring Data</h2>
        <p>View real-time and historical monitoring data related to cloud burst predictions in your areas of interest.</p>

        {/* --- Placeholder for the Graph --- */}
        <div className="monitoring-graph-placeholder">
            <h3>Cloud Burst Parameter Trends</h3>
            <p>Graph visualization of key parameters over time will appear here.</p>
            {/* You would integrate a charting library here (e.g., Chart.js, Recharts) */}
            {/* Example: <LineChart data={monitoringDataForGraph} /> */}
            <div style={{ height: '300px', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                [Graph Placeholder Area]
            </div>
        </div>
        {/* --- End Graph Placeholder --- */}


        {monitoringData.length === 0 ? (
            <p>No monitoring data available yet.</p>
        ) : (
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>Area</th>
                        <th>Status</th>
                        <th>Rainfall Intensity</th> {/* Added column */}
                        <th>Cloud Base Height</th> {/* Added column */}
                        <th>Humidity</th> {/* Added column */}
                        <th>Pressure</th> {/* Added column */}
                        <th>Last Updated</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {monitoringData.map(item => (
                        <tr key={item.id}>
                            <td data-label="Area">{item.area}</td>
                            <td data-label="Status">{item.status}</td>
                            <td data-label="Rainfall Intensity">{item.rainfallIntensity}</td> {/* Added data-label */}
                            <td data-label="Cloud Base Height">{item.cloudBaseHeight}</td> {/* Added data-label */}
                            <td data-label="Humidity">{item.humidity}</td> {/* Added data-label */}
                            <td data-label="Pressure">{item.pressure}</td> {/* Added data-label */}
                            <td data-label="Last Updated">{item.lastUpdated}</td>
                            <td data-label="Details"><button className="button small">View Details</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        {/* Add charts, maps, more detailed data tables here */}
      </div>
    );
};

// 6. Alerts Section
const Alerts = () => {
    // Placeholder state for alerts
    const [alerts, setAlerts] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

     useEffect(() => {
        // In a real app, fetch alerts from your backend
        // fetch('/api/user/alerts', { headers: { 'Authorization': `Bearer ${yourAuthToken}` } })
        //     .then(response => {
        //         if (!response.ok) throw new Error('Failed to fetch alerts');
        //         return response.json();
        //     })
        //     .then(data => {
        //         setAlerts(data);
        //         setIsLoading(false);
        //     })
        //     .catch(err => {
        //         console.error('Error fetching alerts:', err);
        //         setError('Failed to load alerts.');
        //         setIsLoading(false);
    //         });

         // Simulate data fetching
         const simulatedAlerts = [
             { id: 1, type: 'Warning', area: 'Area B', timestamp: '2023-10-27 10:10 AM', message: 'High risk of cloud burst detected in Area B.' },
             { id: 2, type: 'Advisory', area: 'Area C', timestamp: '2023-10-27 09:30 AM', message: 'Increased monitoring in Area C.' },
         ];
          setTimeout(() => {
             setAlerts(simulatedAlerts);
             setIsLoading(false);
         }, 1200); // Simulate network delay

    }, []);

    if (isLoading) return <div className="dashboard-content-section">Loading alerts...</div>;
    if (error) return <div className="dashboard-content-section form-message error">{error}</div>;


    return (
      <div className="dashboard-content-section">
        <h2>Your Alerts</h2>
        <p>Manage your alert settings and view past notifications.</p>

         {alerts.length === 0 ? (
            <p>No recent alerts.</p>
        ) : (
             <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Area</th>
                        <th>Timestamp</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {alerts.map(alert => (
                        <tr key={alert.id}>
                            <td data-label="Type">{alert.type}</td> {/* Added data-label */}
                            <td data-label="Area">{alert.area}</td> {/* Added data-label */}
                            <td data-label="Timestamp">{alert.timestamp}</td> {/* Added data-label */}
                            <td data-label="Message">{alert.message}</td> {/* Added data-label */}
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        {/* Add alert settings form here */}
      </div>
    );
};


// --- Main UserDashboard Component ---
const UserDashboard = () => {
  // State to manage which section is currently displayed
  // Use URL search params to allow direct linking to sections
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('home');

  // Effect to read section from URL on mount
  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const section = params.get('section');
      if (section) {
          setCurrentSection(section);
      }
  }, []); // Run once on mount

  // Effect to update URL when section changes
  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('section') !== currentSection) {
           // Update URL without triggering a full page reload
           navigate(`/user/dashboard?section=${currentSection}`, { replace: true });
      }
  }, [currentSection, navigate]); // Depend on currentSection and navigate


  // Function to render the selected section component
  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <DashboardHome />;
      case 'profile': // Changed order to match sidebar
        return <Profile />;
      case 'monitoring': // Changed order
        return <ViewMonitoring />;
      case 'alerts': // Changed order
        return <Alerts />;
      case 'change-phone': // Changed order
        return <ChangePhoneNumber />;
      case 'remove-account': // Changed order
        return <RemoveAccount />;
      default:
        return <DashboardHome />; // Default to home
    }
  };

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-sidebar">
        <h3>User Menu</h3>
        <ul>
          <li>
            {/* Use buttons to change state, which updates the URL and renders the section */}
            <button onClick={() => setCurrentSection('home')} className={currentSection === 'home' ? 'active' : ''}>
              Home
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentSection('profile')} className={currentSection === 'profile' ? 'active' : ''}>
              Profile
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentSection('monitoring')} className={currentSection === 'monitoring' ? 'active' : ''}>
              View Monitoring
            </button>
          </li>
           <li>
            <button onClick={() => setCurrentSection('alerts')} className={currentSection === 'alerts' ? 'active' : ''}>
              Alerts
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentSection('change-phone')} className={currentSection === 'change-phone' ? 'active' : ''}>
              Change Phone Number
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentSection('remove-account')} className={currentSection === 'remove-account' ? 'active' : ''}>
              Remove Your Account
            </button>
          </li>
          {/* Add a Logout button - this would typically clear auth token and navigate to login */}
          <li>
             <button onClick={() => {
                 console.log('Logging out...');
                 // --- Add logout logic (clear token, etc.) ---
                 // Example: localStorage.removeItem('authToken');
                 navigate('/login'); // Navigate to login page after logout
             }} className="danger">
                 Logout
             </button>
          </li>
        </ul>
      </div>
      <div className="dashboard-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default UserDashboard;
