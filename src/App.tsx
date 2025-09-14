import React, { useState } from 'react';
import { AuthSystem } from './components/AuthSystem';
import { VehicleListing } from './components/VehicleListing';
import { BookingSystem } from './components/BookingSystem';
import { BookingConfirmation } from './components/BookingConfirmation';
import { ClientDashboard } from './components/ClientDashboard';
import { DriverDashboard } from './components/DriverDashboard';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type AppState = 
  | 'auth' 
  | 'client-dashboard' 
  | 'driver-dashboard' 
  | 'vehicle-listing' 
  | 'booking' 
  | 'booking-confirmation';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  userType: 'driver' | 'client';
  licenseNumber?: string;
  vehicleType?: string;
  rating?: number;
  totalRides?: number;
  status?: 'active' | 'inactive';
}

interface Vehicle {
  id: string;
  type: 'bike' | 'car' | 'cycle';
  name: string;
  image: string;
  pricePerHour: number;
  pricePerDay: number;
  rating: number;
  location: string;
  available: boolean;
  features: string[];
  specs: {
    seats?: number;
    fuelType?: string;
    transmission?: string;
    range?: string;
  };
  description: string;
}

interface BookingData {
  id: string;
  vehicle: {
    name: string;
    image: string;
    type: string;
    location: string;
  };
  bookingType: 'hourly' | 'daily';
  startDate: Date;
  duration: number;
  pickupLocation: string;
  dropoffLocation: string;
  paymentMethod: string;
  pricing: {
    subtotal: number;
    tax: number;
    serviceFee: number;
    total: number;
  };
  status: string;
  createdAt: Date;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [completedBooking, setCompletedBooking] = useState<BookingData | null>(null);

  const handleLogin = (userType: 'driver' | 'client', userData: any) => {
    setCurrentUser(userData);
    if (userType === 'driver') {
      setAppState('driver-dashboard');
      toast.success(`Welcome back, ${userData.name}! You're now online.`);
    } else {
      setAppState('client-dashboard');
      toast.success(`Welcome back, ${userData.name}! Ready to book your next ride?`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedVehicle(null);
    setCompletedBooking(null);
    setAppState('auth');
    toast.info('You have been logged out successfully.');
  };

  const handleBookNewVehicle = () => {
    setSelectedVehicle(null);
    setAppState('vehicle-listing');
  };

  const handleVehicleSelection = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setAppState('booking');
    toast.info(`Selected ${vehicle.name} for booking.`);
  };

  const handleBookingComplete = (bookingData: BookingData) => {
    setCompletedBooking(bookingData);
    setAppState('booking-confirmation');
    toast.success('🎉 Booking confirmed! Your vehicle is reserved.');
  };

  const handleBookingCancel = () => {
    setSelectedVehicle(null);
    if (currentUser?.userType === 'client') {
      setAppState('client-dashboard');
    } else {
      setAppState('vehicle-listing');
    }
    toast.info('Booking cancelled.');
  };

  const handleBackToDashboard = () => {
    setSelectedVehicle(null);
    setCompletedBooking(null);
    if (currentUser?.userType === 'client') {
      setAppState('client-dashboard');
    } else {
      setAppState('driver-dashboard');
    }
  };

  const renderCurrentView = () => {
    switch (appState) {
      case 'auth':
        return <AuthSystem onLogin={handleLogin} />;
      
      case 'client-dashboard':
        return (
          <ClientDashboard
            user={currentUser as User}
            onLogout={handleLogout}
            onBookNew={handleBookNewVehicle}
          />
        );
      
      case 'driver-dashboard':
        return (
          <DriverDashboard
            user={currentUser as User}
            onLogout={handleLogout}
          />
        );
      
      case 'vehicle-listing':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-semibold">RideShare Pro</h1>
                    <span className="text-muted-foreground">Vehicle Selection</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Welcome, {currentUser?.name}
                    </span>
                    <button
                      onClick={handleBackToDashboard}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <VehicleListing onBookVehicle={handleVehicleSelection} />
            </div>
          </div>
        );
      
      case 'booking':
        return selectedVehicle ? (
          <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-semibold">RideShare Pro</h1>
                    <span className="text-muted-foreground">Book Vehicle</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Welcome, {currentUser?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <BookingSystem
                vehicle={selectedVehicle}
                onBookingComplete={handleBookingComplete}
                onCancel={handleBookingCancel}
              />
            </div>
          </div>
        ) : null;
      
      case 'booking-confirmation':
        return completedBooking ? (
          <BookingConfirmation
            bookingData={completedBooking}
            onBackToDashboard={handleBackToDashboard}
            onBookAnother={handleBookNewVehicle}
          />
        ) : null;
      
      default:
        return <AuthSystem onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
      <Toaster position="top-right" />
    </div>
  );
}