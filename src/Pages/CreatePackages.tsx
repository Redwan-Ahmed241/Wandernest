"use client"

import { type FunctionComponent, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/CreatePackage.module.css"
import Layout from "../App/Layout"
import Sidebar from "./Sidebar"
import { packageAPI, type PackageOption, type CreatePackageData } from "../App/api"
import { useAuth } from "../Authentication/AuthContext"

const CreatePackage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading, user } = useAuth()
  const today = new Date()

  // Form state
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [travelers, setTravelers] = useState(1)
  const [budget, setBudget] = useState("")
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)

  // Package options state
  const [transportOptions, setTransportOptions] = useState<PackageOption[]>([])
  const [hotelOptions, setHotelOptions] = useState<PackageOption[]>([])
  const [vehicleOptions, setVehicleOptions] = useState<PackageOption[]>([])
  const [guideOptions, setGuideOptions] = useState<PackageOption[]>([])

  // Selection state
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null)
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)

  // Skip state
  const [skipTransport, setSkipTransport] = useState(false)
  const [skipHotel, setSkipHotel] = useState(false)
  const [skipVehicle, setSkipVehicle] = useState(false)
  const [skipGuide, setSkipGuide] = useState(false)

  // Loading and error states
  const [isLoadingOptions, setIsLoadingOptions] = useState(true)
  const [isCreatingPackage, setIsCreatingPackage] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calendar state
  const [startCalendarMonth, setStartCalendarMonth] = useState(today.getMonth())
  const [startCalendarYear, setStartCalendarYear] = useState(today.getFullYear())
  const [endCalendarMonth, setEndCalendarMonth] = useState(today.getMonth())
  const [endCalendarYear, setEndCalendarYear] = useState(today.getFullYear())

  // Fetch package options on component mount
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchPackageOptions()
    }
  }, [authLoading, isAuthenticated])

  const fetchPackageOptions = async () => {
    try {
      setIsLoadingOptions(true)
      setError(null)

      const [transport, hotels, vehicles, guides] = await Promise.all([
        packageAPI.getTransportOptions(),
        packageAPI.getHotelOptions(),
        packageAPI.getVehicleOptions(),
        packageAPI.getGuideOptions(),
      ])

      setTransportOptions(transport.results || transport)
      setHotelOptions(hotels.results || hotels)
      setVehicleOptions(vehicles.results || vehicles)
      setGuideOptions(guides.results || guides)
    } catch (error) {
      console.error("Error fetching package options:", error)
      setError("Failed to load package options")
    } finally {
      setIsLoadingOptions(false)
    }
  }

  // Calendar utilities
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getDaysArray = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month)
    return Array.from({ length: daysInMonth }, (_, i) => i + 1)
  }

  // Date handlers
  const handleStartDateSelect = (day: number) => {
    const selectedDate = `${startCalendarYear}-${(startCalendarMonth + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    setStartDate(selectedDate)
    setShowStartCalendar(false)
  }

  const handleEndDateSelect = (day: number) => {
    const selectedDate = `${endCalendarYear}-${(endCalendarMonth + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    setEndDate(selectedDate)
    setShowEndCalendar(false)
  }

  // Calendar navigation
  const handleStartPrevMonth = () => {
    if (startCalendarMonth === 0) {
      setStartCalendarMonth(11)
      setStartCalendarYear(startCalendarYear - 1)
    } else {
      setStartCalendarMonth(startCalendarMonth - 1)
    }
  }

  const handleStartNextMonth = () => {
    if (startCalendarMonth === 11) {
      setStartCalendarMonth(0)
      setStartCalendarYear(startCalendarYear + 1)
    } else {
      setStartCalendarMonth(startCalendarMonth + 1)
    }
  }

  const handleEndPrevMonth = () => {
    if (endCalendarMonth === 0) {
      setEndCalendarMonth(11)
      setEndCalendarYear(endCalendarYear - 1)
    } else {
      setEndCalendarMonth(endCalendarMonth - 1)
    }
  }

  const handleEndNextMonth = () => {
    if (endCalendarMonth === 11) {
      setEndCalendarMonth(0)
      setEndCalendarYear(endCalendarYear + 1)
    } else {
      setEndCalendarMonth(endCalendarMonth + 1)
    }
  }

  // Selection handlers
  const handleOptionSelect = (
    optionId: string,
    currentSelection: string | null,
    setSelection: (id: string | null) => void,
    isSkipped: boolean,
  ) => {
    if (!isSkipped) {
      setSelection(currentSelection === optionId ? null : optionId)
    }
  }

  // Skip handlers
  const handleSkip = (
    isSkipped: boolean,
    setSkip: (skip: boolean) => void,
    setSelection: (id: string | null) => void,
  ) => {
    setSkip(!isSkipped)
    if (!isSkipped) setSelection(null)
  }

  // Form validation
  const isFormValid = () => {
    return (
      from.trim() !== "" &&
      to.trim() !== "" &&
      startDate !== "" &&
      endDate !== "" &&
      travelers > 0 &&
      budget.trim() !== "" &&
      new Date(startDate) < new Date(endDate)
    )
  }

  // Package creation
  const handleCreatePackage = async () => {
    if (!isFormValid()) {
      alert("Please fill in all required fields and ensure dates are valid.")
      return
    }

    try {
      setIsCreatingPackage(true)
      setError(null)

      const packageData: CreatePackageData = {
        title: `${from} to ${to} Package`,
        from_location: from,
        to_location: to,
        start_date: startDate,
        end_date: endDate,
        travelers_count: travelers,
        budget: Number.parseFloat(budget),
        transport_id: skipTransport ? null : selectedTransport,
        hotel_id: skipHotel ? null : selectedHotel,
        vehicle_id: skipVehicle ? null : selectedVehicle,
        guide_id: skipGuide ? null : selectedGuide,
        preferences: {
          skip_transport: skipTransport,
          skip_hotel: skipHotel,
          skip_vehicle: skipVehicle,
          skip_guide: skipGuide,
        },
      }

      const createdPackage = await packageAPI.createPackage(packageData)

      // Navigate to package details or confirmation page
      navigate(`/package/${createdPackage.id}`)
    } catch (error) {
      console.error("Error creating package:", error)
      setError("Failed to create package. Please try again.")
    } finally {
      setIsCreatingPackage(false)
    }
  }

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

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login")
    return null
  }

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <div className={styles.createPackage}>
            <div className={styles.headerSection}>
              <div className={styles.createYourCustom}>Create Your Custom Package</div>

              {error && <div className={styles.errorMessage}>{error}</div>}

              <div className={styles.formFieldsContainer}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>From *</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      placeholder="Enter departure location"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>To *</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      placeholder="Enter destination"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Start Date *</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      placeholder="Select start date"
                      value={startDate}
                      readOnly
                      onClick={() => setShowStartCalendar(!showStartCalendar)}
                      style={{ cursor: "pointer", background: "#fff" }}
                      required
                    />
                    {showStartCalendar && (
                      <div className={styles.calendarPopup}>
                        <div className={styles.calendarHeader}>
                          <button onClick={handleStartPrevMonth} className={styles.calendarNavButton}>
                            {"<"}
                          </button>
                          <span>
                            {new Date(startCalendarYear, startCalendarMonth).toLocaleString("default", {
                              month: "long",
                            })}{" "}
                            {startCalendarYear}
                          </span>
                          <button onClick={handleStartNextMonth} className={styles.calendarNavButton}>
                            {">"}
                          </button>
                        </div>
                        <div className={styles.calendarGrid}>
                          {getDaysArray(startCalendarYear, startCalendarMonth).map((day) => (
                            <div key={day} className={styles.calendarDay} onClick={() => handleStartDateSelect(day)}>
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>End Date *</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      placeholder="Select end date"
                      value={endDate}
                      readOnly
                      onClick={() => setShowEndCalendar(!showEndCalendar)}
                      style={{ cursor: "pointer", background: "#fff" }}
                      required
                    />
                    {showEndCalendar && (
                      <div className={styles.calendarPopup}>
                        <div className={styles.calendarHeader}>
                          <button onClick={handleEndPrevMonth} className={styles.calendarNavButton}>
                            {"<"}
                          </button>
                          <span>
                            {new Date(endCalendarYear, endCalendarMonth).toLocaleString("default", { month: "long" })}{" "}
                            {endCalendarYear}
                          </span>
                          <button onClick={handleEndNextMonth} className={styles.calendarNavButton}>
                            {">"}
                          </button>
                        </div>
                        <div className={styles.calendarGrid}>
                          {getDaysArray(endCalendarYear, endCalendarMonth).map((day) => (
                            <div key={day} className={styles.calendarDay} onClick={() => handleEndDateSelect(day)}>
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Number of Travelers *</label>
                    <input
                      className={styles.inputField}
                      type="number"
                      min="1"
                      max="20"
                      placeholder="Enter number of travelers"
                      value={travelers}
                      onChange={(e) => setTravelers(Number.parseInt(e.target.value) || 1)}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Budget (BDT) *</label>
                    <input
                      className={styles.inputField}
                      type="number"
                      min="0"
                      step="100"
                      placeholder="Enter your budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {isLoadingOptions ? (
              <div className={styles.loadingSection}>
                <div>Loading package options...</div>
              </div>
            ) : (
              <>
                {/* Transport Section */}
                <div className={styles.sectionContainer}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionTitle}>Select Transport</span>
                    <button
                      className={styles.skipButton}
                      onClick={() => handleSkip(skipTransport, setSkipTransport, setSelectedTransport)}
                    >
                      {skipTransport ? "Include" : "Skip"}
                    </button>
                  </div>
                  <div className={`${styles.cardsGrid} ${skipTransport ? styles.sectionDisabled : ""}`}>
                    {transportOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`${styles.card} ${selectedTransport === option.id ? styles.selectedCard : ""}`}
                        onClick={() =>
                          handleOptionSelect(option.id, selectedTransport, setSelectedTransport, skipTransport)
                        }
                      >
                        <img
                          className={styles.cardImage}
                          alt={option.name}
                          src={option.image || "/placeholder.svg?height=200&width=300"}
                        />
                        <div className={styles.cardContent}>
                          <div className={styles.cardTitle}>{option.name}</div>
                          <div className={styles.cardDescription}>{option.description}</div>
                          <div className={styles.cardPrice}>৳{option.price}</div>
                          {selectedTransport === option.id && <span className={styles.selectedMark}>✔</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotels Section */}
                <div className={styles.sectionContainer}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionTitle}>Select Hotels</span>
                    <button
                      className={styles.skipButton}
                      onClick={() => handleSkip(skipHotel, setSkipHotel, setSelectedHotel)}
                    >
                      {skipHotel ? "Include" : "Skip"}
                    </button>
                  </div>
                  <div className={`${styles.cardsGrid} ${skipHotel ? styles.sectionDisabled : ""}`}>
                    {hotelOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`${styles.card} ${selectedHotel === option.id ? styles.selectedCard : ""}`}
                        onClick={() => handleOptionSelect(option.id, selectedHotel, setSelectedHotel, skipHotel)}
                      >
                        <img
                          className={styles.cardImage}
                          alt={option.name}
                          src={option.image || "/placeholder.svg?height=200&width=300"}
                        />
                        <div className={styles.cardContent}>
                          <div className={styles.cardTitle}>{option.name}</div>
                          <div className={styles.cardDescription}>{option.description}</div>
                          <div className={styles.cardPrice}>৳{option.price}/night</div>
                          {selectedHotel === option.id && <span className={styles.selectedMark}>✔</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vehicle Section */}
                <div className={styles.sectionContainer}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionTitle}>Select Vehicle</span>
                    <button
                      className={styles.skipButton}
                      onClick={() => handleSkip(skipVehicle, setSkipVehicle, setSelectedVehicle)}
                    >
                      {skipVehicle ? "Include" : "Skip"}
                    </button>
                  </div>
                  <div className={`${styles.cardsGrid} ${skipVehicle ? styles.sectionDisabled : ""}`}>
                    {vehicleOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`${styles.card} ${selectedVehicle === option.id ? styles.selectedCard : ""}`}
                        onClick={() => handleOptionSelect(option.id, selectedVehicle, setSelectedVehicle, skipVehicle)}
                      >
                        <img
                          className={styles.cardImage}
                          alt={option.name}
                          src={option.image || "/placeholder.svg?height=200&width=300"}
                        />
                        <div className={styles.cardContent}>
                          <div className={styles.cardTitle}>{option.name}</div>
                          <div className={styles.cardDescription}>{option.description}</div>
                          <div className={styles.cardPrice}>৳{option.price}/day</div>
                          {selectedVehicle === option.id && <span className={styles.selectedMark}>✔</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guide Section */}
                <div className={styles.sectionContainer}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionTitle}>Hire a Guide</span>
                    <button
                      className={styles.skipButton}
                      onClick={() => handleSkip(skipGuide, setSkipGuide, setSelectedGuide)}
                    >
                      {skipGuide ? "Include" : "Skip"}
                    </button>
                  </div>
                  <div className={`${styles.cardsGrid} ${skipGuide ? styles.sectionDisabled : ""}`}>
                    {guideOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`${styles.card} ${selectedGuide === option.id ? styles.selectedCard : ""}`}
                        onClick={() => handleOptionSelect(option.id, selectedGuide, setSelectedGuide, skipGuide)}
                      >
                        <img
                          className={styles.cardImage}
                          alt={option.name}
                          src={option.image || "/placeholder.svg?height=200&width=300"}
                        />
                        <div className={styles.cardContent}>
                          <div className={styles.cardTitle}>{option.name}</div>
                          <div className={styles.cardDescription}>{option.description}</div>
                          <div className={styles.cardPrice}>৳{option.price}/day</div>
                          {selectedGuide === option.id && <span className={styles.selectedMark}>✔</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Confirm section */}
            <div className={styles.confirmSection}>
              <div className={styles.reviewText}>
                Review your package details and proceed to create your custom travel package.
              </div>
              <button
                className={styles.confirmPackage}
                onClick={handleCreatePackage}
                disabled={!isFormValid() || isCreatingPackage}
              >
                {isCreatingPackage ? "Creating Package..." : "Create Package"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreatePackage
