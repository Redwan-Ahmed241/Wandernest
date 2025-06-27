"use client"

import { useState } from "react"
import "./page-styles.css"

export default function PublicTransport() {
  const [selectedTransportType, setSelectedTransportType] = useState("all")

  const transportOptions = [
    {
      id: 1,
      type: "Bus",
      name: "City Express Bus",
      route: "Route 15 - Downtown to Airport",
      frequency: "Every 15 minutes",
      price: "$2.50",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Air Conditioned", "WiFi", "Wheelchair Accessible"],
    },
    {
      id: 2,
      type: "Metro",
      name: "Metro Line A",
      route: "Central Station to Beach District",
      frequency: "Every 8 minutes",
      price: "$3.00",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Underground", "Fast", "Multiple Stops"],
    },
    {
      id: 3,
      type: "Tram",
      name: "Heritage Tram",
      route: "Historic District Loop",
      frequency: "Every 20 minutes",
      price: "$1.75",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Scenic Route", "Historic", "Tourist Friendly"],
    },
    {
      id: 4,
      type: "Ferry",
      name: "Harbor Ferry",
      route: "Main Port to Island Resort",
      frequency: "Every 30 minutes",
      price: "$5.00",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Ocean Views", "Car Transport", "Restaurant Onboard"],
    },
    {
      id: 5,
      type: "Bus",
      name: "Night Owl Bus",
      route: "24/7 City Circuit",
      frequency: "Every 45 minutes",
      price: "$2.00",
      image: "/placeholder.svg?height=200&width=300",
      features: ["24/7 Service", "Safe", "Well Lit Stops"],
    },
    {
      id: 6,
      type: "Train",
      name: "Regional Express",
      route: "City Center to Suburbs",
      frequency: "Every 30 minutes",
      price: "$4.50",
      image: "/placeholder.svg?height=200&width=300",
      features: ["High Speed", "Comfortable Seating", "Luggage Space"],
    },
  ]

  const filteredTransport =
    selectedTransportType === "all"
      ? transportOptions
      : transportOptions.filter((option) => option.type.toLowerCase() === selectedTransportType)

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Public Transport</h1>
            <p className="page-subtitle">Find convenient transport options to get around the city</p>
          </div>
          <button className="view-all-btn">View Map</button>
        </div>

        {/* Search and Filters */}
        <div className="search-filter-section">
          <div className="search-bar">
            <div className="search-input-container">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" placeholder="Search routes, stations..." className="search-input" />
            </div>
          </div>

          <div className="filters">
            <select
              className="filter-dropdown"
              value={selectedTransportType}
              onChange={(e) => setSelectedTransportType(e.target.value)}
            >
              <option value="all">All Transport</option>
              <option value="bus">Bus</option>
              <option value="metro">Metro</option>
              <option value="tram">Tram</option>
              <option value="ferry">Ferry</option>
              <option value="train">Train</option>
            </select>
            <select className="filter-dropdown">
              <option>Price Range</option>
              <option>Under $2</option>
              <option>$2 - $4</option>
              <option>Over $4</option>
            </select>
            <select className="filter-dropdown">
              <option>Frequency</option>
              <option>Every 10 min</option>
              <option>Every 20 min</option>
              <option>Every 30+ min</option>
            </select>
          </div>
        </div>

        {/* Transport Options Grid */}
        <div className="cards-grid">
          {filteredTransport.map((transport) => (
            <div key={transport.id} className="transport-card">
              <div className="card-image">
                <img src={transport.image || "/placeholder.svg"} alt={transport.name} />
                <div className="transport-type-badge">{transport.type}</div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{transport.name}</h3>
                <p className="card-subtitle">{transport.route}</p>
                <div className="transport-details">
                  <div className="detail-item">
                    <span className="detail-label">Frequency:</span>
                    <span className="detail-value">{transport.frequency}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value price">{transport.price}</span>
                  </div>
                </div>
                <div className="features">
                  {transport.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
                <button className="card-action-btn">View Schedule</button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Info Section */}
        <div className="info-section">
          <h2 className="section-title">Transport Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Travel Cards</h3>
              <p>Get unlimited rides with our daily, weekly, or monthly passes</p>
            </div>
            <div className="info-card">
              <h3>Mobile App</h3>
              <p>Download our app for real-time schedules and mobile tickets</p>
            </div>
            <div className="info-card">
              <h3>Accessibility</h3>
              <p>All our transport options are wheelchair accessible</p>
            </div>
            <div className="info-card">
              <h3>Customer Support</h3>
              <p>24/7 support available for all transport inquiries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
