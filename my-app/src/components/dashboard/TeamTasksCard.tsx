"use client";
import { useState, useEffect } from "react";
import { FiUsers, FiPlus, FiTrash2, FiCheckSquare, FiActivity } from "react-icons/fi";

interface TeamMember {
  name: string;
  role: string;
  contact: string;
}

interface TaskLog {
  team: TeamMember[];
  tasks: string[];
  assignments: string;
  timestamp: string;
}

export default function TeamTasksCard() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: "", role: "", contact: "" }
  ]);
  const [tasks, setTasks] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<TaskLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logs/team-tasks");
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

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "", contact: "" }]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const addTask = () => {
    setTasks([...tasks, ""]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, value: string) => {
    const updated = [...tasks];
    updated[index] = value;
    setTasks(updated);
  };

  const handleAssignTasks = async () => {
    const validTeamMembers = teamMembers.filter(member => 
      member.name.trim() && member.role.trim() && member.contact.trim()
    );
    const validTasks = tasks.filter(task => task.trim());

    if (validTeamMembers.length === 0 || validTasks.length === 0) {
      alert("Please add at least one complete team member and one task");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/assign_tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team: validTeamMembers,
          tasks: validTasks,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Tasks assigned successfully! ${result.message}`);
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
          <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
            <FiUsers className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Team & Volunteer Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Assign tasks to team members using AI optimization
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

      {/* Team Members Section */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Team Members
          </h3>
          <button
            onClick={addTeamMember}
            className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
          >
            <FiPlus size={16} />
            Add Member
          </button>
        </div>
        
        <div className="space-y-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
              <div className="flex-1 space-y-3 md:flex md:gap-3 md:space-y-0">
                <input
                  type="text"
                  placeholder="Name"
                  value={member.name}
                  onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={member.role}
                  onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={member.contact}
                  onChange={(e) => updateTeamMember(index, "contact", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              {teamMembers.length > 1 && (
                <button
                  onClick={() => removeTeamMember(index)}
                  className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tasks to Assign
          </h3>
          <button
            onClick={addTask}
            className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
          >
            <FiPlus size={16} />
            Add Task
          </button>
        </div>
        
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={index} className="flex gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
              <input
                type="text"
                placeholder="Enter task description..."
                value={task}
                onChange={(e) => updateTask(index, e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {tasks.length > 1 && (
                <button
                  onClick={() => removeTask(index)}
                  className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Assign Button */}
      <button
        onClick={handleAssignTasks}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Assigning Tasks...
          </>
        ) : (
          <>
            <FiCheckSquare size={20} />
            Assign Tasks with AI
          </>
        )}
      </button>

      {/* Logs Section */}
      {showLogs && (
        <div className="border-t border-gray-200 pt-6 dark:border-gray-700 mt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <FiCheckSquare size={20} />
            Task Assignment History
          </h3>
          
          {logs.length > 0 ? (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
                >
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    Assignment #{index + 1}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Team: {log.team.length} members, Tasks: {log.tasks.length}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-700/50">
              <FiCheckSquare className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                No task assignments yet. Create your first assignment!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
