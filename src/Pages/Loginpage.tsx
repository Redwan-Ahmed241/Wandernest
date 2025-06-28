"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/Loginpage.module.css"

export default function TravelLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setIsLoggedIn(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("https://wander-nest-ad3s.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data?.message || "Login failed")
      }

      const data = await response.json()
      localStorage.setItem("token", data.token)
      setIsLoggedIn(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setEmail("")
    setPassword("")
  }

  const handleWanderNestClick = () => {
    navigate("/")
  }

  if (isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.logoContainer} onClick={handleWanderNestClick}>
              <img src="/Figma_photoes/wandernest.svg" alt="WanderNest Logo" className={styles.logo} />
              <button type="button" className={styles.wanderNestButton}>
                WanderNest
              </button>
            </div>
          </div>
          <h1 className={styles.title}>You're logged in!</h1>
          <button className={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.logoContainer} onClick={handleWanderNestClick}>
            <img src="/Figma_photoes/wandernest.svg" alt="WanderNest Logo" className={styles.logo} />
            <button type="button" className={styles.wanderNestButton}>
              WanderNest
            </button>
          </div>
        </div>
        
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>We're so excited to see you again!</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email or phone number
            </label>
            <input 
              id="email" 
              type="email" 
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="Enter your email"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input 
              id="password" 
              type="password" 
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="Enter your password"
            />
          </div>

          <div className={styles.forgotPassword}>
            <a href="#" className={styles.link}>
              Forget your password?
            </a>
          </div>
          
          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
          
          <div className={styles.footer}>
            Don't have an account?{" "}
            <a href="/signup" className={styles.signupLink}>
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
