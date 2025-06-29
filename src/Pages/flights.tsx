"use client"

import type { FunctionComponent } from "react"
import { useCallback, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/flight.module.css"
import Layout from "../App/Layout"
import {
  searchFlights,
  getWeatherData,
  getCurrencyRates,
  type Flight,
  type CurrencyRate,
} from "../App/api-services"
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import packageStyles from '../Styles/Packages.module.css';

const API_KEY = 'f69a050e081bb4a7910484976126421e';
const defaultCities = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi'];

const CURRENCY_API_KEY = 'cur_live_NahZXQETwnQiASxfRTbOTU12huYdGMOpECnjSwxf';
const CURRENCY_API_URL = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_NahZXQETwnQiASxfRTbOTU12huYdGMOpECnjSwxf&currencies=EUR,USD,CAD&base_currency=BDT';

// Define the correct WeatherData interface here
interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
}

const DEFAULT_CURRENCIES = ['EUR', 'USD', 'CAD'];

const Flights: FunctionComponent = () => {
  const navigate = useNavigate()

  // Form states
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departure, setDeparture] = useState("")
  const [passengers, setPassengers] = useState(1)

  // API data states
  const [flights, setFlights] = useState<Flight[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [currencyRates, setCurrencyRates] = useState<any[]>([])
  const [currencyLoading, setCurrencyLoading] = useState(true)
  const [currencyError, setCurrencyError] = useState('')

  // Loading states
  const [isSearchingFlights, setIsSearchingFlights] = useState(false)
  const [isLoadingWeather, setIsLoadingWeather] = useState(true)
  const [isLoadingCurrency, setIsLoadingCurrency] = useState(true)

  // Error states
  const [searchError, setSearchError] = useState("")
  const [weatherError, setWeatherError] = useState("")

  // New states for weather search
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);

  // New states for currency search
  const [currencySearch, setCurrencySearch] = useState('');
  const [activeCurrencies, setActiveCurrencies] = useState(DEFAULT_CURRENCIES);

  // Load initial data on component mount
  useEffect(() => {
    fetchWeatherForCities(defaultCities);
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoadingWeather(true)
      setWeatherError("")
      try {
        const results = await Promise.all(
          defaultCities.map(async (city) => {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            const response = await fetch(url)
            if (!response.ok) throw new Error(`Failed to fetch weather for ${city}`)
            const data = await response.json()
            // Use the first forecast entry (current or next 3-hour block)
            const first = data.list[0]
            return {
              city: data.city.name,
              temperature: first.main.temp,
              condition: first.weather[0].main,
              description: first.weather[0].description,
              humidity: first.main.humidity,
              windSpeed: first.wind.speed,
            }
          })
        )
        setWeatherData(results)
      } catch (err) {
        setWeatherError("Failed to fetch weather data.")
      } finally {
        setIsLoadingWeather(false)
      }
    }
    fetchWeather()
  }, [])

  const handleSearchFlights = async () => {
    if (!from || !to || !departure) {
      setSearchError("Please fill in all required fields")
      return
    }

    try {
      setIsSearchingFlights(true)
      setSearchError("")
      setFlights([])

      const searchParams = {
        from,
        to,
        departure,
        passengers,
      }

      console.log("Searching flights:", searchParams)
      const results = await searchFlights(searchParams)
      setFlights(results)

      if (results.length === 0) {
        setSearchError("No flights found for your search criteria")
      }
    } catch (error) {
      setSearchError("Failed to search flights. Please try again.")
      console.error("Flight search error:", error)
    } finally {
      setIsSearchingFlights(false)
    }
  }

  const onFlightsTextClick = useCallback(() => {
    navigate("/")
  }, [navigate])

  // Fetch weather for a list of cities
  const fetchWeatherForCities = async (cities: string[]) => {
    setIsLoadingWeather(true);
    setWeatherError("");
    try {
      const results = await Promise.all(
        cities.map(async (city) => {
          const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch weather for ${city}`);
          const data = await response.json();
          const first = data.list[0];
          return {
            city: data.city.name,
            temperature: first.main.temp,
            condition: first.weather[0].main,
            description: first.weather[0].description,
            humidity: first.main.humidity,
            windSpeed: first.wind.speed,
          };
        })
      );
      setWeatherData(results);
    } catch (err) {
      setWeatherError("Failed to fetch weather data.");
      setWeatherData([]);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  // Handle search submit
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      // If search is empty, show default cities
      setSearching(false);
      fetchWeatherForCities(defaultCities);
      return;
    }
    setSearching(true);
    setIsLoadingWeather(true);
    setWeatherError('');
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${search.trim()}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch weather for ${search.trim()}`);
      const data = await response.json();
      const first = data.list[0];
      setWeatherData([
        {
          city: data.city.name,
          temperature: first.main.temp,
          condition: first.weather[0].main,
          description: first.weather[0].description,
          humidity: first.main.humidity,
          windSpeed: first.wind.speed,
        },
      ]);
    } catch (err) {
      setWeatherError('Failed to fetch weather data.');
      setWeatherData([]);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  // Fetch currency rates (with dynamic currencies)
  useEffect(() => {
    const fetchCurrencyRates = async () => {
      setCurrencyLoading(true);
      setCurrencyError('');
      try {
        const currencies = activeCurrencies.join(',');
        const url = `https://api.currencyapi.com/v3/latest?apikey=${CURRENCY_API_KEY}&currencies=${currencies}&base_currency=BDT`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.data) {
          const ratesArr = Object.values(data.data).map((item: any) => ({
            currency: item.code,
            rate: item.value,
            change: 'N/A',
          }));
          setCurrencyRates(ratesArr);
        } else {
          setCurrencyRates([]);
        }
      } catch (err) {
        setCurrencyError('Failed to fetch currency rates.');
        setCurrencyRates([]);
      } finally {
        setCurrencyLoading(false);
      }
    };
    fetchCurrencyRates();
  }, [activeCurrencies]);

  // Handle currency search submit
  const handleCurrencySearch = (e: React.FormEvent) => {
    e.preventDefault();
    const code = currencySearch.trim().toUpperCase();
    if (!code) {
      setActiveCurrencies(DEFAULT_CURRENCIES);
      return;
    }
    // Add searched currency to the default list (if not already present)
    if (!DEFAULT_CURRENCIES.includes(code)) {
      setActiveCurrencies([...DEFAULT_CURRENCIES, code]);
    } else {
      setActiveCurrencies(DEFAULT_CURRENCIES);
    }
  };

  return (
    <Layout>
      <div className={styles.flights}>
        <div className={styles.depth1Frame0}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Discover Your Next Flight</h1>
              <p className={styles.heroSubtitle}>Search and book flights to your dream destination</p>

              {/* Flight Search Form */}
              <div className={styles.searchForm}>
                {searchError && <div className={styles.errorMessage}>{searchError}</div>}

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>From</label>
                    <input
                      type="text"
                      placeholder="City or airport"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>To</label>
                    <input
                      type="text"
                      placeholder="City or airport"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
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
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Passengers</label>
                    <select value={passengers} onChange={(e) => setPassengers(Number.parseInt(e.target.value))}>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Passenger" : "Passengers"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className={styles.searchButton} onClick={handleSearchFlights} disabled={isSearchingFlights}>
                  {isSearchingFlights ? "Searching..." : "Search Flights"}
                </button>
              </div>
            </div>
          </div>

          {/* Flight Results Section */}
          {flights.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Available Flights</h2>
              <div className={styles.flightResults}>
                {flights.map((flight) => (
                  <div key={flight.id} className={styles.flightCard}>
                    <div className={styles.flightInfo}>
                      <div className={styles.flightRoute}>
                        <span className={styles.flightCity}>{flight.from}</span>
                        <span className={styles.flightArrow}>→</span>
                        <span className={styles.flightCity}>{flight.to}</span>
                      </div>
                      <div className={styles.flightDetails}>
                        <span>Airline: {flight.airline}</span>
                        <span>Duration: {flight.duration}</span>
                        <span>Departure: {flight.departure}</span>
                        <span>Arrival: {flight.arrival}</span>
                      </div>
                    </div>
                    <div className={styles.flightPrice}>
                      <span className={styles.price}>
                        {flight.currency} {flight.price}
                      </span>
                      <button className={packageStyles.createCustomPackage}>Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weather Forecast Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Real-Time Weather Forecast for Bangladesh</h2>
            {/* Weather Map */}
            <div style={{ marginBottom: '2rem', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px #eee', maxWidth: '700px', marginLeft: '150px' }}>
              <MapContainer center={[23.685, 90.3563]} zoom={6} style={{ height: '400px', width: '100%' }}>
                {/* Base map */}
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {/* Weather overlay */}
                <TileLayer
                  url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                  attribution="&copy; OpenWeatherMap"
                />
              </MapContainer>
            </div>
            {/* Search Bar - always visible */}
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-start' }}>
              <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search city..."
                  style={{ padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', minWidth: '200px' }}
                />
                <button type="submit" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', borderRadius: '8px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                  Search
                </button>
              </form>
              {searching && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setSearching(false);
                    fetchWeatherForCities(defaultCities);
                  }}
                  style={{ padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '8px', background: '#eee', color: '#333', border: 'none', cursor: 'pointer' }}
                >
                  Reset
                </button>
              )}
            </div>
            {isLoadingWeather && <p>Loading weather...</p>}
            {weatherError && <p style={{ color: 'red' }}>{weatherError}</p>}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {weatherData.map((weather, idx) => (
                <div key={idx} style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px #eee', padding: '2rem', minWidth: '220px' }}>
                  <h2>{weather.city}</h2>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{Math.round(weather.temperature)}°C</div>
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{weather.condition} <span style={{ fontSize: '1rem', color: '#888' }}>({weather.description})</span></div>
                  <div>Humidity: {weather.humidity}%</div>
                  <div>Wind: {weather.windSpeed} km/h</div>
                </div>
              ))}
            </div>
          </div>

          {/* Currency Exchange Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Real-Time Currency Exchange Rates</h2>
            {/* Currency Search Bar */}
            <form onSubmit={handleCurrencySearch} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <input
                type="text"
                value={currencySearch}
                onChange={e => setCurrencySearch(e.target.value)}
                placeholder="Search currency code (e.g. GBP, INR, AUD)"
                style={{ padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', minWidth: '200px' }}
              />
              <button type="submit" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', borderRadius: '8px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                Search
              </button>
              {activeCurrencies.length > DEFAULT_CURRENCIES.length && (
                <button
                  type="button"
                  onClick={() => { setCurrencySearch(''); setActiveCurrencies(DEFAULT_CURRENCIES); }}
                  style={{ padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '8px', background: '#eee', color: '#333', border: 'none', cursor: 'pointer' }}
                >
                  Reset
                </button>
              )}
            </form>
            {currencyLoading && <div className={styles.loading}>Loading currency rates...</div>}
            {currencyError && <div className={styles.errorMessage}>{currencyError}</div>}
            {currencyRates.length > 0 && (
              <div className={styles.currencyContainer}>
                <div className={styles.currencyRates}>
                  <table className={styles.currencyTable}>
                    <thead>
                      <tr style={{ background: '#faf6ef', color: '#222' }}>
                        <th style={{ textAlign: 'left', padding: '0.75rem' }}>Currency</th>
                        <th style={{ textAlign: 'left', padding: '0.75rem' }}>Rate (BDT)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currencyRates.map((row) => (
                        <tr key={row.currency} style={{ borderBottom: '1px solid #f0e9df' }}>
                          <td style={{ padding: '0.75rem' }}>{row.currency}</td>
                          <td style={{ padding: '0.75rem' }}>{(1 / Number(row.rate)).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={styles.currencyChart}>
                  <img src="/Figma_photoes/chart.png" alt="Currency Exchange Chart" className={styles.chartImage} />
                  <div className={styles.chartCaption}>Last 7 days exchange rate trend</div>
                </div>
              </div>
            )}
            {!currencyLoading && !currencyError && currencyRates.length === 0 && (
              <p style={{ color: 'red' }}>No currency data available.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Flights
