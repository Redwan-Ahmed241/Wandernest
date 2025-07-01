"use client"
import type { FunctionComponent } from "react"
import { useCallback, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/HotelsRooms.module.css"
import Layout from "../App/Layout"

// Define interfaces
interface Hotel {
  id: string
  name: string
  description: string
  location: string
  image: string
  price: number
  rating: number
  amenities: string[]
  roomTypes: string[]
}

interface Review {
  id: string
  userName: string
  date: string
  rating: number
  comment: string
  likes: number
  dislikes: number
}

interface FilterOptions {
  price: string
  rating: string
  amenities: string
  location: string
  roomType: string
}

const FILTERS: { key: keyof FilterOptions; label: string; options: string[] }[] = [
  { key: "price", label: "Price Range", options: ["Any", "Under 3000", "3000-7000", "7000+"] },
  { key: "rating", label: "Star Rating", options: ["Any", "5 Star", "4 Star", "3 Star"] },
  { key: "amenities", label: "Amenities", options: ["Any", "Pool", "WiFi", "Breakfast", "Parking"] },
  { key: "location", label: "Location", options: ["Any", "Dhaka", "Beachfront", "Mountain View", "Countryside"] },
  { key: "roomType", label: "Room Type", options: ["Any", "Single", "Double", "Suite", "Family"] },
]

const AMENITY_LINKS = [
  {
    key: "restaurants",
    title: "Local Restaurants",
    description: "Discover popular dining spots",
    icon: "/Figma_photoes/loc_res.svg",
    route: "/restaurant",
  },
  {
    key: "attractions",
    title: "Tourist Attractions",
    description: "Explore nearby places of interest",
    icon: "/Figma_photoes/attraction.svg",
    route: "/things-to-do",
  },
  {
    key: "transport",
    title: "Public Transport",
    description: "Find transport options",
    icon: "/Figma_photoes/transport.svg",
    route: "/public-transport",
  },
  {
    key: "shopping",
    title: "Shopping Centers",
    description: "Shop at the best locations",
    icon: "/Figma_photoes/shop.svg",
    route: "/shopping-centers",
  },
]

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    userName: "Ratul",
    date: "Nov 1, 2025",
    rating: 5,
    comment: "Amazing stay with great amenities.",
    likes: 12,
    dislikes: 0,
  },
  {
    id: "2",
    userName: "Kashem",
    date: "Oct 28, 2025",
    rating: 5,
    comment: "Affordable and convenient location.",
    likes: 8,
    dislikes: 2,
  },
  {
    id: "3",
    userName: "Anonna",
    date: "Oct 25, 2025",
    rating: 4,
    comment: "Decent experience but room for improvement.",
    likes: 5,
    dislikes: 3,
  },
]

const MEDIA_BASE = "https://wander-nest-ad3s.onrender.com"

