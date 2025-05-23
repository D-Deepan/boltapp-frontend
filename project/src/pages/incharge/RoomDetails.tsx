import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Users, CalendarDays, Star, 
  Building2, Clock, ArrowLeft
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import BookingCalendar from '../../components/BookingCalendar';
import BookingList from '../../components/BookingList';
import ReviewList from '../../components/ReviewList';
import { useRoomStore } from '../../stores/roomStore';

const InchargeRoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    rooms, 
    fetchRooms, 
    fetchRoomById,
    fetchRoomReviews,
    fetchRoomBookings,
    isLoading 
  } = useRoomStore();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'bookings' | 'reviews'>('bookings');
  
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  const room = id ? fetchRoomById(id) : undefined;
  const reviews = id ? fetchRoomReviews(id) : [];
  const bookings = id ? fetchRoomBookings(id) : [];
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading room details...</p>
      </div>
    );
  }
  
  if (!room) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Room not found</h3>
        <p className="mt-2 text-gray-600 mb-4">
          The room you're looking for doesn't exist or is not available.
        </p>
        <Link to="/incharge/rooms">
          <Button leftIcon={<ArrowLeft size={16} />}>
            Back to Rooms
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="page-transition">
      <div className="mb-6">
        <Link to="/incharge/rooms" className="flex items-center text-blue-600 hover:text-blue-800">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Rooms
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="relative h-64 sm:h-80">
          <img 
            src={room.image} 
            alt={room.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl font-bold">{room.name}</h1>
              <div className="flex items-center mt-2">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{room.department}</span>
                <span className="mx-2">•</span>
                <Users className="h-4 w-4 mr-1" />
                <span>Capacity: {room.capacity}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {room.features.map((feature, index) => (
              <Badge key={index} variant="primary" size="md">
                {feature}
              </Badge>
            ))}
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Room Description</h2>
            <p className="text-gray-700">
              {room.description}
            </p>
          </div>
          
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`pb-2 mr-8 flex items-center ${
                activeTab === 'bookings' 
                  ? 'border-b-2 border-blue-600 text-blue-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              Booking Requests
              <span className="ml-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {bookings.length}
              </span>
            </button>
            <button
              className={`pb-2 flex items-center ${
                activeTab === 'reviews' 
                  ? 'border-b-2 border-blue-600 text-blue-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
              <span className="ml-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {reviews.length}
              </span>
            </button>
          </div>
          
          {activeTab === 'bookings' ? (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
                {bookings.length > 0 ? (
                  <BookingList 
                    bookings={bookings} 
                    allowActions={true}
                  />
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-md">
                    <CalendarDays className="h-8 w-8 text-gray-400 mx-auto" />
                    <p className="mt-2 text-gray-600">No booking requests for this room</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Room Reviews</h2>
              <ReviewList reviews={reviews} />
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <BookingCalendar
          bookings={bookings}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default InchargeRoomDetails;