"use client";
import { useState, useEffect } from "react";
import { FiClock, FiCalendar, FiEdit3, FiActivity, FiDownload } from "react-icons/fi";

interface AgendaLog {
  event_name: string;
  event_date: string;
  generated_agenda: string;
  timestamp: string;
}

export default function AgendaCard() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDuration, setEventDuration] = useState("");
  const [eventType, setEventType] = useState("hackathon");
  const [tracks, setTracks] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAgenda, setGeneratedAgenda] = useState("");
  const [logs, setLogs] = useState<AgendaLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logs/agenda");
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

  const addTrack = () => {
    setTracks([...tracks, ""]);
  };

  const removeTrack = (index: number) => {
    setTracks(tracks.filter((_, i) => i !== index));
  };

  const updateTrack = (index: number, value: string) => {
    const updated = [...tracks];
    updated[index] = value;
    setTracks(updated);
  };

  const handleGenerateAgenda = async () => {
    if (!eventName.trim() || !eventDate.trim() || !eventDuration.trim()) {
      alert("Please fill in all event details");
      return;
    }

    const validTracks = tracks.filter(track => track.trim());
    if (validTracks.length === 0) {
      alert("Please add at least one track");
      return;
    }

    setIsLoading(true);
    try {
      // Parse duration to get number of days
      let days = 1;
      if (eventDuration.includes('day')) {
        const match = eventDuration.match(/(\d+)/);
        days = match ? parseInt(match[1]) : 1;
      } else if (eventDuration.toLowerCase().includes('week')) {
        const match = eventDuration.match(/(\d+)/);
        days = match ? parseInt(match[1]) * 7 : 7;
      } else {
        // Try to parse as a number directly
        const parsed = parseInt(eventDuration);
        days = isNaN(parsed) ? 1 : parsed;
      }

      const response = await fetch("http://localhost:8000/generate_agenda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_name: eventName,
          days: days,
          tracks: validTracks,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setGeneratedAgenda(result.agenda);
        alert("Agenda generated successfully!");
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

  const downloadAgenda = () => {
    if (!generatedAgenda) return;
    
    const blob = new Blob([generatedAgenda], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eventName || 'event'}_agenda.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
            <FiCalendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Event Agenda Generation
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Create detailed event schedules with AI
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

      {/* Event Configuration */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Event Configuration
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
          
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <select
                value={eventDuration}
                onChange={(e) => setEventDuration(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select duration</option>
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
                <option value="1 week">1 week</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="hackathon">Hackathon</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="bootcamp">Bootcamp</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks Section */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Event Tracks
          </h3>
          <button
            onClick={addTrack}
            className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
          >
            <FiEdit3 size={16} />
            Add Track
          </button>
        </div>
        
        <div className="space-y-3">
          {tracks.map((track, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                placeholder="Enter track name (e.g., Web Development, AI/ML, Mobile Apps)..."
                value={track}
                onChange={(e) => updateTrack(index, e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {tracks.length > 1 && (
                <button
                  onClick={() => removeTrack(index)}
                  className="rounded-lg bg-red-100 px-3 py-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateAgenda}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Generating Agenda...
          </>
        ) : (
          <>
            <FiClock size={20} />
            Generate Agenda with AI
          </>
        )}
      </button>

      {/* Generated Agenda Preview */}
      {generatedAgenda && (
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Generated Agenda
            </h3>
            <button
              onClick={downloadAgenda}
              className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
            >
              <FiDownload size={16} />
              Download
            </button>
          </div>
          <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
              {generatedAgenda}
            </pre>
          </div>
        </div>
      )}

      {/* Logs Section */}
      {showLogs && (
        <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <FiCalendar size={20} />
            Agenda Generation History
          </h3>
          
          {logs.length > 0 ? (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
                >
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    {log.event_name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Date: {log.event_date}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-700/50">
              <FiCalendar className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                No agendas generated yet. Create your first agenda!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
