import React from 'react';
import { FileText, Award, Settings } from 'lucide-react';

interface Tab {
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs: Tab[] = [
    {
      icon: <FileText className="w-4 h-4" />,
      label: 'Documents',
      content: (
        <div className="space-y-4">
          {[
            { name: 'Employee Contract.pdf', date: '2024-02-15', size: '2.4 MB' },
            { name: 'Performance Review Q4.pdf', date: '2024-01-30', size: '1.8 MB' },
            { name: 'Training Certificate.pdf', date: '2023-12-10', size: '956 KB' }
          ].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-800">{doc.name}</p>
                  <p className="text-sm text-gray-500">Added on {doc.date}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{doc.size}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      icon: <Award className="w-4 h-4" />,
      label: 'Certifications',
      content: (
        <div className="space-y-4">
          {[
            { name: 'Project Management Professional (PMP)', date: '2023', expires: '2026' },
            { name: 'Agile Scrum Master', date: '2023', expires: '2025' },
            { name: 'ISO 9001 Lead Auditor', date: '2022', expires: '2025' }
          ].map((cert, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <h3 className="font-medium text-gray-800">{cert.name}</h3>
              </div>
              <p className="text-sm text-gray-500">
                Obtained: {cert.date} • Expires: {cert.expires}
              </p>
            </div>
          ))}
        </div>
      )
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: 'Settings',
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
            <div className="space-y-2">
              {[
                'Task assignments',
                'Project updates',
                'Team announcements',
                'Performance reviews'
              ].map((item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Privacy Settings</label>
            <div className="space-y-2">
              {[
                'Show my profile to team members only',
                'Allow others to send me messages',
                'Show my status'
              ].map((item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b">
        <div className="flex space-x-6 px-6">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === index
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">{tabs[activeTab].content}</div>
    </div>
  );
}