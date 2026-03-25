import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createWelcomeEmail } from '@/services/emailService'
import fs from 'fs'
import path from 'path'

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json')

interface SubscriberData {
  email: string
  subscribedAt: string
}

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(SUBSCRIBERS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Get all subscribers
function getSubscribers(): SubscriberData[] {
  ensureDataDir()
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading subscribers file:', error)
  }
  return []
}

// Save subscribers to file
function saveSubscribers(subscribers: SubscriberData[]) {
  ensureDataDir()
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf-8')
}

// Add subscriber
function addSubscriber(email: string): boolean {
  const subscribers = getSubscribers()
  
  // Check if already subscribed
  const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase())
  if (existing) {
    return false // Already subscribed
  }

  subscribers.push({
    email: email.toLowerCase(),
    subscribedAt: new Date().toISOString(),
  })

  saveSubscribers(subscribers)
  return true
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const subscribers = getSubscribers()
    const exists = subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())
    
    if (exists) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      )
    }

    // Add subscriber
    const added = addSubscriber(email)

    if (!added) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      )
    }

    // Send welcome email
    try {
      const welcomeEmail = createWelcomeEmail(email)
      await sendEmail(welcomeEmail)
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      // Don't fail the subscription if email send fails
      // User is still subscribed, they just won't get the welcome email
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed! Check your email for confirmation.',
        email,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in subscribe endpoint:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return subscriber count (for analytics)
  const subscribers = getSubscribers()
  return NextResponse.json({
    count: subscribers.length,
    message: 'Use POST to subscribe',
  })
}
