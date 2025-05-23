import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import { RoomType } from '../stores/roomStore';

interface RoomFilterProps {
  onFilter: (filters: RoomFilters) => void;
}

export interface RoomFilters {
  search: string;
  type: string;
  capacity: string;
  features: string[];
}

const RoomFilter: React.FC<RoomFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<RoomFilters>({
    search: '',
    type: '',
    capacity: '',
    features: [],
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (key: keyof RoomFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => {
      const features = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      
      return { ...prev, features };
    });
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      type: '',
      capacity: '',
      features: [],
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const featureOptions = [
    'Projector',
    'Sound System',
    'Air Conditioning',
    'Wifi',
    'Whiteboard',
    'Smart Board'
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Find Rooms</h3>
        <Button 
          variant="ghost" 
          size="sm"
          leftIcon={isExpanded ? <X size={16} /> : <Filter size={16} />}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Search rooms..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          leftIcon={<Search className="h-5 w-5 text-gray-400" />}
        />

        {isExpanded && (
          <div className="space-y-4 pt-3 border-t border-gray-100">
            <Select
              label="Room Type"
              options={[
                { value: '', label: 'All Types' },
                { value: 'classroom', label: 'Classroom' },
                { value: 'seminar-hall', label: 'Seminar Hall' },
                { value: 'meeting-hall', label: 'Meeting Hall' },
                { value: 'lab', label: 'Lab' }
              ]}
              value={filters.type}
              onChange={(value) => handleChange('type', value)}
            />

            <Select
              label="Capacity"
              options={[
                { value: '', label: 'Any Capacity' },
                { value: '25', label: 'Up to 25 people' },
                { value: '50', label: 'Up to 50 people' },
                { value: '100', label: 'Up to 100 people' },
                { value: '101', label: 'More than 100 people' }
              ]}
              value={filters.capacity}
              onChange={(value) => handleChange('capacity', value)}
            />

            <div>
              <label className="form-label">Features</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {featureOptions.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`feature-${feature}`}
                      checked={filters.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-gray-700">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                fullWidth
              >
                Clear
              </Button>
              <Button
                variant="primary"
                onClick={handleApplyFilters}
                fullWidth
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomFilter;