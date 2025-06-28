"use client"

import React, { useState, useEffect } from "react"
import "./styles/login.css"

export default function TravelLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setIsLoggedIn(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

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
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setEmail("")
    setPassword("")
  }

  const handleWanderNestClick = () => {
    console.log("WanderNest clicked")
  }

  if (isLoggedIn) {
    return (
      <div className="container">
        <div className="card">
          <div className="cardHeader">
            <img src="/Figma_photoes/wandernest.svg" alt="WanderNest Logo" className="logo" />
            <button type="button" className="wanderNestButton" onClick={handleWanderNestClick}>
              WanderNest
            </button>
          </div>
          <h1 className="title">You're logged in!</h1>
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <div className="cardHeader">
          <img src="/Figma_photoes/wandernest.svg" alt="WanderNest Logo" className="logo" />
          <button type="button" className="wanderNestButton" onClick={handleWanderNestClick}>
            WanderNest
          </button>
        </div>

        <div className="header">
          <h1 className="title">Welcome back</h1>
          <p className="subtitle">We're so excited to see you again!</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email" className="label">
              Email or phone number
            </label>
            <input
              id="email"
              type="text"
              className="input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="error">{error}</div>}

          <div className="forgotPassword">
            <a href="#" className="link">
              Forget your password
            </a>
          </div>

          <button type="submit" className="button">
            Log in
          </button>

          <div className="footer">
            Don't have an account?{" "}
            <a href="#" className="signupLink">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
