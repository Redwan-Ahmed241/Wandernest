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
  type WeatherData,
  type CurrencyRate,
} from "../App/api-services"

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
  const [isLoadingCurrency, setIsLoadingCurrency] = useState(true)

  // Error states
  const [searchError, setSearchError] = useState("")
  const [weatherError, setWeatherError] = useState("")
  const [currencyError, setCurrencyError] = useState("")

  // Load initial data on component mount
  useEffect(() => {
    loadWeatherData()
    loadCurrencyRates()
  }, [])

  const loadWeatherData = async () => {
    try {
      setIsLoadingWeather(true)
      setWeatherError("")
      const data = await getWeatherData()
      setWeatherData(data)
    } catch (error) {
      setWeatherError("Failed to load weather data")
      console.error("Weather loading error:", error)
    } finally {
      setIsLoadingWeather(false)
    }
  }

  const loadCurrencyRates = async () => {
    try {
      setIsLoadingCurrency(true)
      setCurrencyError("")
      const data = await getCurrencyRates()
      setCurrencyRates(data)
    } catch (error) {
      setCurrencyError("Failed to load currency rates")
      console.error("Currency loading error:", error)
    } finally {
      setIsLoadingCurrency(false)
    }
  }

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
                      <button className={styles.bookButton}>Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weather Forecast Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Real-Time Weather Forecast for Bangladesh</h2>
            {weatherError && <div className={styles.errorMessage}>{weatherError}</div>}

            <div className={styles.weatherContainer}>
              <div className={styles.weatherMap}>
                <img src="/Figma_photoes/weather.png" alt="Bangladesh Map" className={styles.mapImage} />
              </div>
              <div className={styles.weatherDetails}>
                {isLoadingWeather ? (
                  <div className={styles.loading}>Loading weather data...</div>
                ) : (
                  weatherData.map((weather) => (
                    <div key={weather.city} className={styles.weatherCard}>
                      <h3>{weather.city}</h3>
                      <div className={styles.weatherInfo}>
                        <span className={styles.temperature}>{weather.temperature}°C</span>
                        <span className={styles.condition}>{weather.condition}</span>
                      </div>
                      <div className={styles.weatherStats}>
                        <div>Humidity: {weather.humidity}%</div>
                        <div>Wind: {weather.windSpeed} km/h</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Currency Exchange Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Real-Time Currency Exchange Rates</h2>
            {currencyError && <div className={styles.errorMessage}>{currencyError}</div>}

            <div className={styles.currencyContainer}>
              <div className={styles.currencyRates}>
                {isLoadingCurrency ? (
                  <div className={styles.loading}>Loading currency rates...</div>
                ) : (
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
                          <td className={rate.change >= 0 ? styles.positiveChange : styles.negativeChange}>
                            {rate.change >= 0 ? "+" : ""}
                            {rate.change.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className={styles.currencyChart}>
                <img src="/Figma_photoes/chart.png" alt="Currency Exchange Chart" className={styles.chartImage} />
                <div className={styles.chartCaption}>Last 7 days exchange rate trend</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Flights
