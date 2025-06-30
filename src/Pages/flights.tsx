"use client"

import type React from "react"
import type { FunctionComponent } from "react"
import { useCallback, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/flight.module.css"
import Layout from "../App/Layout"
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useAuth } from "../Authentication/auth-context"
import { flightAPI } from "../App/api"

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
  flightNumber?: string
  aircraft?: string
  availableSeats?: number
}

interface CurrencyRate {
  currency: string
  rate: number
  change: string
}

interface HistoricalRate {
  date: string
  rate: number
}

interface CurrencyHistory {
  currency: string
  history: HistoricalRate[]
}

// Booking Modal Component
const BookingModal: React.FC<{
  flight: Flight
  passengers: number
  onClose: () => void
  onConfirm: (bookingData: any) => void
  isLoading: boolean
}> = ({ flight, passengers, onClose, onConfirm, isLoading }) => {
  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: passengers }, () => ({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      passportNumber: "",
    })),
  )
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  const handlePassengerChange = (index: number, field: string, value: string) => {
    const updated = [...passengerDetails]
    updated[index] = { ...updated[index], [field]: value }
    setPassengerDetails(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    const isValid =
      passengerDetails.every((p) => p.firstName.trim() && p.lastName.trim() && p.email.trim()) &&
      contactEmail.trim() &&
      contactPhone.trim()

    if (!isValid) {
      alert("Please fill in all required fields")
      return
    }

    const bookingData = {
      flight_id: flight.id,
      passengers: passengerDetails,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      special_requests: specialRequests,
      total_price: flight.price * passengers,
      booking_date: new Date().toISOString(),
    }

    onConfirm(bookingData)
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Book Flight</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.flightSummary}>
          <h3>Flight Details</h3>
          <div className={styles.summaryGrid}>
            <div>
              <strong>Route:</strong> {flight.from} → {flight.to}
            </div>
            <div>
              <strong>Airline:</strong> {flight.airline}
            </div>
            <div>
              <strong>Departure:</strong> {flight.departure}
            </div>
            <div>
              <strong>Duration:</strong> {flight.duration}
            </div>
            <div>
              <strong>Passengers:</strong> {passengers}
            </div>
            <div>
              <strong>Total Price:</strong> {flight.currency} {(flight.price * passengers).toLocaleString()}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.bookingForm}>
          {/* Contact Information */}
          <div className={styles.formSection}>
            <h3>Contact Information</h3>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Contact Email *</label>
                <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Contact Phone *</label>
                <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className={styles.formSection}>
            <h3>Passenger Details</h3>
            {passengerDetails.map((passenger, index) => (
              <div key={index} className={styles.passengerSection}>
                <h4>Passenger {index + 1}</h4>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>First Name *</label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) => handlePassengerChange(index, "firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Last Name *</label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) => handlePassengerChange(index, "lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>Email *</label>
                    <input
                      type="email"
                      value={passenger.email}
                      onChange={(e) => handlePassengerChange(index, "email", e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={passenger.phone}
                      onChange={(e) => handlePassengerChange(index, "phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={(e) => handlePassengerChange(index, "dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Passport Number</label>
                    <input
                      type="text"
                      value={passenger.passportNumber}
                      onChange={(e) => handlePassengerChange(index, "passportNumber", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Special Requests */}
          <div className={styles.formSection}>
            <h3>Special Requests (Optional)</h3>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requirements or requests..."
              className={styles.textArea}
              rows={3}
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className={styles.confirmButton}>
              {isLoading
                ? "Booking..."
                : `Confirm Booking (${flight.currency} ${(flight.price * passengers).toLocaleString()})`}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Simple Chart Component (keeping your existing chart)
const CurrencyChart: React.FC<{
  currencyHistory: CurrencyHistory[]
  selectedCurrency: string
  onCurrencySelect: (currency: string) => void
}> = ({ currencyHistory, selectedCurrency, onCurrencySelect }) => {
  const currentHistory = currencyHistory.find((h) => h.currency === selectedCurrency)

  if (!currentHistory || currentHistory.history.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.chartHeader}>
          <h4>7-Day Exchange Rate Trend</h4>
          <select
            value={selectedCurrency}
            onChange={(e) => onCurrencySelect(e.target.value)}
            className={styles.currencySelect}
          >
            {currencyHistory.map((h) => (
              <option key={h.currency} value={h.currency}>
                {h.currency}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.noChartData}>
          <p>Building chart data... Check back in a few minutes for trends.</p>
        </div>
      </div>
    )
  }

  const maxRate = Math.max(...currentHistory.history.map((h) => h.rate))
  const minRate = Math.min(...currentHistory.history.map((h) => h.rate))
  const range = maxRate - minRate || 1

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h4>7-Day {selectedCurrency} Exchange Rate Trend</h4>
        <select
          value={selectedCurrency}
          onChange={(e) => onCurrencySelect(e.target.value)}
          className={styles.currencySelect}
        >
          {currencyHistory.map((h) => (
            <option key={h.currency} value={h.currency}>
              {h.currency}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.chart}>
        <div className={styles.chartArea}>
          <svg width="100%" height="200" viewBox="0 0 400 200">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#f0f0f0" strokeWidth="1" />
            ))}

            {/* Chart line */}
            <polyline
              fill="none"
              stroke="#667eea"
              strokeWidth="3"
              points={currentHistory.history
                .map((point, index) => {
                  const x = (index / (currentHistory.history.length - 1)) * 380 + 10
                  const y = 180 - ((point.rate - minRate) / range) * 160
                  return `${x},${y}`
                })
                .join(" ")}
            />

            {/* Data points */}
            {currentHistory.history.map((point, index) => {
              const x = (index / (currentHistory.history.length - 1)) * 380 + 10
              const y = 180 - ((point.rate - minRate) / range) * 160
              return (
                <circle key={index} cx={x} cy={y} r="4" fill="#667eea" className={styles.chartPoint}>
                  <title>{`${point.date}: ${point.rate.toFixed(2)} BDT`}</title>
                </circle>
              )
            })}
          </svg>
        </div>

        <div className={styles.chartLabels}>
          {currentHistory.history.map((point, index) => (
            <span key={index} className={styles.chartLabel}>
              {new Date(point.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          ))}
        </div>

        <div className={styles.chartStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Current:</span>
            <span className={styles.statValue}>
              {(1 / currentHistory.history[currentHistory.history.length - 1]?.rate || 0).toFixed(2)} BDT
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>7-day High:</span>
            <span className={styles.statValue}>{(1 / minRate).toFixed(2)} BDT</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>7-day Low:</span>
            <span className={styles.statValue}>{(1 / maxRate).toFixed(2)} BDT</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Flights: FunctionComponent = () => {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading, user } = useAuth()

  // Form states
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departure, setDeparture] = useState("")
  const [passengers, setPassengers] = useState(1)

  // API data states
  const [flights, setFlights] = useState<Flight[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([])
  const [currencyHistory, setCurrencyHistory] = useState<CurrencyHistory[]>([])
  const [selectedChartCurrency, setSelectedChartCurrency] = useState("USD")

  // Booking states
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Loading states
  const [isSearchingFlights, setIsSearchingFlights] = useState(false)
  const [isLoadingWeather, setIsLoadingWeather] = useState(true)
  const [currencyLoading, setCurrencyLoading] = useState(true)

  // Error states
  const [searchError, setSearchError] = useState("")
  const [weatherError, setWeatherError] = useState("")
  const [currencyError, setCurrencyError] = useState("")
  const [bookingError, setBookingError] = useState("")

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
    loadCurrencyHistory()
  }, [])

  // Load currency history from localStorage or initialize
  const loadCurrencyHistory = () => {
    const stored = localStorage.getItem("currencyHistory")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCurrencyHistory(parsed)
      } catch (e) {
        console.error("Error parsing stored currency history:", e)
        initializeCurrencyHistory()
      }
    } else {
      initializeCurrencyHistory()
    }
  }

  // Initialize currency history with mock data for demonstration
  const initializeCurrencyHistory = () => {
    const today = new Date()
    const mockHistory: CurrencyHistory[] = DEFAULT_CURRENCIES.map((currency) => ({
      currency,
      history: Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today)
        date.setDate(date.getDate() - (6 - i))

        // Generate realistic mock rates with small variations
        const baseRate = currency === "USD" ? 0.0082 : currency === "EUR" ? 0.0072 : 0.0112
        const variation = (Math.random() - 0.5) * 0.0004 // Small random variation

        return {
          date: date.toISOString().split("T")[0],
          rate: baseRate + variation,
        }
      }),
    }))

    setCurrencyHistory(mockHistory)
    localStorage.setItem("currencyHistory", JSON.stringify(mockHistory))
  }

  // Store current rates for historical tracking
  const storeCurrencyRate = (rates: CurrencyRate[]) => {
    const today = new Date().toISOString().split("T")[0]

    setCurrencyHistory((prevHistory) => {
      const newHistory = prevHistory.map((currencyHist) => {
        const currentRate = rates.find((r) => r.currency === currencyHist.currency)
        if (!currentRate) return currencyHist

        const updatedHistory = [...currencyHist.history]

        // Check if today's rate already exists
        const todayIndex = updatedHistory.findIndex((h) => h.date === today)
        if (todayIndex >= 0) {
          updatedHistory[todayIndex] = { date: today, rate: currentRate.rate }
        } else {
          updatedHistory.push({ date: today, rate: currentRate.rate })
          // Keep only last 7 days
          if (updatedHistory.length > 7) {
            updatedHistory.shift()
          }
        }

        return {
          ...currencyHist,
          history: updatedHistory,
        }
      })

      // Save to localStorage
      localStorage.setItem("currencyHistory", JSON.stringify(newHistory))
      return newHistory
    })
  }

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

        // Store rates for historical tracking
        storeCurrencyRate(ratesArr)
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

      // Enhanced mock flight search with more realistic data
      const mockFlights: Flight[] = [
        {
          id: "BG101",
          airline: "Biman Bangladesh Airlines",
          from: from,
          to: to,
          departure: "10:00 AM",
          arrival: "2:00 PM",
          duration: "4h 0m",
          price: 15000,
          currency: "BDT",
          flightNumber: "BG-101",
          aircraft: "Boeing 737-800",
          availableSeats: 45,
        },
        {
          id: "US205",
          airline: "US-Bangla Airlines",
          from: from,
          to: to,
          departure: "2:30 PM",
          arrival: "6:45 PM",
          duration: "4h 15m",
          price: 18500,
          currency: "BDT",
          flightNumber: "BS-205",
          aircraft: "ATR 72-600",
          availableSeats: 23,
        },
        {
          id: "NV301",
          airline: "Novoair",
          from: from,
          to: to,
          departure: "6:15 PM",
          arrival: "10:30 PM",
          duration: "4h 15m",
          price: 16800,
          currency: "BDT",
          flightNumber: "VQ-301",
          aircraft: "Embraer E145",
          availableSeats: 12,
        },
      ]

      setTimeout(() => {
        setFlights(mockFlights)
        setIsSearchingFlights(false)
      }, 1500)
    } catch (error) {
      setSearchError("Failed to search flights. Please try again.")
      console.error("Flight search error:", error)
      setIsSearchingFlights(false)
    }
  }

  // Handle flight booking
  const handleBookFlight = (flight: Flight) => {
    if (!isAuthenticated) {
      // Store the intended booking in localStorage and redirect to login
      localStorage.setItem(
        "pendingFlightBooking",
        JSON.stringify({
          flight,
          passengers,
          returnUrl: "/flights",
        }),
      )
      navigate("/login")
      return
    }

    setSelectedFlight(flight)
    setShowBookingModal(true)
    setBookingError("")
  }

  // Confirm booking
  const handleConfirmBooking = async (bookingData: any) => {
    try {
      setIsBooking(true)
      setBookingError("")

      // Add flight details to booking data
      const completeBookingData = {
        ...bookingData,
        flight_details: {
          airline: selectedFlight?.airline,
          flight_number: selectedFlight?.flightNumber,
          from: selectedFlight?.from,
          to: selectedFlight?.to,
          departure: selectedFlight?.departure,
          arrival: selectedFlight?.arrival,
          duration: selectedFlight?.duration,
          aircraft: selectedFlight?.aircraft,
        },
        user_id: user?.id,
        status: "confirmed",
      }

      // Call API to save booking
      await flightAPI.createBooking(completeBookingData)

      setBookingSuccess(true)
      setShowBookingModal(false)

      // Show success message and redirect to dashboard after delay
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    } catch (error) {
      console.error("Booking error:", error)
      setBookingError("Failed to complete booking. Please try again.")
    } finally {
      setIsBooking(false)
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

  // Check for pending booking on component mount
  useEffect(() => {
    if (isAuthenticated) {
      const pendingBooking = localStorage.getItem("pendingFlightBooking")
      if (pendingBooking) {
        try {
          const { flight, passengers: pendingPassengers } = JSON.parse(pendingBooking)
          setPassengers(pendingPassengers)
          handleBookFlight(flight)
          localStorage.removeItem("pendingFlightBooking")
        } catch (e) {
          console.error("Error processing pending booking:", e)
          localStorage.removeItem("pendingFlightBooking")
        }
      }
    }
  }, [isAuthenticated])

  return (
    <Layout>
      <div className={styles.flightsContainer}>
        {/* Success Message */}
        {bookingSuccess && (
          <div className={styles.successMessage}>
            <h3>✅ Booking Confirmed!</h3>
            <p>Your flight has been booked successfully. Redirecting to dashboard...</p>
          </div>
        )}

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
                    <div className={styles.flightHeader}>
                      <div className={styles.flightRoute}>
                        <span className={styles.flightCity}>{flight.from}</span>
                        <span className={styles.flightArrow}>→</span>
                        <span className={styles.flightCity}>{flight.to}</span>
                      </div>
                      <div className={styles.flightNumber}>{flight.flightNumber}</div>
                    </div>
                    <div className={styles.flightDetails}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Airline:</span>
                        <span>{flight.airline}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Duration:</span>
                        <span>{flight.duration}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Departure:</span>
                        <span>{flight.departure}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Arrival:</span>
                        <span>{flight.arrival}</span>
                      </div>
                      {flight.aircraft && (
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Aircraft:</span>
                          <span>{flight.aircraft}</span>
                        </div>
                      )}
                      {flight.availableSeats && (
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Available Seats:</span>
                          <span className={styles.availableSeats}>{flight.availableSeats} left</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.flightPrice}>
                    <div className={styles.priceInfo}>
                      <span className={styles.price}>
                        {flight.currency} {flight.price.toLocaleString()}
                      </span>
                      <span className={styles.priceLabel}>per person</span>
                      {passengers > 1 && (
                        <span className={styles.totalPrice}>
                          Total: {flight.currency} {(flight.price * passengers).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button className={styles.bookButton} onClick={() => handleBookFlight(flight)}>
                      {isAuthenticated ? "Book Now" : "Login to Book"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && selectedFlight && (
          <BookingModal
            flight={selectedFlight}
            passengers={passengers}
            onClose={() => {
              setShowBookingModal(false)
              setSelectedFlight(null)
              setBookingError("")
            }}
            onConfirm={handleConfirmBooking}
            isLoading={isBooking}
          />
        )}

        {/* Booking Error */}
        {bookingError && <div className={styles.errorMessage}>{bookingError}</div>}

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

              {/* Dynamic Currency Chart */}
              <CurrencyChart
                currencyHistory={currencyHistory}
                selectedCurrency={selectedChartCurrency}
                onCurrencySelect={setSelectedChartCurrency}
              />
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
