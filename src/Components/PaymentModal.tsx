"use client"

import { useState } from "react"
import { X, CreditCard, Smartphone, Building } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface PaymentModalProps {
  booking: {
    id: string
    flightNumber: string
    from: string
    to: string
    departure: string
    passengers: number
    totalAmount: number
    currency: string
    customerInfo: {
      name: string
      email: string
      phone: string
      address?: string
      city?: string
      country?: string
    }
  }
  onClose: () => void
  onPaymentInitiated: (paymentUrl: string) => void
}

export default function PaymentModal({ booking, onClose, onPaymentInitiated }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string>("")

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "mobile",
      name: "Mobile Banking",
      icon: Smartphone,
      description: "bKash, Rocket, Nagad",
    },
    {
      id: "bank",
      name: "Internet Banking",
      icon: Building,
      description: "All major banks in Bangladesh",
    },
  ]

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method")
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/payment/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: booking.id,
          amount: booking.totalAmount,
          currency: booking.currency,
          customerInfo: booking.customerInfo,
          flightInfo: {
            flightNumber: booking.flightNumber,
            from: booking.from,
            to: booking.to,
            departure: booking.departure,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to SSLCommerz payment page
        onPaymentInitiated(data.data.paymentUrl)
        window.location.href = data.data.paymentUrl
      } else {
        alert(data.error || "Payment initialization failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Failed to initialize payment. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Complete Payment</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Booking Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Flight:</span>
                <span>{booking.flightNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Route:</span>
                <span>
                  {booking.from} → {booking.to}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Passengers:</span>
                <span>{booking.passengers}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
                <span>Total:</span>
                <span>
                  {booking.currency} {booking.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold mb-3">Select Payment Method</h3>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center space-x-3">
                    <method.icon className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedMethod === method.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                      }`}
                    >
                      {selectedMethod === method.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="text-xs text-gray-500 bg-green-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Secured by SSLCommerz - Your payment information is encrypted and secure</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handlePayment} disabled={isProcessing || !selectedMethod} className="flex-1">
              {isProcessing ? "Processing..." : `Pay ${booking.currency} ${booking.totalAmount.toLocaleString()}`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
