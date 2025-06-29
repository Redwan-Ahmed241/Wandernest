"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Sidebar from "./Sidebar"
import styles from "../Styles/DashboardHome.module.css"
import Layout from "../App/Layout"
import { userAPI, type UserData, type UserStats } from "../App/api" // FIXED IMPORT PATH
import { useAuth } from "../Authentication/auth-context"// Using your existing auth context

// ImageUploader Component
const ImageUploader: React.FC<{
  currentImage: string
  onImageChange: (imageUrl: string) => void
}> = ({ currentImage, onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB.")
        return
      }

      setIsUploading(true)

      try {
        const response = await userAPI.uploadProfileImage(file) // NOW THIS FUNCTION EXISTS
        onImageChange(response.profile_image || response.profileImage)
      } catch (error) {
        console.error("Error uploading image:", error)
        alert("Failed to upload image. Please try again.")
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div className={styles.imageUploader}>
      <div className={styles.profileImageContainer}>
        <img src={currentImage || "/placeholder.svg"} alt="Profile" className={styles.profileImage} />
        <button
          className={`${styles.editImageButton} ${isUploading ? styles.uploading : ""}`}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? "..." : "📷"}
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.hiddenInput}
      />
    </div>
  )
}

// EditableField Component
const EditableField: React.FC<{
  label: string
  value: string | number
  onSave: (value: string | number) => Promise<void>
  type?: "text" | "number" | "email" | "tel"
}> = ({ label, value, onSave, type = "text" }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(editValue)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving field:", error)
      alert("Failed to save changes. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div className={styles.editableField}>
      <label className={styles.fieldLabel}>{label}</label>
      {isEditing ? (
        <div className={styles.editMode}>
          <input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.editInput}
            autoFocus
            disabled={isSaving}
          />
          <div className={styles.editButtons}>
            <button onClick={handleSave} className={styles.saveButton} disabled={isSaving}>
              {isSaving ? "..." : "✓"}
            </button>
            <button onClick={handleCancel} className={styles.cancelButton} disabled={isSaving}>
              ✕
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.displayMode}>
          <span className={styles.fieldValue}>{value}</span>
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>
            ✏️
          </button>
        </div>
      )}
    </div>
  )
}

// UserInfoCard Component
const UserInfoCard: React.FC<{
  userData: UserData
  onUserDataChange: (newData: Partial<UserData>) => void
  isLoading: boolean
}> = ({ userData, onUserDataChange, isLoading }) => {
  const handleFieldSave = async (field: keyof UserData, value: string | number) => {
    try {
      const updateData = { [field]: value }
      await userAPI.updateProfile(updateData)
      onUserDataChange(updateData)
    } catch (error) {
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className={styles.userInfoCard}>
        <h2 className={styles.cardTitle}>Profile Information</h2>
        <div className={styles.cardContent}>
          <div className={styles.loadingSpinner}>Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.userInfoCard}>
      <h2 className={styles.cardTitle}>Profile Information</h2>
      <div className={styles.cardContent}>
        <ImageUploader
          currentImage={userData.profile_image || ""}
          onImageChange={(imageUrl) => onUserDataChange({ profile_image: imageUrl })}
        />
        <div className={styles.fieldsGrid}>
          <EditableField
            label="First Name"
            value={userData.first_name}
            onSave={(value) => handleFieldSave("first_name", value as string)}
          />
          <EditableField
            label="Last Name"
            value={userData.last_name}
            onSave={(value) => handleFieldSave("last_name", value as string)}
          />
          <EditableField
            label="Username"
            value={userData.username}
            onSave={(value) => handleFieldSave("username", value as string)}
          />
          <EditableField
            label="Email"
            value={userData.email}
            onSave={(value) => handleFieldSave("email", value as string)}
            type="email"
          />
          {userData.phone && (
            <EditableField
              label="Phone Number"
              value={userData.phone}
              onSave={(value) => handleFieldSave("phone", value as string)}
              type="tel"
            />
          )}
          {userData.country && (
            <EditableField
              label="Country"
              value={userData.country}
              onSave={(value) => handleFieldSave("country", value as string)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Dashboard Stats Component
const DashboardStats: React.FC<{ stats: UserStats | null; isLoading: boolean }> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className={styles.statsGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.loadingSpinner}>Loading...</div>
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return (
      <div className={styles.statsGrid}>
        <div className={styles.errorMessage}>Failed to load stats</div>
      </div>
    )
  }

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>✈️</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>{stats.trips_taken}</h3>
          <p className={styles.statLabel}>Trips Taken</p>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>🏨</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>{stats.hotels_booked}</h3>
          <p className={styles.statLabel}>Hotels Booked</p>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>🚗</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>{stats.cars_rented}</h3>
          <p className={styles.statLabel}>Cars Rented</p>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>⭐</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>{stats.average_rating.toFixed(1)}</h3>
          <p className={styles.statLabel}>Average Rating</p>
        </div>
      </div>
    </div>
  )
}

// Main Dashboard Component
const DashboardHome: React.FC = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user data when authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const fetchUserData = async () => {
        try {
          setIsLoadingProfile(true)
          const profileData = await userAPI.getProfile()
          setUserData(profileData)
        } catch (error) {
          console.error("Error fetching user profile:", error)
          setError("Failed to load profile data")
        } finally {
          setIsLoadingProfile(false)
        }
      }

      const fetchUserStats = async () => {
        try {
          setIsLoadingStats(true)
          const statsData = await userAPI.getStats()
          setUserStats(statsData)
        } catch (error) {
          console.error("Error fetching user stats:", error)
          setError("Failed to load stats data")
        } finally {
          setIsLoadingStats(false)
        }
      }

      fetchUserData()
      fetchUserStats()
    }
  }, [authLoading, isAuthenticated])

  const handleUserDataChange = (newData: Partial<UserData>) => {
    if (userData) {
      setUserData((prev) => ({ ...prev!, ...newData }))
    }
  }

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <Layout>
        <div className={styles.dashboardContainer}>
          <Sidebar />
          <main className={styles.mainContent}>
            <div className={styles.loadingSpinner}>Loading...</div>
          </main>
        </div>
      </Layout>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className={styles.dashboardContainer}>
          <div className={styles.errorMessage}>Please log in to access the dashboard.</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <main className={styles.mainContent}>
          <div className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>Dashboard</h1>
            <p className={styles.dashboardSubtitle}>
              Welcome back{user ? `, ${user.first_name}` : ""}! Here's your travel overview.
            </p>
          </div>

          <div className={styles.dashboardContent}>
            <DashboardStats stats={userStats} isLoading={isLoadingStats} />
            {userData && (
              <UserInfoCard userData={userData} onUserDataChange={handleUserDataChange} isLoading={isLoadingProfile} />
            )}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default DashboardHome
