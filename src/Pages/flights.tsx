import { FunctionComponent, useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './flight.module.css';
import Layout from '../Components/Layout';
const Flights: FunctionComponent = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [currencyRates, setCurrencyRates] = useState([
    { currency: 'USD', rate: 109.50 },
    { currency: 'EUR', rate: 118.75 },
    { currency: 'GBP', rate: 138.20 },
    { currency: 'INR', rate: 1.31 },
    { currency: 'AED', rate: 29.82 },
  ]);

  const onDepth4FrameClick = useCallback(() => {
    // Add your code here
  }, []);

  const onFlightsTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleSearchFlights = () => {
    console.log('Searching flights:', { from, to, departure, passengers });
    // Add flight search logic here
  };

  return (
	<Layout>
    <div className={styles.flights}>
      <div className={styles.depth1Frame0}>
		{/*
        <div className={styles.navbarWrapper}>
          <div className={styles.navbar}>
            <div className={styles.depth3Frame0}>
              <img className={styles.depth4Frame0} alt="" src="/Figma_photoes/wandernest.svg" />
              <div className={styles.depth4Frame1} onClick={() => navigate('/homepage')}>
                <b className={styles.wandernest}>WanderNest</b>
              </div>
            </div>
            <div className={styles.depth3Frame1}>
              <div className={styles.depth4Frame01}>
                <div className={styles.depth4Frame1} onClick={() => navigate('/destinations')}>
                  <div className={styles.destinations}>Destinations</div>
                </div>
                <div className={styles.depth4Frame1} onClick={() => navigate('/hotels-rooms')}>
                  <div className={styles.destinations}>Hotels</div>
                </div>
                <div className={styles.depth5Frame2}>
                  <div className={styles.flights1} onClick={onFlightsTextClick}>Flights</div>
                </div>
                <div className={styles.depth4Frame1} onClick={() => navigate('/packages')}>
                  <div className={styles.destinations}>Packages</div>
                </div>
              </div>
              <div className={styles.depth4Frame11}>
                <div className={styles.depth5Frame01} onClick={onDepth4FrameClick}>
                  <div className={styles.depth6Frame0}>
                    <b className={styles.signUp}>Sign up</b>
                  </div>
                </div>
                <div className={styles.depth5Frame11}>
                  <div className={styles.depth6Frame0}>
                    <b className={styles.signUp}>Log in</b>
                  </div>
                </div>
                <img className={styles.depth5Frame21} alt="" src="/Figma_photoes/world.svg" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Discover Your Next Flight</h1>
            <p className={styles.heroSubtitle}>Search and book flights to your dream destination</p>
            {/* Flight Search Form */}
            <div className={styles.searchForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>From</label>
                  <input 
                    type="text" 
                    placeholder="City or airport" 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>To</label>
                  <input 
                    type="text" 
                    placeholder="City or airport" 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Departure</label>
                  <input 
                    type="date" 
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Passengers</label>
                  <select 
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button 
                className={styles.searchButton}
                onClick={handleSearchFlights}
              >
                Search Flights
              </button>
            </div>
          </div>
        </div>
        {/* Weather Forecast Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Real-Time Weather Forecast for Bangladesh</h2>
          <div className={styles.weatherContainer}>
            <div className={styles.weatherMap}>
              <img 
                src="/Figma_photoes/weather.png" 
                alt="Bangladesh Map" 
                className={styles.mapImage}
              />
              {/* Weather markers would be added here in a real implementation */}
            </div>
            <div className={styles.weatherDetails}>
              <div className={styles.weatherCard}>
                <h3>Dhaka</h3>
                <div className={styles.weatherInfo}>
                  <span className={styles.temperature}>32°C</span>
                  <span className={styles.condition}>Partly Cloudy</span>
                </div>
                <div className={styles.weatherStats}>
                  <div>Humidity: 65%</div>
                  <div>Wind: 8 km/h</div>
                </div>
              </div>
              <div className={styles.weatherCard}>
                <h3>Chittagong</h3>
                <div className={styles.weatherInfo}>
                  <span className={styles.temperature}>30°C</span>
                  <span className={styles.condition}>Sunny</span>
                </div>
                <div className={styles.weatherStats}>
                  <div>Humidity: 70%</div>
                  <div>Wind: 10 km/h</div>
                </div>
              </div>
              <div className={styles.weatherCard}>
                <h3>Sylhet</h3>
                <div className={styles.weatherInfo}>
                  <span className={styles.temperature}>28°C</span>
                  <span className={styles.condition}>Rainy</span>
                </div>
                <div className={styles.weatherStats}>
                  <div>Humidity: 85%</div>
                  <div>Wind: 12 km/h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Currency Exchange Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Real-Time Currency Exchange Rates</h2>
          <div className={styles.currencyContainer}>
            <div className={styles.currencyRates}>
              <table className={styles.currencyTable}>
                <thead>
                  <tr>
                    <th>Currency</th>
                    <th>Rate (BDT)</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {currencyRates.map((rate) => (
                    <tr key={rate.currency}>
                      <td>{rate.currency}</td>
                      <td>{rate.rate.toFixed(2)}</td>
                      <td className={styles.positiveChange}>+0.05%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.currencyChart}>
              <img 
                src="/Figma_photoes/chart.png" 
                alt="Currency Exchange Chart" 
                className={styles.chartImage}
              />
              <div className={styles.chartCaption}>Last 7 days exchange rate trend</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default Flights;
