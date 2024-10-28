import React from 'react';
import { Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {[
        {
          icon: <Clock className="w-6 h-6 text-blue-500" />,
          label: 'Hours This Month',
          value: '168',
          change: '+2.5%',
          positive: true
        },
        {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          label: 'Tasks Completed',
          value: '45',
          change: '+12%',
          positive: true
        },
        {
          icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
          label: 'Pending Tasks',
          value: '8',
          change: '-5%',
          positive: true
        },
        {
          icon: <Calendar className="w-6 h-6 text-purple-500" />,
          label: 'Attendance Rate',
          value: '98%',
          change: '+1%',
          positive: true
        }
      ].map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            {stat.icon}
            <span className={`text-sm ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
              {stat.change}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{stat.label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}