import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tran_id = formData.get("tran_id") as string
    const error = formData.get("error") as string

    // Extract booking ID from transaction ID
    const bookingId = tran_id?.split("_")[1]

    // Update booking status to failed
    // await updateBookingStatus(bookingId, 'failed', {
    //   error: error,
    //   transactionId: tran_id
    // })

    // Redirect to failure page
    const failUrl = new URL("/payment/failed", request.url)
    if (bookingId) {
      failUrl.searchParams.set("booking_id", bookingId)
    }
    failUrl.searchParams.set("error", error || "Payment failed")

    return NextResponse.redirect(failUrl)
  } catch (error) {
    console.error("Payment fail handler error:", error)
    return NextResponse.redirect(new URL("/payment/failed", request.url))
  }
}
