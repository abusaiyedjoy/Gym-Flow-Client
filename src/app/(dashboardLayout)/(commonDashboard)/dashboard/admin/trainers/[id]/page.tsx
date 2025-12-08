"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Calendar,
  Award,
  Users,
  Star,
  Loader2,
  AlertCircle,
  Dumbbell,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrainerService } from "@/services/trainer/trainer.service";
import { Trainer } from "@/types/trainer.types";

const getStatusColor = (isActive: boolean) => {
  return isActive ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500";
};

const formatDate = (date: string | null | undefined) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};

const calculateDaysSince = (date: string | null | undefined) => {
  if (!date) return 0;
  const start = new Date(date);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const getDayOfWeekLabel = (day: string) => {
  return day.charAt(0) + day.slice(1).toLowerCase();
};

export default function TrainerDetailPage() {
  const params = useParams();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await TrainerService.getTrainerById(params.id as string);
        setTrainer(data);
      } catch (err: any) {
        setError(err.message || "Failed to load trainer details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTrainer();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !trainer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-muted-foreground">{error || "Trainer not found"}</p>
        <Link href="/admin/trainers">
          <Button variant="outline">Back to Trainers</Button>
        </Link>
      </div>
    );
  }

  const capacityPercentage = (trainer.currentClients / trainer.maxCapacity) * 100;
  const daysWorking = calculateDaysSince(trainer.joinDate);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/trainers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader
          title={trainer.user.name}
          description={`Trainer ID: ${trainer.employeeId}`}
        />
        <div className="ml-auto">
          <Link href={`/admin/trainers/${trainer.id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Trainer
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={trainer.user.profileImage || undefined} />
              <AvatarFallback className="text-2xl bg-purple-600 text-white">
                {trainer.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={getStatusColor(trainer.user.isActive)}>
                  {trainer.user.isActive ? "Active" : "Inactive"}
                </Badge>
                {trainer.isAvailable && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Available
                  </Badge>
                )}
                <Badge variant="secondary">
                  {trainer.experienceYears} Years Experience
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{trainer.user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{trainer.user.phone || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Joined {formatDate(trainer.joinDate)}</span>
                </div>
              </div>

              {trainer.bio && (
                <p className="text-sm text-muted-foreground">{trainer.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainer.rating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              {trainer.reviewCount} reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainer.currentClients} / {trainer.maxCapacity}
            </div>
            <Progress value={capacityPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainer.totalClients}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Working</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysWorking}</div>
            <p className="text-xs text-muted-foreground">Since joining</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="specializations">Specializations</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="members">Members ({trainer.members?.length || 0})</TabsTrigger>
          <TabsTrigger value="classes">Classes ({trainer.classes?.length || 0})</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({trainer.reviews?.length || 0})</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Employee ID</span>
                  <span className="text-sm font-medium">{trainer.employeeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Experience</span>
                  <span className="text-sm font-medium">{trainer.experienceYears} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Max Capacity</span>
                  <span className="text-sm font-medium">{trainer.maxCapacity} clients</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="text-sm font-medium">{trainer.successRate}%</span>
                </div>
                {trainer.salary && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Salary</span>
                    <span className="text-sm font-medium">${trainer.salary}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {trainer.languages.map((lang, index) => (
                      <Badge key={index} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                {trainer.certifications && trainer.certifications.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Specializations Tab */}
        <TabsContent value="specializations">
          <Card>
            <CardHeader>
              <CardTitle>Specializations</CardTitle>
              <CardDescription>Areas of expertise</CardDescription>
            </CardHeader>
            <CardContent>
              {trainer.specializations && trainer.specializations.length > 0 ? (
                <div className="space-y-4">
                  {trainer.specializations.map((spec, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{spec.specialization.replace(/_/g, " ")}</p>
                        <p className="text-sm text-muted-foreground">
                          {spec.yearsOfExperience} years experience
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Level</span>
                        <Badge variant="secondary">{spec.proficiencyLevel}/10</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No specializations added yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Availability Tab */}
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Availability</CardTitle>
              <CardDescription>Trainer's available time slots</CardDescription>
            </CardHeader>
            <CardContent>
              {trainer.availability && trainer.availability.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainer.availability.map((avail, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {getDayOfWeekLabel(avail.dayOfWeek)}
                        </TableCell>
                        <TableCell>{avail.startTime}</TableCell>
                        <TableCell>{avail.endTime}</TableCell>
                        <TableCell>
                          <Badge variant={avail.isAvailable ? "default" : "secondary"}>
                            {avail.isAvailable ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No availability schedule set</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Members</CardTitle>
              <CardDescription>Members training with this trainer</CardDescription>
            </CardHeader>
            <CardContent>
              {trainer.members && trainer.members.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainer.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.user.name}</TableCell>
                        <TableCell>{member.user.email}</TableCell>
                        <TableCell>{member.currentPlan?.name || "No Plan"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No members assigned yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Classes Tab */}
        <TabsContent value="classes">
          <Card>
            <CardHeader>
              <CardTitle>Classes</CardTitle>
              <CardDescription>Classes conducted by this trainer</CardDescription>
            </CardHeader>
            <CardContent>
              {trainer.classes && trainer.classes.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Schedules</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainer.classes.map((classItem) => (
                      <TableRow key={classItem.id}>
                        <TableCell className="font-medium">{classItem.name}</TableCell>
                        <TableCell>
                          <Badge variant={classItem.isActive ? "default" : "secondary"}>
                            {classItem.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{classItem.schedules?.length || 0} schedules</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No classes assigned yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Member Reviews</CardTitle>
              <CardDescription>Feedback from members</CardDescription>
            </CardHeader>
            <CardContent>
              {trainer.reviews && trainer.reviews.length > 0 ? (
                <div className="space-y-4">
                  {trainer.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.member.user.profileImage || undefined} />
                            <AvatarFallback>
                              {review.member.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{review.member.user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(review.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
