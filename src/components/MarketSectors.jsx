import React from 'react';
import { Menu, ChevronRight } from 'lucide-react';

export function MarketSectors({ categories, onSelectCategory }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-amber-200/60 shadow-sm">
      <h3 className="font-bold text-sm text-gray-900 mb-3 border-b pb-2 flex items-center gap-2">
        <Menu size={16} className="text-sky-700" /> Market Sectors
      </h3>
      <ul className="space-y-2 text-xs">
        {categories.map((c) => (
          <li 
            key={c.id} 
            onClick={() => onSelectCategory(c.id)}
            className="flex items-center justify-between cursor-pointer hover:text-sky-800 p-1.5 rounded hover:bg-sky-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </span>
            <ChevronRight size={12} className="text-gray-400" />
          </li>
        ))}
      </ul>
    </div>
  );
}