"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("booking_id")
  const transactionId = searchParams.get("transaction_id")

  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (bookingId) {
      // Fetch booking details
      fetchBookingDetails(bookingId)
    }
  }, [bookingId])

  const fetchBookingDetails = async (id: string) => {
    try {
      // Replace with your actual API call
      // const response = await fetch(`/api/bookings/${id}`)
      // const data = await response.json()
      // setBookingDetails(data)

      // Mock data for now
      setBookingDetails({
        confirmationCode: "WN12345",
        flightNumber: "BG-101",
        from: "Dhaka",
        to: "Chittagong",
        departure: "2025-01-15T10:00:00Z",
        passengers: 1,
        totalAmount: 15000,
        currency: "BDT",
      })
    } catch (error) {
      console.error("Failed to fetch booking details:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadTicket = () => {
    // Implement ticket download
    console.log("Downloading ticket...")
  }

  const handleEmailTicket = () => {
    // Implement email ticket
    console.log("Emailing ticket...")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your flight has been booked successfully</p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Booking Confirmation</span>
              <span className="text-lg font-mono text-green-600">{bookingDetails?.confirmationCode}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Flight</p>
                <p className="font-semibold">{bookingDetails?.flightNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-semibold">
                  {bookingDetails?.from} → {bookingDetails?.to}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Departure</p>
                <p className="font-semibold">
                  {bookingDetails?.departure && new Date(bookingDetails.departure).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Passengers</p>
                <p className="font-semibold">{bookingDetails?.passengers}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Paid</span>
                <span className="text-xl font-bold text-green-600">
                  {bookingDetails?.currency} {bookingDetails?.totalAmount?.toLocaleString()}
                </span>
              </div>
            </div>

            {transactionId && (
              <div className="text-sm text-gray-600">
                <p>
                  Transaction ID: <span className="font-mono">{transactionId}</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button onClick={handleDownloadTicket} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download Ticket
          </Button>
          <Button variant="outline" onClick={handleEmailTicket} className="flex-1 bg-transparent">
            <Mail className="w-4 h-4 mr-2" />
            Email Ticket
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="outline">View My Bookings</Button>
            </Link>
            <Link href="/flights">
              <Button variant="outline">Book Another Flight</Button>
            </Link>
          </div>

          <p className="text-sm text-gray-600">A confirmation email has been sent to your registered email address.</p>
        </div>
      </div>
    </div>
  )
}
