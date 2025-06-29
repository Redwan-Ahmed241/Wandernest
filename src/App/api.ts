// API configuration and service functions
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api"

// Get auth token from localStorage (matching your existing auth setup)
const getAuthToken = (): string | null => {
  return localStorage.getItem("token")
}

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken()

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
      throw new Error("Unauthorized")
    }
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

// User API functions
export const userAPI = {
  getProfile: async () => {
    return apiRequest("/user/profile/")
  },

  updateProfile: async (userData: Partial<UserData>) => {
    return apiRequest("/user/profile/", {
      method: "PATCH",
      body: JSON.stringify(userData),
    })
  },

  uploadProfileImage: async (imageFile: File) => {
    const formData = new FormData()
    formData.append("profile_image", imageFile)

    const token = getAuthToken()
    const response = await fetch(`${API_BASE_URL}/user/profile/image/`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    return response.json()
  },

  getStats: async () => {
    return apiRequest("/user/stats/")
  },
}

// Trips API functions
export const tripsAPI = {
  // Get all trips for the user
  getTrips: async (status?: "upcoming" | "past" | "cancelled") => {
    const endpoint = status ? `/trips/?status=${status}` : "/trips/"
    return apiRequest(endpoint)
  },

  // Get specific trip details
  getTripDetails: async (tripId: string) => {
    return apiRequest(`/trips/${tripId}/`)
  },

  // Get trip itinerary
  getTripItinerary: async (tripId: string) => {
    return apiRequest(`/trips/${tripId}/itinerary/`)
  },

  // Update trip
  updateTrip: async (tripId: string, tripData: Partial<Trip>) => {
    return apiRequest(`/trips/${tripId}/`, {
      method: "PATCH",
      body: JSON.stringify(tripData),
    })
  },

  // Cancel trip
  cancelTrip: async (tripId: string) => {
    return apiRequest(`/trips/${tripId}/cancel/`, {
      method: "POST",
    })
  },
}

// Types for API responses
export interface UserData {
  id?: string
  email: string
  first_name: string
  last_name: string
  username: string
  age?: number
  country?: string
  phone?: string
  profile_image?: string
}

export interface UserStats {
  trips_taken: number
  hotels_booked: number
  cars_rented: number
  average_rating: number
}

export interface Trip {
  id: string
  title: string
  start_date: string
  end_date: string
  duration: string
  location: string
  activities_count: number
  check_in_time: string
  weather: string
  currency: string
  status: "upcoming" | "past" | "cancelled"
  created_at: string
  updated_at: string
}

export interface ItineraryItem {
  id: string
  trip_id: string
  type: "arrival" | "hotel" | "dining" | "sightseeing" | "excursion" | "shopping"
  title: string
  date_time: string
  icon: string
  description: string
  order: number
}
