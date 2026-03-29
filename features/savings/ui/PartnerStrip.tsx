'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface Partner {
  name: string
  logo: string
  width: number
  height: number
}

const PARTNERS: Partner[] = [
  {
    name: 'GCash',
    logo: '/images/gcash-logo-png_seeklogo-498022.webp',
    width: 120,
    height: 80,
  },
  {
    name: 'GoTyme',
    logo: '/images/gotyme.webp',
    width: 140,
    height: 60,
  },
  {
    name: 'Maya',
    logo: '/images/maya-logo_brandlogos.net_y6kkp-512x512.webp',
    width: 120,
    height: 120,
  },
  {
    name: 'MariBank',
    logo: '/images/maribank-logo_brandlogos.net_fuwzy-512x110.webp',
    width: 160,
    height: 60,
  },
  {
    name: 'Tonik',
    logo: '/images/tonikwebp.webp',
    width: 150,
    height: 60,
  },
]

export function PartnerStrip() {
  // Triple the array for seamless infinite loop
  const triplePartners = [...PARTNERS, ...PARTNERS, ...PARTNERS]
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create a smooth scrolling animation using transform
    let animationFrameId: number
    let currentX = 0
    const speed = 0.5 // pixels per frame

    const animate = () => {
      currentX -= speed

      // Seamless loop: when it reaches -1/3, reset to 0 (one full set of 5 logos)
      if (currentX <= -600) {
        currentX = 0
      }

      container.style.transform = `translateX(${currentX}px)`
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <section id="platforms" className="border-y border-blue-100 bg-white">
      <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 overflow-hidden">
        {/* Infinite Scroll Carousel with requestAnimationFrame for smooth loop */}
        <div className="relative h-24 sm:h-28 lg:h-32 overflow-hidden">
          <motion.div
            ref={containerRef}
            className="flex gap-12 sm:gap-16 lg:gap-20 items-center"
            onHoverStart={() => {
              // Optional: pause on hover
            }}
          >
            {triplePartners.map((partner, idx) => (
              <motion.div
                key={`${partner.name}-${idx}`}
                className="flex-shrink-0 h-24 w-32 sm:h-28 sm:w-40 lg:h-32 lg:w-48 relative flex items-center justify-center cursor-pointer"
                whileHover={{ 
                  scale: 1.1,
                  filter: 'brightness(1.1)',
                  zIndex: 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
