import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    gold: 'bg-primary-500 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    red: 'bg-red-500 text-white',
    purple: 'bg-purple-500 text-white'
  };
  
  return (
    <div className="card group hover:shadow-elevated transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-secondary-500">{title}</h3>
          <p className="mt-2 text-3xl font-semibold text-secondary-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color] || colorClasses.gold}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-secondary-100">
        <p className="text-xs text-secondary-500 group-hover:text-primary-500 transition-colors duration-200">
          Updated just now
        </p>
      </div>
    </div>
  );
};

export default StatsCard;