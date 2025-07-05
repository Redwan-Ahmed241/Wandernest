"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface PackageOption {
  id: number
  name: string
}

interface CreatePackageData {
  title: string
  from_location: string
  to_location: string
  start_date: Date | null
  end_date: Date | null
  travelers_count: number
  budget: number
  transport_id: number | null
  hotel_id: number | null
  guide_id: number | null
  preferences: {
    skip_transport: boolean
    skip_hotel: boolean
    skip_vehicle: boolean
    skip_guide: boolean
  }
}

const CreatePackages: React.FC = () => {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [travelers, setTravelers] = useState<number>(1)
  const [budget, setBudget] = useState<string>("")

  const [transportOptions, setTransportOptions] = useState<PackageOption[]>([])
  const [hotelOptions, setHotelOptions] = useState<PackageOption[]>([])
  const [guideOptions, setGuideOptions] = useState<PackageOption[]>([])

  const [selectedTransport, setSelectedTransport] = useState<number | null>(null)
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null)
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null)

  const [skipTransport, setSkipTransport] = useState(false)
  const [skipHotel, setSkipHotel] = useState(false)
  const [skipGuide, setSkipGuide] = useState(false)

  const [isLoadingOptions, setIsLoadingOptions] = useState(false)
  const [isCreatingPackage, setIsCreatingPackage] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchPackageOptions()
  }, [])

  const fetchPackageOptions = async () => {
    try {
      setIsLoadingOptions(true)
      setError(null)

      const token = localStorage.getItem("token")
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Token ${token}` }),
      }

      const [transport, hotels, guides] = await Promise.all([
        fetch("https://wander-nest-ad3s.onrender.com/api/packages/api/packages/transport-options/", { headers }),
        fetch("https://wander-nest-ad3s.onrender.com/api/packages/api/packages/create/hotel-options/", { headers }),
        fetch("https://wander-nest-ad3s.onrender.com/api/packages/api/packages/guide-options/", { headers }),
      ])

      const transportData = await transport.json()
      const hotelsData = await hotels.json()
      const guidesData = await guides.json()

      setTransportOptions(transportData.results || transportData)
      setHotelOptions(hotelsData.results || hotelsData)
      setGuideOptions(guidesData.results || guidesData)
    } catch (error) {
      console.error("Error fetching package options:", error)
      setError("Failed to load package options")
    } finally {
      setIsLoadingOptions(false)
    }
  }

  const isFormValid = (): boolean => {
    if (!from || !to || !startDate || !endDate || !travelers || !budget) {
      return false
    }

    if (startDate >= endDate) {
      return false
    }

    return true
  }

  const handleCreatePackage = async () => {
    if (!isFormValid()) {
      alert("Please fill in all required fields and ensure dates are valid.")
      return
    }

    try {
      setIsCreatingPackage(true)
      setError(null)

      const token = localStorage.getItem("token")
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
        guide_id: skipGuide ? null : selectedGuide,
        preferences: {
          skip_transport: skipTransport,
          skip_hotel: skipHotel,
          skip_vehicle: false,
          skip_guide: skipGuide,
        },
      }

      const response = await fetch("https://wander-nest-ad3s.onrender.com/api/packages/api/packages/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(packageData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const createdPackage = await response.json()
      navigate(`/package/${createdPackage.id}`)
    } catch (error) {
      console.error("Error creating package:", error)
      setError("Failed to create package. Please try again.")
    } finally {
      setIsCreatingPackage(false)
    }
  }

  return (
    <div className="container mt-5">
      <h1>Create Your Package</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="from" className="form-label">
          From:
        </label>
        <input type="text" className="form-control" id="from" value={from} onChange={(e) => setFrom(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="to" className="form-label">
          To:
        </label>
        <input type="text" className="form-control" id="to" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Start Date:</label>
        <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">End Date:</label>
        <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor="travelers" className="form-label">
          Number of Travelers:
        </label>
        <input
          type="number"
          className="form-control"
          id="travelers"
          value={travelers}
          onChange={(e) => setTravelers(Number.parseInt(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="budget" className="form-label">
          Budget:
        </label>
        <input
          type="number"
          className="form-control"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="skipTransport"
          checked={skipTransport}
          onChange={() => setSkipTransport(!skipTransport)}
        />
        <label className="form-check-label" htmlFor="skipTransport">
          Skip Transport
        </label>
      </div>

      {!skipTransport && (
        <div className="mb-3">
          <label htmlFor="transport" className="form-label">
            Select Transport:
          </label>
          <select
            className="form-select"
            id="transport"
            value={selectedTransport || ""}
            onChange={(e) => setSelectedTransport(Number.parseInt(e.target.value))}
          >
            <option value="">-- Select Transport --</option>
            {transportOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="skipHotel"
          checked={skipHotel}
          onChange={() => setSkipHotel(!skipHotel)}
        />
        <label className="form-check-label" htmlFor="skipHotel">
          Skip Hotel
        </label>
      </div>

      {!skipHotel && (
        <div className="mb-3">
          <label htmlFor="hotel" className="form-label">
            Select Hotel:
          </label>
          <select
            className="form-select"
            id="hotel"
            value={selectedHotel || ""}
            onChange={(e) => setSelectedHotel(Number.parseInt(e.target.value))}
          >
            <option value="">-- Select Hotel --</option>
            {hotelOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="skipGuide"
          checked={skipGuide}
          onChange={() => setSkipGuide(!skipGuide)}
        />
        <label className="form-check-label" htmlFor="skipGuide">
          Skip Guide
        </label>
      </div>

      {!skipGuide && (
        <div className="mb-3">
          <label htmlFor="guide" className="form-label">
            Select Guide:
          </label>
          <select
            className="form-select"
            id="guide"
            value={selectedGuide || ""}
            onChange={(e) => setSelectedGuide(Number.parseInt(e.target.value))}
          >
            <option value="">-- Select Guide --</option>
            {guideOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button className="btn btn-primary" onClick={handleCreatePackage} disabled={isCreatingPackage}>
        {isCreatingPackage ? "Creating..." : "Create Package"}
      </button>

      {isLoadingOptions && <p>Loading options...</p>}
    </div>
  )
}

export default CreatePackages
