import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/80 py-8 backdrop-blur dark:border-gray-800 dark:bg-black/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <span className="font-bold"><span className="text-blue-500">Hacka</span><span className="text-purple-500">Twin</span></span>
          <span className="hidden sm:inline">— AI Co-Organizer</span>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <Link href="https://github.com/" target="_blank" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">GitHub</Link>
          <a href="#contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Contact</a>
          <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Privacy</Link>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        © 2025 HackaTwin. Built with ❤️ at Your Hackathon Name
      </div>
    </footer>
  );
}
