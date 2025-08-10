"use client";
import { useState, useEffect } from "react";
import { FiUsers, FiUserPlus, FiMail, FiActivity, FiTrendingUp, FiHeart } from "react-icons/fi";

interface CommunityLog {
  members: string[];
  message_type: string;
  custom_message?: string;
  timestamp: string;
}

export default function CommunityGrowthCard() {
  const [messageType, setMessageType] = useState("onboarding");
  const [members, setMembers] = useState<string[]>([""]);
  const [customMessage, setCustomMessage] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<CommunityLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logs/community");
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogs([]);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const addMember = () => {
    setMembers([...members, ""]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, value: string) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const handleSendCommunityMessage = async () => {
    const validMembers = members.filter(member => member.trim());
    if (validMembers.length === 0) {
      alert("Please add at least one member email");
      return;
    }

    if (messageType === "onboarding" && !communityName.trim()) {
      alert("Please enter community name for onboarding messages");
      return;
    }

    if (messageType === "followup" && !eventDetails.trim()) {
      alert("Please enter event details for follow-up messages");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/community_growth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          members: validMembers,
          message_type: messageType,
          community_name: messageType === "onboarding" ? communityName : undefined,
          event_details: messageType === "followup" ? eventDetails : undefined,
          custom_message: customMessage || undefined,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Community messages sent successfully! ${result.message}`);
        fetchLogs(); // Refresh logs
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      alert(`Network error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageTypeDisplay = (type: string) => {
    switch (type) {
      case "onboarding":
        return "Member Onboarding";
      case "followup":
        return "Event Follow-up";
      case "engagement":
        return "Community Engagement";
      default:
        return type;
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-pink-100 p-3 dark:bg-pink-900/30">
            <FiHeart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Community Growth
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Engage members and grow your community
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowLogs(!showLogs)}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <FiActivity size={16} />
          {showLogs ? "Hide" : "Show"} Logs
        </button>
      </div>

      {/* Message Type Selector */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Message Type
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setMessageType("onboarding")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              messageType === "onboarding"
                ? "bg-pink-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Onboarding
          </button>
          <button
            onClick={() => setMessageType("followup")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              messageType === "followup"
                ? "bg-pink-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Follow-up
          </button>
          <button
            onClick={() => setMessageType("engagement")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              messageType === "engagement"
                ? "bg-pink-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Engagement
          </button>
        </div>
      </div>

      {/* Context Fields */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Message Context
        </h3>
        
        {messageType === "onboarding" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Community Name
            </label>
            <input
              type="text"
              placeholder="Enter your community name..."
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}

        {messageType === "followup" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Details
            </label>
            <textarea
              placeholder="Describe the event for follow-up context..."
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}

        {messageType === "engagement" && (
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Engagement messages will be generated based on community activity and member interests.
            </p>
          </div>
        )}
      </div>

      {/* Members Section */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Community Members
          </h3>
          <button
            onClick={addMember}
            className="flex items-center gap-2 rounded-lg bg-pink-100 px-3 py-2 text-sm font-medium text-pink-700 transition-colors hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:hover:bg-pink-900/50"
          >
            <FiUserPlus size={16} />
            Add Member
          </button>
        </div>
        
        <div className="space-y-3">
          {members.map((member, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter member email..."
                value={member}
                onChange={(e) => updateMember(index, e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {members.length > 1 && (
                <button
                  onClick={() => removeMember(index)}
                  className="rounded-lg bg-red-100 px-3 py-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Message Section */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Custom Message (Optional)
        </h3>
        <textarea
          placeholder="Add a custom message to include (AI will generate if left blank)..."
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Leave blank to let AI generate personalized community messages
        </p>
      </div>

      {/* Send Messages Button */}
      <button
        onClick={handleSendCommunityMessage}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition-colors hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Sending Messages...
          </>
        ) : (
          <>
            <FiMail size={20} />
            Send Community Messages
          </>
        )}
      </button>

      {/* Community Tips */}
      <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
        <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
          Community Growth Tips:
        </h4>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <li>• Send onboarding messages to new members</li>
          <li>• Follow up with participants after events</li>
          <li>• Keep the community engaged with regular updates</li>
          <li>• Share relevant opportunities and resources</li>
          <li>• Celebrate member achievements</li>
        </ul>
      </div>

      {/* Logs Section */}
      {showLogs && (
        <div className="border-t border-gray-200 pt-6 dark:border-gray-700 mt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <FiTrendingUp size={20} />
            Community Activity History
          </h3>
          
          {logs.length > 0 ? (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
                >
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    {getMessageTypeDisplay(log.message_type)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Sent to: {log.members.length} members
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-700/50">
              <FiUsers className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                No community activity yet. Start engaging your members!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
