import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, Calendar, PlusCircle, Settings,
  BarChart3, Layers, Briefcase
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { useRoomStore } from '../../stores/roomStore';

const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { rooms, bookings, fetchRooms } = useRoomStore();
  
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  // Group rooms by department
  const roomsByDepartment = rooms.reduce((acc, room) => {
    acc[room.department] = (acc[room.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Count bookings by status
  const bookingsByStatus = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <div className="page-transition">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Manage rooms, users, and bookings across all departments.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <Card.Body className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Rooms</p>
              <p className="text-2xl font-semibold">{rooms.length}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Departments</p>
              <p className="text-2xl font-semibold">{Object.keys(roomsByDepartment).length}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center">
            <div className="bg-teal-100 p-3 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-semibold">{bookings.length}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Users</p>
              <p className="text-2xl font-semibold">3</p>
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
            <Link to="/admin/rooms">
              <Button 
                variant="primary" 
                fullWidth 
                leftIcon={<Building2 size={16} />}
              >
                Manage Rooms
              </Button>
            </Link>
            <Link to="/admin/users">
              <Button 
                variant="secondary" 
                fullWidth 
                leftIcon={<Users size={16} />}
              >
                Manage Users
              </Button>
            </Link>
            <Link to="/admin/bookings">
              <Button 
                variant="accent" 
                fullWidth 
                leftIcon={<Calendar size={16} />}
              >
                View All Bookings
              </Button>
            </Link>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold">System Overview</h2>
          </Card.Header>
          <Card.Body className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Rooms by Department</h3>
              <div className="space-y-2">
                {Object.entries(roomsByDepartment).map(([department, count]) => (
                  <div key={department} className="flex justify-between">
                    <span>{department}</span>
                    <span className="font-medium">{count} rooms</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Booking Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Pending</span>
                  <span className="font-medium">{bookingsByStatus.pending || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Approved</span>
                  <span className="font-medium">{bookingsByStatus.approved || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rejected</span>
                  <span className="font-medium">{bookingsByStatus.rejected || 0}</span>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </Card.Header>
        <Card.Body>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 rounded-full p-2">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New user account created</p>
                <p className="text-xs text-gray-500">Admin user created an account for Professor Johnson</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-green-100 rounded-full p-2">
                  <Building2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New room added</p>
                <p className="text-xs text-gray-500">Computer Lab 3 was added to CSE department</p>
                <p className="text-xs text-gray-400">Yesterday</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-yellow-100 rounded-full p-2">
                  <Settings className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Department incharge assigned</p>
                <p className="text-xs text-gray-500">Prof. Williams was assigned as CSE department incharge</p>
                <p className="text-xs text-gray-400">3 days ago</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;