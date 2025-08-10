import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
      <Navbar />
      
      <main>
        {/* Page header with gradient background */}
        <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-16 dark:from-blue-950/30 dark:to-black sm:py-24">
          <div className="absolute inset-0 -z-10 opacity-30">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="demo-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#6366f1" strokeOpacity="0.08" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#demo-grid)" />
            </svg>
          </div>
          
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Interactive Demo
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Experience how HackaTwin can automate and streamline your hackathon operations in real-time.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Back to homepage</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Demo content */}
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
            {/* Browser mockup chrome */}
            <div className="flex h-10 items-center gap-1.5 border-b border-gray-200 bg-gray-100 px-4 dark:border-gray-800 dark:bg-gray-800">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
              <div className="ml-3 flex h-6 flex-grow rounded-md bg-white px-3 dark:bg-gray-700">
                <span className="my-auto text-xs text-gray-400 dark:text-gray-500">hackatwin.app/dashboard</span>
              </div>
            </div>
            
            {/* Demo iframe */}
            <iframe
              title="HackaTwin Demo"
              src="https://example.com"
              className="h-[560px] w-full border-0 bg-white dark:bg-gray-900"
            />
          </div>
          
          {/* Feature highlights */}
          <div className="mt-16">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">Key Features In Action</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Automated Messaging",
                  description: "Watch as messages are automatically generated and scheduled across platforms.",
                  time: "00:15"
                },
                {
                  title: "Community Dashboard",
                  description: "See real-time metrics and engagement data for your hackathon community.",
                  time: "01:30"
                },
                {
                  title: "Speaker Management",
                  description: "Experience the seamless process of managing judges and speakers.",
                  time: "02:45"
                },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">{item.time}</span>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
