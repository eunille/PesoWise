'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Check } from 'lucide-react'

export function EmailSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter your email')
      return
    }

    setLoading(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing! Check your email soon.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again later.')
      console.error('Subscription error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {status === 'success' ? (
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <div className="flex justify-center mb-2">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm font-medium text-green-900">{message}</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="rounded-lg"
              />
              <Button
                type="submit"
                disabled={loading}
                className="rounded-lg"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            {status === 'error' && (
              <p className="text-xs text-red-600">{message}</p>
            )}
            <p className="text-xs text-black/60">
              Get interest rate updates and savings tips. Unsubscribe anytime.
            </p>
          </form>
        </>
      )}
    </div>
  )
}
