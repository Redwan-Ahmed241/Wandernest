"use client"

import { useState } from "react"
import "./page-styles.css"

export default function ShoppingCenters() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const shoppingCenters = [
    {
      id: 1,
      name: "Grand Plaza Mall",
      category: "Mall",
      description: "Premium shopping destination with luxury brands",
      location: "Downtown District",
      stores: "200+ stores",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Food Court", "Cinema", "Parking", "Kids Zone"],
      hours: "10 AM - 10 PM",
    },
    {
      id: 2,
      name: "Riverside Market",
      category: "Market",
      description: "Fresh local produce and artisan goods",
      location: "Riverside Quarter",
      stores: "50+ vendors",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Organic Food", "Local Crafts", "Outdoor", "Weekend Events"],
      hours: "8 AM - 6 PM",
    },
    {
      id: 3,
      name: "Fashion District",
      category: "Street",
      description: "Trendy boutiques and designer outlets",
      location: "Fashion Avenue",
      stores: "75+ boutiques",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Designer Brands", "Cafes", "Street Art", "Pedestrian Only"],
      hours: "11 AM - 9 PM",
    },
    {
      id: 4,
      name: "Tech Hub Center",
      category: "Specialty",
      description: "Electronics and technology specialists",
      location: "Innovation District",
      stores: "30+ tech stores",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Latest Tech", "Repair Services", "Gaming Zone", "Workshops"],
      hours: "10 AM - 8 PM",
    },
    {
      id: 5,
      name: "Heritage Bazaar",
      category: "Market",
      description: "Traditional crafts and cultural items",
      location: "Old Town",
      stores: "40+ artisans",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Handmade Items", "Cultural Tours", "Traditional Food", "Live Demos"],
      hours: "9 AM - 7 PM",
    },
    {
      id: 6,
      name: "Outlet Village",
      category: "Outlet",
      description: "Brand name goods at discounted prices",
      location: "Suburban Area",
      stores: "120+ outlets",
      rating: 4.4,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Discounted Prices", "Brand Names", "Large Parking", "Family Friendly"],
      hours: "9 AM - 9 PM",
    },
  ]

  const filteredCenters =
    selectedCategory === "all"
      ? shoppingCenters
      : shoppingCenters.filter((center) => center.category.toLowerCase() === selectedCategory)

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Shopping Centers</h1>
            <p className="page-subtitle">Shop at the best locations and discover amazing deals</p>
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
              <input type="text" placeholder="Search shopping centers, stores..." className="search-input" />
            </div>
          </div>

          <div className="filters">
            <select
              className="filter-dropdown"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="mall">Shopping Malls</option>
              <option value="market">Markets</option>
              <option value="street">Street Shopping</option>
              <option value="outlet">Outlets</option>
              <option value="specialty">Specialty Stores</option>
            </select>
            <select className="filter-dropdown">
              <option>Location</option>
              <option>Downtown</option>
              <option>Suburban</option>
              <option>Waterfront</option>
            </select>
            <select className="filter-dropdown">
              <option>Rating</option>
              <option>4.5+ Stars</option>
              <option>4.0+ Stars</option>
              <option>3.5+ Stars</option>
            </select>
          </div>
        </div>

        {/* Shopping Centers Grid */}
        <div className="cards-grid">
          {filteredCenters.map((center) => (
            <div key={center.id} className="shopping-card">
              <div className="card-image">
                <img src={center.image || "/placeholder.svg"} alt={center.name} />
                <div className="category-badge">{center.category}</div>
                <div className="rating-badge">
                  <span>⭐ {center.rating}</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{center.name}</h3>
                <p className="card-subtitle">{center.description}</p>
                <div className="shopping-details">
                  <div className="detail-item">
                    <span className="detail-label">📍 Location:</span>
                    <span className="detail-value">{center.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🏪 Stores:</span>
                    <span className="detail-value">{center.stores}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🕒 Hours:</span>
                    <span className="detail-value">{center.hours}</span>
                  </div>
                </div>
                <div className="features">
                  {center.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
                <button className="card-action-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Tips Section */}
        <div className="info-section">
          <h2 className="section-title">Shopping Tips</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Best Shopping Times</h3>
              <p>Visit weekday mornings for less crowds and better service</p>
            </div>
            <div className="info-card">
              <h3>Parking Information</h3>
              <p>Most centers offer free parking for the first 2-3 hours</p>
            </div>
            <div className="info-card">
              <h3>Tourist Discounts</h3>
              <p>Show your tourist ID for special discounts at participating stores</p>
            </div>
            <div className="info-card">
              <h3>Payment Methods</h3>
              <p>All major credit cards and mobile payments accepted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
