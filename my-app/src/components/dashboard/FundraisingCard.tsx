"use client";
import { useState, useEffect } from "react";
import { FiDollarSign, FiMail, FiUsers, FiActivity, FiTrendingUp } from "react-icons/fi";

interface FundraisingLog {
  sponsors: string[];
  event_info: string;
  outreach_message: string;
  timestamp: string;
}

export default function FundraisingCard() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [sponsors, setSponsors] = useState<string[]>([""]);
  const [customMessage, setCustomMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<FundraisingLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logs/fundraising");
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

  const addSponsor = () => {
    setSponsors([...sponsors, ""]);
  };

  const removeSponsor = (index: number) => {
    setSponsors(sponsors.filter((_, i) => i !== index));
  };

  const updateSponsor = (index: number, value: string) => {
    const updated = [...sponsors];
    updated[index] = value;
    setSponsors(updated);
  };

  const handleSendProposals = async () => {
    if (!eventName.trim() || !eventDescription.trim() || !targetAmount.trim()) {
      alert("Please fill in all event details");
      return;
    }

    const validSponsors = sponsors.filter(sponsor => sponsor.trim());
    if (validSponsors.length === 0) {
      alert("Please add at least one sponsor email");
      return;
    }

    setIsLoading(true);
    try {
      const eventInfo = `${eventName}: ${eventDescription}. Target funding: $${targetAmount}`;
      const response = await fetch("http://localhost:8000/fundraising", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sponsors: validSponsors,
          event_info: eventInfo,
          custom_message: customMessage || undefined,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Sponsorship proposals sent successfully! ${result.message}`);
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

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
            <FiDollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Fundraising & Sponsorships
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Reach out to sponsors and secure funding
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

      {/* Event Information */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Event Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Name
            </label>
            <input
              type="text"
              placeholder="Enter event name..."
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Description
            </label>
            <textarea
              placeholder="Describe your event, its goals, and target audience..."
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Funding Amount ($)
            </label>
            <input
              type="number"
              placeholder="Enter target amount..."
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Sponsors Section */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Potential Sponsors
          </h3>
          <button
            onClick={addSponsor}
            className="flex items-center gap-2 rounded-lg bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-700 transition-colors hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50"
          >
            <FiUsers size={16} />
            Add Sponsor
          </button>
        </div>
        
        <div className="space-y-3">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter sponsor contact email..."
                value={sponsor}
                onChange={(e) => updateSponsor(index, e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {sponsors.length > 1 && (
                <button
                  onClick={() => removeSponsor(index)}
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
          placeholder="Add a custom message to include in the sponsorship proposal (AI will generate if left blank)..."
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Leave blank to let AI generate a personalized sponsorship proposal
        </p>
      </div>

      {/* Send Proposals Button */}
      <button
        onClick={handleSendProposals}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-600 px-6 py-3 font-medium text-white transition-colors hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Sending Proposals...
          </>
        ) : (
          <>
            <FiMail size={20} />
            Send Sponsorship Proposals
          </>
        )}
      </button>

      {/* Sponsorship Tiers Info */}
      <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
        <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
          Sponsorship Benefits Include:
        </h4>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <li>• Logo placement on event materials</li>
          <li>• Mention in marketing campaigns</li>
          <li>• Booth space at the event</li>
          <li>• Access to participant resumes</li>
          <li>• Speaking opportunities</li>
        </ul>
      </div>

      {/* Logs Section */}
      {showLogs && (
        <div className="border-t border-gray-200 pt-6 dark:border-gray-700 mt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <FiTrendingUp size={20} />
            Fundraising History
          </h3>
          
          {logs.length > 0 ? (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
                >
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    {log.event_info}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Contacted: {log.sponsors.length} sponsors
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-700/50">
              <FiDollarSign className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                No sponsorship outreach yet. Send your first proposals!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
