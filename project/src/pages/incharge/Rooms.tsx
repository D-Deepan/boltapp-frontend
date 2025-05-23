import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useRoomStore, Room } from '../../stores/roomStore';
import RoomCard from '../../components/RoomCard';
import RoomFilter, { RoomFilters } from '../../components/RoomFilter';

const InchargeRooms: React.FC = () => {
  const { user } = useAuthStore();
  const { rooms, bookings, fetchRooms, isLoading } = useRoomStore();
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  useEffect(() => {
    // Only show rooms from the incharge's department
    if (user && rooms.length > 0) {
      const departmentRooms = rooms.filter(room => room.department === user.department);
      setFilteredRooms(departmentRooms);
    }
  }, [rooms, user]);
  
  const handleFilter = (filters: RoomFilters) => {
    let results = rooms.filter(room => room.department === user?.department);
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(room => 
        room.name.toLowerCase().includes(searchLower) || 
        room.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply room type filter
    if (filters.type) {
      results = results.filter(room => room.type === filters.type);
    }
    
    // Apply capacity filter
    if (filters.capacity) {
      const capacityNum = parseInt(filters.capacity, 10);
      
      if (capacityNum === 101) {
        // More than 100 people
        results = results.filter(room => room.capacity > 100);
      } else {
        // Up to the specified capacity
        results = results.filter(room => room.capacity <= capacityNum);
      }
    }
    
    // Apply features filter
    if (filters.features && filters.features.length > 0) {
      results = results.filter(room => 
        filters.features.every(feature => room.features.includes(feature))
      );
    }
    
    setFilteredRooms(results);
  };
  
  // Count bookings for each room
  const getBookingCount = (roomId: string) => {
    return bookings.filter(b => b.roomId === roomId).length;
  };
  
  return (
    <div className="page-transition">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Department Rooms
        </h1>
        <p className="text-gray-600">
          Manage and monitor rooms in the {user?.department} department
        </p>
      </div>
      
      <RoomFilter onFilter={handleFilter} />
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rooms...</p>
        </div>
      ) : filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map(room => (
            <RoomCard key={room.id} room={room} linkPrefix="/incharge" />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">No rooms found</h3>
          <p className="mt-2 text-gray-600">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
};

export default InchargeRooms;