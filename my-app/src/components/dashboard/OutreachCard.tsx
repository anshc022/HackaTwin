"use client";
import { useState, useEffect } from "react";
import { FiMail, FiSend, FiUsers, FiActivity } from "react-icons/fi";

interface OutreachLog {
  name: string;
  email: string;
  status: string;
  timestamp: string;
}

export default function OutreachCard() {
  const [customMessage, setCustomMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<OutreachLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logs/outreach");
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

  const handleOutreach = async () => {
    if (!customMessage.trim()) {
      alert("Please enter a custom message");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/outreach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          custom_message: customMessage,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Outreach completed! ${result.message}`);
        setCustomMessage("");
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
          <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
            <FiMail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Global Outreach & Recruitment
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Send personalized outreach emails to potential participants
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

      {/* Form */}
      <div className="mb-6 space-y-4">
        <div>
          <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Message
          </label>
          <textarea
            id="customMessage"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Enter a personalized message for the outreach emails..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <button
          onClick={handleOutreach}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Sending Outreach...
            </>
          ) : (
            <>
              <FiSend size={20} />
              Send Outreach Emails
            </>
          )}
        </button>
      </div>

      {/* Logs Section */}
      {showLogs && (
        <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <FiUsers size={20} />
            Recent Outreach Logs
          </h3>
          
          {logs.length > 0 ? (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {log.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {log.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        log.status === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {log.status}
                    </span>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-700/50">
              <FiMail className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                No outreach logs yet. Send your first outreach campaign!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
