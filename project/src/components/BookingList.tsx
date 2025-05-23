import React from 'react';
import { format, parseISO } from 'date-fns';
import { CalendarDays, Clock, User, Building, CheckCircle, XCircle, Clock3 } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { Booking, BookingStatus, useRoomStore } from '../stores/roomStore';
import { useAuthStore, UserRole } from '../stores/authStore';

interface BookingListProps {
  bookings: Booking[];
  allowActions?: boolean;
  showRoom?: boolean;
}

const getStatusBadge = (status: BookingStatus) => {
  switch (status) {
    case 'approved':
      return <Badge variant="success">Approved</Badge>;
    case 'rejected':
      return <Badge variant="error">Rejected</Badge>;
    case 'pending':
      return <Badge variant="warning">Pending</Badge>;
    default:
      return null;
  }
};

const getTimeSlotLabel = (slot: string) => {
  switch (slot) {
    case 'FN':
      return 'Morning (9AM - 1PM)';
    case 'AN':
      return 'Afternoon (2PM - 5PM)';
    case 'FULL':
      return 'Full Day (9AM - 5PM)';
    default:
      return slot;
  }
};

const BookingList: React.FC<BookingListProps> = ({ 
  bookings, 
  allowActions = false,
  showRoom = false 
}) => {
  const { updateBookingStatus, rooms } = useRoomStore();
  const { user } = useAuthStore();
  
  const handleStatusUpdate = async (bookingId: string, status: BookingStatus) => {
    try {
      await updateBookingStatus(bookingId, status);
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  // Sort bookings by date (most recent first) then by status (pending first)
  const sortedBookings = [...bookings].sort((a, b) => {
    // First compare by date
    const dateComparison = b.date.localeCompare(a.date);
    if (dateComparison !== 0) return dateComparison;
    
    // If same date, pending comes first
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    
    // If same status, sort by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sortedBookings.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <CalendarDays className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
        <p className="mt-1 text-sm text-gray-500">
          There are no bookings to display at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedBookings.map((booking) => {
        const room = showRoom ? rooms.find(r => r.id === booking.roomId) : null;
        
        return (
          <div 
            key={booking.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {booking.purpose}
                </h3>
                
                <div className="mt-2 max-w-2xl text-sm text-gray-500 space-y-2">
                  <div className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <p>{format(new Date(booking.date), 'MMMM d, yyyy')}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <p>{getTimeSlotLabel(booking.slot)}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <p>{booking.userName}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    <p>{booking.userDepartment}</p>
                  </div>
                  
                  {showRoom && room && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Clock3 className="mr-2 h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{room.name}</p>
                        <p className="text-xs">{room.department} • {room.capacity} capacity</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                {getStatusBadge(booking.status)}
                <p className="text-xs text-gray-500 mt-1">
                  Requested {format(parseISO(booking.createdAt), 'MMM d, h:mm a')}
                </p>
              </div>
            </div>
            
            {allowActions && booking.status === 'pending' && user?.role === 'incharge' && (
              <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-end space-x-2">
                <Button
                  variant="danger"
                  size="sm"
                  leftIcon={<XCircle size={16} />}
                  onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                >
                  Reject
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<CheckCircle size={16} />}
                  onClick={() => handleStatusUpdate(booking.id, 'approved')}
                >
                  Approve
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingList;