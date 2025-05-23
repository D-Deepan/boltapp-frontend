import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Building2, Clock, CheckCircle, XCircle, 
  AlertTriangle, Search 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import BookingList from '../../components/BookingList';
import { useAuthStore } from '../../stores/authStore';
import { useRoomStore } from '../../stores/roomStore';

const InchargeDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { rooms, bookings, fetchRooms } = useRoomStore();
  
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  // Filter rooms by incharge's department
  const departmentRooms = rooms.filter(room => room.department === user?.department);
  
  // Get department bookings
  const departmentBookings = bookings.filter(
    booking => rooms.find(r => r.id === booking.roomId)?.department === user?.department
  );
  
  // Get pending bookings
  const pendingBookings = departmentBookings.filter(
    booking => booking.status === 'pending'
  ).slice(0, 3);
  
  return (
    <div className="page-transition">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Manage room bookings and approvals for the {user?.department} department.
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
              <p className="text-sm text-gray-500">Department Rooms</p>
              <p className="text-2xl font-semibold">{departmentRooms.length}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Approvals</p>
              <p className="text-2xl font-semibold">
                {departmentBookings.filter(b => b.status === 'pending').length}
              </p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved Bookings</p>
              <p className="text-2xl font-semibold">
                {departmentBookings.filter(b => b.status === 'approved').length}
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
            <Link to="/incharge/rooms">
              <Button 
                variant="primary" 
                fullWidth 
                leftIcon={<Search size={16} />}
              >
                Manage Department Rooms
              </Button>
            </Link>
            <Link to="/incharge/bookings">
              <Button 
                variant="secondary" 
                fullWidth 
                leftIcon={<Calendar size={16} />}
              >
                View All Booking Requests
              </Button>
            </Link>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Header className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Pending Approvals</h2>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              {pendingBookings.length} pending
            </span>
          </Card.Header>
          <Card.Body>
            {pendingBookings.length > 0 ? (
              <BookingList 
                bookings={pendingBookings} 
                allowActions={true} 
                showRoom={true}
              />
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No pending booking requests</p>
              </div>
            )}
          </Card.Body>
          {pendingBookings.length > 0 && (
            <Card.Footer>
              <Link to="/incharge/bookings" className="text-blue-600 hover:text-blue-800 text-sm">
                View all booking requests →
              </Link>
            </Card.Footer>
          )}
        </Card>
      </div>
      
      {/* Room Usage */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold">Department Rooms</h2>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departmentRooms.slice(0, 3).map(room => (
              <Link key={room.id} to={`/incharge/rooms/${room.id}`} className="block group">
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
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Capacity: {room.capacity}</span>
                      <span>
                        {departmentBookings.filter(b => b.roomId === room.id).length} bookings
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card.Body>
        <Card.Footer>
          <Link to="/incharge/rooms" className="text-blue-600 hover:text-blue-800 text-sm">
            View all rooms →
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default InchargeDashboard;