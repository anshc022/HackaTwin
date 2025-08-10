"use client";
import { useState, useEffect } from "react";
import { FiMic, FiHelpCircle, FiPhone, FiActivity, FiPlay, FiPause } from "react-icons/fi";

interface ModerationLog {
  session_type: string;
  questions?: string[];
  call_info?: string;
  timestamp: string;
}

export default function ModerationCard() {
  const [sessionType, setSessionType] = useState("qa");
  const [eventTopic, setEventTopic] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);
  const [participantName, setParticipantName] = useState("");
  const [participantContact, setParticipantContact] = useState("");
  const [callPurpose, setCallPurpose] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<ModerationLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logs/moderation");
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

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const handleStartQASession = async () => {
    if (!eventTopic.trim()) {
      alert("Please enter an event topic");
      return;
    }

    const validQuestions = questions.filter(q => q.trim());
    if (validQuestions.length === 0) {
      alert("Please add at least one question");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/moderate_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_type: "qa",
          event_topic: eventTopic,
          questions: validQuestions,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Q&A session started! ${result.message}`);
        setIsSessionActive(true);
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

  const handleScheduleCall = async () => {
    if (!participantName.trim() || !participantContact.trim() || !callPurpose.trim()) {
      alert("Please fill in all call details");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/moderate_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_type: "call",
          participant_name: participantName,
          participant_contact: participantContact,
          call_purpose: callPurpose,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Call scheduled successfully! ${result.message}`);
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

  const toggleSession = () => {
    setIsSessionActive(!isSessionActive);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-orange-100 p-3 dark:bg-orange-900/30">
            <FiMic className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Live Event Moderation
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage Q&A sessions and schedule calls
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${isSessionActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {isSessionActive ? 'Active' : 'Inactive'}
          </span>
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="ml-2 flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <FiActivity size={16} />
            {showLogs ? "Hide" : "Show"} Logs
          </button>
        </div>
      </div>

      {/* Session Type Selector */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Session Type
        </h3>
        <div className="flex gap-4">
          <button
            onClick={() => setSessionType("qa")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              sessionType === "qa"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Q&A Session
          </button>
          <button
            onClick={() => setSessionType("call")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              sessionType === "call"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Schedule Call
          </button>
        </div>
      </div>

      {/* Q&A Session Section */}
      {sessionType === "qa" && (
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Q&A Session Setup
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Topic
            </label>
            <input
              type="text"
              placeholder="Enter the main topic for Q&A..."
              value={eventTopic}
              onChange={(e) => setEventTopic(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                Prepared Questions
              </h4>
              <button
                onClick={addQuestion}
                className="flex items-center gap-2 rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50"
              >
                <FiHelpCircle size={16} />
                Add Question
              </button>
            </div>
            
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter a question to moderate the session..."
                    value={question}
                    onChange={(e) => updateQuestion(index, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(index)}
                      className="rounded-lg bg-red-100 px-3 py-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleStartQASession}
              disabled={isLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Starting Session...
                </>
              ) : (
                <>
                  <FiMic size={20} />
                  Start Q&A Session
                </>
              )}
            </button>
            
            <button
              onClick={toggleSession}
              className={`flex items-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${
                isSessionActive
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isSessionActive ? <FiPause size={20} /> : <FiPlay size={20} />}
              {isSessionActive ? "Pause" : "Resume"}
            </button>
          </div>
        </div>
      )}

      {/* Call Scheduling Section */}
      {sessionType === "call" && (
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Schedule Call
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Participant Name
              </label>
              <input
                type="text"
                placeholder="Enter participant name..."
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contact Information
              </label>
              <input
                type="text"
                placeholder="Enter email or phone..."
                value={participantContact}
                onChange={(e) => setParticipantContact(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Call Purpose
              </label>
              <textarea
                placeholder="Describe the purpose of the call..."
                value={callPurpose}
                onChange={(e) => setCallPurpose(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <button
            onClick={handleScheduleCall}
            disabled={isLoading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Scheduling Call...
              </>
            ) : (
              <>
                <FiPhone size={20} />
                Schedule Call
              </>
            )}
          </button>
        </div>
      )}

      {/* Logs Section */}
      {showLogs && (
        <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <FiMic size={20} />
            Moderation History
          </h3>
          
          {logs.length > 0 ? (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
                >
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    {log.session_type === "qa" ? "Q&A Session" : "Call Scheduled"}
                  </p>
                  {log.questions && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Questions: {log.questions.length}
                    </p>
                  )}
                  {log.call_info && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {log.call_info}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-700/50">
              <FiMic className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                No moderation sessions yet. Start your first session!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
