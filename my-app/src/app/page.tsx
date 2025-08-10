import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import HeroBackground from "@/components/HeroBackground";
import { FiCpu, FiRadio, FiUsers, FiShare2 } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
      <Navbar />

      {/* Hero Section with single highly visible AI background */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
        {/* AI neural network pattern background */}
        <HeroBackground />

        {/* Hero content with enhanced contrast */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center backdrop-blur-[2px] bg-white/10 dark:bg-black/10 p-6 rounded-2xl">
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              HackaTwin – Your AI Co-Organizer for Hackathons
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-gray-800 dark:text-gray-200">
              Runs your hackathon while you hack the future.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:mt-12 sm:flex-row">
              <Link
                href="/dashboard"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 text-base font-medium text-white shadow-md transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10 flex items-center">
                  Try Live Demo
                  <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
              <a
                href="#features"
                className="group inline-flex items-center justify-center rounded-lg bg-white/90 px-8 py-3 text-base font-medium text-blue-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-indigo-600 hover:shadow-md dark:bg-black/70 dark:text-blue-400 dark:hover:bg-black/90"
              >
                Learn More
                <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-[-2px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="flex flex-col items-center">
          <span className="mb-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">Features</span>
          <h2 className="bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-white dark:to-gray-300 sm:text-4xl">
            Everything You Need
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
            Automate the boring parts. Empower your community.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<FiCpu size={24} />}
            title="Jury & Speaker Automation"
            description="Auto-manage outreach, scheduling, and reminders for judges and speakers."
          />
          <FeatureCard
            icon={<FiRadio size={24} />}
            title="Slack & Discord Announcements"
            description="Send timely, multi-channel updates without manual effort."
          />
          <FeatureCard
            icon={<FiUsers size={24} />}
            title="Community Growth Tools"
            description="Convert attendees into an active, growing community."
          />
          <FeatureCard
            icon={<FiShare2 size={24} />}
            title="Multi-channel AI Operations"
            description="Coordinate emails, messages, and posts across platforms with AI."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gradient-to-b from-white to-gray-50 py-28 dark:from-black dark:to-gray-900/40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col items-center">
            <span className="mb-2 rounded-full bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">Process</span>
            <h2 className="bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-white dark:to-gray-300 sm:text-4xl">
              How It Works
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
          </div>
          
          {/* Timeline connector for desktop */}
          <div className="relative mt-24">
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 to-purple-500 md:block"></div>
            
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Connect Airtable & Slack",
                  desc: "Plug in your data and channels in minutes. Our secure API connects to your existing tools with zero friction.",
                  color: "from-blue-500 to-blue-600",
                  icon: "🔗"
                },
                {
                  number: "02",
                  title: "Automate Invitations & Announcements",
                  desc: "Schedule outreach and updates across channels. Set it up once and let AI handle the rest.",
                  color: "from-purple-500 to-purple-600",
                  icon: "📣"
                },
                {
                  number: "03",
                  title: "Track Metrics & Grow Community",
                  desc: "Measure engagement and iterate quickly. Turn insights into actions that build a thriving community.",
                  color: "from-indigo-500 to-indigo-600",
                  icon: "📈"
                },
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Circle connector for desktop */}
                  <div className="absolute left-1/2 top-0 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-500 md:flex md:items-center md:justify-center">
                    <span className="text-lg font-bold text-white">{i + 1}</span>
                  </div>
                  
                  <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                    <div className="mb-4 flex items-center gap-4">
                      <span className={`grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br ${step.color} text-2xl text-white md:hidden`}>
                        {step.icon}
                      </span>
                      <div className="hidden h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 text-2xl text-gray-400 dark:from-gray-800 dark:to-gray-900 md:flex">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section className="relative overflow-hidden px-6 py-28 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white dark:from-black"></div>
        </div>
        
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl">
          <div className="relative">
            {/* Abstract design elements */}
            <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-purple-500/20 blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 items-center gap-10 px-6 py-16 sm:py-20 md:grid-cols-5 md:gap-16 md:px-16">
              <div className="text-center md:col-span-3 md:text-left">
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  See HackaTwin <span className="relative">in Action<span className="absolute -bottom-1 left-0 h-1 w-full bg-white/40"></span></span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:mx-0">
                  Explore the live demo and imagine your next event—automated, streamlined, and effortlessly professional.
                </p>
                <div className="mt-10">
                  <Link
                    href="/demo"
                    className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-md transition-all hover:shadow-lg hover:shadow-blue-800/20"
                  >
                    <span>Open Demo</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Demo preview mockup */}
              <div className="md:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg border-4 border-white/20 bg-white/10 shadow-xl">
                  <div className="relative h-full w-full">
                    {/* Browser mockup chrome */}
                    <div className="flex h-8 items-center gap-1 bg-gray-900/50 px-3">
                      <div className="h-2 w-2 rounded-full bg-red-400"></div>
                      <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    </div>
                    {/* Placeholder content */}
                    <div className="grid h-[calc(100%-2rem)] place-items-center bg-white/10">
                      <div className="flex flex-col items-center gap-2 text-white/80">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-12 w-12 text-white/70"
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Interactive Demo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Anchor */}
      <div id="contact" className="sr-only" aria-hidden />

      <Footer />
    </div>
  );
}
