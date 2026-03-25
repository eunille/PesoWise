import nodemailer from 'nodemailer'

const EMAIL_USER = process.env.GMAIL_USER
const EMAIL_PASSWORD = process.env.GMAIL_APP_PASSWORD

if (!EMAIL_USER || !EMAIL_PASSWORD) {
  console.warn('Gmail credentials not configured. Email service will not work.')
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

export async function sendEmail(options: EmailOptions) {
  if (!EMAIL_USER || !EMAIL_PASSWORD) {
    throw new Error('Email service not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local')
  }

  try {
    const result = await transporter.sendMail({
      from: `PesoWise <${EMAIL_USER}>`,
      ...options,
    })
    return result
  } catch (error) {
    console.error('Email send error:', error)
    throw error
  }
}

export function createWelcomeEmail(email: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 40px 20px; text-align: center; }
        .header-content { max-width: 600px; margin: 0 auto; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 5px; }
        .company { font-size: 12px; opacity: 0.9; letter-spacing: 1px; }
        .content { padding: 40px 30px; }
        .welcome-title { font-size: 24px; font-weight: 600; color: #000; margin-bottom: 15px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 16px; font-weight: 600; color: #2563eb; margin-bottom: 12px; }
        .feature-list { list-style: none; padding: 0; }
        .feature-list li { padding: 8px 0; padding-left: 28px; position: relative; font-size: 14px; }
        .feature-list li:before { content: "✓"; position: absolute; left: 0; color: #16a34a; font-weight: bold; }
        .cta-button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 500; margin-top: 15px; }
        .divider { border-top: 1px solid #e5e7eb; margin: 30px 0; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; font-size: 12px; color: #666; }
        .footer-links { margin-bottom: 15px; }
        .footer-links a { color: #2563eb; text-decoration: none; margin: 0 10px; display: inline-block; }
        .highlight { background: #f0f9ff; padding: 20px; border-left: 4px solid #2563eb; border-radius: 4px; margin: 20px 0; }
        .highlight p { margin: 0; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-content">
            <div class="logo">PesoWise 🎉</div>
            <div class="company">by Catalyx Solutions</div>
          </div>
        </div>

        <!-- Content -->
        <div class="content">
          <p style="margin: 0 0 20px 0; color: #666;">Hello,</p>
          
          <h1 class="welcome-title">Welcome to PesoWise!</h1>
          <p style="font-size: 16px; color: #555; margin: 15px 0;">
            Thank you for joining our community of smart savers. You're now in the right place to compare savings rates and grow your money wisely.
          </p>

          <!-- What's Next Section -->
          <div class="section">
            <h2 class="section-title">What's Next?</h2>
            <ul class="feature-list">
              <li>Explore the interactive Savings Calculator</li>
              <li>Compare rates across 5 major Philippine banks</li>
              <li>Receive monthly interest rate updates</li>
              <li>Get personalized saving tips & strategies</li>
              <li>Discover how to maximize your savings</li>
            </ul>
          </div>

          <!-- Highlight Box -->
          <div class="highlight">
            <p style="font-weight: 600; color: #2563eb; margin-bottom: 8px;">🚀 Get Started Now</p>
            <p>Visit our Savings Calculator to see how your money can grow with different platforms and timeframes.</p>
            <a href="https://pesowise.ph/calculator" class="cta-button">Open Calculator</a>
          </div>

          <!-- Why You'll Love It -->
          <div class="section">
            <h2 class="section-title">Why You'll Love PesoWise</h2>
            <ul class="feature-list">
              <li><strong>No signup required</strong> - Start comparing instantly</li>
              <li><strong>Transparent calculations</strong> - See exactly how interest works</li>
              <li><strong>Real data</strong> - Based on actual current rates</li>
              <li><strong>Mobile-friendly</strong> - Access anytime, anywhere</li>
              <li><strong>100% free</strong> - No hidden fees or charges</li>
            </ul>
          </div>

          <div class="divider"></div>

          <p style="font-size: 14px; color: #666;">
            We'll send you updates when interest rates change and share helpful tips to improve your savings. You can unsubscribe at any time.
          </p>
          <p style="font-size: 14px; color: #666;">
            Questions? Reply to this email or visit us at pesowise.ph
          </p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-links">
            <a href="https://pesowise.ph">Visit PesoWise</a>
            <a href="https://pesowise.ph/calculator">Calculator</a>
            <a href="mailto:support@pesowise.ph">Support</a>
          </div>
          <p style="margin: 15px 0 0 0;">
            © 2025 PesoWise by Catalyx Solutions. Compare Smart, Save Better.
          </p>
          <p style="margin: 5px 0 0 0; font-size: 11px;">
            You received this email because you subscribed to PesoWise newsletter.
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Welcome to PesoWise!

Hello,

Thank you for joining our community of smart savers. You're now in the right place to compare savings rates and grow your money wisely.

What's Next?
============
• Explore the interactive Savings Calculator
• Compare rates across 5 major Philippine banks
• Receive monthly interest rate updates
• Get personalized saving tips & strategies
• Discover how to maximize your savings

Visit our Savings Calculator: https://pesowise.ph/calculator

See how your money can grow with different platforms and timeframes.

Why You'll Love PesoWise
========================
• No signup required - Start comparing instantly
• Transparent calculations - See exactly how interest works
• Real data - Based on actual current rates
• Mobile-friendly - Access anytime, anywhere
• 100% free - No hidden fees or charges

---

We'll send you updates when interest rates change and share helpful tips to improve your savings. 
You can unsubscribe at any time.

Questions? Reply to this email or visit us at pesowise.ph

---
© 2025 PesoWise by Catalyx Solutions
Compare Smart, Save Better ✨

Visit: https://pesowise.ph
Support: support@pesowise.ph
  `

  return {
    to: email,
    subject: '🎉 Welcome to PesoWise - Start Comparing Savings Today!',
    html,
    text,
  }
}
