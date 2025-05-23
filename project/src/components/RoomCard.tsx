import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Calendar } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { Room } from '../stores/roomStore';

interface RoomCardProps {
  room: Room;
  linkPrefix: string;
}

const getRoomTypeColor = (type: string): string => {
  switch (type) {
    case 'classroom':
      return 'bg-blue-100 text-blue-800';
    case 'seminar-hall':
      return 'bg-purple-100 text-purple-800';
    case 'meeting-hall':
      return 'bg-teal-100 text-teal-800';
    case 'lab':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const RoomCard: React.FC<RoomCardProps> = ({ room, linkPrefix }) => {
  const { id, name, type, department, capacity, image, features } = room;
  
  const formattedType = type.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <Card hoverable className="h-full flex flex-col">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getRoomTypeColor(type)}`}>
            {formattedType}
          </span>
        </div>
      </div>
      
      <Card.Body className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
            {department}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Users size={16} className="mr-1" />
          <span className="text-sm">{capacity} capacity</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="default" size="sm">
              {feature}
            </Badge>
          ))}
          {features.length > 3 && (
            <Badge variant="default" size="sm">+{features.length - 3}</Badge>
          )}
        </div>
      </Card.Body>
      
      <Card.Footer className="pt-3 pb-4">
        <Link 
          to={`${linkPrefix}/rooms/${id}`} 
          className="btn btn-primary w-full"
        >
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default RoomCard;