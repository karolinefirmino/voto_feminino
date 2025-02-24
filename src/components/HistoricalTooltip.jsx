'use client';

import React from 'react';

const HistoricalTooltip = ({ event, isVisible }) => {
    return (
      <div 
        className={`absolute bottom-full mb-2 transform -translate-x-1/2 left-1/2 
          transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      >
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-gray-200 
          w-64 pointer-events-auto">
          <h4 className="font-semibold text-[#1e2b6b]">{event.country}, {event.year}</h4>
          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
          {event.highlight && (
            <div className="mt-2 p-2 bg-[#fff5f8] rounded border border-[#d4165c]/20">
              <p className="text-sm text-[#d4165c] font-medium">{event.impactText}</p>
            </div>
          )}
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
          border-8 border-transparent border-t-white/95"></div>
      </div>
    );
  };
  
  export default HistoricalTooltip;