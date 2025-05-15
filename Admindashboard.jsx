import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
 // Import useNavigate for redirection after login
import './AdminDashboard.css'; // Make sure to create this CSS file
import PredictCloudburst from './PredictCloudburst';
import SystemMonitoring from './SystemMonitoring.tsx';

// Helper function to get the auth token from localStorage
const getAuthToken = () => localStorage.getItem('authToken');
const getUserType = () => localStorage.getItem('userType'); // Helper to get user type

// Helper function to make authenticated API calls to YOUR BACKEND
const authenticatedFetch = async (url, options = {}) => {
    const token = getAuthToken();
    const userType = getUserType(); // Get user type

    // Check if token and userType are present and user is admin
    if (!token || userType !== 'admin') {
        console.error('Authentication token missing or user is not admin.');
        // Handle case where token is missing or user is not admin (e.g., redirect to login)
        // Using window.location.href for a hard redirect outside of component render flow
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        window.location.href = '/login'; // Redirect to login page
        // Throw an error to stop further processing in the calling component
        const error = new Error('Authentication failed or not authorized.');
        error.status = 401; // Add status for easier handling
        throw error;
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`, // Include the JWT token
    };

    // Assuming your backend runs on http://localhost:3000
    const backendUrl = `http://localhost:3000${url}`; // Prepend backend URL to the path

    const response = await fetch(backendUrl, {
        ...options,
        headers: headers,
    });

    // If response is 401 or 403, the token might be invalid or expired or not authorized
    if (response.status === 401 || response.status === 403) {
        console.error('Authentication failed, token invalid/expired, or not authorized.');
        // Handle re-authentication or logout
        // Clear token and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        window.location.href = '/login'; // Redirect to login page
        const error = new Error('Authentication failed. Please log in again.');
        error.status = response.status;
        throw error; // Throw error to stop further processing in the calling component
    }

    return response; // Return the response object for the caller to handle success/failure
};




// --- Placeholder Components for Each Admin Section (Integrated with Backend Calls) ---

// 1. Admin Dashboard Home Section
const AdminDashboardHome = ({ navigate }) => { // Receive navigate prop
    const [overviewData, setOverviewData] = useState({
        totalUsers: 0,
        totalAdmins: 0,
        recentActivityCount: 0,
        activeMonitoringAreas: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOverviewData = async () => {
            setIsLoading(true);
            setError('');
            try {
                // Call the backend endpoint for overview data
                const response = await authenticatedFetch('/api/admin/dashboard-overview');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch overview data.');
                }
                const data = await response.json();
                setOverviewData(data);
            } catch (err) {
                console.error('Error fetching admin overview:', err);
                // authenticatedFetch already handles 401/403 redirect
                setError(err.message || 'Failed to load overview data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOverviewData();
    }, [navigate]); // navigate is stable, but adding for clarity if used in future effects

    if (isLoading) return <div className="admin-dashboard-content-section">Loading overview...</div>;
    if (error) return <div className="admin-dashboard-content-section form-message error">{error}</div>;

    return (
      <div className="admin-dashboard-content-section">
        <h2>Admin Overview</h2>
        <p>Quick statistics and insights into the system's status.</p>

        <div className="admin-summary-cards">
            <div className="summary-card">
                <h3>Total Users</h3>
                <p>{overviewData.totalUsers}</p>
                 {/* Link to Manage Users section */}
                 {/* Use navigate to change section */}
                 <button onClick={() => navigate('/admin/dashboard/manage-users')} className="summary-link-button">Manage Users</button>
            </div>
             <div className="summary-card">
                <h3>Total Admins</h3>
                <p>{overviewData.totalAdmins}</p>
                 {/* Link to Manage Admins section */}
                 {/* Use navigate to change section */}
                 <button onClick={() => navigate('/admin/dashboard/manage-admins')} className="summary-link-button">Manage Admins</button>
            </div>
             <div className="summary-card">
                <h3>Recent Activity</h3>
                <p>{overviewData.recentActivityCount}</p>
                 {/* Link to Activity Log section (assuming you'll add this) */}
                 {/* Use navigate to change section */}
                 {/* <button onClick={() => navigate('/admin/dashboard/activity-log')} className="summary-link-button">View Log</button> */}
            </div>
             <div className="summary-card">
                <h3>Active Monitoring</h3>
                <p>{overviewData.activeMonitoringAreas}</p>
                 {/* Link to System Monitoring section */}
                 {/* Use navigate to change section */}
                 <button onClick={() => navigate('/admin/dashboard/monitoring-system')} className="summary-link-button">View Monitoring</button>
            </div>
        </div>

        {/* --- Content about System Internals and Legal (Static) --- */}
         <section className="admin-info-section">
            <h3>How the System Internally Works (Technical Overview)</h3>
            <p>
                SkySnap.ai's cloud burst prediction system operates through a sophisticated pipeline involving data ingestion, AI processing, and alert dissemination.
            </p>
            <h4>Data Ingestion:</h4>
            <p>
                The system continuously pulls meteorological data from diverse sources including satellite imagery (geostationary and polar-orbiting), ground-based weather radar networks, automated weather stations (AWS), and potentially weather balloons and drones. Data formats are standardized and pre-processed for analysis.
            </p>
             <h4>AI Prediction Engine:</h4>
            <p>
                At the core is a suite of machine learning models, primarily deep learning neural networks, trained on historical cloud burst events, atmospheric conditions, and geographical data. These models analyze patterns in cloud formation, atmospheric pressure, humidity, temperature profiles, wind shear, and other parameters to identify precursors to extreme convective activity that can lead to cloud bursts. The models are continuously retrained and validated with new data.
            </p>
             <h4>Risk Assessment & Prediction:</h4>
            <p>
                Based on the AI output, the system performs geospatial analysis to determine the probability and potential intensity of cloud bursts in specific areas. Risk levels are assigned (e.g., Low, Moderate, High, Severe) for defined geographical zones. Predictions include estimated timeframes and potential impact areas.
            </p>
             <h4>Alert Generation & Dissemination:</h4>
            <p>
                When prediction confidence and risk levels cross predefined thresholds for a user's monitored area, alerts are automatically generated. The system uses a multi-channel approach for redundancy and reach, sending alerts via SMS, email, dedicated mobile app notifications, and APIs for integration with government emergency systems.
            </p>
             <h4>Data Storage & Reporting:</h4>
            <p>
                All raw data, prediction results, alert history, and system activity logs are stored in the database. This data is used for historical analysis, model improvement, and generating reports for administrators.
            </p>
        </section>

        <section className="admin-info-section">
            <h3>Legal and Compliance Aspects (Placeholder)</h3>
            <p>
                Operating a system that provides critical alerts for natural disasters involves significant legal and ethical considerations.
            </p>
            <ul>
                <li><strong>Data Privacy:</strong> Handling user data (phone numbers, location) requires strict adherence to data protection regulations (e.g., GDPR, local privacy laws). User consent for data collection and usage is paramount.</li>
                <li><strong>Accuracy and Liability:</strong> While AI predictions are advanced, they are not infallible. Clear disclaimers about the probabilistic nature of predictions and limitations of the system are necessary. Liability in case of inaccurate predictions or system failure needs to be addressed legally.</li>
                <li><strong>Compliance with Emergency Protocols:</strong> Integration with government and emergency services requires compliance with their established protocols and standards for alert dissemination and communication.</li>
                <li><strong>Intellectual Property:</strong> Protecting the proprietary AI models and software through patents and copyrights is essential.</li>
                <li><strong>Service Level Agreements (SLAs):</strong> For government and organizational clients, clear SLAs defining uptime, response times, and data accuracy expectations are required.</li>
                <li><strong>Regulatory Compliance:</strong> Adherence to regulations related to meteorological data usage, telecommunications for alerts, and potentially AI governance frameworks.</li>
            </ul>
            <p>
                <strong>Disclaimer:</strong> The information provided here is a general overview. Consult with legal professionals to ensure full compliance with all applicable laws and regulations in your operating regions.
            </p>
        </section>
      </div>
    );
};

// Helper component for Add/Edit User Form
const UserForm = ({ user, onSubmit, onCancel, isLoading }) => {
    const [formData, setFormData] = useState({
        name: user?.username || '', // Use username from DB for name
        email: user?.email || '',
        phoneNumber: user?.phone_number || '',
        location: user?.location || '',
        familyMembers: user?.family_members || '',
        state: user?.state || '',
        district: user?.district || '',
        country: user?.country || '',
        govtType: user?.govt_type || '',
        password: '', // Password field for adding or changing password
    });
     const [message, setMessage] = useState(''); // Message for form feedback

    // Update form data when user prop changes (for edit mode)
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.username || '',
                email: user.email || '',
                phoneNumber: user.phone_number || '',
                location: user.location || '',
                familyMembers: user.family_members || '',
                state: user.state || '',
                district: user.district || '',
                country: user.country || '',
                govtType: user.govt_type || '',
                password: '', // Password is not pre-filled for security
            });
        } else {
             // Reset form for add mode
             setFormData({
                 name: '', email: '', phoneNumber: '', location: '', familyMembers: '', state: '', district: '', country: '', govtType: '', password: '',
             });
        }
         setMessage(''); // Clear message on user change
    }, [user]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
         // Basic validation
         if (!formData.name || !formData.phoneNumber || !formData.location || !formData.state || !formData.district || !formData.country || !formData.govtType) {
              setMessage('Please fill in all required fields.');
              return;
          }
          if (!user && !formData.password) { // Password required only for adding a new user
               setMessage('Password is required for new users.');
               return;
           }
           if (formData.password && formData.password.length < 8) {
                setMessage('Password must be at least 8 characters.');
                return;
           }


        onSubmit(formData); // Pass form data up to the parent (ManageUsers)
    };

    return (
        <div className="admin-form-modal"> {/* Use a modal-like class for styling */}
            <div className="admin-form-modal-content">
                 {/* Added a close button */}
                 <button className="close-button" onClick={onCancel} disabled={isLoading}>&times;</button> {/* Changed to button for accessibility */}
                 <h3>{user ? 'Edit User' : 'Add New User'}</h3>
                 <form onSubmit={handleSubmit} className="admin-dashboard-form">
                      <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required disabled={isLoading} />
                       </div>
                       <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" disabled={isLoading} /> {/* Email is nullable */}
                       </div>
                       <div className="form-group">
                          <label htmlFor="phoneNumber">Phone Number:</label>
                          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="form-control" required disabled={isLoading} />
                       </div>
                        <div className="form-group">
                          <label htmlFor="location">Location (Area/Locality):</label>
                          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="form-control" required disabled={isLoading} />
                       </div>
                        <div className="form-group">
                          <label htmlFor="familyMembers">Family Members:</label>
                          <input type="number" id="familyMembers" name="familyMembers" value={formData.familyMembers} onChange={handleChange} className="form-control" min="0" disabled={isLoading} /> {/* Changed min to 0 */}
                       </div>
                        <div className="form-group">
                          <label htmlFor="state">State:</label>
                          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="form-control" required disabled={isLoading} />
                       </div>
                        <div className="form-group">
                          <label htmlFor="district">District:</label>
                          <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} className="form-control" required disabled={isLoading} />
                       </div>
                        <div className="form-group">
                          <label htmlFor="country">Country:</label>
                          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="form-control" required disabled={isLoading} />
                       </div>
                         <div className="form-group">
                          <label htmlFor="govtType">Government Type:</label>
                          <select id="govtType" name="govtType" value={formData.govtType} onChange={handleChange} className="form-control" required disabled={isLoading}>
                              <option value="">Select Type</option>
                              <option value="Urban">Urban</option>
                              <option value="Rural">Rural</option>
                          </select>
                       </div>
                         {/* Password field is required for add, optional for edit.
                             If password is provided during edit, it will update the password. */}
                           <div className="form-group">
                               <label htmlFor="password">{user ? 'New Password (Optional):' : 'Password:'}</label>
                               <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required={!user} disabled={isLoading} />
                           </div>
                       {/* Add more fields as needed */}
                        {message && <p className="form-message error">{message}</p>} {/* Display form-specific error */}
                        <div className="form-actions">
                             <button type="submit" className="button primary" disabled={isLoading}>{isLoading ? (user ? 'Saving...' : 'Adding...') : (user ? 'Save Changes' : 'Add User')}</button>
                             <button type="button" onClick={onCancel} className="button secondary outline" disabled={isLoading}>Cancel</button>
                        </div>
                 </form>
            </div>
        </div>
    );
};


