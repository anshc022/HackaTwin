"use client";
import React, { useState, useEffect } from 'react';
import { FiUsers, FiMail, FiAward, FiDollarSign, FiCalendar, FiRefreshCw } from 'react-icons/fi';

interface VolunteerData {
  database_data: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    source: string;
  }>;
  json_data: Array<{
    name: string;
    email: string;
    source: string;
  }>;
  total_count: number;
}

interface OutreachData {
  database_data: Array<{
    id: number;
    name: string;
    email: string;
    status: string;
    source: string;
  }>;
  json_data: Array<{
    name: string;
    email: string;
    status: string;
    source: string;
  }>;
  total_count: number;
  stats: {
    total_emails: number;
    successful: number;
    failed: number;
    pending: number;
  };
}

interface JurySpeakerData {
  database_jury: Array<{
    id: number;
    name: string;
    email: string;
    expertise: string;
    status: string;
    source: string;
  }>;
  database_speakers: Array<{
    id: number;
    name: string;
    email: string;
    topic: string;
    status: string;
    source: string;
  }>;
  json_data: Array<{
    name: string;
    email: string;
    role: string;
    status: string;
    source: string;
  }>;
  total_count: number;
}

const AllDataCard: React.FC = () => {
  const [volunteers, setVolunteers] = useState<VolunteerData | null>(null);
  const [outreach, setOutreach] = useState<OutreachData | null>(null);
  const [jurySpeakers, setJurySpeakers] = useState<JurySpeakerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [volunteersRes, outreachRes, juryRes] = await Promise.all([
        fetch('http://localhost:8000/api/all/volunteers'),
        fetch('http://localhost:8000/api/all/outreach'),
        fetch('http://localhost:8000/api/all/jury-speakers')
      ]);

      if (!volunteersRes.ok || !outreachRes.ok || !juryRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [volunteersData, outreachData, juryData] = await Promise.all([
        volunteersRes.json(),
        outreachRes.json(),
        juryRes.json()
      ]);

      setVolunteers(volunteersData);
      setOutreach(outreachData);
      setJurySpeakers(juryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center h-64">
          <FiRefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading comprehensive data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          <button
            onClick={fetchAllData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Comprehensive Data Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Complete view of all volunteers, outreach, and event data
            </p>
          </div>
          <button
            onClick={fetchAllData}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiRefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Volunteers Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiUsers className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Total Volunteers & Team Members
                </dt>
                <dd className="text-3xl font-bold text-gray-900 dark:text-white">
                  {volunteers?.total_count || 0}
                </dd>
                <dd className="text-sm text-gray-600 dark:text-gray-300">
                  {volunteers?.database_data.length || 0} in database, {volunteers?.json_data.length || 0} from logs
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Outreach Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiMail className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Email Outreach Campaigns
                </dt>
                <dd className="text-3xl font-bold text-gray-900 dark:text-white">
                  {outreach?.stats.total_emails || 0}
                </dd>
                <dd className="text-sm text-gray-600 dark:text-gray-300">
                  {outreach?.stats.successful || 0} successful, {outreach?.stats.failed || 0} failed
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Jury & Speakers Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiAward className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Jury Members & Speakers
                </dt>
                <dd className="text-3xl font-bold text-gray-900 dark:text-white">
                  {jurySpeakers?.total_count || 0}
                </dd>
                <dd className="text-sm text-gray-600 dark:text-gray-300">
                  {jurySpeakers?.database_jury.length || 0} judges, {jurySpeakers?.database_speakers.length || 0} speakers
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Volunteers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Volunteers & Team Members
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {volunteers?.database_data.slice(0, 5).map((volunteer, index) => (
                  <tr key={`db-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {volunteer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {volunteer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                        Database
                      </span>
                    </td>
                  </tr>
                ))}
                {volunteers?.json_data.slice(0, 2).map((volunteer, index) => (
                  <tr key={`json-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {volunteer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {volunteer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200">
                        Log Files
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Outreach Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Outreach Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Success Rate</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {outreach?.stats.total_emails ? 
                  Math.round((outreach.stats.successful / outreach.stats.total_emails) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${outreach?.stats.total_emails ? 
                    (outreach.stats.successful / outreach.stats.total_emails) * 100 : 0}%`
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {outreach?.stats.successful || 0}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Successful</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {outreach?.stats.failed || 0}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {outreach?.stats.pending || 0}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jury and Speakers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Jury Members & Speakers
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Judges */}
          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
              Jury Members ({jurySpeakers?.database_jury.length || 0})
            </h4>
            <div className="space-y-2">
              {jurySpeakers?.database_jury.slice(0, 4).map((judge, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{judge.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{judge.expertise}</div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    judge.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
                    judge.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                    {judge.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Speakers */}
          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
              Speakers ({jurySpeakers?.database_speakers.length || 0})
            </h4>
            <div className="space-y-2">
              {jurySpeakers?.database_speakers.slice(0, 4).map((speaker, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{speaker.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{speaker.topic}</div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    speaker.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
                    speaker.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
                    speaker.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                    {speaker.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDataCard;
