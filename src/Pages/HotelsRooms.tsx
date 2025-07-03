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
  image_url: string
  price: number
  star: number
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
  location: string
  roomType: string
}

const FILTERS: { key: keyof FilterOptions; label: string; options: string[] }[] = [
  { key: "price", label: "Price Range", options: ["Any", "Under 3000", "3000-7000", "7000+"] },
  { key: "rating", label: "Star Rating", options: ["Any", "5 Star", "4 Star", "3 Star"] },
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

// Helper functions for filtering - MOVED TO TOP TO AVOID HOISTING ISSUES
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

const HotelsRooms: FunctionComponent = () => {
  const navigate = useNavigate()

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    price: "Any",
    rating: "Any",
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

  // Sorting state
  const [sortKey, setSortKey] = useState<'price' | 'star' | 'name'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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
        image_url: hotel.image_url || hotel.image || "/placeholder.svg?height=200&width=300",
        price: parseFloat(hotel.price) || 0,
        star: hotel.star || 0,
        amenities: hotel.amenities || [],
        roomTypes: hotel.roomTypes || (hotel.type ? [hotel.type] : []),
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

  // Extract main city/area from location (first word or comma-separated part)
  const extractCity = (location: string) => {
    if (!location) return '';
    // Try to get the first comma-separated part, or first word
    return location.split(',')[0].trim();
  };
  const cityOptions = ['Any', ...Array.from(new Set(hotels.map(h => extractCity(h.location).toLowerCase()))).filter(Boolean)]
    .map(city => city.charAt(0).toUpperCase() + city.slice(1))
    .sort((a, b) => a.localeCompare(b));

  // Fallback static options
  const staticAmenityOptions = ['Any', 'Pool', 'WiFi', 'Breakfast', 'Parking'];
  const staticRoomTypeOptions = ['Any', 'Single', 'Double', 'Suite', 'Family'];
  const staticStarOptions = ['Any', '5 Star', '4 Star', '3 Star'];

  // Use dynamic options if available, otherwise fallback to static
  const amenityOptions = ['Any', ...Array.from(new Set(hotels.flatMap(h => h.amenities || []))).filter(Boolean).sort((a, b) => a.localeCompare(b))];
  const roomTypeOptions = ['Any', ...Array.from(new Set(hotels.flatMap(h => h.roomTypes || []))).filter(Boolean).map(rt => rt.charAt(0).toUpperCase() + rt.slice(1)).sort((a, b) => a.localeCompare(b))];
  if (!roomTypeOptions.includes('Single')) {
    roomTypeOptions.push('Single');
  }
  const starOptions = ['Any', ...Array.from(new Set(hotels.map(h => h.star))).filter(Boolean).sort((a, b) => b - a).map(star => `${star} Star`)];

  const amenityFilterOptions = amenityOptions.length > 1 ? amenityOptions : staticAmenityOptions;
  const roomTypeFilterOptions = roomTypeOptions.length > 1 ? roomTypeOptions : staticRoomTypeOptions;
  const starFilterOptions = starOptions.length > 1 ? starOptions : staticStarOptions;

  // Replace FILTERS with all dynamic options (fallback to static if needed)
  const dynamicFilters = FILTERS.map(filter => {
    if (filter.key === 'location') return { ...filter, options: cityOptions };
    if (filter.key === 'roomType') return { ...filter, options: roomTypeFilterOptions };
    if (filter.key === 'rating') return { ...filter, options: starFilterOptions };
    return filter;
  });

  // Update filter logic to match city substring
  const filteredHotels = hotels.filter((hotel) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      hotel.name.toLowerCase().includes(query) ||
      hotel.description.toLowerCase().includes(query) ||
      hotel.location.toLowerCase().includes(query);

    const matchesPrice = selectedFilters.price === "Any" || checkPriceRange(hotel.price, selectedFilters.price);
    // Star rating: exact match
    const matchesRating = selectedFilters.rating === "Any" || `${hotel.star} Star` === selectedFilters.rating;
    const matchesLocation = selectedFilters.location === "Any" || extractCity(hotel.location).toLowerCase() === selectedFilters.location.toLowerCase();
    let hotelRoomTypes: string[] = [];
    if (Array.isArray(hotel.roomTypes)) {
      hotelRoomTypes = (hotel.roomTypes as string[]).map((rt: string) => rt.trim());
    } else if (typeof (hotel.roomTypes as any) === 'string') {
      hotelRoomTypes = [(hotel.roomTypes as string).trim()];
    }
    const matchesRoomType = selectedFilters.roomType === "Any" || hotelRoomTypes.some(rt => rt.toLowerCase() === selectedFilters.roomType.toLowerCase());

    return matchesSearch && matchesPrice && matchesRating && matchesLocation && matchesRoomType;
  });

  // Sorting logic
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortKey === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortKey === 'star') {
      return sortOrder === 'asc' ? a.star - b.star : b.star - a.star;
    } else if (sortKey === 'name') {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

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
                {dynamicFilters.map((filter) => (
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
              
            </div>

            {/* Error Message */}
            {searchError && <div className={styles.errorMessage}>{searchError}</div>}

            {/* Loading State */}
            {isLoadingHotels && <div className={styles.loadingText}>Loading hotels...</div>}

            {/* Hotels Grid */}
            {!isLoadingHotels && (
              <div className={styles.hotelsGrid}>
                {sortedHotels.length > 0 ? (
                  sortedHotels.map((hotel) => (
                    <div key={hotel.id} className={styles.hotelCard} onClick={() => onHotelClick(hotel.id)}>
                      <img src={hotel.image_url || "/placeholder.svg"} alt={hotel.name} className={styles.hotelImage} />
                      <div className={styles.hotelInfo}>
                        <h3 className={styles.hotelName}>{hotel.name}</h3>
                        <p className={styles.hotelDescription}>{hotel.description}</p>
                        <div className={styles.hotelMeta}>
                          <span className={styles.hotelLocation}>{hotel.location}</span>
                          {hotel.price > 0 && <span className={styles.hotelPrice}>৳{hotel.price}/night</span>}
                        </div>
                        <button
                          className={styles.bookNowButton}
                          onClick={e => {
                            e.stopPropagation();
                            navigate('/hotel-book', { state: { hotel } });
                          }}
                        >
                          Book Now
                        </button>
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
