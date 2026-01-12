import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Appointment from './Pages/Appointment';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ChatApp from './Pages/ChatApp';
import BookingHours from './Pages/BookingHours';
import Profile from './Pages/Profile';
import UserProfile from './Pages/UserProfile';
import ApBooking from './Components/ApBooking';
import Dashboard from './Pages/PagesData/Admin/Dashboard';
import ShowAllAppointment from './Pages/PagesData/Admin/ShowAllAppointment';
import ShowUser from './Pages/PagesData/Admin/ShowUser';
import ShowUpcomingAppointment from './Pages/PagesData/Admin/ShowUpcomingAppointment';

const App = () => {
    // Add debugging for route changes
    React.useEffect(() => {
        console.log("App component rendered");
        console.log("Available routes:");
        console.log("- /dental-clinic/all-Appointment");
        console.log("- /dental-clinic/all-User");
        console.log("- /dental-clinic/upcoming-appointment");
    }, []);

    return (
        <>
            <Navbar />
            
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Home />
                            <ApBooking />
                            <About />
                            <Services />
                            <Contact />
                        </>
                    }
                />
                <Route path="/dental-clinic/appointment" element={<Appointment />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dental-clinic/team" element={<Profile />} />
                <Route path="/login_user" element={<Login />} />
                <Route path="/dental-clinic/user/profile" element={<UserProfile />} />
                <Route path="/dental-clinic/user/chat_section" element={<ChatApp />} />
                <Route path="/dental-clinic/slot" element={<BookingHours />} />
                <Route path="/dental-clinic/admin-person" element={<Dashboard />} />
                
                {/* Admin Routes with debugging */}
                <Route 
                    path="/dental-clinic/all-Appointment" 
                    element={
                        <>
                            {console.log("Rendering ShowAllAppointment")}
                            <ShowAllAppointment />
                        </>
                    } 
                />
                <Route 
                    path="/dental-clinic/all-User" 
                    element={
                        <>
                            {console.log("Rendering ShowUser")}
                            <ShowUser />
                        </>
                    } 
                />
                <Route 
                    path="/dental-clinic/upcoming-appointment" 
                    element={
                        <>
                            {console.log("🔴 Rendering ShowUpcomingAppointment")}
                            <ShowUpcomingAppointment />
                        </>
                    } 
                />
                
                {/* Catch-all route for debugging */}
                <Route 
                    path="*" 
                    element={
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <h2>404 - Page Not Found</h2>
                            <p>Current path: {window.location.pathname}</p>
                            <p>This route is not defined in the app.</p>
                        </div>
                    } 
                />
            </Routes>
        </>
    );
};

export default App;