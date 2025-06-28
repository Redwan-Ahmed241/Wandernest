"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Authentication/auth-context"
import styles from "../Styles/profile-dropdown.module.css"

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      // Call logout API
      await fetch("https://wander-nest-ad3s.onrender.com/api/auth/logout/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      logout()
      navigate("/")
    }
  }

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    }
    return user?.username?.[0]?.toUpperCase() || "U"
  }

  return (
    <div className={styles.profileDropdown} ref={dropdownRef}>
      <div className={styles.profileButton} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.avatar}>{getInitials()}</div>
        <span className={styles.username}>{user?.first_name || user?.username}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>
              {user?.first_name} {user?.last_name}
            </div>
            <div className={styles.userEmail}>{user?.email}</div>
          </div>
          <hr className={styles.divider} />
          <button
            className={styles.menuItem}
            onClick={() => {
              navigate("/dashboard")
              setIsOpen(false)
            }}
          >
            Dashboard
          </button>
          <button
            className={styles.menuItem}
            onClick={() => {
              navigate("/profile")
              setIsOpen(false)
            }}
          >
            Profile Settings
          </button>
          <button
            className={styles.menuItem}
            onClick={() => {
              navigate("/bookings")
              setIsOpen(false)
            }}
          >
            My Bookings
          </button>
          <hr className={styles.divider} />
          <button className={`${styles.menuItem} ${styles.logoutItem}`} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown
