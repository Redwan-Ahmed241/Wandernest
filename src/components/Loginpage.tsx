"use client"

import type React from "react"
import "./styles/login.css"

export default function TravelLogin() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login submitted")
  }

  const handleWanderNestClick = () => {
    // Handle WanderNest button click (e.g., navigate to home page)
    console.log("WanderNest clicked")
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
            <input id="email" type="text" className="input" required />
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input id="password" type="password" className="input" required />
          </div>

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
