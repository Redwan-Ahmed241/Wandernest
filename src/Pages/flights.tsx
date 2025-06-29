"use client"

import type React from "react"
import type { FunctionComponent } from "react"
import { useCallback, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/flight.module.css"
import Layout from "../App/Layout"
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import packageStyles from "../Styles/Packages.module.css"

const API_KEY = "f69a050e081bb4a7910484976126421e"
const defaultCities = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"]
const CURRENCY_API_KEY = "cur_live_NahZXQETwnQiASxfRTbOTU12huYdGMOpECnjSwxf"
const DEFAULT_CURRENCIES = ["EUR", "USD", "CAD"]

// Define interfaces
interface WeatherData {
  city: string
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
}

interface Flight {
  id: string
  airline: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  price: number
  currency: string
}

interface CurrencyRate {
  currency: string
  rate: number
  change: string
}

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
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([])

  // Loading states
  const [isSearchingFlights, setIsSearchingFlights] = useState(false)
  const [isLoadingWeather, setIsLoadingWeather] = useState(true)
  const [currencyLoading, setCurrencyLoading] = useState(true)

  // Error states
  const [searchError, setSearchError] = useState("")
  const [weatherError, setWeatherError] = useState("")
  const [currencyError, setCurrencyError] = useState("")

  // Search states
  const [search, setSearch] = useState("")
  const [searching, setSearching] = useState(false)
  const [currencySearch, setCurrencySearch] = useState("")
  const [activeCurrencies, setActiveCurrencies] = useState(DEFAULT_CURRENCIES)

  const [showMap, setShowMap] = useState(false)

  // Load initial data on component mount
  useEffect(() => {
    fetchWeatherForCities(defaultCities)
    fetchCurrencyRates()
  }, [])

  // Fetch weather for a list of cities
  const fetchWeatherForCities = async (cities: string[]) => {
    setIsLoadingWeather(true)
    setWeatherError("")
    try {
      const results = await Promise.all(
        cities.map(async (city) => {
          const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
          const response = await fetch(url)
          if (!response.ok) throw new Error(`Failed to fetch weather for ${city}`)
          const data = await response.json()
          const first = data.list[0]
          return {
            city: data.city.name,
            temperature: first.main.temp,
            condition: first.weather[0].main,
            description: first.weather[0].description,
            humidity: first.main.humidity,
            windSpeed: first.wind.speed,
          }
        }),
      )
      setWeatherData(results)
    } catch (err) {
      setWeatherError("Failed to fetch weather data.")
      setWeatherData([])
    } finally {
      setIsLoadingWeather(false)
    }
  }

  // Fetch currency rates
  const fetchCurrencyRates = async () => {
    setCurrencyLoading(true)
    setCurrencyError("")
    try {
      const currencies = activeCurrencies.join(",")
      const url = `https://api.currencyapi.com/v3/latest?apikey=${CURRENCY_API_KEY}&currencies=${currencies}&base_currency=BDT`
      const response = await fetch(url)
      const data = await response.json()

      if (data && data.data) {
        const ratesArr = Object.values(data.data).map((item: any) => ({
          currency: item.code,
          rate: item.value,
          change: "N/A",
        }))
        setCurrencyRates(ratesArr)
      } else {
        setCurrencyRates([])
      }
    } catch (err) {
      setCurrencyError("Failed to fetch currency rates.")
      setCurrencyRates([])
    } finally {
      setCurrencyLoading(false)
    }
  }

  // Update currency rates when active currencies change
  useEffect(() => {
    fetchCurrencyRates()
  }, [activeCurrencies])

  const handleSearchFlights = async () => {
    if (!from || !to || !departure) {
      setSearchError("Please fill in all required fields")
      return
    }

    try {
      setIsSearchingFlights(true)
      setSearchError("")
      setFlights([])

      // Mock flight search since you don't have the API service
      // Replace this with actual API call when available
      const mockFlights: Flight[] = [
        {
          id: "1",
          airline: "Biman Bangladesh Airlines",
          from: from,
          to: to,
          departure: "10:00 AM",
          arrival: "2:00 PM",
          duration: "4h 0m",
          price: 15000,
          currency: "BDT",
        },
      ]

      setTimeout(() => {
        setFlights(mockFlights)
        setIsSearchingFlights(false)
      }, 1000)
    } catch (error) {
      setSearchError("Failed to search flights. Please try again.")
      console.error("Flight search error:", error)
      setIsSearchingFlights(false)
    }
  }

  // Handle weather search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!search.trim()) {
      setSearching(false)
      fetchWeatherForCities(defaultCities)
      return
    }

    setSearching(true)
    setIsLoadingWeather(true)
    setWeatherError("")

    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${search.trim()}&appid=${API_KEY}&units=metric`
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Failed to fetch weather for ${search.trim()}`)

      const data = await response.json()
      const first = data.list[0]

      setWeatherData([
        {
          city: data.city.name,
          temperature: first.main.temp,
          condition: first.weather[0].main,
          description: first.weather[0].description,
          humidity: first.main.humidity,
          windSpeed: first.wind.speed,
        },
      ])
    } catch (err) {
      setWeatherError("Failed to fetch weather data.")
      setWeatherData([])
    } finally {
      setIsLoadingWeather(false)
    }
  }

  // Handle currency search
  const handleCurrencySearch = (e: React.FormEvent) => {
    e.preventDefault()
    const code = currencySearch.trim().toUpperCase()
    if (!code) {
      setActiveCurrencies(DEFAULT_CURRENCIES)
      return
    }

    if (!DEFAULT_CURRENCIES.includes(code)) {
      setActiveCurrencies([...DEFAULT_CURRENCIES, code])
    } else {
      setActiveCurrencies(DEFAULT_CURRENCIES)
    }
  }

  const onFlightsTextClick = useCallback(() => {
    navigate("/")
  }, [navigate])

  return (
    <Layout>
      {/* Use a custom container instead of the problematic depth1Frame0 */}
      <div className={styles.flightsContainer}>
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
          <div className={styles.contentSection}>
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
        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Real-Time Weather Forecast for Bangladesh</h2>

          {/* Fixed Weather Map */}
          <div className={styles.fixedMapContainer}>
            <div className={styles.mapToggle}>
              <button className={styles.mapToggleButton} onClick={() => setShowMap(!showMap)}>
                {showMap ? "Hide Map" : "Show Weather Map"}
              </button>
            </div>

            {showMap && (
              <div className={styles.fixedMap}>
                <div className={styles.mapHeader}>
                  <h3>Bangladesh Weather Map</h3>
                  <button className={styles.closeMapButton} onClick={() => setShowMap(false)}>
                    ×
                  </button>
                </div>
                <MapContainer center={[23.685, 90.3563]} zoom={6} style={{ height: "400px", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <TileLayer
                    url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                    attribution="&copy; OpenWeatherMap"
                  />
                </MapContainer>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearch} className={styles.searchFormInline}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city..."
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButtonInline}>
                Search
              </button>
            </form>

            {searching && (
              <button
                type="button"
                onClick={() => {
                  setSearch("")
                  setSearching(false)
                  fetchWeatherForCities(defaultCities)
                }}
                className={styles.resetButton}
              >
                Reset
              </button>
            )}
          </div>

          {isLoadingWeather && <p className={styles.loadingText}>Loading weather...</p>}
          {weatherError && <p className={styles.errorText}>{weatherError}</p>}

          <div className={styles.weatherGrid}>
            {weatherData.map((weather, idx) => (
              <div key={idx} className={styles.weatherCard}>
                <h2>{weather.city}</h2>
                <div className={styles.temperature}>{Math.round(weather.temperature)}°C</div>
                <div className={styles.condition}>
                  {weather.condition}
                  <span className={styles.description}>({weather.description})</span>
                </div>
                <div>Humidity: {weather.humidity}%</div>
                <div>Wind: {weather.windSpeed} km/h</div>
              </div>
            ))}
          </div>
        </div>

        {/* Currency Exchange Section */}
        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Real-Time Currency Exchange Rates</h2>

          {/* Currency Search Bar */}
          <div className={styles.searchContainer}>
            <form onSubmit={handleCurrencySearch} className={styles.searchFormInline}>
              <input
                type="text"
                value={currencySearch}
                onChange={(e) => setCurrencySearch(e.target.value)}
                placeholder="Search currency code (e.g. GBP, INR, AUD)"
                className={styles.searchInputWide}
              />
              <button type="submit" className={styles.searchButtonInline}>
                Search
              </button>

              {activeCurrencies.length > DEFAULT_CURRENCIES.length && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrencySearch("")
                    setActiveCurrencies(DEFAULT_CURRENCIES)
                  }}
                  className={styles.resetButton}
                >
                  Reset
                </button>
              )}
            </form>
          </div>

          {currencyLoading && <div className={styles.loadingText}>Loading currency rates...</div>}
          {currencyError && <div className={styles.errorText}>{currencyError}</div>}

          {currencyRates.length > 0 && (
            <div className={styles.currencyContainer}>
              <div className={styles.currencyRates}>
                <table className={styles.currencyTable}>
                  <thead>
                    <tr>
                      <th>Currency</th>
                      <th>Rate (BDT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currencyRates.map((row) => (
                      <tr key={row.currency}>
                        <td>{row.currency}</td>
                        <td>{(1 / Number(row.rate)).toFixed(2)}</td>
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
            <p className={styles.errorText}>No currency data available.</p>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Flights
