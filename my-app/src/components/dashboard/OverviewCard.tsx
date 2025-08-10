"use client";
import { useState, useEffect } from "react";
import { FiUsers, FiMail, FiCalendar, FiDollarSign, FiTrendingUp, FiActivity, FiCheckCircle, FiClock } from "react-icons/fi";

interface DashboardStats {
  total_events: number;
  active_projects: number;
  team_members: number;
  emails_sent: number;
  funds_raised: number;
  community_growth: number;
  recent_activities: Array<{
    title: string;
    description: string;
    time: string;
    type: string;
  }>;
}

interface OverviewCardProps {
  onSectionChange?: (section: string) => void;
}

export default function OverviewCard({ onSectionChange }: OverviewCardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/stats/dashboard");
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statsDisplay = [
    {
      title: "Total Events",
      value: stats?.total_events?.toString() || "0",
      change: "+2 this month",
      icon: FiCalendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Active Projects",
      value: stats?.active_projects?.toString() || "0",
      change: "+3 this week",
      icon: FiActivity,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30"
    },
    {
      title: "Team Members",
      value: stats?.team_members?.toString() || "0",
      change: "+12 this month",
      icon: FiUsers,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "Emails Sent",
      value: stats?.emails_sent?.toLocaleString() || "0",
      change: "+156 today",
      icon: FiMail,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30"
    },
    {
      title: "Funds Raised",
      value: `$${Math.round((stats?.funds_raised || 0) / 1000)}K`,
      change: "+$15K this week",
      icon: FiDollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      title: "Community Growth",
      value: stats?.community_growth?.toLocaleString() || "0",
      change: "+184 this week",
      icon: FiTrendingUp,
      color: "text-pink-600",
      bgColor: "bg-pink-100 dark:bg-pink-900/30"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "outreach": return FiMail;
      case "team": return FiCheckCircle;
      case "agenda": return FiCalendar;
      default: return FiActivity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "outreach": return "text-blue-600";
      case "team": return "text-green-600";
      case "agenda": return "text-purple-600";
      default: return "text-gray-600";
    }
  };

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      } else {
        return "Just now";
      }
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h1 className="text-2xl font-bold md:text-3xl">Welcome back! 👋</h1>
        <p className="mt-2 text-blue-100">
          Here's what's happening with your hackathon management today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statsDisplay.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {stat.change}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <button 
            onClick={() => onSectionChange?.("outreach")}
            className="flex items-center gap-3 rounded-lg bg-blue-50 p-4 text-left transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
          >
            <FiMail className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900 dark:text-blue-100">
              Send Outreach Email
            </span>
          </button>
          <button 
            onClick={() => onSectionChange?.("team-tasks")}
            className="flex items-center gap-3 rounded-lg bg-green-50 p-4 text-left transition-colors hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30"
          >
            <FiUsers className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900 dark:text-green-100">
              Assign Team Tasks
            </span>
          </button>
          <button 
            onClick={() => onSectionChange?.("agenda")}
            className="flex items-center gap-3 rounded-lg bg-purple-50 p-4 text-left transition-colors hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30"
          >
            <FiCalendar className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900 dark:text-purple-100">
              Generate Agenda
            </span>
          </button>
          <button 
            onClick={() => onSectionChange?.("fundraising")}
            className="flex items-center gap-3 rounded-lg bg-yellow-50 p-4 text-left transition-colors hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30"
          >
            <FiDollarSign className="h-5 w-5 text-yellow-600" />
            <span className="font-medium text-yellow-900 dark:text-yellow-100">
              Contact Sponsors
            </span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {stats?.recent_activities && stats.recent_activities.length > 0 ? (
            stats.recent_activities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              const color = getActivityColor(activity.type);
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className={`rounded-lg p-2 ${color.replace('text-', 'bg-').replace('-600', '-100')} dark:${color.replace('text-', 'bg-').replace('-600', '-900/30')}`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                      <FiClock className="h-3 w-3" />
                      {formatTime(activity.time)}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <FiActivity className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                No recent activity. Start using HackaTwin to see updates here!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
