"use client";

import { useState } from "react";
import { Calendar, Clock, User, MapPin, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/PageComponents";

interface ScheduleEvent {
    id: string;
    title: string;
    clientName: string;
    clientImage?: string;
    type: "Personal Training" | "Group Class" | "Consultation";
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    status: "Confirmed" | "Pending" | "Completed";
}

const mockSchedule: ScheduleEvent[] = [
    {
        id: "S-001",
        title: "Personal Training Session",
        clientName: "John Doe",
        clientImage: "/members/john.jpg",
        type: "Personal Training",
        date: "2024-12-06",
        startTime: "09:00",
        endTime: "10:00",
        location: "Gym Floor - Zone A",
        status: "Confirmed",
    },
    {
        id: "S-002",
        title: "HIIT Cardio Blast",
        clientName: "Group Class",
        type: "Group Class",
        date: "2024-12-06",
        startTime: "11:00",
        endTime: "11:45",
        location: "Studio A",
        status: "Confirmed",
    },
    {
        id: "S-003",
        title: "Personal Training Session",
        clientName: "Sarah Johnson",
        clientImage: "/members/sarah.jpg",
        type: "Personal Training",
        date: "2024-12-06",
        startTime: "14:00",
        endTime: "15:00",
        location: "Gym Floor - Zone A",
        status: "Confirmed",
    },
    {
        id: "S-004",
        title: "Fitness Consultation",
        clientName: "Michael Chen",
        clientImage: "/members/michael.jpg",
        type: "Consultation",
        date: "2024-12-07",
        startTime: "10:00",
        endTime: "10:30",
        location: "Office",
        status: "Pending",
    },
    {
        id: "S-005",
        title: "Personal Training Session",
        clientName: "Emily Rodriguez",
        clientImage: "/members/emily.jpg",
        type: "Personal Training",
        date: "2024-12-07",
        startTime: "16:00",
        endTime: "17:00",
        location: "Gym Floor - Zone A",
        status: "Confirmed",
    },
];

export default function SchedulePage() {
    const [schedule] = useState<ScheduleEvent[]>(mockSchedule);
    const [selectedDate, setSelectedDate] = useState(new Date("2024-12-06"));

    const todayEvents = schedule.filter(
        (event) => event.date === selectedDate.toISOString().split("T")[0]
    );

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Personal Training":
                return "bg-primary/10 text-primary";
            case "Group Class":
                return "bg-green-500/10 text-green-700 dark:text-green-400";
            case "Consultation":
                return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
            default:
                return "";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Confirmed":
                return "bg-green-500/10 text-green-700 dark:text-green-400";
            case "Pending":
                return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
            case "Completed":
                return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
            default:
                return "";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="My Schedule"
                    description="View and manage your training sessions"
                />
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Session
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Today's Sessions</p>
                            <p className="text-2xl font-bold">{todayEvents.length}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">This Week</p>
                            <p className="text-2xl font-bold">18</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total Hours</p>
                            <p className="text-2xl font-bold">24</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Pending</p>
                            <p className="text-2xl font-bold">
                                {schedule.filter((s) => s.status === "Pending").length}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Calendar */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Calendar</CardTitle>
                            <div className="flex gap-1">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setSelectedDate(
                                            new Date(selectedDate.setDate(selectedDate.getDate() - 1))
                                        )
                                    }
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setSelectedDate(
                                            new Date(selectedDate.setDate(selectedDate.getDate() + 1))
                                        )
                                    }
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <CardDescription>
                            {selectedDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-sm font-semibold">
                                {todayEvents.length} session{todayEvents.length !== 1 ? "s" : ""} scheduled
                            </p>
                            <div className="space-y-2">
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                                    const dayEvents = schedule.filter((event) => {
                                        const eventDate = new Date(event.date);
                                        return eventDate.getDay() === index + 1;
                                    });
                                    return (
                                        <div
                                            key={day}
                                            className="flex items-center justify-between p-2 border rounded hover:bg-muted/50 cursor-pointer"
                                        >
                                            <span className="font-semibold">{day}</span>
                                            <Badge variant="secondary">{dayEvents.length}</Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Today's Schedule */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Today's Schedule</CardTitle>
                        <CardDescription>
                            {selectedDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                            })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {todayEvents.length === 0 ? (
                                <div className="text-center py-12">
                                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No sessions scheduled for this day</p>
                                </div>
                            ) : (
                                todayEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex flex-col items-center gap-1 min-w-[60px]">
                                            <p className="text-sm font-semibold">{event.startTime}</p>
                                            <div className="h-8 w-px bg-border" />
                                            <p className="text-sm text-muted-foreground">{event.endTime}</p>
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-semibold">{event.title}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        {event.type === "Personal Training" ? (
                                                            <div className="flex items-center gap-2">
                                                                <Avatar className="h-6 w-6">
                                                                    <AvatarImage src={event.clientImage} />
                                                                    <AvatarFallback>
                                                                        {event.clientName
                                                                            .split(" ")
                                                                            .map((n) => n[0])
                                                                            .join("")}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <span className="text-sm text-muted-foreground">
                                                                    {event.clientName}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm text-muted-foreground">
                                                                {event.clientName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                                                    <Badge className={getStatusColor(event.status)}>
                                                        {event.status}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Sessions */}
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>Next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {schedule.slice(0, 5).map((event) => (
                            <div
                                key={event.id}
                                className="flex items-center justify-between p-3 border rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Calendar className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{event.title}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(event.date).toLocaleDateString()} • {event.startTime} -{" "}
                                            {event.endTime}
                                        </p>
                                    </div>
                                </div>
                                <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
