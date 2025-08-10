"use client";
import { useState, useEffect } from "react";
import { FiUserCheck, FiMail, FiCalendar, FiUsers, FiActivity } from "react-icons/fi";

interface JuryInviteLog {
  name: string;
  email: string;
  role: string;
  expertise?: string;
  topic?: string;
  status: string;
  timestamp: string;
}

interface JudgeData {
  name: string;
  email: string;
  expertise: string;
}

interface SpeakerData {
  name: string;
  email: string;
  topic: string;
}

export default function JuryInvitesCard() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [judges, setJudges] = useState<JudgeData[]>([{ name: "", email: "", expertise: "" }]);
  const [speakers, setSpeakers] = useState<SpeakerData[]>([{ name: "", email: "", topic: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<JuryInviteLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logs/jury-invites");
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

  const addJudge = () => {
    setJudges([...judges, { name: "", email: "", expertise: "" }]);
  };

  const removeJudge = (index: number) => {
    setJudges(judges.filter((_, i) => i !== index));
  };

  const updateJudge = (index: number, field: keyof JudgeData, value: string) => {
    const updated = [...judges];
    updated[index] = { ...updated[index], [field]: value };
    setJudges(updated);
  };

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: "", email: "", topic: "" }]);
  };

  const removeSpeaker = (index: number) => {
    setSpeakers(speakers.filter((_, i) => i !== index));
  };

  const updateSpeaker = (index: number, field: keyof SpeakerData, value: string) => {
    const updated = [...speakers];
    updated[index] = { ...updated[index], [field]: value };
    setSpeakers(updated);
  };

  const handleSendInvites = async () => {
    const validJudges = judges.filter(judge => judge.name.trim() && judge.email.trim() && judge.expertise.trim());
    const validSpeakers = speakers.filter(speaker => speaker.name.trim() && speaker.email.trim() && speaker.topic.trim());

    if (!eventName.trim() || !eventDate.trim() || !eventVenue.trim()) {
      alert("Please fill in all event details");
      return;
    }

    if (validJudges.length === 0 && validSpeakers.length === 0) {
      alert("Please add at least one complete judge or speaker (name, email, and expertise/topic)");
      return;
    }

    setIsLoading(true);
    try {
      const eventInfo = `${eventName} on ${eventDate} at ${eventVenue}`;
      const response = await fetch("http://localhost:8000/invite_jury", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          judges: validJudges,
          speakers: validSpeakers,
          event_info: eventInfo,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Invitations sent successfully! ${result.message}`);
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
          <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
            <FiUserCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Jury & Speaker Invitations
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Send personalized invitations to judges and speakers
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
              placeholder="Enter hackathon name..."
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
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
                Venue
              </label>
              <input
                type="text"
                placeholder="Enter venue..."
                value={eventVenue}
                onChange={(e) => setEventVenue(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Judges Section */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Judges
          </h3>
          <button
            onClick={addJudge}
            className="flex items-center gap-2 rounded-lg bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50"
          >
            <FiUserCheck size={16} />
            Add Judge
          </button>
        </div>
        
        <div className="space-y-3">
          {judges.map((judge, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-lg dark:border-gray-600">
              <input
                type="text"
                placeholder="Judge name..."
                value={judge.name}
                onChange={(e) => updateJudge(index, 'name', e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="email"
                placeholder="Judge email..."
                value={judge.email}
                onChange={(e) => updateJudge(index, 'email', e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Expertise (e.g., AI/ML, Blockchain)..."
                  value={judge.expertise}
                  onChange={(e) => updateJudge(index, 'expertise', e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {judges.length > 1 && (
                  <button
                    onClick={() => removeJudge(index)}
                    className="rounded-lg bg-red-100 px-3 py-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speakers Section */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Speakers
          </h3>
          <button
            onClick={addSpeaker}
            className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
          >
            <FiUsers size={16} />
            Add Speaker
          </button>
        </div>
        
        <div className="space-y-3">
          {speakers.map((speaker, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-lg dark:border-gray-600">
              <input
                type="text"
                placeholder="Speaker name..."
                value={speaker.name}
                onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="email"
                placeholder="Speaker email..."
                value={speaker.email}
                onChange={(e) => updateSpeaker(index, 'email', e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Topic (e.g., Startup Scaling, Web3)..."
                  value={speaker.topic}
                  onChange={(e) => updateSpeaker(index, 'topic', e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {speakers.length > 1 && (
                  <button
                    onClick={() => removeSpeaker(index)}
                    className="rounded-lg bg-red-100 px-3 py-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Send Invitations Button */}
      <button
        onClick={handleSendInvites}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Sending Invitations...
          </>
        ) : (
          <>
            <FiMail size={20} />
            Send Invitations
          </>
        )}
      </button>

      {/* Logs Section */}
      {showLogs && (
        <div className="border-t border-gray-200 pt-6 dark:border-gray-700 mt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <FiCalendar size={20} />
            Invitation History
          </h3>
          
          {logs.length > 0 ? (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {log.name} ({log.role})
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      log.status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {log.email} • {log.role === 'judge' ? `Expertise: ${log.expertise}` : `Topic: ${log.topic}`}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-700/50">
              <FiUserCheck className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                No invitations sent yet. Send your first invitations!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
