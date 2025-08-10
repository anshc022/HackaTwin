"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "shadow-md backdrop-blur-md bg-white/80 dark:bg-black/80" 
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative flex overflow-hidden">
            <span className="text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:-translate-y-full">
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Hacka</span>
              <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Twin</span>
            </span>
            <span className="absolute top-0 text-2xl font-bold tracking-tight translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">Hacka</span>
              <span className="bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">Twin</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How It Works" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "#contact", label: "Contact" }
          ].map((item) => (
            <a 
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-gray-700 transition-colors dark:text-gray-300"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <Link
            href="/dashboard"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-500/25"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-r from-blue-600 to-purple-500 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="mr-3 rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <div className="relative h-5 w-5">
              <span className={`absolute block h-0.5 w-5 transform bg-current transition duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
              <span className={`absolute block h-0.5 w-5 bg-current transition duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`absolute block h-0.5 w-5 transform bg-current transition duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
            </div>
          </button>
          
          <Link
            href="/dashboard"
            className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div 
        className={`absolute inset-x-0 top-full h-screen bg-white/95 px-6 py-4 shadow-lg transition-all duration-300 ease-in-out dark:bg-black/95 md:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-6 pt-4">
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How It Works" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "#contact", label: "Contact" }
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-gray-100 pb-4 text-lg font-medium text-gray-900 dark:border-gray-800 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