const HotelsRooms: FunctionComponent = () => {
  const navigate = useNavigate()

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    price: "Any",
    rating: "Any",
    amenities: "Any",
    location: "Any",
    roomType: "Any",
  })
  const [openFilter, setOpenFilter] = useState<string | null>(null)

  // Calendar states
  const today = new Date()
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth())
  const [calendarYear, setCalendarYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number } | null>(null)

  // Data states
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [reviews] = useState<Review[]>(MOCK_REVIEWS)

  // Loading states
  const [isLoadingHotels, setIsLoadingHotels] = useState(true)
  const [searchError, setSearchError] = useState("")

  // Load hotels on component mount
  useEffect(() => {
    fetchHotels()
  }, [])

  // Fetch hotels from API
  const fetchHotels = async () => {
    setIsLoadingHotels(true)
    setSearchError("")
    try {
      const response = await fetch("https://wander-nest-ad3s.onrender.com/api/hotels/")
      if (!response.ok) throw new Error("Failed to fetch hotels")

      const data = await response.json()
      const hotelsData = Array.isArray(data) ? data : []

      // Transform API data to match our interface
      const transformedHotels: Hotel[] = hotelsData.map((hotel: any) => ({
        id: hotel.id || hotel._id || Math.random().toString(),
        name: hotel.name || "Unknown Hotel",
        description: hotel.description || "No description available",
        location: hotel.location || "Unknown Location",
        image: hotel.image || "/placeholder.svg?height=200&width=300",
        price: hotel.price || 0,
        rating: hotel.rating || 0,
        amenities: hotel.amenities || [],
        roomTypes: hotel.roomTypes || [],
      }))

      setHotels(transformedHotels)
    } catch (err) {
      setSearchError("Failed to fetch hotels. Please try again.")
      setHotels([])
      console.error("Hotel fetch error:", err)
    } finally {
      setIsLoadingHotels(false)
    }
  }

  // Calendar functions
  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11)
      setCalendarYear(calendarYear - 1)
    } else {
      setCalendarMonth(calendarMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0)
      setCalendarYear(calendarYear + 1)
    } else {
      setCalendarMonth(calendarMonth + 1)
    }
  }

  const handleDateSelect = (day: number) => {
    setSelectedDate({
      day,
      month: calendarMonth,
      year: calendarYear,
    })
  }

  // Filter functions
  const handleFilterChange = (filterKey: keyof FilterOptions, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }))
    setOpenFilter(null)
  }

  const toggleFilter = (filterKey: string) => {
    setOpenFilter(openFilter === filterKey ? null : filterKey)
  }

  // Search and filter hotels
  const filteredHotels = hotels.filter((hotel) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      !query ||
      hotel.name.toLowerCase().includes(query) ||
      hotel.description.toLowerCase().includes(query) ||
      hotel.location.toLowerCase().includes(query)

    // Add filter logic here based on selectedFilters
    const matchesPrice = selectedFilters.price === "Any" || checkPriceRange(hotel.price, selectedFilters.price)
    const matchesRating = selectedFilters.rating === "Any" || checkRatingMatch(hotel.rating, selectedFilters.rating)
    const matchesAmenities = selectedFilters.amenities === "Any" || hotel.amenities.includes(selectedFilters.amenities)
    const matchesLocation = selectedFilters.location === "Any" || hotel.location.includes(selectedFilters.location)
    const matchesRoomType = selectedFilters.roomType === "Any" || hotel.roomTypes.includes(selectedFilters.roomType)

    return matchesSearch && matchesPrice && matchesRating && matchesAmenities && matchesLocation && matchesRoomType
  })

  // Helper functions for filtering
  const checkPriceRange = (price: number, range: string): boolean => {
    switch (range) {
      case "Under 3000":
        return price < 3000
      case "3000-7000":
        return price >= 3000 && price <= 7000
      case "7000+":
        return price > 7000
      default:
        return true
    }
  }

  const checkRatingMatch = (rating: number, filterRating: string): boolean => {
    const starCount = Number.parseInt(filterRating.charAt(0))
    return rating >= starCount
  }

  // Navigation functions
  const onHotelClick = useCallback(
    (hotelId: string) => {
      navigate(`/hotel/${hotelId}`)
    },
    [navigate],
  )

  const onViewAllClick = useCallback(() => {
    navigate("/hotels")
  }, [navigate])

  // Calendar helper functions
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay()

  return (
    <Layout>
      <div className={styles.hotelsContainer}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Filters Sidebar */}
          <div className={styles.sidebar}>
            {/* Search Bar */}
            <div className={styles.searchSection}>
              <div className={styles.searchBarContainer}>
                <img src="/Figma_photoes/search.svg" alt="search" className={styles.searchIcon} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hotels, rooms..."
                  className={styles.searchInput}
                />
              </div>
            </div>

            {/* Filters */}
            <div className={styles.filtersSection}>
              <div className={styles.filtersRow}>
                {FILTERS.map((filter) => (
                  <div key={filter.key} className={styles.filterContainer}>
                    <button
                      className={`${styles.filterButton} ${openFilter === filter.key ? styles.active : ""}`}
                      onClick={() => toggleFilter(filter.key)}
                      type="button"
                    >
                      {selectedFilters[filter.key] || filter.label}
                      <img src="/Figma_photoes/darrow.svg" alt="▼" className={styles.filterArrow} />
                    </button>
                    {openFilter === filter.key && (
                      <div className={styles.filterDropdown}>
                        {filter.options.map((option) => (
                          <div
                            key={option}
                            className={`${styles.filterOption} ${selectedFilters[filter.key] === option ? styles.selected : ""}`}
                            onClick={() => handleFilterChange(filter.key, option)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className={styles.calendarSection}>
              <div className={styles.calendarContainer}>
                <div className={styles.calendarHeader}>
                  <button onClick={handlePrevMonth} className={styles.calendarNavBtn}>
                    {"<"}
                  </button>
                  <span className={styles.calendarTitle}>
                    {new Date(calendarYear, calendarMonth).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button onClick={handleNextMonth} className={styles.calendarNavBtn}>
                    {">"}
                  </button>
                </div>

                <div className={styles.calendarWeekdays}>
                  {weekDays.map((day, i) => (
                    <span key={i} className={styles.weekday}>
                      {day}
                    </span>
                  ))}
                </div>

                <div className={styles.calendarGrid}>
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <span key={`empty-${i}`} className={styles.emptyDay}></span>
                  ))}
                  {daysArray.map((day) => (
                    <span
                      key={day}
                      className={`${styles.calendarDay} ${
                        selectedDate?.day === day &&
                        selectedDate?.month === calendarMonth &&
                        selectedDate?.year === calendarYear
                          ? styles.selectedDay
                          : ""
                      }`}
                      onClick={() => handleDateSelect(day)}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Listings */}
          <div className={styles.contentArea}>
            {/* Header */}
            <div className={styles.contentHeader}>
              <div className={styles.headerText}>
                <h1 className={styles.title}>Explore Hotels and Rooms</h1>
                <p className={styles.subtitle}>Find the perfect stay for your travel needs.</p>
              </div>
              <button className={styles.viewAllButton} onClick={onViewAllClick}>
                View All
              </button>
            </div>

            {/* Error Message */}
            {searchError && <div className={styles.errorMessage}>{searchError}</div>}

            {/* Loading State */}
            {isLoadingHotels && <div className={styles.loadingText}>Loading hotels...</div>}

            {/* Hotels Grid */}
            {!isLoadingHotels && (
              <div className={styles.hotelsGrid}>
                {filteredHotels.length > 0 ? (
                  filteredHotels.map((hotel) => (
                    <div key={hotel.id} className={styles.hotelCard} onClick={() => onHotelClick(hotel.id)}>
                      <img src={hotel.image && !hotel.image.startsWith('http') ? MEDIA_BASE + hotel.image : hotel.image || "/placeholder.svg"} alt={hotel.name} className={styles.hotelImage} />
                      <div className={styles.hotelInfo}>
                        <h3 className={styles.hotelName}>{hotel.name}</h3>
                        <p className={styles.hotelDescription}>{hotel.description}</p>
                        <div className={styles.hotelMeta}>
                          <span className={styles.hotelLocation}>{hotel.location}</span>
                          {hotel.price > 0 && <span className={styles.hotelPrice}>৳{hotel.price}/night</span>}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noResults}>No hotels found matching your criteria.</div>
                )}
              </div>
            )}

            {/* Local Amenities */}
            <div className={styles.amenitiesSection}>
              <h2 className={styles.sectionTitle}>Local Amenities and Guides</h2>
              <div className={styles.amenitiesGrid}>
                {AMENITY_LINKS.map((amenity) => (
                  <div key={amenity.key} className={styles.amenityCard} onClick={() => navigate(amenity.route)}>
                    <img src={amenity.icon || "/placeholder.svg"} alt={amenity.title} className={styles.amenityIcon} />
                    <div className={styles.amenityInfo}>
                      <h3 className={styles.amenityTitle}>{amenity.title}</h3>
                      <p className={styles.amenityDescription}>{amenity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HotelsRooms
