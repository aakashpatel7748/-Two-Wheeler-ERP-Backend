import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t bg-white text-gray-700 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h1 className="text-lg font-semibold mb-2">Two-Wheeler ERP</h1>
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-600">Features</Link></li>
            <li><Link to="/" className="hover:text-blue-600">Pricing</Link></li>
            <li><Link to="/" className="hover:text-blue-600">Affiliate Program</Link></li>
            <li><Link to="/" className="hover:text-blue-600">Press Kit</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-600">Account</Link></li>
            <li><Link to="/" className="hover:text-blue-600">Help</Link></li>
            <li><Link to="/" className="hover:text-blue-600">Contact Us</Link></li>
            <li><Link to="/" className="hover:text-blue-600">Customer Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-600">Terms & Conditions</Link></li>
            <li><Link to="/" className="hover:text-blue-600">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-blue-600">Licensing</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer