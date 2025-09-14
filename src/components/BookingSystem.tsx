import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Calendar } from "./ui/calendar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  CreditCard, 
  Shield, 
  CheckCircle,
  Star,
  Users,
  Phone,
  MessageCircle
} from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  image: string;
  pricePerHour: number;
  pricePerDay: number;
  rating: number;
  location: string;
  type: string;
}

interface BookingSystemProps {
  vehicle: Vehicle;
  onBookingComplete: (bookingData: any) => void;
  onCancel: () => void;
}

export function BookingSystem({ vehicle, onBookingComplete, onCancel }: BookingSystemProps) {
  const [bookingType, setBookingType] = useState<'hourly' | 'daily'>('hourly');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'cash'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    const basePrice = bookingType === 'hourly' ? vehicle.pricePerHour : vehicle.pricePerDay;
    const subtotal = basePrice * duration;
    const tax = subtotal * 0.12; // 12% tax
    const serviceFee = 5;
    return {
      subtotal,
      tax,
      serviceFee,
      total: subtotal + tax + serviceFee
    };
  };

  const pricing = calculateTotal();

  const handleBookingSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const bookingData = {
      id: `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      vehicle,
      bookingType,
      startDate,
      duration,
      pickupLocation,
      dropoffLocation,
      specialRequests,
      paymentMethod,
      pricing,
      status: 'confirmed',
      createdAt: new Date()
    };

    onBookingComplete(bookingData);
    setIsProcessing(false);
  };

  const steps = [
    { number: 1, title: 'Booking Details', description: 'Select dates and duration' },
    { number: 2, title: 'Locations', description: 'Pickup and drop-off' },
    { number: 3, title: 'Payment', description: 'Complete your booking' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Book Vehicle</h2>
          <p className="text-muted-foreground">Complete your booking in 3 easy steps</p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              currentStep >= step.number 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'border-gray-300 text-gray-300'
            }`}>
              {currentStep > step.number ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                step.number
              )}
            </div>
            <div className="ml-2 hidden sm:block">
              <p className="text-sm font-medium">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 h-0.5 bg-gray-300 mx-4"></div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Booking Details */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Booking Type */}
                <div className="space-y-3">
                  <Label>Rental Duration Type</Label>
                  <div className="flex gap-4">
                    <Button
                      variant={bookingType === 'hourly' ? 'default' : 'outline'}
                      onClick={() => setBookingType('hourly')}
                      className="flex-1"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Hourly (${vehicle.pricePerHour}/hr)
                    </Button>
                    <Button
                      variant={bookingType === 'daily' ? 'default' : 'outline'}
                      onClick={() => setBookingType('daily')}
                      className="flex-1"
                    >
                      <CalendarDays className="h-4 w-4 mr-2" />
                      Daily (${vehicle.pricePerDay}/day)
                    </Button>
                  </div>
                </div>

                {/* Start Date */}
                <div className="space-y-3">
                  <Label>Start Date & Time</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={startDate.toISOString().split('T')[0]}
                      onChange={(e) => setStartDate(new Date(e.target.value))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Input
                      type="time"
                      defaultValue="09:00"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <Label>Duration ({bookingType === 'hourly' ? 'hours' : 'days'})</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDuration(Math.max(1, duration - 1))}
                      disabled={duration <= 1}
                    >
                      -
                    </Button>
                    <span className="w-16 text-center font-medium">{duration}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDuration(duration + 1)}
                    >
                      +
                    </Button>
                    <span className="text-sm text-muted-foreground ml-auto">
                      {bookingType === 'hourly' ? `${duration} hour(s)` : `${duration} day(s)`}
                    </span>
                  </div>
                </div>

                <Button onClick={() => setCurrentStep(2)} className="w-full">
                  Continue to Locations
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Locations */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Pickup & Drop-off Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Enter pickup address or select from map"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="dropoff">Drop-off Location</Label>
                  <Input
                    id="dropoff"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder="Enter drop-off address (optional for same location)"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests or instructions for the driver..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="flex-1">
                    Continue to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('card')}
                    className="flex flex-col items-center p-4 h-auto"
                  >
                    <CreditCard className="h-6 w-6 mb-2" />
                    Credit Card
                  </Button>
                  <Button
                    variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('wallet')}
                    className="flex flex-col items-center p-4 h-auto"
                  >
                    <Phone className="h-6 w-6 mb-2" />
                    Digital Wallet
                  </Button>
                  <Button
                    variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('cash')}
                    className="flex flex-col items-center p-4 h-auto"
                  >
                    <Shield className="h-6 w-6 mb-2" />
                    Pay on Pickup
                  </Button>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="space-y-3">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-muted-foreground">You will be redirected to your digital wallet to complete the payment.</p>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-muted-foreground mb-2">Pay when you pick up the vehicle:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Cash payment accepted</li>
                      <li>• Exact amount preferred</li>
                      <li>• Valid ID required</li>
                    </ul>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={handleBookingSubmit} 
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Complete Booking ($${pricing.total.toFixed(2)})`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Booking Summary Sidebar */}
        <div className="space-y-6">
          {/* Vehicle Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <ImageWithFallback
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{vehicle.name}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {vehicle.location}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{vehicle.rating}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>{bookingType === 'hourly' ? 'Hourly Rate' : 'Daily Rate'}</span>
                <span>${bookingType === 'hourly' ? vehicle.pricePerHour : vehicle.pricePerDay}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{duration} {bookingType === 'hourly' ? 'hour(s)' : 'day(s)'}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${pricing.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Service Fee</span>
                <span>${pricing.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax (12%)</span>
                <span>${pricing.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${pricing.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}