import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { User, Car, CreditCard, Shield } from "lucide-react";

interface AuthSystemProps {
  onLogin: (userType: 'driver' | 'client', userData: any) => void;
}

export function AuthSystem({ onLogin }: AuthSystemProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    licenseNumber: '',
    vehicleType: 'bike'
  });

  const handleSubmit = (userType: 'driver' | 'client') => {
    // Mock authentication
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      phone: formData.phone,
      userType,
      ...(userType === 'driver' && {
        licenseNumber: formData.licenseNumber,
        vehicleType: formData.vehicleType,
        rating: 4.8,
        totalRides: 156,
        status: 'active'
      })
    };
    onLogin(userType, userData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Car className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">RideShare Pro</h1>
          </div>
          <p className="text-gray-600">Premium vehicle rental and ride-sharing platform</p>
        </div>

        <Tabs defaultValue="client" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="client" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Client
            </TabsTrigger>
            <TabsTrigger value="driver" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Driver
            </TabsTrigger>
          </TabsList>

          {/* Client Login */}
          <TabsContent value="client">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Client {isLogin ? 'Login' : 'Registration'}
                </CardTitle>
                <CardDescription>
                  {isLogin ? 'Welcome back! Sign in to book your ride' : 'Create an account to start booking'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="client-name">Full Name</Label>
                      <Input
                        id="client-name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-phone">Phone Number</Label>
                      <Input
                        id="client-phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="client@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-password">Password</Label>
                  <Input
                    id="client-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  onClick={() => handleSubmit('client')} 
                  className="w-full"
                  disabled={!formData.email || !formData.password}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
                <div className="text-center space-y-2">
                  <Button 
                    variant="link" 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Secure
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    Payment Protected
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Driver Login */}
          <TabsContent value="driver">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Car className="h-5 w-5 text-green-600" />
                  Driver {isLogin ? 'Login' : 'Registration'}
                </CardTitle>
                <CardDescription>
                  {isLogin ? 'Welcome back driver! Access your dashboard' : 'Join our driver network today'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="driver-name">Full Name</Label>
                      <Input
                        id="driver-name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="driver-phone">Phone Number</Label>
                      <Input
                        id="driver-phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">Driver's License Number</Label>
                      <Input
                        id="license"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                        placeholder="DL123456789"
                      />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="driver-email">Email</Label>
                  <Input
                    id="driver-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="driver@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-password">Password</Label>
                  <Input
                    id="driver-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  onClick={() => handleSubmit('driver')} 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!formData.email || !formData.password}
                >
                  {isLogin ? 'Sign In' : 'Join as Driver'}
                </Button>
                <div className="text-center space-y-2">
                  <Button 
                    variant="link" 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm"
                  >
                    {isLogin ? "New driver? Join us" : "Already a driver? Sign in"}
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Verified
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    Instant Payouts
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Demo Credentials */}
        <Card className="w-full max-w-md mx-auto mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Demo Credentials</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div>
              <strong>Client:</strong> client@demo.com / password123
            </div>
            <div>
              <strong>Driver:</strong> driver@demo.com / password123
            </div>
          </CardContent>
        </Card>

        {/* Platform Overview */}
        <Card className="w-full max-w-md mx-auto mt-4">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              New to RideShare Pro? Watch our platform overview
            </p>
            <Button variant="outline" size="sm" className="w-full">
              📹 View Demo Video
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}