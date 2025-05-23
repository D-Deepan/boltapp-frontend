import { create } from 'zustand';

export type RoomType = 'classroom' | 'seminar-hall' | 'meeting-hall' | 'lab';
export type TimeSlot = 'FN' | 'AN' | 'FULL';
export type BookingStatus = 'pending' | 'approved' | 'rejected';

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  department: string;
  capacity: number;
  description: string;
  image: string;
  features: string[];
}

export interface Review {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userDepartment: string;
  date: string;
  slot: TimeSlot;
  purpose: string;
  status: BookingStatus;
  createdAt: string;
}

interface RoomState {
  rooms: Room[];
  reviews: Review[];
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
  fetchRoomById: (id: string) => Room | undefined;
  fetchRoomReviews: (roomId: string) => Review[];
  fetchRoomBookings: (roomId: string) => Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<Booking>;
  updateBookingStatus: (id: string, status: BookingStatus) => Promise<void>;
}

// Mock data
const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Seminar Hall A',
    type: 'seminar-hall',
    department: 'CSE',
    capacity: 150,
    description: 'Large seminar hall with modern AV equipment and comfortable seating.',
    image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
    features: ['Projector', 'Sound System', 'Air Conditioning', 'Wifi']
  },
  {
    id: '2',
    name: 'Classroom 101',
    type: 'classroom',
    department: 'CSE',
    capacity: 60,
    description: 'Standard classroom with whiteboard and projector.',
    image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg',
    features: ['Projector', 'Whiteboard', 'Air Conditioning']
  },
  {
    id: '3',
    name: 'Meeting Room B',
    type: 'meeting-hall',
    department: 'CSE',
    capacity: 20,
    description: 'Intimate meeting room for small group discussions.',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    features: ['Conference Table', 'Smart Board', 'Video Conferencing']
  },
  {
    id: '4',
    name: 'Computer Lab 3',
    type: 'lab',
    department: 'CSE',
    capacity: 40,
    description: 'Modern computer lab with latest hardware and software.',
    image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg',
    features: ['30 Computers', 'Programming Software', 'Internet Access']
  },
  {
    id: '5',
    name: 'Seminar Hall B',
    type: 'seminar-hall',
    department: 'ECE',
    capacity: 120,
    description: 'Medium-sized seminar hall ideal for department events.',
    image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
    features: ['Projector', 'Sound System', 'Air Conditioning']
  }
];

const mockReviews: Review[] = [
  {
    id: '1',
    roomId: '1',
    userId: '1',
    userName: 'Dr. Smith',
    rating: 4,
    comment: 'Great acoustics and comfortable seating. The projector could be brighter.',
    createdAt: '2025-03-01T10:00:00Z'
  },
  {
    id: '2',
    roomId: '1',
    userId: '2',
    userName: 'Prof. Johnson',
    rating: 5,
    comment: 'Excellent facilities. Perfect for large department seminars.',
    createdAt: '2025-02-15T14:30:00Z'
  },
  {
    id: '3',
    roomId: '2',
    userId: '1',
    userName: 'Dr. Smith',
    rating: 3,
    comment: 'Adequate for lectures but lighting could be improved.',
    createdAt: '2025-02-10T09:15:00Z'
  }
];

const mockBookings: Booking[] = [
  {
    id: '1',
    roomId: '1',
    userId: '1',
    userName: 'Dr. Smith',
    userDepartment: 'CSE',
    date: '2025-06-15',
    slot: 'FN',
    purpose: 'Department Seminar on AI',
    status: 'approved',
    createdAt: '2025-06-01T08:30:00Z'
  },
  {
    id: '2',
    roomId: '1',
    userId: '2',
    userName: 'Prof. Johnson',
    userDepartment: 'CSE',
    date: '2025-06-15',
    slot: 'AN',
    purpose: 'Guest Lecture',
    status: 'approved',
    createdAt: '2025-06-02T10:45:00Z'
  },
  {
    id: '3',
    roomId: '2',
    userId: '1',
    userName: 'Dr. Smith',
    userDepartment: 'CSE',
    date: '2025-06-16',
    slot: 'FULL',
    purpose: 'Workshop on Web Development',
    status: 'pending',
    createdAt: '2025-06-05T14:20:00Z'
  }
];

export const useRoomStore = create<RoomState>((set, get) => ({
  rooms: [],
  reviews: [],
  bookings: [],
  isLoading: false,
  error: null,
  
  fetchRooms: async () => {
    // Simulate API call
    set({ isLoading: true, error: null });
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ 
        rooms: mockRooms,
        reviews: mockReviews,
        bookings: mockBookings,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: 'Failed to fetch rooms' 
      });
    }
  },
  
  fetchRoomById: (id: string) => {
    return get().rooms.find(room => room.id === id);
  },
  
  fetchRoomReviews: (roomId: string) => {
    return get().reviews.filter(review => review.roomId === roomId);
  },
  
  fetchRoomBookings: (roomId: string) => {
    return get().bookings.filter(booking => booking.roomId === roomId);
  },
  
  createBooking: async (bookingData) => {
    // Simulate API call
    set({ isLoading: true, error: null });
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        ...bookingData,
        createdAt: new Date().toISOString()
      };
      
      set(state => ({
        bookings: [...state.bookings, newBooking],
        isLoading: false
      }));
      
      return newBooking;
    } catch (error) {
      set({ isLoading: false, error: 'Failed to create booking' });
      throw new Error('Failed to create booking');
    }
  },
  
  updateBookingStatus: async (id: string, status: BookingStatus) => {
    // Simulate API call
    set({ isLoading: true, error: null });
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        bookings: state.bookings.map(booking => 
          booking.id === id ? { ...booking, status } : booking
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ isLoading: false, error: 'Failed to update booking status' });
      throw new Error('Failed to update booking status');
    }
  }
}));