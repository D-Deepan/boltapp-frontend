import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Check, X, Clock } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useRoomStore, BookingStatus } from '../../stores/roomStore';
import BookingList from '../../components/BookingList';
import Button from '../../components/ui/Button';

const FacultyBookings: React.FC = () => {
  const { user } = useAuthStore();
  const { bookings, fetchRooms, isLoading } = useRoomStore();
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  // Get user's bookings
  const userBookings = bookings.filter(booking => booking.userId === user?.id);
  
  // Apply filter
  const filteredBookings = filter === 'all' 
    ? userBookings 
    : userBookings.filter(booking => booking.status === filter);
  
  return (
    <div className="page-transition">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          My Bookings
        </h1>
        <p className="text-gray-600">
          Manage your room booking requests and view their status
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Bookings
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
        <BookingList bookings={filteredBookings} showRoom={true} />
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <CalendarDays className="h-12 w-12 text-gray-400 mx-auto" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings found</h3>
          {filter !== 'all' ? (
            <p className="mt-2 text-gray-600">
              You don't have any {filter} bookings.{' '}
              <button onClick={() => setFilter('all')} className="text-blue-600 hover:text-blue-800">
                View all bookings
              </button>
            </p>
          ) : (
            <p className="mt-2 text-gray-600">
              You haven't made any room booking requests yet.
            </p>
          )}
          
          <div className="mt-4">
            <Link to="/faculty/rooms">
              <Button variant="primary">
                Find Rooms to Book
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyBookings;