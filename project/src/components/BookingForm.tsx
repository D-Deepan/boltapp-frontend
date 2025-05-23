import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { useAuthStore } from '../stores/authStore';
import { useRoomStore, TimeSlot } from '../stores/roomStore';

interface BookingFormProps {
  roomId: string;
  selectedDate: Date;
  onSuccess: () => void;
}

interface FormData {
  slot: TimeSlot;
  purpose: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  roomId, 
  selectedDate,
  onSuccess 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();
  const { createBooking } = useRoomStore();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>({
    defaultValues: {
      slot: 'FN',
      purpose: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      await createBooking({
        roomId,
        userId: user.id,
        userName: user.name,
        userDepartment: user.department,
        date: format(selectedDate, 'yyyy-MM-dd'),
        slot: data.slot,
        purpose: data.purpose,
        status: 'pending'
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Date</p>
        <p className="text-base font-semibold">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </p>
      </div>
      
      <Select
        label="Time Slot"
        options={[
          { value: 'FN', label: 'Morning (9AM - 1PM)' },
          { value: 'AN', label: 'Afternoon (2PM - 5PM)' },
          { value: 'FULL', label: 'Full Day (9AM - 5PM)' }
        ]}
        error={errors.slot?.message}
        {...register('slot', { required: 'Time slot is required' })}
      />
      
      <Input
        label="Purpose"
        placeholder="Briefly describe the purpose of booking"
        error={errors.purpose?.message}
        {...register('purpose', { 
          required: 'Purpose is required',
          minLength: {
            value: 10,
            message: 'Purpose should be at least 10 characters'
          }
        })}
      />
      
      <Button 
        type="submit" 
        isLoading={isSubmitting}
        fullWidth
      >
        Request Booking
      </Button>
    </form>
  );
};

export default BookingForm;