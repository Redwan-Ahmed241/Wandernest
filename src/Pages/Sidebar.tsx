"use client"

import type { FunctionComponent } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/Sidebar.module.css"
import { useAuth } from "../Authentication/auth-context" // Using your auth context





const Sidebar: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, loading } = useAuth()

  // Don't render sidebar if not authenticated
  if (!isAuthenticated && !loading) {
    return null
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        {loading ? (
          // Loading state
          <div className={styles.loadingProfile}>
            <div className={styles.avatarSkeleton}></div>
            <div>
              <div className={styles.loadingText}></div>
              <div className={styles.userSubtitle}>Loading...</div>
            </div>
          </div>
        ) : (
          // Authenticated user - using real data
          <>
            <img className={styles.avatar} src="/placeholder.svg?height=50&width=50" alt="User Avatar" />
            <div>
              <div className={styles.userName}>
                {user?.first_name} {user?.last_name}
              </div>
              <div className={styles.userSubtitle}>Plan your next adventure</div>
            </div>
          </>
        )}
      </div>

      <nav className={styles.navMenu}>
        <button
          className={`${styles.navItem} ${window.location.pathname === "/dashboard" ? styles.active : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          <span className={styles.icon}>📊</span> Dashboard
        </button>

        <button
          className={`${styles.navItem} ${window.location.pathname === "/my-trips" ? styles.active : ""}`}
          onClick={() => navigate("/my-trips")}
        >
          <span className={styles.icon}>●●●</span> My Trips
        </button>

        <button className={styles.navItem} onClick={() => navigate("/visa-assistance")}>
          <span className={styles.icon}>🛂</span> Visa Assistance
        </button>

        <button className={styles.navItem} onClick={() => navigate("/plan-a-trip")}>
          <span className={styles.icon}>N</span> Plan a Trip
        </button>

        <button className={styles.navItem} onClick={() => navigate("/groups")}>
          <span className={styles.icon}>👥</span> Groups
        </button>

        <button className={styles.navItem} onClick={() => navigate("/community")}>
          <span className={styles.icon}>🌐</span> Community
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar
