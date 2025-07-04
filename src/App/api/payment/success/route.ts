import { type NextRequest, NextResponse } from "next/server"
import { sslcommerzService } from "@/lib/sslcommerz"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const val_id = formData.get("val_id") as string
    const tran_id = formData.get("tran_id") as string
    const amount = formData.get("amount") as string
    const card_type = formData.get("card_type") as string
    const store_amount = formData.get("store_amount") as string
    const bank_tran_id = formData.get("bank_tran_id") as string
    const status = formData.get("status") as string

    if (!val_id || !tran_id) {
      return NextResponse.redirect(new URL("/payment/failed", request.url))
    }

    // Validate payment with SSLCommerz
    const validation = await sslcommerzService.validatePayment(val_id)

    if (validation.status === "VALID" || validation.status === "VALIDATED") {
      // Extract booking ID from transaction ID
      const bookingId = tran_id.split("_")[1]

      // Update booking status to confirmed
      // await updateBookingStatus(bookingId, 'confirmed', {
      //   paymentId: val_id,
      //   transactionId: tran_id,
      //   amount: parseFloat(amount),
      //   cardType: card_type,
      //   bankTransactionId: bank_tran_id
      // })

      // Redirect to success page with booking details
      const successUrl = new URL("/payment/success", request.url)
      successUrl.searchParams.set("booking_id", bookingId)
      successUrl.searchParams.set("transaction_id", tran_id)

      return NextResponse.redirect(successUrl)
    } else {
      // Payment validation failed
      console.error("Payment validation failed:", validation)
      return NextResponse.redirect(new URL("/payment/failed", request.url))
    }
  } catch (error) {
    console.error("Payment success handler error:", error)
    return NextResponse.redirect(new URL("/payment/failed", request.url))
  }
}
