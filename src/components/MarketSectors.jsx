import React from 'react';
import { 
  Smartphone, Shirt, Home, Sparkle, Dumbbell, BookOpen, Layers, ChevronRight 
} from 'lucide-react';

const getCategoryIcon = (id) => {
  switch (id) {
    case 'electronics': return <Smartphone size={18} className="text-sky-500" />;
    case 'fashion': return <Shirt size={18} className="text-sky-500" />;
    case 'home': return <Home size={18} className="text-sky-500" />;
    case 'beauty': return <Sparkle size={18} className="text-sky-500" />;
    case 'sports': return <Dumbbell size={18} className="text-sky-500" />;
    case 'books': return <BookOpen size={18} className="text-sky-500" />;
    default: return <Layers size={18} className="text-sky-500" />;
  }
};

export function MarketSectors({ categories = [], onSelectCategory }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-sky-100 dark:border-slate-800 shadow-sm">
      <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <Layers size={20} className="text-sky-600 dark:text-sky-400" />
        Market Sectors
      </h3>
      <div className="space-y-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              {getCategoryIcon(cat.id)}
              <span className="font-semibold text-sm">{cat.name}</span>
            </div>
            <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
}