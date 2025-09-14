import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  CreditCard, 
  User, 
  Phone,
  MessageCircle,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'client';
}

interface Booking {
  id: string;
  vehicle: {
    name: string;
    image: string;
    type: string;
  };
  startDate: Date;
  duration: number;
  bookingType: 'hourly' | 'daily';
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
  total: number;
  pickupLocation: string;
}

interface ClientDashboardProps {
  user: User;
  onLogout: () => void;
  onBookNew: () => void;
}

export function ClientDashboard({ user, onLogout, onBookNew }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const bookings: Booking[] = [
    {
      id: 'BK123456789',
      vehicle: {
        name: 'Premium Mountain Bike',
        image: 'https://images.unsplash.com/photo-1697978243333-bb220e38bd5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiaWN5Y2xlJTIwYmlrZSUyMHJlbnRhbHxlbnwxfHx8fDE3NTY3OTYyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'bike'
      },
      startDate: new Date('2025-01-15T10:00:00'),
      duration: 3,
      bookingType: 'hourly',
      status: 'active',
      total: 45,
      pickupLocation: 'Downtown Area'
    },
    {
      id: 'BK987654321',
      vehicle: {
        name: 'Luxury Sedan',
        image: 'https://images.unsplash.com/photo-1581966451257-a5c7c5afa833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjB2ZWhpY2xlfGVufDF8fHx8MTc1Njc3Mzc0MXww&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'car'
      },
      startDate: new Date('2025-01-10T09:00:00'),
      duration: 2,
      bookingType: 'daily',
      status: 'completed',
      total: 560,
      pickupLocation: 'Airport Terminal'
    },
    {
      id: 'BK456789123',
      vehicle: {
        name: 'Electric Scooter',
        image: 'https://images.unsplash.com/photo-1742079451243-008231cb4853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHNjb290ZXIlMjBjeWNsZXxlbnwxfHx8fDE3NTY3OTYyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'cycle'
      },
      startDate: new Date('2025-01-20T14:00:00'),
      duration: 5,
      bookingType: 'hourly',
      status: 'confirmed',
      total: 40,
      pickupLocation: 'City Center'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'active':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'active' || b.status === 'confirmed');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const totalSpent = bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.total, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">Welcome back, {user.name}</h1>
                <p className="text-sm text-muted-foreground">Client Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={onBookNew} className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Book New Vehicle
              </Button>
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Bookings</p>
                      <p className="text-2xl font-bold">{activeBookings.length}</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Rides</p>
                      <p className="text-2xl font-bold">{bookings.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold">${totalSpent}</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                      <p className="text-2xl font-bold flex items-center gap-1">
                        4.9 <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Active Bookings</CardTitle>
                <CardDescription>Your current and upcoming rides</CardDescription>
              </CardHeader>
              <CardContent>
                {activeBookings.length > 0 ? (
                  <div className="space-y-4">
                    {activeBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <ImageWithFallback
                            src={booking.vehicle.image}
                            alt={booking.vehicle.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-medium">{booking.vehicle.name}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {booking.pickupLocation}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.startDate.toLocaleDateString()} at {booking.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={getStatusColor(booking.status) as any} className="flex items-center gap-1">
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No active bookings</p>
                    <Button onClick={onBookNew} className="mt-4">
                      Book Your First Ride
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>View and manage your vehicle bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={booking.vehicle.image}
                          alt={booking.vehicle.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="space-y-1">
                          <h4 className="font-medium">{booking.vehicle.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Booking ID: {booking.id}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {booking.pickupLocation}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.startDate.toLocaleDateString()} • {booking.duration} {booking.bookingType === 'hourly' ? 'hours' : 'days'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">${booking.total}</p>
                          <Badge variant={getStatusColor(booking.status) as any} className="flex items-center gap-1">
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ride History</CardTitle>
                <CardDescription>Your completed rides and experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={booking.vehicle.image}
                          alt={booking.vehicle.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{booking.vehicle.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.startDate.toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-sm ml-2">Excellent ride!</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${booking.total}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{user.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member Since:</span>
                      <span>January 2025</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Preferred Vehicle Types</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">🚗 Cars</Badge>
                      <Badge variant="outline">🏍️ Bikes</Badge>
                      <Badge variant="outline">🚲 Cycles</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Notification Settings</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Email notifications</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">SMS notifications</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Push notifications</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}