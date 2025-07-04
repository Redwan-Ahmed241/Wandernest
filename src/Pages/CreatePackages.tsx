"use client"

import { type FunctionComponent, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../App/Layout"
import Sidebar from "./Sidebar"
import { packageAPI, type PackageOption, type CreatePackageData } from "../App/api"
import { useAuth } from "../Authentication/auth-context"

const CreatePackage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading } = useAuth()
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
        <div className="flex flex-row">
          <Sidebar />
          <div className="flex-grow flex items-center justify-center p-8">
            <div className="text-lg text-gray-600">Loading...</div>
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
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex-grow">
          <div className="w-full max-w-[1300px] mx-auto relative flex flex-col items-start justify-start text-left text-base text-[#1c170d] font-['Plus_Jakarta_Sans'] bg-white p-0 box-border rounded-none shadow-none min-h-screen">
            {/* Header Section */}
            <div className="w-full flex flex-col items-start pt-8 px-15 mb-6">
              <h1 className="text-[2.2rem] font-extrabold tracking-[-0.67px] leading-10 mb-7 mt-0 self-start">
                Create Your Custom Package
              </h1>

              {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-5 border border-red-200">{error}</div>}

              {/* Form Fields Container */}
              <div className="flex flex-col items-start gap-6 w-full px-15">
                {/* First Row - From and To */}
                <div className="flex flex-row gap-8 w-full max-w-[600px]">
                  <div className="flex flex-col items-start gap-1.5 flex-1 min-w-[160px]">
                    <label className="text-base font-semibold text-[#222] mb-0.5 ml-0.5">From *</label>
                    <input
                      className="w-full min-w-[200px] max-w-[300px] p-3 rounded-lg border border-[#e8decf] text-base bg-white mt-0 box-border"
                      type="text"
                      placeholder="Enter departure location"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1.5 flex-1 min-w-[160px]">
                    <label className="text-base font-semibold text-[#222] mb-0.5 ml-0.5">To *</label>
                    <input
                      className="w-full min-w-[200px] max-w-[300px] p-3 rounded-lg border border-[#e8decf] text-base bg-white mt-0 box-border"
                      type="text"
                      placeholder="Enter destination"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Second Row - Start Date and End Date */}
                <div className="flex flex-row gap-8 w-full max-w-[600px]">
                  <div className="flex flex-col items-start gap-1.5 flex-1 min-w-[160px] relative">
                    <label className="text-base font-semibold text-[#222] mb-0.5 ml-0.5">Start Date *</label>
                    <input
                      className="w-full min-w-[200px] max-w-[300px] p-3 rounded-lg border border-[#e8decf] text-base bg-white mt-0 box-border cursor-pointer"
                      type="text"
                      placeholder="Select start date"
                      value={startDate}
                      readOnly
                      onClick={() => setShowStartCalendar(!showStartCalendar)}
                      required
                    />
                    {showStartCalendar && (
                      <div className="absolute z-10 bg-white border border-[#e8decf] rounded-lg shadow-lg p-3 mt-2 top-full">
                        <div className="font-bold mb-2 text-center flex items-center justify-between">
                          <button
                            type="button"
                            onClick={handleStartPrevMonth}
                            className="bg-none border-none cursor-pointer text-xl p-1 px-2 rounded hover:bg-gray-100"
                          >
                            {"<"}
                          </button>
                          <span>
                            {new Date(startCalendarYear, startCalendarMonth).toLocaleString("default", {
                              month: "long",
                            })}{" "}
                            {startCalendarYear}
                          </span>
                          <button
                            type="button"
                            onClick={handleStartNextMonth}
                            className="bg-none border-none cursor-pointer text-xl p-1 px-2 rounded hover:bg-gray-100"
                          >
                            {">"}
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {getDaysArray(startCalendarYear, startCalendarMonth).map((day) => (
                            <div
                              key={day}
                              className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-green-100"
                              onClick={() => handleStartDateSelect(day)}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-1.5 flex-1 min-w-[160px] relative">
                    <label className="text-base font-semibold text-[#222] mb-0.5 ml-0.5">End Date *</label>
                    <input
                      className="w-full min-w-[200px] max-w-[300px] p-3 rounded-lg border border-[#e8decf] text-base bg-white mt-0 box-border cursor-pointer"
                      type="text"
                      placeholder="Select end date"
                      value={endDate}
                      readOnly
                      onClick={() => setShowEndCalendar(!showEndCalendar)}
                      required
                    />
                    {showEndCalendar && (
                      <div className="absolute z-10 bg-white border border-[#e8decf] rounded-lg shadow-lg p-3 mt-2 top-full">
                        <div className="font-bold mb-2 text-center flex items-center justify-between">
                          <button
                            type="button"
                            onClick={handleEndPrevMonth}
                            className="bg-none border-none cursor-pointer text-xl p-1 px-2 rounded hover:bg-gray-100"
                          >
                            {"<"}
                          </button>
                          <span>
                            {new Date(endCalendarYear, endCalendarMonth).toLocaleString("default", { month: "long" })}{" "}
                            {endCalendarYear}
                          </span>
                          <button
                            type="button"
                            onClick={handleEndNextMonth}
                            className="bg-none border-none cursor-pointer text-xl p-1 px-2 rounded hover:bg-gray-100"
                          >
                            {">"}
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {getDaysArray(endCalendarYear, endCalendarMonth).map((day) => (
                            <div
                              key={day}
                              className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-green-100"
                              onClick={() => handleEndDateSelect(day)}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Third Row - Travelers and Budget */}
                <div className="flex flex-row gap-8 w-full max-w-[600px]">
                  <div className="flex flex-col items-start gap-1.5 flex-1 min-w-[160px]">
                    <label className="text-base font-semibold text-[#222] mb-0.5 ml-0.5">Number of Travelers *</label>
                    <input
                      className="w-full min-w-[200px] max-w-[300px] p-3 rounded-lg border border-[#e8decf] text-base bg-white mt-0 box-border"
                      type="number"
                      min="1"
                      max="20"
                      placeholder="Enter number of travelers"
                      value={travelers}
                      onChange={(e) => setTravelers(Number.parseInt(e.target.value) || 1)}
                      required
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1.5 flex-1 min-w-[160px]">
                    <label className="text-base font-semibold text-[#222] mb-0.5 ml-0.5">Budget (BDT) *</label>
                    <input
                      className="w-full min-w-[200px] max-w-[300px] p-3 rounded-lg border border-[#e8decf] text-base bg-white mt-0 box-border"
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
              <div className="text-center py-15 px-5 text-gray-500 text-lg">
                <div>Loading package options...</div>
              </div>
            ) : (
              <>
                {/* Transport Section */}
                <div className="w-full mb-10 px-15 box-border">
                  <div className="flex flex-row items-center w-full mb-4.5 pl-0.5">
                    <span className="text-xl font-bold text-[#1c170d] mr-3 self-start">Select Transport</span>
                    <button
                      type="button"
                      className="ml-3 bg-green-100 text-green-700 border-none rounded-lg py-2 px-5 text-base font-semibold cursor-pointer mt-0 transition-colors hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                      onClick={() => handleSkip(skipTransport, setSkipTransport, setSelectedTransport)}
                    >
                      {skipTransport ? "Include" : "Skip"}
                    </button>
                  </div>
                  <div
                    className={`grid grid-cols-3 gap-5 w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 ${skipTransport ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    {transportOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`bg-gray-100 rounded-xl shadow-sm p-0 flex flex-col items-start cursor-pointer relative transition-all border-2 min-h-[280px] overflow-hidden ${
                          selectedTransport === option.id
                            ? "border-green-500 shadow-lg shadow-green-200"
                            : "border-transparent hover:shadow-md"
                        }`}
                        onClick={() =>
                          handleOptionSelect(option.id, selectedTransport, setSelectedTransport, skipTransport)
                        }
                      >
                        <img
                          className="w-full h-[220px] object-cover rounded-t-xl mb-0"
                          alt={option.name}
                          src={option.image || "/placeholder.svg?height=220&width=400"}
                        />
                        <div className="p-4 flex flex-col gap-1">
                          <h3 className="text-base font-semibold m-0 mb-1 text-[#1c170d]">{option.name}</h3>
                          <p className="text-sm text-gray-600 m-0 leading-relaxed mb-2">{option.description}</p>
                          <div className="font-bold text-green-600 mt-2 text-lg">৳{option.price}</div>
                        </div>
                        {selectedTransport === option.id && (
                          <span className="absolute top-2 right-3 text-green-500 text-2xl font-bold bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                            ✔
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotels Section */}
                <div className="w-full mb-10 px-15 box-border">
                  <div className="flex flex-row items-center w-full mb-4.5 pl-0.5">
                    <span className="text-xl font-bold text-[#1c170d] mr-3 self-start">Select Hotels</span>
                    <button
                      type="button"
                      className="ml-3 bg-green-100 text-green-700 border-none rounded-lg py-2 px-5 text-base font-semibold cursor-pointer mt-0 transition-colors hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                      onClick={() => handleSkip(skipHotel, setSkipHotel, setSelectedHotel)}
                    >
                      {skipHotel ? "Include" : "Skip"}
                    </button>
                  </div>
                  <div
                    className={`grid grid-cols-3 gap-5 w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 ${skipHotel ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    {hotelOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`bg-gray-100 rounded-xl shadow-sm p-0 flex flex-col items-start cursor-pointer relative transition-all border-2 min-h-[280px] overflow-hidden ${
                          selectedHotel === option.id
                            ? "border-green-500 shadow-lg shadow-green-200"
                            : "border-transparent hover:shadow-md"
                        }`}
                        onClick={() => handleOptionSelect(option.id, selectedHotel, setSelectedHotel, skipHotel)}
                      >
                        <img
                          className="w-full h-[220px] object-cover rounded-t-xl mb-0"
                          alt={option.name}
                          src={option.image || "/placeholder.svg?height=220&width=400"}
                        />
                        <div className="p-4 flex flex-col gap-1">
                          <h3 className="text-base font-semibold m-0 mb-1 text-[#1c170d]">{option.name}</h3>
                          <p className="text-sm text-gray-600 m-0 leading-relaxed mb-2">{option.description}</p>
                          <div className="font-bold text-green-600 mt-2 text-lg">৳{option.price}/night</div>
                        </div>
                        {selectedHotel === option.id && (
                          <span className="absolute top-2 right-3 text-green-500 text-2xl font-bold bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                            ✔
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vehicle Section */}
                <div className="w-full mb-10 px-15 box-border">
                  <div className="flex flex-row items-center w-full mb-4.5 pl-0.5">
                    <span className="text-xl font-bold text-[#1c170d] mr-3 self-start">Select Vehicle</span>
                    <button
                      type="button"
                      className="ml-3 bg-green-100 text-green-700 border-none rounded-lg py-2 px-5 text-base font-semibold cursor-pointer mt-0 transition-colors hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                      onClick={() => handleSkip(skipVehicle, setSkipVehicle, setSelectedVehicle)}
                    >
                      {skipVehicle ? "Include" : "Skip"}
                    </button>
                  </div>
                  <div
                    className={`grid grid-cols-3 gap-5 w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 ${skipVehicle ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    {vehicleOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`bg-gray-100 rounded-xl shadow-sm p-0 flex flex-col items-start cursor-pointer relative transition-all border-2 min-h-[280px] overflow-hidden ${
                          selectedVehicle === option.id
                            ? "border-green-500 shadow-lg shadow-green-200"
                            : "border-transparent hover:shadow-md"
                        }`}
                        onClick={() => handleOptionSelect(option.id, selectedVehicle, setSelectedVehicle, skipVehicle)}
                      >
                        <img
                          className="w-full h-[220px] object-cover rounded-t-xl mb-0"
                          alt={option.name}
                          src={option.image || "/placeholder.svg?height=220&width=400"}
                        />
                        <div className="p-4 flex flex-col gap-1">
                          <h3 className="text-base font-semibold m-0 mb-1 text-[#1c170d]">{option.name}</h3>
                          <p className="text-sm text-gray-600 m-0 leading-relaxed mb-2">{option.description}</p>
                          <div className="font-bold text-green-600 mt-2 text-lg">৳{option.price}/day</div>
                        </div>
                        {selectedVehicle === option.id && (
                          <span className="absolute top-2 right-3 text-green-500 text-2xl font-bold bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                            ✔
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guide Section */}
                <div className="w-full mb-10 px-15 box-border">
                  <div className="flex flex-row items-center w-full mb-4.5 pl-0.5">
                    <span className="text-xl font-bold text-[#1c170d] mr-3 self-start">Hire a Guide</span>
                    <button
                      type="button"
                      className="ml-3 bg-green-100 text-green-700 border-none rounded-lg py-2 px-5 text-base font-semibold cursor-pointer mt-0 transition-colors hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                      onClick={() => handleSkip(skipGuide, setSkipGuide, setSelectedGuide)}
                    >
                      {skipGuide ? "Include" : "Skip"}
                    </button>
                  </div>
                  <div
                    className={`grid grid-cols-3 gap-5 w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 ${skipGuide ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    {guideOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`bg-gray-100 rounded-xl shadow-sm p-0 flex flex-col items-start cursor-pointer relative transition-all border-2 min-h-[280px] overflow-hidden ${
                          selectedGuide === option.id
                            ? "border-green-500 shadow-lg shadow-green-200"
                            : "border-transparent hover:shadow-md"
                        }`}
                        onClick={() => handleOptionSelect(option.id, selectedGuide, setSelectedGuide, skipGuide)}
                      >
                        <img
                          className="w-full h-[220px] object-cover rounded-t-xl mb-0"
                          alt={option.name}
                          src={option.image || "/placeholder.svg?height=220&width=400"}
                        />
                        <div className="p-4 flex flex-col gap-1">
                          <h3 className="text-base font-semibold m-0 mb-1 text-[#1c170d]">{option.name}</h3>
                          <p className="text-sm text-gray-600 m-0 leading-relaxed mb-2">{option.description}</p>
                          <div className="font-bold text-green-600 mt-2 text-lg">৳{option.price}/day</div>
                        </div>
                        {selectedGuide === option.id && (
                          <span className="absolute top-2 right-3 text-green-500 text-2xl font-bold bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                            ✔
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Confirm section */}
            <div className="w-full flex flex-col items-center mt-8 mb-16 px-10">
              <div className="text-base text-gray-700 mb-4.5 text-center">
                Review your package details and proceed to create your custom travel package.
              </div>
              <button
                type="button"
                className="bg-green-700 text-white border-none rounded-lg py-3 px-9 text-lg font-bold cursor-pointer transition-colors hover:bg-green-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
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