// 2. Manage Users Section
const ManageUsers = ({ navigate }) => { // Receive navigate prop
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showUserForm, setShowUserForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null); // Null for add, user object for edit
    const [message, setMessage] = useState(''); // For success/error messages after actions


     // Function to fetch users from the backend
    const fetchUsers = async () => {
        setIsLoading(true);
        setError('');
        setMessage('');
        try {
            // Call the backend endpoint for users list
            const response = await authenticatedFetch('/api/admin/users');
             if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.error || 'Failed to fetch users.');
             }
             const data = await response.json();
             setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
             // authenticatedFetch already handles 401/403 redirect
             setError(err.message || 'Failed to load users.');
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers(); // Fetch users on component mount
    }, [navigate]); // Add navigate to dependency array

    // Function to fetch a single user for editing
    const fetchUserForEdit = async (userId) => {
         setError('');
         setMessage('');
         setIsLoading(true); // Show loading while fetching user for edit
         try {
             // Call the backend endpoint to get a single user
             const response = await authenticatedFetch(`/api/admin/users/${userId}`);
             if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.error || 'Failed to fetch user details.');
             }
              const userData = await response.json();
              setEditingUser(userData); // Set the user data to populate the form
              setShowUserForm(true); // Show the form
         } catch (err) {
             console.error('Error fetching user for edit:', err);
              // authenticatedFetch already handles 401/403 redirect
              setError(err.message || 'Failed to load user details for editing.');
         } finally {
              setIsLoading(false); // Hide loading
         }
    };


    const handleAddUserClick = () => {
        setEditingUser(null); // Set editingUser to null for Add mode
        setShowUserForm(true); // Show the form
        setError(''); // Clear errors
        setMessage(''); // Clear messages
    };

    const handleEditUserClick = (user) => {
         // Fetch the full user data for editing (including potentially hidden fields like email if not in list view)
         fetchUserForEdit(user.id); // Use this to fetch full details
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm(`Are you sure you want to delete user with ID ${userId}?`)) {
             setIsLoading(true); // Optional: show loading for delete action
             setError('');
             setMessage('');
             try {
                 // Call the backend endpoint to delete a user
                 const response = await authenticatedFetch(`/api/admin/users/${userId}`, {
                     method: 'DELETE',
                 });
                  if (!response.ok) {
                       // Check if the response has a JSON body before parsing
                       const contentType = response.headers.get("content-type");
                       if (contentType && contentType.indexOf("application/json") !== -1) {
                           const errorData = await response.json();
                           throw new Error(errorData.error || 'Failed to delete user.');
                       } else {
                           const errorText = await response.text();
                           throw new Error(`Failed to delete user: ${response.status} ${response.statusText} - ${errorText}`);
                       }
                  }
                  // If deletion is successful, refetch the user list
                  await fetchUsers();
                  setMessage('User deleted successfully!');
             } catch (err) {
                 console.error('Error deleting user:', err);
                  // authenticatedFetch already handles 401/403 redirect
                  setError(err.message || 'Failed to delete user.');
             } finally {
                 setIsLoading(false); // Optional: hide loading
             }
        }
    };

    const handleFormSubmit = async (userData) => {
        setIsLoading(true); // Show loading for form submission
        setError('');
        setMessage('');
        try {
            let response;
            // Call the backend endpoint to add or update a user
            if (editingUser) {
                // Edit operation (PUT)
                response = await authenticatedFetch(`/api/admin/users/${editingUser.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });
            } else {
                // Add operation (POST)
                response = await authenticatedFetch('/api/admin/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });
            }

             if (!response.ok) {
                  // Check if the response has a JSON body before parsing
                  const contentType = response.headers.get("content-type");
                  if (contentType && contentType.indexOf("application/json") !== -1) {
                      const errorData = await response.json();
                      throw new Error(errorData.error || `Failed to ${editingUser ? 'update' : 'add'} user.`);
                  } else {
                       const errorText = await response.text();
                       throw new Error(`Failed to ${editingUser ? 'update' : 'add'} user: ${response.status} ${response.statusText} - ${errorText}`);
                  }
             }

             // If successful, refetch the user list and close the form
             await fetchUsers();
             setShowUserForm(false);
             setEditingUser(null);
             setMessage(`User ${editingUser ? 'updated' : 'added'} successfully!`);

        } catch (err) {
            console.error(`Error ${editingUser ? 'updating' : 'adding'} user:`, err);
             // authenticatedFetch already handles 401/403 redirect
             setError(err.message || `Failed to ${editingUser ? 'update' : 'add'} user.`);
        } finally {
            setIsLoading(false); // Hide loading
        }
    };


    if (isLoading && !showUserForm) return <div className="admin-dashboard-content-section">Loading users...</div>;


    return (
      <div className="admin-dashboard-content-section">
        <h2>Manage Users</h2>
        <p>View, add, edit, or remove registered users.</p>

        {message && <p className="form-message success">{message}</p>} {/* Display success message */}
        {error && <p className="form-message error">{error}</p>} {/* Display error message */}


        <div className="admin-actions">
             <button onClick={handleAddUserClick} className="button primary" disabled={isLoading}>Add New User</button>
        </div>

        {showUserForm && (
             <UserForm user={editingUser} onSubmit={handleFormSubmit} onCancel={() => setShowUserForm(false)} isLoading={isLoading} />
        )}


         {!showUserForm && ( // Only show table if form is not visible
             users.length === 0 ? (
                 <p>No users registered yet.</p>
             ) : (
                 <table className="admin-dashboard-table">
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>Username</th> {/* Maps to Name from user signup */}
                             <th>Email</th>
                             <th>Phone Number</th>
                             <th>Location</th> {/* Area/Locality */}
                             <th>Family Members</th> {/* Added column */}
                             <th>State</th> {/* Added column */}
                             <th>District</th> {/* Added column */}
                             <th>Country</th> {/* Added column */}
                             <th>Govt Type</th> {/* Added column */}
                             <th>Registered On</th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                         {users.map(user => (
                             <tr key={user.id}>
                                 <td data-label="ID">{user.id}</td>
                                 <td data-label="Username">{user.username}</td>
                                 <td data-label="Email">{user.email || 'N/A'}</td>
                                 <td data-label="Phone Number">{user.phone_number || 'N/A'}</td>
                                 <td data-label="Location">{user.location || 'N/A'}</td>
                                 <td data-label="Family Members">{user.family_members || 'N/A'}</td> {/* Display added */}
                                 <td data-label="State">{user.state || 'N/A'}</td> {/* Display added */}
                                 <td data-label="District">{user.district || 'N/A'}</td> {/* Display added */}
                                 <td data-label="Country">{user.country || 'N/A'}</td> {/* Display added */}
                                 <td data-label="Govt Type">{user.govt_type || 'N/A'}</td> {/* Display added */}
                                 <td data-label="Registered On">{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</td> {/* Format date */}
                                 <td data-label="Actions">
                                     <button onClick={() => handleEditUserClick(user)} className="button small secondary" disabled={isLoading}>Edit</button>
                                     <button onClick={() => handleDeleteUser(user.id)} className="button small danger" disabled={isLoading}>Delete</button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             )
         )}
      </div>
    );
};

// 3. Manage Admins Section (Keeping this from previous structure, adjust if needed)
// This would require backend endpoints for admin management similar to user management
const ManageAdmins = ({ navigate }) => { // Receive navigate prop
     // Placeholder state for admin list
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // For success/error messages after actions


     // Function to fetch admins from the backend
      const fetchAdmins = async () => {
          setIsLoading(true);
          setError('');
          setMessage('');
          try {
              // Call the backend endpoint for admins list
              const response = await authenticatedFetch('/api/admin/admins');
               if (!response.ok) {
                   const errorData = await response.json();
                   throw new Error(errorData.error || 'Failed to fetch admins.');
               }
               const data = await response.json();
               setAdmins(data);
          } catch (err) {
              console.error('Error fetching admins:', err);
               // authenticatedFetch already handles 401/403 redirect
               setError(err.message || 'Failed to load admins.');
          } finally {
              setIsLoading(false);
          }
      };


    useEffect(() => {
        fetchAdmins(); // Fetch admins on component mount
    }, [navigate]); // Add navigate to dependency array

    // Placeholder functions for actions (Edit, Delete, Add)
     const handleAddAdmin = () => {
         console.log('Add new admin - requires backend endpoint and form');
         setMessage('Add Admin functionality not yet implemented.');
         // Implement logic to navigate to an add admin form or show a modal
     };

    const handleEditAdmin = (adminId) => {
        console.log('Edit admin:', adminId, '- requires backend endpoint and form');
         setMessage(`Edit Admin ID ${adminId} functionality not yet implemented.`);
        // Implement logic to navigate to an edit page or show a modal
    };

    const handleDeleteAdmin = async (adminId) => {
         if (window.confirm(`Are you sure you want to delete admin with ID ${adminId}?`)) {
              setIsLoading(true); // Optional: show loading for delete action
              setError('');
              setMessage('');
              try {
                  // Call the backend endpoint to delete an admin
                  const response = await authenticatedFetch(`/api/admin/admins/${adminId}`, {
                      method: 'DELETE',
                  });
                   if (!response.ok) {
                       // Check if the response has a JSON body before parsing
                       const contentType = response.headers.get("content-type");
                       if (contentType && contentType.indexOf("application/json") !== -1) {
                           const errorData = await response.json();
                           throw new Error(errorData.error || 'Failed to delete admin.');
                       } else {
                           const errorText = await response.text();
                           throw new Error(`Failed to delete admin: ${response.status} ${response.statusText} - ${errorText}`);
                       }
                   }
                   // If deletion is successful, refetch the admin list
                   await fetchAdmins();
                   setMessage('Admin deleted successfully!');
              } catch (err) {
                  console.error('Error deleting admin:', err);
                   // authenticatedFetch already handles 401/403 redirect
                   setError(err.message || 'Failed to delete admin.');
              } finally {
                  setIsLoading(false); // Optional: hide loading
              }
         }
    };


    if (isLoading) return <div className="admin-dashboard-content-section">Loading admins...</div>;
     if (error) return <div className="admin-dashboard-content-section form-message error">{error}</div>;


    return (
      <div className="admin-dashboard-content-section">
        <h2>Manage Admins</h2>
        <p>View, add, edit, or remove administrators.</p>

         {message && <p className="form-message success">{message}</p>} {/* Display success message */}
         {error && <p className="form-message error">{error}</p>} {/* Display error message */}


        <div className="admin-actions">
             <button onClick={handleAddAdmin} className="button primary" disabled={isLoading}>Add New Admin</button>
        </div>

         {/* Placeholder for Add/Edit Admin Form */}
         {/* {showAdminForm && ( <AdminForm admin={editingAdmin} onSubmit={...} onCancel={...} isLoading={isLoading} /> )} */}


         {admins.length === 0 ? (
             <p>No admins registered yet (excluding the currently logged-in admin if your backend excludes them).</p>
         ) : (
             <table className="admin-dashboard-table">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>Employee ID</th> {/* Maps to Username from admin signup */}
                         <th>Email</th>
                         <th>Phone Number</th>
                         <th>Location</th>
                         <th>Roles</th>
                         <th>Registered On</th>
                         <th>Actions</th>
                     </tr>
                 </thead>
                 <tbody>
                     {admins.map(admin => (
                         <tr key={admin.id}>
                             <td data-label="ID">{admin.id}</td>
                             <td data-label="Employee ID">{admin.username}</td>
                             <td data-label="Email">{admin.email || 'N/A'}</td>
                             <td data-label="Phone Number">{admin.phone_number || 'N/A'}</td>
                             <td data-label="Location">{admin.location || 'N/A'}</td>
                             <td data-label="Roles">{admin.roles || 'N/A'}</td>
                             <td data-label="Registered On">{admin.created_at ? new Date(admin.created_at).toLocaleDateString() : 'N/A'}</td> {/* Format date */}
                             <td data-label="Actions">
                                 <button onClick={() => handleEditAdmin(admin.id)} className="button small secondary" disabled={isLoading}>Edit</button>
                                 <button onClick={() => handleDeleteAdmin(admin.id)} className="button small danger" disabled={isLoading}>Delete</button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         )}
      </div>
    );
};

const CloudBurstPrediction = () => {
    const [location, setLocation] = useState('');
    const [predictionResult, setPredictionResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePredictClick = async () => {
        if (!location) {
            setError('Please enter a location to get a prediction.');
            return;
        }

        setIsLoading(true);
        setError('');
        setPredictionResult(null); // Clear previous result

        try {
            // Backend API call to trigger cloud burst prediction
            // Assumes your backend is running on the same host as the frontend (for simplicity)
            const response = await authenticatedFetch(
                `/api/admin/predict-cloud-burst?location=${encodeURIComponent(location)}`,
                {
                    method: 'POST', // Or GET, depending on your backend API design
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get prediction.');
            }

            const data = await response.json();
            setPredictionResult(data.prediction); // Adjust 'data.prediction' to match your actual response structure
             //  setPredictionResult(data.result);
            //  Example of expected response: { prediction: 'Yes' } or { prediction: 'No' }
        } catch (err) {
            setError(err.message || 'An error occurred while getting the prediction.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // const sendAlertsForLocation = async (location) => {
    //     // Implementation for sending alerts to users in the specified location
    //     // This is a placeholder - you'll need to define the actual API endpoint and data structure
    //     console.log(`Sending alerts to users in ${location}`);
    //      try {
    //         const response = await authenticatedFetch(
    //             `/api/admin/sendAlertsForLocation?location=${encodeURIComponent(location)}`,
    //             {
    //                 method: 'POST', // Or GET, depending on your backend API design
    //             }
    //         );

    //          if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.error || 'Failed to send alerts.');
    //         }
    //          const result = await response.json();
    //          console.log(result);
    //      } catch(error) {
    //          console.error("Error sending Alerts", error)
    //      }
    // };

    return (
        <div className="admin-dashboard-content-section">
            <h2>Predict Cloud Burst</h2>
            <p>Enter a location to get a cloud burst prediction.</p>

            <div className="admin-dashboard-form">
                <div className="form-group">
                    <label htmlFor="location">Location (City, Area, etc.):</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="form-control"
                        placeholder="Enter location..."
                        disabled={isLoading}
                    />
                </div>

                <div className="form-actions">
                    <button onClick={handlePredictClick} className="button primary" disabled={isLoading || !location}>
                        {isLoading ? 'Getting Prediction...' : 'Get Live Prediction'}
                    </button>
                </div>

                {predictionResult !== null && (
                    <div className={`prediction-result ${predictionResult === 'Yes' ? 'predicted' : 'not-predicted'}`}>
                        <h3>Prediction for {location} Tomorrow:</h3>
                        <p>{predictionResult}</p>
                        {/* You could add more details here if your backend returns them */}
                    </div>
                )}

                 {/* Optional: Add a button to send alerts if prediction is 'Yes' */}
                 {/* {predictionResult === 'Yes' && (
                     <div className="form-actions" style={{ marginTop: '10px' }}>
                         <button onClick={() => sendAlertsForLocation(location)} className="button danger">Send Cloud Burst Alert to Users in {location}</button>
                     </div>
                 )} */}
                 {/* Note: sendAlertsForLocation would need to be implemented, potentially calling a backend endpoint */}

            </div>
        </div>
    );
};

// 4. System Monitoring Section (Placeholder - You'll create this)
const SystemMonitoringSection = ({ navigate }) => {
  return (
    <SystemMonitoring navigate={navigate}/>
  )
};


const CloudburstPrediction = ({ navigate }) => {
  return (
    <CloudburstPrediction navigate={navigate}/>
  )
};


// 5. Reports and Analytics Section (Placeholder)
const ReportsAnalytics = ({ navigate }) => {
    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatingReport, setGeneratingReport] = useState(false);

    const fetchReportData = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await authenticatedFetch('/api/admin/reports');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch report data.');
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                setError('Expected an array of report data, but received something else.');
                setReportData(null);
                return;
            }
            setReportData(data);
        } catch (err) {
            console.error('Error fetching report data:', err);
            setError(err.message || 'Failed to load report data.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReportData();
    }, [fetchReportData, navigate]);

    const handleGenerateReport = async () => {
        setGeneratingReport(true);
        setError('');
        try {
            const response = await authenticatedFetch('/api/admin/generate-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ report_type: 'detailed' }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate report.');
            }

            const report = await response.json();
            console.log('Report Data:', report);

            if (report.type === 'json') {
                setReportData([report.report_data]);
            } else if (report.type === 'csv') {
                console.log(report.report_data);
                alert("CSV data available in console. You would usually trigger a download here.");
            } else if (report.type === 'pdf') {
                const byteCharacters = atob(report.report_data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            } else {
                setReportData(null);
            }
        } catch (err) {
            console.error('Error generating report:', err);
            setError(err.message || 'Failed to generate report.');
        } finally {
            setGeneratingReport(false);
        }
    };

    if (isLoading) return <div className="admin-dashboard-content-section">Loading reports...</div>;
    if (error) return <div className="admin-dashboard-content-section form-message error">{error}</div>;

    return (
        <div className="admin-dashboard-content-section">
            <h2>Reports and Analytics</h2>
            <p>View system reports, prediction accuracy, and user engagement metrics.</p>
            <button onClick={handleGenerateReport} disabled={generatingReport}>
                {generatingReport ? 'Generating...' : 'Generate Report'}
            </button>

            {reportData ? (
                <ul>
                    {reportData.map((report, index) => (
                        <li key={index}>
                            {report.title && <p>Title: {report.title}</p>}
                            {report.date && <p>Date: {report.date}</p>}

                            {report.metrics && (
                                <ul>
                                    {report.metrics.map((m, mIndex) => (
                                        <li key={mIndex}>{m.name}: {m.value}</li>
                                    ))}
                                </ul>
                            )}

                            {report.system_health && (
                                <ul>
                                    {report.system_health.map((sh, shIndex) => (
                                        <li key={shIndex}>{sh.metric}: {sh.value} - {sh.status}</li>
                                    ))}
                                </ul>
                            )}

                            {report.user_activity && (
                                <ul>
                                    {report.user_activity.map((ua, uaIndex) => (
                                        <li key={uaIndex}>User: {ua.user_id} - Last Login: {ua.last_login} - Actions: {ua.actions}</li>
                                    ))}
                                </ul>
                            )}

                            {report.prediction_accuracy && (
                                <ul>
                                    {report.prediction_accuracy.map((pa, paIndex) => (
                                        <li key={paIndex}>Location: {pa.location} - Accuracy: {pa.accuracy} - Samples: {pa.samples}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No report data available.</p>
            )}
        </div>
    );
};



// 6. System Settings Section (Placeholder)
const SystemSettings = ({ navigate }) => { // Receive navigate prop
     const [settings, setSettings] = useState({});
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState('');
     const [message, setMessage] = useState(''); // For success message after saving

     useEffect(() => {
         const fetchSettings = async () => {
             setIsLoading(true);
             setError('');
             setMessage('');
             try {
                 // Call the backend endpoint for settings
                 const response = await authenticatedFetch('/api/admin/settings');
                 if (!response.ok) {
                     const errorData = await response.json();
                     throw new Error(errorData.error || 'Failed to fetch settings.');
                 }
                 const data = await response.json();
                 setSettings(data);
             } catch (err) {
                 console.error('Error fetching settings:', err);
                  // authenticatedFetch already handles 401/403 redirect
                  setError(err.message || 'Failed to load settings.');
             } finally {
                 setIsLoading(false);
             }
         };
         fetchSettings();
     }, [navigate]);

     const handleSettingChange = (e) => {
         const { name, value, type, checked } = e.target;
         setSettings(prevSettings => ({
             ...prevSettings,
             [name]: type === 'checkbox' ? checked : value
         }));
     };

     const handleSaveSettings = async () => {
         setIsLoading(true);
         setError('');
         setMessage('');
         try {
              // Call the backend endpoint to save settings
              const response = await authenticatedFetch('/api/admin/settings', {
                  method: 'PUT', // Or POST, depending on your API design
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(settings),
              });
              if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.error || 'Failed to save settings.');
              }
              setMessage('Settings saved successfully!');
         } catch (err) {
             console.error('Error saving settings:', err);
              // authenticatedFetch already handles 401/403 redirect
              setError(err.message || 'Failed to save settings.');
         } finally {
             setIsLoading(false);
         }
     };


     if (isLoading) return <div className="admin-dashboard-content-section">Loading settings...</div>;
     if (error) return <div className="admin-dashboard-content-section form-message error">{error}</div>;


     return (
       <div className="admin-dashboard-content-section">
         <h2>System Settings</h2>
         <p>Configure system parameters and thresholds.</p>

         {message && <p className="form-message success">{message}</p>} {/* Display success message */}
         {error && <p className="form-message error">{error}</p>} {/* Display error message */}

         <div className="admin-dashboard-form"> {/* Use form styling */}
             {/* Example settings fields */}
             <div className="form-group">
                 <label htmlFor="alertThreshold">Cloud Burst Alert Threshold:</label>
                 <input
                     type="number"
                     id="alertThreshold"
                     name="alertThreshold"
                     value={settings.alertThreshold || ''}
                     onChange={handleSettingChange}
                     className="form-control"
                     disabled={isLoading}
                 />
             </div>
              <div className="form-group">
                  <label htmlFor="dataRefreshInterval">Data Refresh Interval (minutes):</label>
                  <input
                      type="number"
                      id="dataRefreshInterval"
                      name="dataRefreshInterval"
                      value={settings.dataRefreshInterval || ''}
                      onChange={handleSettingChange}
                      className="form-control"
                      disabled={isLoading}
                  />
              </div>
               <div className="form-group checkbox-group"> {/* Example for a checkbox setting */}
                   <input
                       type="checkbox"
                       id="enableAutomatedAlerts"
                       name="enableAutomatedAlerts"
                       checked={settings.enableAutomatedAlerts || false}
                       onChange={handleSettingChange}
                       disabled={isLoading}
                   />
                   <label htmlFor="enableAutomatedAlerts">Enable Automated Alerts</label>
               </div>

             {/* Add more settings fields as needed */}

             <div className="form-actions">
                 <button onClick={handleSaveSettings} className="button primary" disabled={isLoading}>Save Settings</button>
             </div>
         </div>
       </div>
     );
};


// Main Admin Dashboard Component
const AdminDashboard = () => {
    const navigate = useNavigate(); // Get navigate hook
    const [activeSection, setActiveSection] = useState('home'); // State to manage active section

    // Check authentication status on mount and whenever location changes (e.g., from login redirect)
    useEffect(() => {
        const token = getAuthToken();
        const userType = getUserType();

        if (!token || userType !== 'admin') {
            console.log('AdminDashboard: No token or not admin, redirecting to login.');
            // Use window.location.href for a hard redirect to ensure state is cleared
            window.location.href = '/login';
        } else {
             console.log('AdminDashboard: Token found and user is admin.');
             // You might want to fetch admin-specific data here if needed globally
        }
    }, [navigate]); // Add navigate to dependency array

     // Handle sidebar navigation click
     const handleNavigationClick = (section) => {
         setActiveSection(section);
         // Optionally update URL hash or query param to reflect section
         // navigate(`/admin/dashboard?section=${section}`, { replace: true });
     };

     // Render the active section component
     const renderSection = () => {
         switch (activeSection) {
             case 'home':
                 return <AdminDashboardHome navigate={navigate} />; // Pass navigate down
             case 'manage-users':
                 return <ManageUsers navigate={navigate} />; // Pass navigate down
             case 'manage-admins':
                 return <ManageAdmins navigate={navigate} />; // Pass navigate down
             case 'monitoring-system':
                 return <SystemMonitoring navigate={navigate} />; // Pass navigate down
             case 'reports-analytics':
                 return <ReportsAnalytics navigate={navigate} />; // Pass navigate down
             case 'system-settings':
                 return <SystemSettings navigate={navigate} />; // Pass navigate down
             case 'predict-cloudburst': // Add a case for the prediction section
                 return <PredictCloudburst navigate={navigate} />; // Render the new component
             default:
                 return <AdminDashboardHome navigate={navigate} />; // Default to home
         }
     };

     // If authentication check is still in progress or failed, maybe show a loading/redirect message
     // Based on the useEffect above, if auth fails, it redirects immediately.
     // So if we reach here, the user is likely authenticated.

    return (
        <div className="admin-dashboard-container">
            {/* Sidebar */}
            <div className="admin-sidebar">
                <div className="sidebar-header">
                    <h3>Admin Panel</h3>
                </div>
                <ul className="sidebar-menu">
                    <li className={activeSection === 'home' ? 'active' : ''}>
                        <button onClick={() => handleNavigationClick('home')}>Dashboard Home</button>
                    </li>
                    <li className={activeSection === 'predict-cloudburst' ? 'active' : ''}> {/* Add Predict section to sidebar */}
                         <button onClick={() => handleNavigationClick('predict-cloudburst')}>Predict Cloud Burst</button>
                    </li>
                    <li className={activeSection === 'manage-users' ? 'active' : ''}>
                         <button onClick={() => handleNavigationClick('manage-users')}>Manage Users</button>
                    </li>
                    <li className={activeSection === 'manage-admins' ? 'active' : ''}>
                         <button onClick={() => handleNavigationClick('manage-admins')}>Manage Admins</button>
                    </li>
                    <li className={activeSection === 'monitoring-system' ? 'active' : ''}>
                         <button onClick={() => handleNavigationClick('monitoring-system')}>System Monitoring</button>
                    </li>
                    <li className={activeSection === 'reports-analytics' ? 'active' : ''}>
                         <button onClick={() => handleNavigationClick('reports-analytics')}>Reports & Analytics</button>
                    </li>
                     <li className={activeSection === 'system-settings' ? 'active' : ''}>
                         <button onClick={() => handleNavigationClick('system-settings')}>System Settings</button>
                    </li>
                    {/* Add more sidebar items */}
                </ul>
                 <div className="sidebar-footer">
                     {/* Logout Button */}
                     <button onClick={() => {
                         localStorage.removeItem('authToken');
                         localStorage.removeItem('userType');
                         navigate('/login'); // Redirect to login after logout
                     }} className="button secondary outline small">Logout</button>
                 </div>
            </div>

            {/* Main Content Area */}
            <div className="admin-main-content">
                 {renderSection()}
            </div>
        </div>
    );
};



// Add other section components here (ManageUsers, ManageAdmins, etc.)

export default AdminDashboard;
