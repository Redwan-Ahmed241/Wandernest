"use client"

import { type FunctionComponent, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/HotelsRooms.module.css"
import Layout from "../App/Layout"
import Sidebar from "./Sidebar"
import { useAuth } from "../Authentication/auth-context"
import { useBooking } from "../Context/booking-context"

interface Hotel {
  id: string
  name: string
  location: string
  rating: number
  price: number
  image: string
  amenities: string[]
  description: string
  available: boolean
  roomType: string
  maxGuests: number
}

interface BookingFormData {
  checkInDate: string
  checkOutDate: string
  guests: number
  specialRequests: string
  contactInfo: {
    name: string
    email: string
    phone: string
  }
}

// Mock hotel data
const MOCK_HOTELS: Hotel[] = [
  {
    id: "hotel_1",
    name: "Ocean View Resort",
    location: "Cox's Bazar",
    rating: 4.8,
    price: 8500,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Beach Access"],
    description: "Luxury beachfront resort with stunning ocean views",
    available: true,
    roomType: "Deluxe Ocean View",
    maxGuests: 4,
  },
  {
    id: "hotel_2",
    name: "Hill Top Hotel",
    location: "Bandarban",
    rating: 4.5,
    price: 6200,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Free WiFi", "Mountain View", "Restaurant", "Parking"],
    description: "Peaceful mountain retreat with panoramic views",
    available: true,
    roomType: "Mountain View Suite",
    maxGuests: 3,
  },
  {
    id: "hotel_3",
    name: "Tea Garden Lodge",
    location: "Srimangal",
    rating: 4.3,
    price: 4800,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Free WiFi", "Garden View", "Tea Tasting", "Breakfast"],
    description: "Cozy lodge surrounded by lush tea gardens",
    available: true,
    roomType: "Garden View Room",
    maxGuests: 2,
  },
  {
    id: "hotel_4",
    name: "Lake Side Resort",
    location: "Rangamati",
    rating: 4.6,
    price: 7200,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Free WiFi", "Lake View", "Boat Ride", "Restaurant", "Fishing"],
    description: "Serene lakeside resort perfect for relaxation",
    available: true,
    roomType: "Lake View Cottage",
    maxGuests: 4,
  },
  {
    id: "hotel_5",
    name: "City Center Hotel",
    location: "Dhaka",
    rating: 4.2,
    price: 5500,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Free WiFi", "Business Center", "Gym", "Restaurant", "Airport Shuttle"],
    description: "Modern hotel in the heart of the city",
    available: true,
    roomType: "Executive Room",
    maxGuests: 2,
  },
  {
    id: "hotel_6",
    name: "Heritage Palace",
    location: "Sylhet",
    rating: 4.7,
    price: 9200,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Free WiFi", "Heritage Architecture", "Spa", "Fine Dining", "Cultural Shows"],
    description: "Historic palace converted into luxury hotel",
    available: true,
    roomType: "Royal Suite",
    maxGuests: 6,
  },
]

// Booking Modal Component
const BookingModal: React.FC<{
  hotel: Hotel | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (formData: BookingFormData) => void
  isProcessing: boolean
  error: string
}> = ({ hotel, isOpen, onClose, onConfirm, isProcessing, error }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
    specialRequests: "",
    contactInfo: {
      name: "",
      email: "",
      phone: "",
    },
  })

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith("contactInfo.")) {
      const contactField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [contactField]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0
    const checkIn = new Date(formData.checkInDate)
    const checkOut = new Date(formData.checkOutDate)
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

  const totalPrice = hotel ? hotel.price * calculateNights() : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm(formData)
  }

  if (!isOpen || !hotel) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Book {hotel.name}</h2>
          <button className={styles.closeButton} onClick={onClose} disabled={isProcessing}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Hotel Summary */}
          <div className={styles.hotelSummary}>
            <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className={styles.hotelSummaryImage} />
            <div className={styles.hotelSummaryInfo}>
              <h3>{hotel.name}</h3>
              <p>📍 {hotel.location}</p>
              <p>⭐ {hotel.rating}/5</p>
              <p>🏠 {hotel.roomType}</p>
              <p className={styles.price}>৳{hotel.price.toLocaleString()}/night</p>
            </div>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.bookingForm}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Check-in Date *</label>
                <input
                  type="date"
                  className={styles.formInput}
                  value={formData.checkInDate}
                  onChange={(e) => handleInputChange("checkInDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Check-out Date *</label>
                <input
                  type="date"
                  className={styles.formInput}
                  value={formData.checkOutDate}
                  onChange={(e) => handleInputChange("checkOutDate", e.target.value)}
                  min={formData.checkInDate || new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Number of Guests</label>
                <select
                  className={styles.formInput}
                  value={formData.guests}
                  onChange={(e) => handleInputChange("guests", Number(e.target.value))}
                >
                  {Array.from({ length: hotel.maxGuests }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} Guest{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name *</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={formData.contactInfo.name}
                  onChange={(e) => handleInputChange("contactInfo.name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email *</label>
                <input
                  type="email"
                  className={styles.formInput}
                  value={formData.contactInfo.email}
                  onChange={(e) => handleInputChange("contactInfo.email", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number *</label>
                <input
                  type="tel"
                  className={styles.formInput}
                  value={formData.contactInfo.phone}
                  onChange={(e) => handleInputChange("contactInfo.phone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Special Requests (Optional)</label>
              <textarea
                className={styles.formTextarea}
                value={formData.specialRequests}
                onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                placeholder="Any special requirements..."
                rows={3}
              />
            </div>

            {/* Booking Summary */}
            <div className={styles.bookingSummary}>
              <h4>Booking Summary</h4>
              <div className={styles.summaryRow}>
                <span>Check-in:</span>
                <span>{formData.checkInDate || "Not selected"}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Check-out:</span>
                <span>{formData.checkOutDate || "Not selected"}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Nights:</span>
                <span>{calculateNights()} night{calculateNights() !== 1 ? "s" : ""}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Guests:</span>
                <span>{formData.guests}</span>
              </div>
              <div className={styles.summaryRow + " " + styles.totalRow}>
                <span>
                  <strong>Total Amount:</strong>
                </span>
                <span>
                  <strong>৳{totalPrice.toLocaleString()}</strong>
                </span>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isProcessing}>
                Cancel
              </button>
              <button
                type="submit"
                className={styles.confirmButton}
                disabled={
                  isProcessing ||
                  !formData.checkInDate ||
                  !formData.checkOutDate ||
                  !formData.contactInfo.name ||
                  !formData.contactInfo.email ||
                  !formData.contactInfo.phone
                }
              >
                {isProcessing ? "Processing..." : `Confirm Booking - ৳${totalPrice.toLocaleString()}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const HotelRooms: FunctionComponent = () => {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { addBooking } = useBooking()

  const [hotels, setHotels] = useState<Hotel[]>(MOCK_HOTELS)
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(MOCK_HOTELS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState("")

  // Filter hotels based on search and filters
  useEffect(() => {
    let filtered = hotels

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Location filter
    if (selectedLocation !== "All") {
      filtered = filtered.filter((hotel) => hotel.location === selectedLocation)
    }

    // Price filter
    if (priceRange !== "All") {
      filtered = filtered.filter((hotel) => {
        if (priceRange === "< 5000") return hotel.price < 5000
        if (priceRange === "5000-8000") return hotel.price >= 5000 && hotel.price <= 8000
        if (priceRange === "> 8000") return hotel.price > 8000
        return true
      })
    }

    setFilteredHotels(filtered)
  }, [hotels, searchQuery, selectedLocation, priceRange])

  const handleBookNow = (hotel: Hotel) => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    setSelectedHotel(hotel)
    setShowBookingModal(true)
    setPaymentError("")
  }

  const handleConfirmBooking = async (formData: BookingFormData) => {
    if (!selectedHotel) return

    setIsProcessingPayment(true)
    setPaymentError("")

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const nights = Math.ceil(
        (new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) / (1000 * 60 * 60 * 24)
      )

      // Add booking to context (immediate update)
      addBooking({
        type: "hotel",
        title: selectedHotel.name,
        location: selectedHotel.location,
        startDate: formData.checkInDate,
        endDate: formData.checkOutDate,
        price: selectedHotel.price * nights,
        status: "confirmed",
        travelers: formData.guests,
        image: selectedHotel.image,
      })

      // Close modal and reset
      setShowBookingModal(false)
      setSelectedHotel(null)

      // Navigate to dashboard to see the update
      navigate("/dashboard")
    } catch (error) {
      console.error("Payment failed:", error)
      setPaymentError("Payment failed. Please try again.")
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const locations = ["All", ...Array.from(new Set(hotels.map((hotel) => hotel.location)))]

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <Layout>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "40px", textAlign: "center" }}>
            <div>Loading...</div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className={styles.hotelRooms}>
          <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
              <h1 className={styles.pageTitle}>Hotel Rooms</h1>
              <p className={styles.subtitle}>Find and book the perfect accommodation for your stay</p>
            </div>

            {/* Search and Filters */}
            <div className={styles.searchSection}>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search hotels by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className={styles.filters}>
                <select
                  className={styles.filterSelect}
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location === "All" ? "All Locations" : location}
                    </option>
                  ))}
                </select>

                <select
                  className={styles.filterSelect}
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="All">All Prices</option>
                  <option value="< 5000">Under ৳5,000</option>
                  <option value="5000-8000">৳5,000 - ৳8,000</option>
                  <option value="> 8000">Above ৳8,000</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className={styles.resultsCount}>
              {filteredHotels.length} hotel{filteredHotels.length !== 1 ? "s" : ""} found
            </div>

            {/* Hotels Grid */}
            <div className={styles.hotelsGrid}>
              {filteredHotels.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🏨</div>
                  <h3>No hotels found</h3>
                  <p>Try adjusting your search criteria</p>
                </div>
              ) : (
                filteredHotels.map((hotel) => (
                  <div key={hotel.id} className={styles.hotelCard}>
                    <div className={styles.hotelImage}>
                      <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} />
                      <div className={styles.ratingBadge}>⭐ {hotel.rating}</div>
                    </div>

                    <div className={styles.hotelInfo}>
                      <div className={styles.hotelHeader}>
                        <h3 className={styles.hotelName}>{hotel.name}</h3>
                        <div className={styles.hotelLocation}>📍 {hotel.location}</div>
                      </div>

                      <div className={styles.roomType}>{hotel.roomType}</div>
                      <div className={styles.hotelDescription}>{hotel.description}</div>

                      <div className={styles.amenities}>
                        {hotel.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className={styles.amenityTag}>
                            {amenity}
                          </span>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <span className={styles.amenityTag}>+{hotel.amenities.length - 3} more</span>
                        )}
                      </div>

                      <div className={styles.hotelFooter}>
                        <div className={styles.priceSection}>
                          <div className={styles.price}>৳{hotel.price.toLocaleString()}</div>
                          <div className={styles.priceUnit}>per night</div>
                        </div>

                        <button
                          className={styles.bookButton}
                          onClick={() => handleBookNow(hotel)}
                          disabled={!hotel.available}
                        >
                          {hotel.available ? "Book Now" : "Not Available"}
                        </button>
                      </div>

                      <div className={styles.guestInfo}>Max {hotel.maxGuests} guests</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Booking Modal */}
          <BookingModal
            hotel={selectedHotel}
            isOpen={showBookingModal}
            onClose={() => {
              setShowBookingModal(false)
              setSelectedHotel(null)
              setPaymentError("")
            }}
            onConfirm={handleConfirmBooking}
            isProcessing={isProcessingPayment}
            error={paymentError}
          />
        </div>
      </div>
    </Layout>
  )
}

export default HotelRooms
