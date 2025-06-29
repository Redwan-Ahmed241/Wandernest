// Flight search API service
export interface FlightSearchParams {
  from: string
  to: string
  departure: string
  passengers: number
}

export interface Flight {
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

export interface WeatherData {
  city: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
}

export interface CurrencyRate {
  currency: string
  rate: number
  change: number
}

// Flight search function
export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
  try {
    const response = await fetch("https://wander-nest-ad3s.onrender.com/api/flights/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // If auth required
      },
      body: JSON.stringify({
        origin: params.from,
        destination: params.to,
        departure_date: params.departure,
        passengers: params.passengers,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to search flights")
    }

    const data = await response.json()
    return data.flights || []
  } catch (error) {
    console.error("Flight search error:", error)
    throw error
  }
}

// Weather API function
export const getWeatherData = async (): Promise<WeatherData[]> => {
  try {
    const response = await fetch("https://wander-nest-ad3s.onrender.com/api/weather/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch weather data")
    }

    const data = await response.json()
    return data.weather || []
  } catch (error) {
    console.error("Weather fetch error:", error)
    // Return fallback data
    return [
      { city: "Dhaka", temperature: 32, condition: "Partly Cloudy", humidity: 65, windSpeed: 8 },
      { city: "Chittagong", temperature: 30, condition: "Sunny", humidity: 70, windSpeed: 10 },
      { city: "Sylhet", temperature: 28, condition: "Rainy", humidity: 85, windSpeed: 12 },
    ]
  }
}

// Currency exchange API function
export const getCurrencyRates = async (): Promise<CurrencyRate[]> => {
  try {
    const response = await fetch("https://wander-nest-ad3s.onrender.com/api/currency/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch currency rates")
    }

    const data = await response.json()
    return data.rates || []
  } catch (error) {
    console.error("Currency fetch error:", error)
    // Return fallback data
    return [
      { currency: "USD", rate: 109.5, change: 0.05 },
      { currency: "EUR", rate: 118.75, change: -0.12 },
      { currency: "GBP", rate: 138.2, change: 0.08 },
      { currency: "INR", rate: 1.31, change: 0.02 },
      { currency: "AED", rate: 29.82, change: -0.03 },
    ]
  }
}
