"use client"
import type { FunctionComponent } from "react"
import { useCallback, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/HotelsRooms.module.css"
import Layout from "../App/Layout"
import { useAuth } from "../Authentication/auth-context"

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

const FILTER_OPTIONS = {
  Price: ['All', 'Under 3000৳', '3000–7000৳', '7000+৳'],
  Rating: ['All', '5 Star', '4 Star', '3 Star'],
  Location: ['All', 'Dhaka', 'Chittagong', 'Sylhet', 'Cox\'s Bazar', 'Bandarban'],
  'Room Type': ['All', 'Single', 'Double', 'Suite', 'Family'],
}

type FilterKey = keyof typeof FILTER_OPTIONS

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

// Helper functions for filtering
const checkPriceRange = (price: number, range: string): boolean => {
  switch (range) {
    case "Under 3000৳":
      return price < 3000
    case "3000–7000৳":
      return price >= 3000 && price <= 7000
    case "7000+৳":
      return price > 7000
    default:
      return true
  }
}

const checkRatingMatch = (rating: number, filterRating: string): boolean => {
  const starCount = Number.parseInt(filterRating.charAt(0))
  return rating >= starCount
}

// Booking Modal Component
interface BookingModalProps {
  hotel: Hotel
  onClose: () => void
  onBook: (bookingData: any) => void
}

const BookingModal: React.FC<BookingModalProps> = ({ hotel, onClose, onBook }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    guests: 1,
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setError('')
    if (!form.name || !form.email || !form.phone || !form.checkin) {
      setError('Please fill all required fields')
      return
    }
    onBook({ ...form, hotelId: hotel.id })
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Book {hotel.name}</h2>
          <button className={styles.modalClose} onClick={onClose}>×</button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.hotelSummary}>
          <img src={hotel.image_url || 'https://via.placeholder.com/400x200?text=Hotel+Image'} alt={hotel.name} className={styles.modalImage} />
          <div className={styles.hotelInfo}>
            <h3>{hotel.name}</h3>
            <p>{hotel.location}</p>
            <p className={styles.hotelPrice}>৳{hotel.price}/night</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.bookingForm}>
          <div className={styles.formGroup}>
            <label>Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Phone *</label>
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Check-in Date *</label>
              <input name="checkin" type="date" value={form.checkin} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required />
            </div>
            <div className={styles.formGroup}>
              <label>Guests</label>
              <input name="guests" type="number" min={1} value={form.guests} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className={styles.bookButton}>Confirm Booking</button>
        </form>
        {submitted && !error && (
          <div className={styles.successMessage}>Booking submitted successfully!</div>
        )}
      </div>
    </div>
  )
}

