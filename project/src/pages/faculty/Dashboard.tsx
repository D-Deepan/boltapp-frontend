import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Building2, Clock, Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import BookingList from '../../components/BookingList';
import { useAuthStore } from '../../stores/authStore';
import { useRoomStore } from '../../stores/roomStore';

const FacultyDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { rooms, bookings, fetchRooms } = useRoomStore();
  
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  // Filter rooms by faculty's department
  const departmentRooms = rooms.filter(room => room.department === user?.department);
  
  // Get user's bookings
  const userBookings = bookings.filter(booking => booking.userId === user?.id);
  
  // Get upcoming bookings (sorted by date)
  const upcomingBookings = userBookings
    .filter(booking => new Date(booking.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  return (
    <div className="page-transition">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Manage your room bookings and find available spaces in the {user?.department} department.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <Card.Body className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Available Rooms</p>
              <p className="text-2xl font-semibold">{departmentRooms.length}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Your Bookings</p>
              <p className="text-2xl font-semibold">{userBookings.length}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Approvals</p>
              <p className="text-2xl font-semibold">
                {userBookings.filter(b => b.status === 'pending').length}
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </Card.Header>
          <Card.Body className="space-y-4">
            <Link to="/faculty/rooms">
              <Button 
                variant="primary" 
                fullWidth 
                leftIcon={<Search size={16} />}
              >
                Find Available Rooms
              </Button>
            </Link>
            <Link to="/faculty/bookings">
              <Button 
                variant="secondary" 
                fullWidth 
                leftIcon={<Calendar size={16} />}
              >
                View My Bookings
              </Button>
            </Link>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold">Upcoming Bookings</h2>
          </Card.Header>
          <Card.Body>
            {upcomingBookings.length > 0 ? (
              <BookingList bookings={upcomingBookings} />
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No upcoming bookings</p>
                <Link to="/faculty/rooms" className="mt-2 inline-block text-blue-600 hover:text-blue-800">
                  Find a room to book
                </Link>
              </div>
            )}
          </Card.Body>
          {upcomingBookings.length > 0 && (
            <Card.Footer>
              <Link to="/faculty/bookings" className="text-blue-600 hover:text-blue-800 text-sm">
                View all bookings →
              </Link>
            </Card.Footer>
          )}
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold">Recently Available Rooms</h2>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departmentRooms.slice(0, 3).map(room => (
              <Link key={room.id} to={`/faculty/rooms/${room.id}`} className="block group">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="h-36 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Capacity: {room.capacity}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card.Body>
        <Card.Footer>
          <Link to="/faculty/rooms" className="text-blue-600 hover:text-blue-800 text-sm">
            View all rooms →
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default FacultyDashboard;