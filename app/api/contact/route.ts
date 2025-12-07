import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Input validation
function validateContactForm(data: unknown): {
  name: string
  email: string
  message: string
} {
  const obj = data as Record<string, unknown>

  if (typeof obj.name !== "string" || obj.name.trim().length === 0) {
    throw new Error("Name is required")
  }

  if (typeof obj.email !== "string" || !isValidEmail(obj.email)) {
    throw new Error("Valid email is required")
  }

  if (typeof obj.message !== "string" || obj.message.trim().length === 0) {
    throw new Error("Message is required")
  }

  if (obj.message.trim().length < 10) {
    throw new Error("Message must be at least 10 characters")
  }

  return {
    name: obj.name.trim(),
    email: obj.email.trim(),
    message: obj.message.trim(),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received form submission:", { name: body.name, email: body.email })

    // Validate input
    const { name, email, message } = validateContactForm(body)

    const { db } = await connectToDatabase()
    const collection = db.collection("contacts")

    // Insert contact submission
    const result = await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
      read: false,
    })

    console.log("Message saved with ID:", result.insertedId)

    return NextResponse.json(
      {
        success: true,
        message: "Message received! I'll get back to you soon.",
        id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }

    return NextResponse.json(
      { success: false, message: "An error occurred while processing your message" },
      { status: 500 },
    )
  }
}
