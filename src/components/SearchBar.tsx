import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { CityOption } from '../types/weather';
import { searchCities } from '../utils/weatherApi';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<CityOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // Click outside closes dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search cities as user types (debounced)
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.length < 2) {
        setCities([]);
        closeDropdown();
        return;
      }
      try {
        const results = await searchCities(query);
        setCities(results);
        setIsOpen(results.length > 0);
        setSelectedIndex(-1);
      } catch {
        setCities([]);
        closeDropdown();
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      closeDropdown();
    }
  };

  const handleCitySelect = (city: CityOption) => {
    setQuery(`${city.name}, ${city.country}`);
    onSearch(city.name);
    closeDropdown();
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || cities.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < cities.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : cities.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) handleCitySelect(cities[selectedIndex]);
        else handleSubmit(e);
        break;
      case 'Escape':
        closeDropdown();
        break;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a city..."
            disabled={loading}
            className="w-full px-4 py-2.5 pl-10 text-base bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 disabled:opacity-50"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
          {loading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            </div>
          )}
        </motion.div>
      </form>

      <AnimatePresence>
        {isOpen && cities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {cities.map((city, index) => (
              <motion.button
                key={`${city.name}-${city.country}`}
                type="button"
                onClick={() => handleCitySelect(city)}
                className={`w-full px-4 py-2.5 text-left flex items-center space-x-3 transition-all duration-200 ${
                  index === selectedIndex ? 'bg-white/25 text-white' : 'text-white/90 hover:bg-white/10'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="w-6 h-6 text-yellow-300 drop-shadow-md" />
                <div>
                  <span className="font-medium">{city.name}</span>
                  <span className="text-white/60 ml-2">{city.country}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
