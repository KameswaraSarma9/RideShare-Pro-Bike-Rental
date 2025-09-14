import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  CreditCard, 
  Phone, 
  MessageCircle,
  Download,
  Star,
  Navigation
} from "lucide-react";

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

interface BookingConfirmationProps {
  bookingData: BookingData;
  onBackToDashboard: () => void;
  onBookAnother: () => void;
}

export function BookingConfirmation({ bookingData, onBackToDashboard, onBookAnother }: BookingConfirmationProps) {
  const estimatedPickupTime = new Date(bookingData.startDate.getTime() + 15 * 60000); // 15 minutes from booking time

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Success Header */}
        <Card className="text-center border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
            <p className="text-green-700">Your vehicle has been successfully booked</p>
            <Badge variant="default" className="mt-4 bg-green-600">
              Booking ID: {bookingData.id}
            </Badge>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vehicle Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <ImageWithFallback
                src={bookingData.vehicle.image}
                alt={bookingData.vehicle.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{bookingData.vehicle.name}</h3>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {bookingData.vehicle.location}
                </p>
                <Badge variant="outline" className="mt-1">
                  {bookingData.vehicle.type}
                </Badge>
              </div>
            </div>

            {/* Timing Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Rental Period
                </h4>
                <div className="text-sm space-y-1">
                  <p><strong>Start:</strong> {bookingData.startDate.toLocaleDateString()} at {bookingData.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p><strong>Duration:</strong> {bookingData.duration} {bookingData.bookingType === 'hourly' ? 'hours' : 'days'}</p>
                  <p><strong>Type:</strong> {bookingData.bookingType === 'hourly' ? 'Hourly Rental' : 'Daily Rental'}</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Pickup Details
                </h4>
                <div className="text-sm space-y-1">
                  <p><strong>Pickup:</strong> {bookingData.pickupLocation}</p>
                  <p><strong>Estimated Time:</strong> {estimatedPickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  {bookingData.dropoffLocation && (
                    <p><strong>Drop-off:</strong> {bookingData.dropoffLocation}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Summary */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Summary
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${bookingData.pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span>${bookingData.pricing.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${bookingData.pricing.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total Paid</span>
                  <span>${bookingData.pricing.total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Paid via {bookingData.paymentMethod}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card>
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Before Pickup:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Bring a valid driver's license</li>
                  <li>• Arrive 10 minutes early</li>
                  <li>• Check your phone for driver contact</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-sm">During Rental:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Follow all traffic rules</li>
                  <li>• Keep the vehicle clean</li>
                  <li>• Report any issues immediately</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Star className="h-4 w-4 mr-2" />
                Rate Experience
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={onBackToDashboard} variant="outline" className="flex-1">
            Back to Dashboard
          </Button>
          <Button onClick={onBookAnother} className="flex-1">
            Book Another Vehicle
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Thank you for choosing RideShare Pro!</p>
          <p>Booking confirmed at {bookingData.createdAt.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}