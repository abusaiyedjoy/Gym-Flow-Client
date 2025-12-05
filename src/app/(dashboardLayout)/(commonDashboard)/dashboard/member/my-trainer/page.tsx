"use client";

import { useState } from "react";
import { Dumbbell, Mail, Phone, Calendar, Star, Award, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  specialization: string[];
  experience: number;
  rating: number;
  totalClients: number;
  bio: string;
  certifications: string[];
  assignedDate: string;
}

interface UpcomingSession {
  id: string;
  date: string;
  time: string;
  type: string;
  location: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

const mockTrainer: Trainer = {
  id: "T-001",
  name: "David Martinez",
  email: "david.martinez@gym.com",
  phone: "+1 234 567 8900",
  profileImage: "/trainers/david.jpg",
  specialization: ["Strength Training", "Weight Loss", "Muscle Gain"],
  experience: 8,
  rating: 4.9,
  totalClients: 45,
  bio: "Certified personal trainer with 8 years of experience in strength training and body transformation. Passionate about helping clients achieve their fitness goals through personalized workout plans and nutritional guidance.",
  certifications: [
    "NASM Certified Personal Trainer",
    "Precision Nutrition Level 1",
    "CrossFit Level 2 Trainer",
    "Sports Nutrition Specialist",
  ],
  assignedDate: "2024-01-15",
};

const mockSessions: UpcomingSession[] = [
  {
    id: "S-001",
    date: "2024-12-06",
    time: "09:00 AM",
    type: "Personal Training",
    location: "Gym Floor - Zone A",
    status: "Scheduled",
  },
  {
    id: "S-002",
    date: "2024-12-09",
    time: "09:00 AM",
    type: "Personal Training",
    location: "Gym Floor - Zone A",
    status: "Scheduled",
  },
  {
    id: "S-003",
    date: "2024-12-11",
    time: "09:00 AM",
    type: "Personal Training",
    location: "Gym Floor - Zone A",
    status: "Scheduled",
  },
];

export default function MyTrainerPage() {
  const [trainer] = useState<Trainer>(mockTrainer);
  const [sessions] = useState<UpcomingSession[]>(mockSessions);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Trainer"
        description="Your assigned personal trainer and training sessions"
      />

      {/* Trainer Profile Card */}
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={trainer.profileImage} alt={trainer.name} />
              <AvatarFallback className="text-2xl">
                {trainer.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{trainer.name}</h2>
                <p className="text-muted-foreground">Personal Trainer</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {trainer.specialization.map((spec) => (
                  <Badge key={spec} className="bg-primary/10 text-primary">
                    {spec}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center md:justify-start">
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {trainer.experience} years experience
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {trainer.rating} rating
                </div>
                <div className="flex items-center gap-1">
                  <Dumbbell className="h-4 w-4" />
                  {trainer.totalClients} clients
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* About Trainer */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-muted-foreground">{trainer.bio}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{trainer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{trainer.phone}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Certifications</h4>
              <ul className="space-y-2">
                {trainer.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Award className="h-4 w-4 text-primary mt-0.5" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Assigned since {new Date(trainer.assignedDate).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled training sessions</CardDescription>
              </div>
              <Badge>{sessions.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold">{session.type}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {session.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Dumbbell className="h-3 w-3" />
                        {session.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{session.status}</Badge>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View All Sessions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Training Statistics</CardTitle>
          <CardDescription>Your progress with {trainer.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Total Sessions</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">This Month</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Completed</p>
              <p className="text-2xl font-bold">21</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Upcoming</p>
              <p className="text-2xl font-bold">{sessions.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}