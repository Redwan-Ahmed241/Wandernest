"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { XCircle, RefreshCw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("booking_id")
  const error = searchParams.get("error")

  const handleRetryPayment = () => {
    // Redirect back to booking with the same booking ID
    if (bookingId) {
      window.location.href = `/booking/${bookingId}/payment`
    } else {
      window.location.href = "/flights"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Error Header */}
        <div className="text-center mb-8">
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600">We couldn't process your payment</p>
        </div>

        {/* Error Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-red-600">What happened?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              {error || "Your payment could not be processed. This could be due to:"}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Insufficient funds in your account</li>
              <li>Card details entered incorrectly</li>
              <li>Network connectivity issues</li>
              <li>Bank security restrictions</li>
              <li>Card expired or blocked</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button onClick={handleRetryPayment} className="flex-1">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/flights" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Flights
            </Button>
          </Link>
        </div>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">If you continue to experience issues, please contact our support team:</p>
            <div className="space-y-2">
              <p>
                <strong>Phone:</strong> +880-1234-567890
              </p>
              <p>
                <strong>Email:</strong> support@wandernest.com
              </p>
              <p>
                <strong>Hours:</strong> 24/7 Customer Support
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
