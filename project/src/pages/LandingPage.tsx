import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, Users, CheckCircle, SearchCheck, Building2, 
  ShieldCheck, BarChart3, ArrowRight 
} from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
                Streamline Room Allocations for Your Institution
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Efficient booking system for classrooms, seminar halls, and meeting rooms
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" variant="accent">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="ghost" className="text-white hover:bg-blue-700">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-white rounded-lg shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Room Booking</h3>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-gray-700">Seminar Hall A</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-gray-700">June 15, 2025 (Morning)</p>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-gray-700">Capacity: 150 people</p>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4">
                    Book Now
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300 hidden md:block">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-gray-900 font-medium">Booking Approved!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Efficient Room Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive solution makes it easy to manage and book rooms across your institution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full p-3 inline-block mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking System</h3>
              <p className="text-gray-600">
                Faculty can quickly search for available rooms and request bookings with just a few clicks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-teal-100 rounded-full p-3 inline-block mb-4">
                <CheckCircle className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Approval Workflow</h3>
              <p className="text-gray-600">
                Incharges can review and approve booking requests to ensure optimal resource allocation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-orange-100 rounded-full p-3 inline-block mb-4">
                <SearchCheck className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Availability Calendar</h3>
              <p className="text-gray-600">
                Visual calendar shows room availability in real-time, making it easy to find free slots.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-purple-100 rounded-full p-3 inline-block mb-4">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Room Information</h3>
              <p className="text-gray-600">
                Access comprehensive details about each room, including capacity, features, and photos.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-green-100 rounded-full p-3 inline-block mb-4">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">
                Customized interfaces for faculty, incharges, and administrators with appropriate permissions.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-red-100 rounded-full p-3 inline-block mb-4">
                <BarChart3 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Utilization Analytics</h3>
              <p className="text-gray-600">
                Admins can track room usage patterns and optimize resource allocation across departments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes room booking simple and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Search & Request</h3>
                <p className="text-gray-600">
                  Faculty members search for available rooms and submit booking requests for their preferred time slots.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2">
                <ArrowRight className="h-8 w-8 text-gray-300" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="bg-teal-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-teal-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Review & Approve</h3>
                <p className="text-gray-600">
                  Department incharges review booking requests and approve or reject them based on availability and priority.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2">
                <ArrowRight className="h-8 w-8 text-gray-300" />
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="bg-orange-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Use & Review</h3>
                <p className="text-gray-600">
                  Faculty can use the room as scheduled and leave reviews about their experience for future users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Streamline Your Room Booking Process?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join hundreds of institutions already using RoomConnect to simplify room management
            </p>
            <Link to="/login">
              <Button variant="accent" size="lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;