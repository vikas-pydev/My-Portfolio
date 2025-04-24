import { NextResponse } from "next/server"
import { sendNotifications, type ContactFormData } from "@/lib/notification-service"

export async function POST(request: Request) {
  try {
    const formData: ContactFormData = await request.json()

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Send notifications (email and SMS)
    const result = await sendNotifications(formData)

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in contact API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
