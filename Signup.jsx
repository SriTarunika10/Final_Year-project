import React, { useState } from 'react';
import { Button } from '../ui/button.tsx'; // Corrected path based on latest structure
import { Input } from '../ui/input.tsx';   // Corrected path based on latest structure
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.tsx"; // Corrected path based on latest structure
import { useNavigate, Link } from 'react-router-dom';
import  './Signup.css'; // Assuming you have a CSS file for styles

const Signup = () => {
    const [userType, setUserType] = useState('user');
    const [name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');
    const [govtType, setGovtType] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isSignedUp, setIsSignedUp] = useState(false); // State to show success message
    const [email, setEmail] = useState('');
    const [familyMembers, setFamilyMembers] = useState('');

    const handleInputChange = (e, setter) => {
        const value = e.target.value;
        setter(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setIsSignedUp(false); // Reset signup success state on new submission

        // Basic client-side validation
        if (!phoneNumber) {
             setError('Phone number is required.');
             setIsLoading(false);
             return;
         }

         if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
             setError('Please enter a valid phone number (10-15 digits, optional + at start).');
             setIsLoading(false);
             return;
         }

         if (!location) {
             setError('Location is required.');
             setIsLoading(false);
             return;
         }
         if (!password) {
             setError('Password is required.');
             setIsLoading(false);
             return;
         }
         if (password.length < 8) {
             setError('Password must be at least 8 characters.');
             setIsLoading(false);
             return;
         }
         if (password !== confirmPassword) {
             setError('Passwords do not match.');
             setIsLoading(false);
             return;
         }

        let signupData = {
            userType,
            phoneNumber,
            location,
            password,
            ...(email && { email }),
        };

        if (userType === 'user') {
            if (!name || name.trim().length < 1) {
                 setError('Name is required for user signup.');
                 setIsLoading(false);
                 return;
             }
             if (!state || !district || !country || !govtType) {
                 setError('Please fill in all location details (State, District, Country, Government Type).');
                 setIsLoading(false);
                 return;
             }
            signupData = {
                ...signupData,
                name: name.trim(),
                state,
                district,
                country,
                govtType,
                ...(familyMembers && !isNaN(parseInt(familyMembers)) && { familyMembers: parseInt(familyMembers, 10) }),
            };
        } else if (userType === 'admin') {
            if (!employeeId || employeeId.trim().length === 0) {
                 setError('Employee ID is required for admin signup.');
                 setIsLoading(false);
                 return;
             }
            signupData = {
                ...signupData,
                employeeId: employeeId.trim(),
            };
        }

        console.log('Attempting signup with data:', signupData);

        try {
             // Assuming your backend runs on http://localhost:3000
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Signup successful', data);
                setIsSignedUp(true); // Set success state
                // Clear form fields on success
                setUserType('user');
                setName('');
                setEmployeeId('');
                setPhoneNumber('');
                setLocation('');
                setState('');
                setDistrict('');
                setCountry('');
                setGovtType('');
                setEmail('');
                setFamilyMembers('');
                setPassword('');
                setConfirmPassword('');
                setError(''); // Clear any previous errors

            } else {
                setError(data.error || 'Signup failed. Please try again.');
            }
        } catch (err) {
             console.error('Error during signup:', err);
            setError(err.message || 'An error occurred during signup.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
                {isSignedUp ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Success! </strong>
                        <span className="block sm:inline">Your account has been created.</span>
                        <Link to="/login" className="absolute top-3.5 right-4 text-green-500 underline">
                             Login
                         </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">User Type</label>
                            <Select onValueChange={setUserType} value={userType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select user type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {userType === 'user' && (
                            <>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => handleInputChange(e, setName)}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Enter your name"
                                        autoComplete="name"
                                    />
                                </div>
                                 <div>
                                     <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                         State
                                     </label>
                                     <Input
                                         type="text"
                                         id="state"
                                         value={state}
                                         onChange={(e) => handleInputChange(e, setState)}
                                         required
                                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                         placeholder="Enter your state"
                                         autoComplete="address-level1"
                                     />
                                 </div>
                                 <div>
                                     <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                                         District
                                     </label>
                                     <Input
                                         type="text"
                                         id="district"
                                         value={district}
                                         onChange={(e) => handleInputChange(e, setDistrict)}
                                         required
                                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                         placeholder="Enter your district"
                                         autoComplete="address-level2"
                                     />
                                 </div>
                                 <div>
                                     <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                         Country
                                     </label>
                                     <Input
                                         type="text"
                                         id="country"
                                         value={country}
                                         onChange={(e) => handleInputChange(e, setCountry)}
                                         required
                                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                         placeholder="Enter your country"
                                         autoComplete="country"
                                     />
                                 </div>
                                 <div>
                                     <label htmlFor="govtType" className="block text-sm font-medium text-gray-700">
                                         Government Type
                                     </label>
                                     <Select onValueChange={setGovtType} value={govtType} required>
                                         <SelectTrigger className="w-full">
                                             <SelectValue placeholder="Select government type" />
                                         </SelectTrigger>
                                         <SelectContent>
                                             <SelectItem value="Urban">Urban</SelectItem>
                                             <SelectItem value="Rural">Rural</SelectItem>
                                         </SelectContent>
                                     </Select>
                                 </div>
                                <div>
                                    <label htmlFor="familyMembers" className="block text-sm font-medium text-gray-700">
                                        Family Members (Optional)
                                    </label>
                                    <Input
                                        type="number"
                                        id="familyMembers"
                                        value={familyMembers}
                                        onChange={(e) => handleInputChange(e, setFamilyMembers)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Enter number of family members"
                                        min={0}
                                    />
                                </div>
                            </>
                        )}
                        {userType === 'admin' && (
                            <div>
                                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                                    Employee ID
                                </label>
                                <Input
                                    type="text"
                                    id="employeeId"
                                    value={employeeId}
                                    onChange={(e) => handleInputChange(e, setEmployeeId)}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your employee ID"
                                    autoComplete="username"
                                />
                            </div>
                        )}
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email (Optional)
                            </label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your email"
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <Input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => handleInputChange(e, setPhoneNumber)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your phone number (e.g., +91...)"
                                autoComplete="tel"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location (City/Area)
                            </label>
                            <Input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => handleInputChange(e, setLocation)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your location (City/Area)"
                                autoComplete="address-level2"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password (min 8 characters)
                            </label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => handleInputChange(e, setPassword)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your password"
                                autoComplete="new-password"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => handleInputChange(e, setConfirmPassword)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </Button>
                    </form>
                )}
                 <p className="mt-4 text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
export { Signup };