"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  FiHome, 
  FiMail, 
  FiUsers, 
  FiSettings, 
  FiCalendar, 
  FiMessageSquare, 
  FiDollarSign, 
  FiTrendingUp, 
  FiMenu,
  FiX,
  FiActivity,
  FiBarChart,
  FiUser
} from "react-icons/fi";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: "overview", label: "Overview", icon: FiBarChart, color: "text-blue-600" },
    { id: "outreach", label: "Email Outreach", icon: FiMail, color: "text-green-600" },
    { id: "team-tasks", label: "Team Management", icon: FiUsers, color: "text-purple-600" },
    { id: "jury-invites", label: "Jury & Speakers", icon: FiSettings, color: "text-orange-600" },
    { id: "agenda", label: "Event Agenda", icon: FiCalendar, color: "text-blue-600" },
    { id: "moderation", label: "Live Moderation", icon: FiMessageSquare, color: "text-red-600" },
    { id: "fundraising", label: "Fundraising", icon: FiDollarSign, color: "text-yellow-600" },
    { id: "community", label: "Community Growth", icon: FiTrendingUp, color: "text-pink-600" },
    { id: "all-data", label: "All Data", icon: FiActivity, color: "text-indigo-600" },
  ];

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-white p-3 shadow-lg dark:bg-gray-800 lg:hidden"
      >
        {isMobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full bg-white shadow-xl transition-all duration-300 dark:bg-gray-900 lg:z-auto lg:translate-x-0 ${
          isCollapsed ? "w-20" : "w-80"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-700">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Hacka</span>
                  <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Twin</span>
                </span>
              </div>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:block"
          >
            <FiMenu size={18} />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <FiUser size={20} />
            </div>
            {!isCollapsed && (
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Admin User</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hackathon Organizer</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 dark:from-blue-900/20 dark:to-purple-900/20 dark:text-blue-400"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <Icon 
                  size={20} 
                  className={isActive ? item.color : "text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"} 
                />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
                {!isCollapsed && isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <Link
            href="/"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-gray-700 transition-all hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <FiHome size={20} className="text-gray-500" />
            {!isCollapsed && <span className="font-medium">Back to Home</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