const HotelsRooms: FunctionComponent = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // Search and filter states
  const [search, setSearch] = useState('')
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<{ [key in FilterKey]?: string }>({})
  const filterDropdownRef = useRef<HTMLDivElement>(null)

  // Data states
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [reviews] = useState<Review[]>(MOCK_REVIEWS)

  // Loading states
  const [isLoadingHotels, setIsLoadingHotels] = useState(true)
  const [searchError, setSearchError] = useState("")

  // Modal states
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  // Load hotels on component mount
  useEffect(() => {
    fetchHotels()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null)
      }
    }
    if (openFilter) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openFilter])

  // Fetch hotels from API
  const fetchHotels = async () => {
    setIsLoadingHotels(true)
    setSearchError("")
    try {
      const response = await fetch("https://wander-nest-ad3s.onrender.com/api/hotels/")
      if (!response.ok) throw new Error("Failed to fetch hotels")

      const data = await response.json()
      console.log("API Response:", data) // Debug log
      let hotelsData = []
      if (Array.isArray(data)) {
        hotelsData = data
      } else if (Array.isArray(data?.results)) {
        hotelsData = data.results
      } else if (Array.isArray(data?.data)) {
        hotelsData = data.data
      } else if (Array.isArray(data?.hotels)) {
        hotelsData = data.hotels
      } else {
        throw new Error("Unexpected response structure")
      }

      // Transform API data
      const transformedHotels: Hotel[] = hotelsData.map((hotel: any) => ({
        id: hotel.id || hotel._id || "unknown-id", // Use consistent ID
        name: hotel.name || "Unknown Hotel",
        description: hotel.description || "No description available",
        location: hotel.location || "Unknown Location",
        image_url: hotel.image_url && hotel.image_url.startsWith('http')
          ? hotel.image_url
          : hotel.image_url
            ? `${MEDIA_BASE}${hotel.image_url}`
            : hotel.image && hotel.image.startsWith('http')
              ? hotel.image
              : hotel.image
                ? `${MEDIA_BASE}${hotel.image}`
                : "/placeholder.svg?height=200&width=300",
        price: parseFloat(hotel.price) || 0,
        star: hotel.star || 0,
        amenities: hotel.amenities || [],
        roomTypes: hotel.roomTypes || (hotel.type ? [hotel.type] : []),
      }))
      console.log("Transformed hotels:", transformedHotels) // Debug log
      setHotels(transformedHotels)
    } catch (err) {
      setSearchError("Failed to fetch hotels. Please try again.")
      setHotels([])
      console.error("Hotel fetch error:", err)
    } finally {
      setIsLoadingHotels(false)
    }
  }

  // Filter functions
  const handleFilterClick = (filter: FilterKey) => {
    setOpenFilter(openFilter === filter ? null : filter)
  }

  const handleOptionSelect = (filter: FilterKey, option: string) => {
    if (option === 'All') {
      // Remove the filter for this category
      const { [filter]: _, ...rest } = selectedFilters
      setSelectedFilters(rest)
    } else {
      setSelectedFilters({ ...selectedFilters, [filter]: option })
    }
    setOpenFilter(null)
  }

  // Extract main city/area from location (first word or comma-separated part)
  const extractCity = (location: string) => {
    if (!location) return ''
    // Try to get the first comma-separated part, or first word
    return location.split(',')[0].trim()
  }

  // Filter hotels by search and selected filters
  const filteredHotels = hotels.filter((hotel) => {
    const query = search.toLowerCase()
    const matchesSearch =
      !query ||
      hotel.name.toLowerCase().includes(query) ||
      hotel.description.toLowerCase().includes(query) ||
      hotel.location.toLowerCase().includes(query)

    const matchesFilters = Object.entries(selectedFilters).every(([filter, value]) => {
      if (filter === 'Price') {
        return checkPriceRange(hotel.price, value)
      }
      if (filter === 'Rating') {
        return checkRatingMatch(hotel.star, value)
      }
      if (filter === 'Location') {
        return extractCity(hotel.location).toLowerCase() === value.toLowerCase()
      }
      if (filter === 'Room Type') {
        let hotelRoomTypes: string[] = []
        if (Array.isArray(hotel.roomTypes)) {
          hotelRoomTypes = (hotel.roomTypes as string[]).map((rt: string) => rt.trim())
        } else if (typeof (hotel.roomTypes as any) === 'string') {
          hotelRoomTypes = [(hotel.roomTypes as string).trim()]
        }
        return hotelRoomTypes.some(rt => rt.toLowerCase() === value.toLowerCase())
      }
      return true
    })

    return matchesSearch && matchesFilters
  })

  // Navigation functions
  const onHotelClick = useCallback(
    (hotelId: string) => {
      // navigate(`/hotel/${hotelId}`)
    },
    [],
  )

  const onViewAllClick = useCallback(() => {
    // navigate("/hotels")
  }, [])

  // Handle booking
  const handleBookHotel = (hotel: Hotel) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setSelectedHotel(hotel)
    setIsBookingModalOpen(true)
  }

  return (
    <Layout>
      <div className={styles.hotelsContainer}>
        {/* Header Section */}
        <div className={styles.groupParent}>
          <div className={styles.tourPackages2}>Hotels & Rooms</div>
        </div>

        {/* Search Bar */}
        <div className={styles.searchBarContainer}>
          <img
            src="/Figma_photoes/search.svg"
            alt="search"
            className={styles.searchIconInside}
          />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search hotels, locations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters and Hotels Grid */}
        <div className={styles.tourPackagesWrapper}>
          <div className={styles.tourPackages}>
            <div className={styles.tourPackages1}>
              <div className={styles.depth0Frame0}>
                <div className={styles.depth1Frame0}>
                  <div className={styles.depth2Frame1}>
                    <div className={styles.depth3Frame01}>
                      {/* Filters */}
                      <div className={styles.depth4Frame2} ref={filterDropdownRef}>
                        {Object.keys(FILTER_OPTIONS).map(filter => (
                          <div key={filter} className={styles.depth5Frame03}>
                            <div
                              className={
                                styles.depth6Frame03 +
                                (selectedFilters[filter as FilterKey] && selectedFilters[filter as FilterKey] !== 'All' ? ' ' + styles.selected : '')
                              }
                              onClick={() => handleFilterClick(filter as FilterKey)}
                              style={{ cursor: 'pointer', position: 'relative' }}
                            >
                              <div className={styles.destinations}>
                                {selectedFilters[filter as FilterKey] && selectedFilters[filter as FilterKey] !== 'All'
                                  ? selectedFilters[filter as FilterKey]
                                  : filter}
                              </div>
                              <img
                                className={
                                  styles.depth6Frame1 +
                                  (openFilter === (filter as FilterKey) ? ' ' + styles.arrowOpen : '')
                                }
                                alt=""
                                src="/Figma_photoes/darrow.svg"
                              />
                              {openFilter === (filter as FilterKey) && (
                                <div className={styles.filterDropdown}>
                                  {(FILTER_OPTIONS[filter as FilterKey] as string[]).map((option: string) => (
                                    <div
                                      key={option}
                                      className={
                                        styles.filterDropdownOption +
                                        (selectedFilters[filter as FilterKey] === option || (!selectedFilters[filter as FilterKey] && option === 'All') ? ' ' + styles.selected : '')
                                      }
                                      onClick={() => handleOptionSelect(filter as FilterKey, option)}
                                    >
                                      {option}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Hotels Grid */}
                      <div className={styles.depth4Frame3}>
                        <div className={styles.depth5Frame04}>
                          {isLoadingHotels && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                              Loading hotels...
                            </div>
                          )}
                          {searchError && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                              {searchError}
                            </div>
                          )}
                          {!isLoadingHotels && !searchError && filteredHotels.map(hotel => (
                            <div
                              className={styles.depth6Frame07}
                              key={hotel.id}
                              onClick={() => onHotelClick(hotel.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <img className={styles.depth7Frame01} alt="" src={hotel.image_url} />
                              <div className={styles.depth7Frame11}>
                                <div className={styles.depth7Frame11}>
                                  <div className={styles.sundarbansWildlifeExpedition}>{hotel.name}</div>
                                </div>
                                <div className={styles.depth8Frame1}>
                                  <div className={styles.exploreTheWorlds}>{hotel.description}</div>
                                </div>
                                <div className={styles.hotelMeta}>
                                  <span className={styles.hotelLocation}>{hotel.location}</span>
                                  {hotel.star > 0 && (
                                    <span className={styles.hotelRating}>
                                      {'⭐'.repeat(hotel.star)} {hotel.star} Star
                                    </span>
                                  )}
                                </div>
                                <div className={styles.cardPrice}>৳{hotel.price.toLocaleString()}/night</div>
                                <button
                                  className={styles.createCustomPackage}
                                  type="button"
                                  onClick={e => {
                                    e.stopPropagation()
                                    handleBookHotel(hotel)
                                  }}
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        {!isLoadingHotels && !searchError && filteredHotels.length === 0 && (
                          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                            No hotels found matching your criteria.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

        {/* Booking Modal */}
        {isBookingModalOpen && selectedHotel && (
          <BookingModal
            hotel={selectedHotel}
            onClose={() => {
              setIsBookingModalOpen(false)
              setSelectedHotel(null)
            }}
            onBook={(bookingData) => {
              console.log('Booking data:', bookingData)
              fetch('https://wander-nest-ad3s.onrender.com/api/bookings/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData),
              })
              .then(res => {
                if (!res.ok) throw new Error('Booking failed')
                return res.json()
              })
              .then(data => {
                console.log('Booking successful:', data)
                setIsBookingModalOpen(false)
                setSelectedHotel(null)
                alert('Booking submitted successfully!')
              })
              .catch(err => {
                console.error('Booking error:', err)
                alert('Booking failed. Please try again.')
              })
            }}
          />
        )}
      </div>
    </Layout>
  )
}

export default HotelsRooms
