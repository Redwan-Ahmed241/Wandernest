import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThingsToDo from './Pages/ThingsToDo';
import HotelsRooms from './Pages/HotelsRooms';
import Destinations from './Pages/Destinations';
import PlanATrip from './Pages/PlanATrip';
import AboutUs from './Pages/aboutUs';
import AllGuides from './Pages/ALLGuides';
import Blogs from './Pages/Blog';  
import Flights from './Pages/flights';
import Groups from './Pages/Groups';
 import Guides from './Pages/hiringGuides';
import LoginPage from './Pages/Loginpage';
//import RegisterPage from './components/Registerpage';
import HomePage from './Pages/Homepage';
import RentVehicles from './Pages/rentVehicles';
import Restaurant from './Pages/restaurant';
import Support from './Pages/support';
import VisaAssistance from './Pages/Visaassistance';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Layout from './Components/Layout';
import MyTrips from './Pages/MyTrips';
import Community from './Pages/Community';
import './global.css';
import Packages from './Pages/Packages';
import CreatePackage from './Pages/CreatePackages';
import SignupForm from './Pages/Signup-form';
import ShoppingCenters from './Pages/shopping-center';
import PublicTransport from './Pages/public-transport';
import DashboardHome from './Pages/DashboardHome';
//import DashboardHome from './components/DashboardHome';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Default page */}
        <Route path="/things-to-do" element={<ThingsToDo />} />
        <Route path="/hotels-rooms" element={<HotelsRooms />} />
        <Route path="/plan-a-trip" element={<PlanATrip />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/all-guides" element={<AllGuides />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/hiring-guides" element={<Guides />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/rent-vehicles" element={<RentVehicles />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/support" element={<Support />} />
        <Route path="/visa-assistance" element={<VisaAssistance />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/layout" element={<Layout children={undefined} />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/create-package" element={<CreatePackage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/shopping-centers" element={<ShoppingCenters />} />
        <Route path="/public-transport" element={<PublicTransport />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/test" element={<div style={{padding: '20px'}}><h1>Test Route Working!</h1></div>} />
        {/*<Route path="/dashboard-home" element={<DashboardHome />} />*/}
        {/* Uncomment the following line if you have a Packages component */}
        {/* <Route path="/packages" element={<Packages />} /> */}
        
        {/* Example of a nested route for packages */}
        
        {/* Uncomment the following line if you have a Packages component */}
        {/* <Route path="/packages" element={<Packages />} /> */}
        
        {/* Example of a nested route for packages */}
        {/* Uncomment the following line if you have a Packages component */}
        {<Route path="/packages" element={<Packages />} />}
        
        {/* Add more routes as needed */}
        
        {/* Example of a nested route */}
        {/* <Route path="/destinations/:id" element={<DestinationDetail />} /> */}
        
        {/* Catch-all route for 404 Not Found */}
        {/* <Route path="/packages" element={<Packages />} /> */}
      </Routes>
    </Router>
  );
}

export default App;