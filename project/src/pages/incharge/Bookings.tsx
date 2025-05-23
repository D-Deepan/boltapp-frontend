import React, { useEffect, useState } from 'react';
import { CalendarDays, Check, X, Clock, Building2 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useRoomStore, BookingStatus } from '../../stores/roomStore';
import BookingList from '../../components/BookingList';
import Button from '../../components/ui/Button';

const InchargeBookings: React.FC = () => {
  const { user } = useAuthStore();
  const { rooms, bookings, fetchRooms, isLoading } = useRoomStore();
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  // Get department bookings
  const departmentBookings = bookings.filter(booking => {
    const room = rooms.find(r => r.id === booking.roomId);
    return room && room.department === user?.department;
  });
  
  // Apply filter
  const filteredBookings = filter === 'all' 
    ? departmentBookings 
    : departmentBookings.filter(booking => booking.status === filter);
  
  return (
    <div className="page-transition">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Booking Requests
        </h1>
        <p className="text-gray-600">
          Manage room booking requests for the {user?.department} department
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Requests
          </Button>
          <Button
            variant={filter === 'pending' ? 'primary' : 'ghost'}
            size="sm"
            leftIcon={<Clock size={16} />}
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'approved' ? 'primary' : 'ghost'}
            size="sm"
            leftIcon={<Check size={16} />}
            onClick={() => setFilter('approved')}
          >
            Approved
          </Button>
          <Button
            variant={filter === 'rejected' ? 'primary' : 'ghost'}
            size="sm"
            leftIcon={<X size={16} />}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      ) : filteredBookings.length > 0 ? (
        <BookingList 
          bookings={filteredBookings} 
          allowActions={filter === 'pending'} 
          showRoom={true}
        />
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <CalendarDays className="h-12 w-12 text-gray-400 mx-auto" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No booking requests found</h3>
          {filter !== 'all' ? (
            <p className="mt-2 text-gray-600">
              There are no {filter} booking requests.{' '}
              <button onClick={() => setFilter('all')} className="text-blue-600 hover:text-blue-800">
                View all requests
              </button>
            </p>
          ) : (
            <p className="mt-2 text-gray-600">
              There are no booking requests for the {user?.department} department rooms.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InchargeBookings;