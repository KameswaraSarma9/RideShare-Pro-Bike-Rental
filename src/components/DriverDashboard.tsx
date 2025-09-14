import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Car, 
  DollarSign, 
  Star, 
  Clock, 
  MapPin, 
  User, 
  Phone,
  MessageCircle,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Navigation,
  Settings
} from "lucide-react";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'driver';
  licenseNumber: string;
  vehicleType: string;
  rating: number;
  totalRides: number;
  status: 'active' | 'inactive';
}

interface Ride {
  id: string;
  client: {
    name: string;
    rating: number;
  };
  pickup: string;
  dropoff: string;
  startTime: Date;
  duration: number;
  amount: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  vehicleType: string;
}

interface Earnings {
  today: number;
  week: number;
  month: number;
  total: number;
}

interface DriverDashboardProps {
  user: Driver;
  onLogout: () => void;
}

export function DriverDashboard({ user, onLogout }: DriverDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isOnline, setIsOnline] = useState(true);

  // Mock data
  const rides: Ride[] = [
    {
      id: 'RD123456',
      client: { name: 'John Smith', rating: 4.8 },
      pickup: 'Downtown Mall',
      dropoff: 'Airport Terminal',
      startTime: new Date('2025-01-15T14:30:00'),
      duration: 45,
      amount: 75,
      status: 'active',
      vehicleType: 'car'
    },
    {
      id: 'RD789012',
      client: { name: 'Sarah Johnson', rating: 4.9 },
      pickup: 'City Center',
      dropoff: 'Business District',
      startTime: new Date('2025-01-15T16:00:00'),
      duration: 30,
      amount: 45,
      status: 'pending',
      vehicleType: 'bike'
    },
    {
      id: 'RD345678',
      client: { name: 'Mike Davis', rating: 4.7 },
      pickup: 'University Campus',
      dropoff: 'Shopping Mall',
      startTime: new Date('2025-01-14T11:15:00'),
      duration: 25,
      amount: 35,
      status: 'completed',
      vehicleType: 'cycle'
    },
    {
      id: 'RD901234',
      client: { name: 'Emma Wilson', rating: 4.6 },
      pickup: 'Hotel District',
      dropoff: 'Train Station',
      startTime: new Date('2025-01-14T09:45:00'),
      duration: 20,
      amount: 28,
      status: 'completed',
      vehicleType: 'bike'
    }
  ];

  const earnings: Earnings = {
    today: 183,
    week: 1247,
    month: 4892,
    total: 15637
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'active':
        return <Navigation className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'outline';
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

  const activeRides = rides.filter(r => r.status === 'active' || r.status === 'pending');
  const completedRides = rides.filter(r => r.status === 'completed');
  const todayRides = rides.filter(r => 
    r.startTime.toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                <Car className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">Welcome back, {user.name}</h1>
                <p className="text-sm text-muted-foreground">Driver Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">{isOnline ? 'Online' : 'Offline'}</span>
                <Switch
                  checked={isOnline}
                  onCheckedChange={setIsOnline}
                />
                <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
              </div>
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
            <TabsTrigger value="rides">Active Rides</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
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
                      <p className="text-sm text-muted-foreground">Today's Earnings</p>
                      <p className="text-2xl font-bold">${earnings.today}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Rides</p>
                      <p className="text-2xl font-bold">{activeRides.length}</p>
                    </div>
                    <Navigation className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Driver Rating</p>
                      <p className="text-2xl font-bold flex items-center gap-1">
                        {user.rating} <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Rides</p>
                      <p className="text-2xl font-bold">{user.totalRides}</p>
                    </div>
                    <Car className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Driver Status
                  <Badge variant={isOnline ? "default" : "secondary"}>
                    {isOnline ? 'Online & Available' : 'Offline'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isOnline ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Car className={`h-6 w-6 ${isOnline ? 'text-green-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <p className="font-medium">
                        {isOnline ? 'Ready to accept rides' : 'Currently offline'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isOnline ? 'You will receive ride requests' : 'Turn online to start earning'}
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => setIsOnline(!isOnline)}>
                    {isOnline ? 'Go Offline' : 'Go Online'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Rides */}
            <Card>
              <CardHeader>
                <CardTitle>Active Rides</CardTitle>
                <CardDescription>Your current and pending rides</CardDescription>
              </CardHeader>
              <CardContent>
                {activeRides.length > 0 ? (
                  <div className="space-y-4">
                    {activeRides.map((ride) => (
                      <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{ride.client.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {ride.pickup} → {ride.dropoff}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {ride.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {ride.duration} min • ${ride.amount}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(ride.status) as any} className="flex items-center gap-1">
                            {getStatusIcon(ride.status)}
                            {ride.status}
                          </Badge>
                          <Button size="sm" variant={ride.status === 'pending' ? 'default' : 'outline'}>
                            {ride.status === 'pending' ? 'Accept' : 'Navigate'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Navigation className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {isOnline ? 'No active rides. Waiting for requests...' : 'Go online to receive ride requests'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rides Tab */}
          <TabsContent value="rides" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ride Management</CardTitle>
                <CardDescription>View and manage your ride requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium">{ride.client.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Ride ID: {ride.id}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {ride.pickup} → {ride.dropoff}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {ride.startTime.toLocaleDateString()} • {ride.duration} min • {ride.vehicleType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">${ride.amount}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{ride.client.rating}</span>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(ride.status) as any} className="flex items-center gap-1">
                          {getStatusIcon(ride.status)}
                          {ride.status}
                        </Badge>
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

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Today</p>
                      <p className="text-xl font-bold">${earnings.today}</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <p className="text-xl font-bold">${earnings.week}</p>
                    </div>
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-xl font-bold">${earnings.month}</p>
                    </div>
                    <DollarSign className="h-6 w-6 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earned</p>
                      <p className="text-xl font-bold">${earnings.total}</p>
                    </div>
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
                <CardDescription>Detailed view of your earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Completed Rides</span>
                    <span className="font-medium">${completedRides.reduce((sum, ride) => sum + ride.amount, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>Tips Received</span>
                    <span className="font-medium">$47</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>Bonuses</span>
                    <span className="font-medium">$25</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ride History</CardTitle>
                <CardDescription>Your completed rides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{ride.client.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {ride.pickup} → {ride.dropoff}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {ride.startTime.toLocaleDateString()} • {ride.duration} min
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${ride.amount}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{ride.client.rating}</span>
                        </div>
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
                  <CardTitle>Driver Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center">
                      <Car className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{user.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License Number:</span>
                      <span>{user.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vehicle Type:</span>
                      <span className="capitalize">{user.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Rides:</span>
                      <span>{user.totalRides}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member Since:</span>
                      <span>January 2025</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vehicle & Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Vehicle Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="capitalize">{user.vehicleType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Driver Preferences</h4>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between">
                        <span className="text-sm">Accept long distance rides</span>
                        <Switch defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm">Auto-accept rides</span>
                        <Switch />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm">Weekend availability</span>
                        <Switch defaultChecked />
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