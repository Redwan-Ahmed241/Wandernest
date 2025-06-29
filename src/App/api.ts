// API configuration and service functions
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api"

// Get auth token from localStorage (matching your existing auth setup)
const getAuthToken = (): string | null => {
  return localStorage.getItem("token") // Using "token" to match your AuthProvider
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
      // Handle unauthorized - this will trigger your AuthProvider's logout
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
  // Get user profile
  getProfile: async () => {
    return apiRequest("/user/profile/")
  },

  // Update user profile
  updateProfile: async (userData: Partial<UserData>) => {
    return apiRequest("/user/profile/", {
      method: "PATCH",
      body: JSON.stringify(userData),
    })
  },

  // Upload profile image
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

  // Get user stats
  getStats: async () => {
    return apiRequest("/user/stats/")
  },
}

// Updated UserData interface to match your Django backend structure
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
