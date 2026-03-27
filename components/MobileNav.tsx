'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#platforms', label: 'Platforms' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/education', label: 'Education' },
] as const

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </Button>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={closeMenu}
          aria-disabled={true}
        />
      )}

      {/* Mobile Menu - Bottom Sheet Drawer */}
      <div
        className="fixed left-0 right-0 z-40 bg-white rounded-t-2xl shadow-2xl transition-all duration-300 ease-out md:hidden"
        style={{
          bottom: isOpen ? '0px' : 'calc(-100% - 20px)',
        }}
      >
        {/* Drag handle indicator */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-12 rounded-full bg-gray-300" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col px-4 py-6 pb-8 safe-area-inset-bottom">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="px-4 py-4 text-lg font-medium text-black/80 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
