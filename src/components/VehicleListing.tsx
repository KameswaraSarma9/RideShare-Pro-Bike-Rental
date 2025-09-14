import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, MapPin, Clock, Users, Fuel, Zap } from "lucide-react";

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

interface VehicleListingProps {
  onBookVehicle: (vehicle: Vehicle) => void;
}

export function VehicleListing({ onBookVehicle }: VehicleListingProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'bike' | 'car' | 'cycle'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name'>('price');

  const vehicles: Vehicle[] = [
    {
      id: '1',
      type: 'bike',
      name: 'Premium Mountain Bike',
      image: 'https://images.unsplash.com/photo-1697978243333-bb220e38bd5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiaWN5Y2xlJTIwYmlrZSUyMHJlbnRhbHxlbnwxfHx8fDE3NTY3OTYyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      pricePerHour: 15,
      pricePerDay: 120,
      rating: 4.8,
      location: 'Downtown Area',
      available: true,
      features: ['GPS Tracking', 'Helmet Included', 'Anti-theft Lock'],
      specs: { range: '50km range' },
      description: 'High-quality mountain bike perfect for city rides and light trails.'
    },
    {
      id: '2',
      type: 'car',
      name: 'Luxury Sedan',
      image: 'https://images.unsplash.com/photo-1581966451257-a5c7c5afa833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjB2ZWhpY2xlfGVufDF8fHx8MTc1Njc3Mzc0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      pricePerHour: 45,
      pricePerDay: 280,
      rating: 4.9,
      location: 'Airport Terminal',
      available: true,
      features: ['Premium Interior', 'GPS Navigation', 'Bluetooth Audio', 'Climate Control'],
      specs: { seats: 5, fuelType: 'Hybrid', transmission: 'Automatic' },
      description: 'Comfortable luxury sedan with premium features for business and leisure travel.'
    },
    {
      id: '3',
      type: 'cycle',
      name: 'Electric Scooter',
      image: 'https://images.unsplash.com/photo-1742079451243-008231cb4853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHNjb290ZXIlMjBjeWNsZXxlbnwxfHx8fDE3NTY3OTYyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      pricePerHour: 8,
      pricePerDay: 65,
      rating: 4.6,
      location: 'City Center',
      available: true,
      features: ['Fast Charging', 'App Control', 'LED Lights'],
      specs: { range: '30km range' },
      description: 'Eco-friendly electric scooter perfect for short city commutes.'
    },
    {
      id: '4',
      type: 'bike',
      name: 'Sports Motorcycle',
      image: 'https://images.unsplash.com/photo-1694566323531-9c8191642ecf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMGRyaXZlciUyMG1vdG9yY3ljbGV8ZW58MXx8fHwxNzU2Nzk2MjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      pricePerHour: 35,
      pricePerDay: 220,
      rating: 4.7,
      location: 'Sports Complex',
      available: false,
      features: ['High Performance', 'Safety Gear Included', 'Insurance Coverage'],
      specs: { fuelType: 'Petrol', transmission: 'Manual' },
      description: 'High-performance sports motorcycle for thrill seekers and experienced riders.'
    },
    {
      id: '5',
      type: 'car',
      name: 'Compact Electric Car',
      image: 'https://images.unsplash.com/photo-1581966451257-a5c7c5afa833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjB2ZWhpY2xlfGVufDF8fHx8MTc1Njc3Mzc0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      pricePerHour: 25,
      pricePerDay: 180,
      rating: 4.5,
      location: 'Eco Station',
      available: true,
      features: ['Zero Emissions', 'Fast Charging', 'Smart Features'],
      specs: { seats: 4, fuelType: 'Electric', transmission: 'Automatic', range: '300km range' },
      description: 'Eco-friendly compact electric car perfect for city driving and environmental consciousness.'
    },
    {
      id: '6',
      type: 'cycle',
      name: 'City E-Bike',
      image: 'https://images.unsplash.com/photo-1697978243333-bb220e38bd5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiaWN5Y2xlJTIwYmlrZSUyMHJlbnRhbHxlbnwxfHx8fDE3NTY3OTYyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      pricePerHour: 12,
      pricePerDay: 90,
      rating: 4.4,
      location: 'Park Area',
      available: true,
      features: ['Electric Assist', 'Basket Included', 'Comfort Seat'],
      specs: { range: '40km range' },
      description: 'Comfortable electric bike ideal for leisurely rides and daily commuting.'
    }
  ];

  const filteredVehicles = vehicles
    .filter(vehicle => selectedType === 'all' || vehicle.type === selectedType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerHour - b.pricePerHour;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bike':
        return '🏍️';
      case 'car':
        return '🚗';
      case 'cycle':
        return '🚲';
      default:
        return '🚀';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl">Available Vehicles</h2>
          <p className="text-muted-foreground">Choose from our premium fleet</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Types</option>
            <option value="bike">Bikes</option>
            <option value="car">Cars</option>
            <option value="cycle">Cycles</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className={`overflow-hidden transition-all hover:shadow-lg ${!vehicle.available ? 'opacity-60' : ''}`}>
            <div className="relative">
              <ImageWithFallback
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge variant={vehicle.available ? "default" : "secondary"}>
                  {vehicle.available ? 'Available' : 'Rented'}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-white/90">
                  {getTypeIcon(vehicle.type)} {vehicle.type}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {vehicle.location}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{vehicle.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{vehicle.description}</p>
              
              {/* Specs */}
              <div className="flex flex-wrap gap-2">
                {vehicle.specs.seats && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {vehicle.specs.seats} seats
                  </Badge>
                )}
                {vehicle.specs.fuelType && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    {vehicle.specs.fuelType === 'Electric' ? <Zap className="h-3 w-3" /> : <Fuel className="h-3 w-3" />}
                    {vehicle.specs.fuelType}
                  </Badge>
                )}
                {vehicle.specs.range && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {vehicle.specs.range}
                  </Badge>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-sm">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {vehicle.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="flex justify-between items-center pt-2 border-t">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">${vehicle.pricePerHour}/hour</span>
                    <span className="text-sm text-muted-foreground">
                      ${vehicle.pricePerDay}/day
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => onBookVehicle(vehicle)}
                  disabled={!vehicle.available}
                  className="flex items-center gap-2"
                >
                  {vehicle.available ? 'Book Now' : 'Unavailable'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No vehicles available for the selected criteria.</p>
        </div>
      )}
    </div>
  );
}