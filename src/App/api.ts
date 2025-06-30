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
  getTrips: async (status?: "upcoming" | "past" | "cancelled") => {
    const endpoint = status ? `/trips/?status=${status}` : "/trips/"
    return apiRequest(endpoint)
  },

  getTripDetails: async (tripId: string) => {
    return apiRequest(`/trips/${tripId}/`)
  },

  getTripItinerary: async (tripId: string) => {
    return apiRequest(`/trips/${tripId}/itinerary/`)
  },

  updateTrip: async (tripId: string, tripData: Partial<Trip>) => {
    return apiRequest(`/trips/${tripId}/`, {
      method: "PATCH",
      body: JSON.stringify(tripData),
    })
  },

  cancelTrip: async (tripId: string) => {
    return apiRequest(`/trips/${tripId}/cancel/`, {
      method: "POST",
    })
  },
}

// NEW: Visa API functions - THIS WAS MISSING
export const visaAPI = {
  getVisaRequirements: async (countryCode: string, purpose: string) => {
    return apiRequest(`/visa/requirements/?country=${countryCode}&purpose=${purpose}`)
  },

  getCountries: async () => {
    return apiRequest("/visa/countries/")
  },

  getVisaPurposes: async () => {
    return apiRequest("/visa/purposes/")
  },

  submitVisaApplication: async (applicationData: VisaApplicationData) => {
    return apiRequest("/visa/applications/", {
      method: "POST",
      body: JSON.stringify(applicationData),
    })
  },

  getCurrencyRates: async () => {
    return apiRequest("/visa/currency-rates/")
  },

  getEmbassyContacts: async (countryCode?: string) => {
    const endpoint = countryCode ? `/visa/embassies/?country=${countryCode}` : "/visa/embassies/"
    return apiRequest(endpoint)
  },

  getTravelFAQs: async () => {
    return apiRequest("/visa/faqs/")
  },
}

// Package API functions - ADD THESE TO YOUR EXISTING API FILE
export const packageAPI = {
  // Get available transport options
  getTransportOptions: async () => {
    return apiRequest("/packages/transport-options/")
  },

  // Get available hotel options
  getHotelOptions: async () => {
    return apiRequest("/packages/hotel-options/")
  },

  // Get available vehicle options
  getVehicleOptions: async () => {
    return apiRequest("/packages/vehicle-options/")
  },

  // Get available guide options
  getGuideOptions: async () => {
    return apiRequest("/packages/guide-options/")
  },

  // Create a new package
  createPackage: async (packageData: CreatePackageData) => {
    return apiRequest("/packages/", {
      method: "POST",
      body: JSON.stringify(packageData),
    })
  },

  // Get user's packages
  getUserPackages: async () => {
    return apiRequest("/packages/my-packages/")
  },

  // Get package details
  getPackageDetails: async (packageId: string) => {
    return apiRequest(`/packages/${packageId}/`)
  },

  // Update package
  updatePackage: async (packageId: string, packageData: Partial<CreatePackageData>) => {
    return apiRequest(`/packages/${packageId}/`, {
      method: "PATCH",
      body: JSON.stringify(packageData),
    })
  },

  // Delete package
  deletePackage: async (packageId: string) => {
    return apiRequest(`/packages/${packageId}/`, {
      method: "DELETE",
    })
  },
}

// Types
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

// NEW: Visa-related types - THESE WERE MISSING
export interface Country {
  code: string
  name: string
  flag: string
}

export interface VisaPurpose {
  id: string
  name: string
  description: string
}

export interface VisaRequirement {
  country: string
  purpose: string
  type: "visa_free" | "visa_on_arrival" | "evisa_required" | "visa_required"
  duration: string
  requirements: string[]
  processing_time: string
  fee: string
}

export interface VisaApplicationData {
  country: string
  purpose: string
  personal_info: {
    full_name: string
    passport_number: string
    nationality: string
    date_of_birth: string
  }
  travel_info: {
    arrival_date: string
    departure_date: string
    purpose_details: string
  }
}

export interface CurrencyRate {
  from_currency: string
  to_currency: string
  rate: number
  last_updated: string
}

export interface EmbassyContact {
  country: string
  embassy_name: string
  address: string
  phone: string
  email: string
  website: string
}

// Package-related types - ADD THESE TO YOUR EXISTING TYPES
export interface PackageOption {
  id: string
  name: string
  description: string
  price: number
  image?: string
  rating?: number
  features?: string[]
  availability: boolean
}

export interface CreatePackageData {
  title: string
  from_location: string
  to_location: string
  start_date: string
  end_date: string
  travelers_count: number
  budget: number
  transport_id?: string | null
  hotel_id?: string | null
  vehicle_id?: string | null
  guide_id?: string | null
  preferences: {
    skip_transport: boolean
    skip_hotel: boolean
    skip_vehicle: boolean
    skip_guide: boolean
  }
}

export interface TravelPackage {
  id: string
  title: string
  from_location: string
  to_location: string
  start_date: string
  end_date: string
  travelers_count: number
  budget: number
  total_cost: number
  status: "draft" | "confirmed" | "cancelled"
  transport?: PackageOption
  hotel?: PackageOption
  vehicle?: PackageOption
  guide?: PackageOption
  created_at: string
  updated_at: string
}
