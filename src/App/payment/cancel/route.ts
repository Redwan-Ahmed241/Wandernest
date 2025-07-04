import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tran_id = formData.get("tran_id") as string

    // Extract booking ID from transaction ID
    const bookingId = tran_id?.split("_")[1]

    // Update booking status to cancelled
    // await updateBookingStatus(bookingId, 'cancelled', {
    //   transactionId: tran_id,
    //   reason: 'User cancelled payment'
    // })

    // Redirect to cancellation page
    const cancelUrl = new URL("/payment/cancelled", request.url)
    if (bookingId) {
      cancelUrl.searchParams.set("booking_id", bookingId)
    }

    return NextResponse.redirect(cancelUrl)
  } catch (error) {
    console.error("Payment cancel handler error:", error)
    return NextResponse.redirect(new URL("/flights", request.url))
  }
}
