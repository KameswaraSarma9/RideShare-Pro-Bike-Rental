import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, Pause, Volume2, VolumeX, Maximize, Users, Car, Shield, Clock } from "lucide-react";

interface PromoVideoProps {
  onClose?: () => void;
}

export function PromoVideo({ onClose }: PromoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 180; // 3 minutes

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const features = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Dual User System",
      description: "Separate interfaces for drivers and clients with role-specific features"
    },
    {
      icon: <Car className="h-5 w-5" />,
      title: "Multi-Vehicle Fleet",
      description: "Bikes, cars, and cycles available for different transportation needs"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Secure Payments",
      description: "Multiple payment options with bank-level security"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Flexible Booking",
      description: "Hourly or daily rentals with instant confirmation"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Video Player */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-gray-900 aspect-video">
            {/* Video Thumbnail/Placeholder */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1621691187532-bbeb671757ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGNhbGwlMjBtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU2Nzk2NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="RideShare Pro Demo Video"
              className={`w-full h-full object-cover transition-opacity ${isPlaying ? 'opacity-50' : 'opacity-100'}`}
            />
            
            {/* Play Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Button
                  size="lg"
                  className="h-16 w-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  onClick={handlePlayPause}
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </Button>
              </div>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    HD Quality
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-2">
                <div className="w-full bg-white/30 rounded-full h-1">
                  <div 
                    className="bg-blue-500 h-1 rounded-full transition-all"
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Video Title Overlay */}
            <div className="absolute top-4 left-4">
              <h3 className="text-white text-lg font-semibold">RideShare Pro - Platform Overview</h3>
              <p className="text-white/80 text-sm">Complete tour of features and capabilities</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Description */}
      <Card>
        <CardHeader>
          <CardTitle>About This Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Get a comprehensive overview of RideShare Pro's features, including the dual authentication system, 
            vehicle booking process, payment integration, and dashboard functionalities for both drivers and clients.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Chapters */}
      <Card>
        <CardHeader>
          <CardTitle>Video Chapters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '0:00', title: 'Introduction & Platform Overview', duration: '30s' },
              { time: '0:30', title: 'User Authentication System', duration: '45s' },
              { time: '1:15', title: 'Vehicle Browsing & Selection', duration: '40s' },
              { time: '1:55', title: 'Booking Process & Payment', duration: '50s' },
              { time: '2:45', title: 'Dashboard Features & Management', duration: '35s' }
            ].map((chapter, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground w-12">{chapter.time}</span>
                  <span className="text-sm">{chapter.title}</span>
                </div>
                <Badge variant="outline" className="text-xs">{chapter.duration}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1">
          Start Free Trial
        </Button>
        <Button variant="outline" className="flex-1">
          Download App
        </Button>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    </div>
  );
}