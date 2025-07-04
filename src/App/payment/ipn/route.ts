import { type NextRequest, NextResponse } from "next/server"
import { sslcommerzService } from "@/lib/sslcommerz"

// IPN (Instant Payment Notification) handler
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const val_id = formData.get("val_id") as string
    const tran_id = formData.get("tran_id") as string
    const status = formData.get("status") as string

    if (!val_id || !tran_id) {
      return NextResponse.json({ status: "FAILED" }, { status: 400 })
    }

    // Validate payment
    const validation = await sslcommerzService.validatePayment(val_id)

    if (validation.status === "VALID" || validation.status === "VALIDATED") {
      const bookingId = tran_id.split("_")[1]

      // Update booking status in background
      // await updateBookingStatus(bookingId, 'confirmed', {
      //   paymentId: val_id,
      //   transactionId: tran_id,
      //   validatedAt: new Date().toISOString()
      // })

      // Send confirmation email
      // await sendBookingConfirmationEmail(bookingId)

      return NextResponse.json({ status: "OK" })
    } else {
      return NextResponse.json({ status: "FAILED" }, { status: 400 })
    }
  } catch (error) {
    console.error("IPN handler error:", error)
    return NextResponse.json({ status: "ERROR" }, { status: 500 })
  }
}
