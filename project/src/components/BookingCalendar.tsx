import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Booking, TimeSlot } from '../stores/roomStore';

interface BookingCalendarProps {
  bookings: Booking[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DAYS_TO_DISPLAY = 7;
const TIME_SLOTS: { slot: TimeSlot; label: string }[] = [
  { slot: 'FN', label: 'Morning (9AM - 1PM)' },
  { slot: 'AN', label: 'Afternoon (2PM - 5PM)' },
  { slot: 'FULL', label: 'Full Day (9AM - 5PM)' },
];

const getBookingForDateAndSlot = (bookings: Booking[], dateStr: string, slot: TimeSlot) => {
  return bookings.find(booking => 
    booking.date === dateStr && (booking.slot === slot || booking.slot === 'FULL' || slot === 'FULL')
  );
};

const getSlotAvailability = (bookings: Booking[], dateStr: string, slot: TimeSlot) => {
  const booking = getBookingForDateAndSlot(bookings, dateStr, slot);
  
  if (!booking) return { available: true };
  
  return { 
    available: false, 
    status: booking.status,
    userName: booking.userName,
    purpose: booking.purpose
  };
};

const BookingCalendar: React.FC<BookingCalendarProps> = ({ 
  bookings, 
  selectedDate, 
  onDateChange 
}) => {
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday
  
  const dates = Array.from({ length: DAYS_TO_DISPLAY }, (_, i) => 
    addDays(startDate, i)
  );

  const handlePrevWeek = () => {
    onDateChange(addDays(startDate, -7));
  };

  const handleNextWeek = () => {
    onDateChange(addDays(startDate, 7));
  };

  const handleDateClick = (date: Date) => {
    onDateChange(date);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Availability Calendar
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevWeek}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={handleNextWeek}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slot
              </th>
              {dates.map((date) => (
                <th 
                  key={date.toString()} 
                  className={`px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') 
                      ? 'bg-blue-50' 
                      : 'bg-gray-50'
                  }`}
                >
                  <button 
                    onClick={() => handleDateClick(date)}
                    className="w-full flex flex-col items-center"
                  >
                    <span className="text-sm font-normal">{format(date, 'EEE')}</span>
                    <span className={`text-base font-medium ${
                      format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') 
                        ? 'text-blue-600' 
                        : 'text-gray-900'
                    }`}>
                      {format(date, 'd')}
                    </span>
                    <span className="text-xs font-normal text-gray-500">{format(date, 'MMM')}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {TIME_SLOTS.map(({ slot, label }) => (
              <tr key={slot}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {label}
                </td>
                {dates.map((date) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const availability = getSlotAvailability(bookings, dateStr, slot);
                  
                  return (
                    <td 
                      key={`${dateStr}-${slot}`} 
                      className={`px-6 py-4 whitespace-nowrap text-xs text-center ${
                        format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') 
                          ? 'bg-blue-50' 
                          : ''
                      }`}
                    >
                      {availability.available ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      ) : (
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            availability.status === 'approved' 
                              ? 'bg-red-100 text-red-800' 
                              : availability.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {availability.status === 'approved' ? 'Booked' : 'Pending'}
                          </span>
                          {availability.userName && (
                            <p className="mt-1 text-gray-500 text-xs">{availability.userName}</p>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingCalendar;