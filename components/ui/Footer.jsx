import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-100 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-semibold text-slate-800">MemoryPlate</h2>
            <p className="text-slate-600 max-w-xs">Čuvamo uspomene i slavimo živote vaših voljenih kroz inovativne digitalne spomenike.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold text-slate-800">Brzi linkovi</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-slate-600 hover:text-primary transition-colors">Moje Plocice</Link></li>
              <li><Link href="/order-now" className="text-slate-600 hover:text-primary transition-colors">Poruci</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-primary transition-colors">Kontakt</Link></li>
              <li><Link href="/faq" className="text-slate-600 hover:text-primary transition-colors">Česta pitanja</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold text-slate-800">Kontaktirajte nas</h3>
            <p className="text-slate-600">Bulevar Oslobođenja 123, 21000 Novi Sad</p>
            <p className="text-slate-600">+381 21 123 4567</p>
            <p className="text-slate-600">info@memoryplate.rs</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="mailto:info@memoryplate.rs" className="text-slate-400 hover:text-primary transition-colors">
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 sm:mb-0">&copy; 2024 MemoryPlate. Sva prava zadržana.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-slate-500 hover:text-primary text-sm transition-colors">Politika privatnosti</Link>
            <Link href="/terms" className="text-slate-500 hover:text-primary text-sm transition-colors">Uslovi korišćenja</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

