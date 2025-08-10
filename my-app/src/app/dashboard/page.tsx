"use client";
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import OverviewCard from "@/components/dashboard/OverviewCard";
import OutreachCard from "@/components/dashboard/OutreachCard";
import TeamTasksCard from "@/components/dashboard/TeamTasksCard";
import JuryInvitesCard from "@/components/dashboard/JuryInvitesCard";
import AgendaCard from "@/components/dashboard/AgendaCard";
import ModerationCard from "@/components/dashboard/ModerationCard";
import FundraisingCard from "@/components/dashboard/FundraisingCard";
import CommunityGrowthCard from "@/components/dashboard/CommunityGrowthCard";
import AllDataCard from "@/components/dashboard/AllDataCard";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewCard onSectionChange={setActiveSection} />;
      case "outreach":
        return <OutreachCard />;
      case "team-tasks":
        return <TeamTasksCard />;
      case "jury-invites":
        return <JuryInvitesCard />;
      case "agenda":
        return <AgendaCard />;
      case "moderation":
        return <ModerationCard />;
      case "fundraising":
        return <FundraisingCard />;
      case "community":
        return <CommunityGrowthCard />;
      case "all-data":
        return <AllDataCard />;
      default:
        return <OverviewCard onSectionChange={setActiveSection} />;
    }
  };

  const getSectionTitle = () => {
    const titles: Record<string, string> = {
      overview: "Dashboard Overview",
      outreach: "Email Outreach",
      "team-tasks": "Team Management",
      "jury-invites": "Jury & Speaker Invitations",
      agenda: "Event Agenda Generation",
      moderation: "Live Event Moderation",
      fundraising: "Fundraising & Sponsorships",
      community: "Community Growth",
      "all-data": "Comprehensive Data View"
    };
    return titles[activeSection] || "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-80">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="flex h-16 items-center justify-between px-6 lg:px-8">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl">
                {getSectionTitle()}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Status indicator */}
              <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 dark:bg-green-900/30">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  All Systems Operational
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
