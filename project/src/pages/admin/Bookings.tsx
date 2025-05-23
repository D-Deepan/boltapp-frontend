import React, { useEffect, useState } from 'react';
import { CalendarDays, Check, X, Clock, Building2, Filter } from 'lucide-react';
import { useRoomStore, BookingStatus } from '../../stores/roomStore';
import BookingList from '../../components/BookingList';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Select from '../../components/ui/Select';

const AdminBookings: React.FC = () => {
  const { rooms, bookings, fetchRooms, isLoading } = useRoomStore();
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  // Apply filters
  const filteredBookings = bookings.filter(booking => {
    const room = rooms.find(r => r.id === booking.roomId);
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesDepartment = departmentFilter === '' || 
      (room && room.department === departmentFilter);
    
    return matchesStatus && matchesDepartment;
  });
  
  // Get all unique departments
  const departments = Array.from(new Set(rooms.map(room => room.department)));
  
  return (
    <div className="page-transition">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          All Booking Requests
        </h1>
        <p className="text-gray-600">
          View and manage room bookings across all departments
        </p>
      </div>
      
      <Card className="mb-6">
        <Card.Body>
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All Requests
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'primary' : 'ghost'}
                size="sm"
                leftIcon={<Clock size={16} />}
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === 'approved' ? 'primary' : 'ghost'}
                size="sm"
                leftIcon={<Check size={16} />}
                onClick={() => setStatusFilter('approved')}
              >
                Approved
              </Button>
              <Button
                variant={statusFilter === 'rejected' ? 'primary' : 'ghost'}
                size="sm"
                leftIcon={<X size={16} />}
                onClick={() => setStatusFilter('rejected')}
              >
                Rejected
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Filter size={16} />}
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            >
              {isFilterExpanded ? 'Hide Filters' : 'More Filters'}
            </Button>
          </div>
          
          {isFilterExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Department"
                  options={[
                    { value: '', label: 'All Departments' },
                    ...departments.map(dept => ({ value: dept, label: dept }))
                  ]}
                  value={departmentFilter}
                  onChange={(value) => setDepartmentFilter(value)}
                />
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      ) : filteredBookings.length > 0 ? (
        <BookingList 
          bookings={filteredBookings}
          showRoom={true}
        />
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <CalendarDays className="h-12 w-12 text-gray-400 mx-auto" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No booking requests found</h3>
          <p className="mt-2 text-gray-600">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;