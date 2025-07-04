import { type NextRequest, NextResponse } from "next/server"
import { sslcommerzService } from "@/lib/sslcommerz"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, amount, currency, customerInfo, flightInfo } = body

    // Validate required fields
    if (!bookingId || !amount || !customerInfo) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const transactionId = sslcommerzService.generateTransactionId(bookingId)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const paymentData = {
      total_amount: amount,
      currency: currency || "BDT",
      tran_id: transactionId,
      success_url: `${baseUrl}/api/payment/success`,
      fail_url: `${baseUrl}/api/payment/fail`,
      cancel_url: `${baseUrl}/api/payment/cancel`,
      ipn_url: `${baseUrl}/api/payment/ipn`,

      // Customer information
      cus_name: customerInfo.name,
      cus_email: customerInfo.email,
      cus_add1: customerInfo.address || "Dhaka",
      cus_city: customerInfo.city || "Dhaka",
      cus_country: customerInfo.country || "Bangladesh",
      cus_phone: customerInfo.phone,

      // Product information
      product_name: `Flight Booking - ${flightInfo?.flightNumber || "Flight"}`,
      product_category: "Travel",
      product_profile: "airline-ticket",

      // Optional shipping info (can be same as customer info for digital products)
      shipping_method: "NO",
      num_of_item: 1,
      ship_name: customerInfo.name,
      ship_add1: customerInfo.address || "Dhaka",
      ship_city: customerInfo.city || "Dhaka",
      ship_country: customerInfo.country || "Bangladesh",
    }

    const sslResponse = await sslcommerzService.initPayment(paymentData)

    if (sslResponse.status === "SUCCESS") {
      // Store transaction info in database (you'll need to implement this)
      // await storeTransactionInfo(bookingId, transactionId, sslResponse.sessionkey)

      return NextResponse.json({
        success: true,
        data: {
          sessionkey: sslResponse.sessionkey,
          paymentUrl: sslResponse.GatewayPageURL,
          transactionId: transactionId,
        },
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: sslResponse.failedreason || "Payment initialization failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Payment initialization error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
