import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Users, CalendarDays, Star, 
  Building2, Clock, ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import BookingCalendar from '../../components/BookingCalendar';
import BookingForm from '../../components/BookingForm';
import ReviewList from '../../components/ReviewList';
import { useRoomStore } from '../../stores/roomStore';

const FacultyRoomDetails: React.FC = () => {
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
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  const room = id ? fetchRoomById(id) : undefined;
  const reviews = id ? fetchRoomReviews(id) : [];
  const bookings = id ? fetchRoomBookings(id) : [];
  
  const handleBookingSuccess = () => {
    setBookingSubmitted(true);
  };
  
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
        <Link to="/faculty/rooms">
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
        <Link to="/faculty/rooms" className="flex items-center text-blue-600 hover:text-blue-800">
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
          
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`pb-2 mr-8 ${
                activeTab === 'details' 
                  ? 'border-b-2 border-blue-600 text-blue-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Room Details
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
          
          {activeTab === 'details' ? (
            <div>
              <p className="text-gray-700 mb-6">
                {room.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Room Information</h2>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Type</h3>
                    <p className="font-medium">
                      {room.type.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Department</h3>
                    <p className="font-medium">{room.department}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Capacity</h3>
                    <p className="font-medium">{room.capacity} people</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Features</h3>
                    <ul className="list-disc pl-5 mt-1">
                      {room.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  {bookingSubmitted ? (
                    <Card>
                      <Card.Body className="text-center">
                        <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
                          <CalendarDays className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Booking Request Submitted!
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Your booking request has been submitted and is pending approval from the department incharge.
                        </p>
                        <Button
                          variant="primary"
                          onClick={() => setBookingSubmitted(false)}
                        >
                          Book Another Slot
                        </Button>
                      </Card.Body>
                    </Card>
                  ) : (
                    <Card>
                      <Card.Header>
                        <h3 className="text-lg font-medium">Book This Room</h3>
                      </Card.Header>
                      <Card.Body>
                        <BookingForm 
                          roomId={room.id} 
                          selectedDate={selectedDate}
                          onSuccess={handleBookingSuccess}
                        />
                      </Card.Body>
                    </Card>
                  )}
                </div>
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

export default FacultyRoomDetails;