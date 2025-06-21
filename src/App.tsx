import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThingsToDo from './components/ThingsToDo';
import HotelsRooms from './components/HotelsRooms';
import Destinations from './components/Destinations';
import PlanATrip from './components/PlanATrip';
import AboutUs from './components/aboutUs';
import AllGuides from './components/ALLGuides';
import Blogs from './components/Blog';  
import Flights from './components/flights';
import Groups from './components/Groups';
 import Guides from './components/hiringGuides';
import LoginPage from './components/Loginpage';
//import RegisterPage from './components/Registerpage';
import HomePage from './components/Homepage';
import RentVehicles from './components/rentVehicles';
import Restaurant from './components/restaurant';
import Support from './components/support';
import VisaAssistance from './components/Visaassistance';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import './global.css';
//import Packages from './components/Packages';

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
      </Routes>
    </Router>
  );
}

export default App;