"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentCancelledPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("booking_id")

  const handleRetryPayment = () => {
    if (bookingId) {
      window.location.href = `/booking/${bookingId}/payment`
    } else {
      window.location.href = "/flights"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Cancelled Header */}
        <div className="text-center mb-8">
          <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600">You cancelled the payment process</p>
        </div>

        {/* Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">Your booking is still reserved for a limited time. You can:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Complete the payment to confirm your booking</li>
              <li>Search for other flights</li>
              <li>Contact our support team for assistance</li>
            </ul>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> Your booking will be automatically cancelled if payment is not completed within
                30 minutes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button onClick={handleRetryPayment} className="flex-1">
            <RefreshCw className="w-4 h-4 mr-2" />
            Complete Payment
          </Button>
          <Link href="/flights" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Search New Flights
            </Button>
          </Link>
        </div>

        {/* Support Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need Assistance?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Our customer support team is here to help you complete your booking.</p>
            <div className="space-y-2">
              <p>
                <strong>Phone:</strong> +880-1234-567890
              </p>
              <p>
                <strong>Email:</strong> support@wandernest.com
              </p>
              <p>
                <strong>Live Chat:</strong> Available 24/7
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
