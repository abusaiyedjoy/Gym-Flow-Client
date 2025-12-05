"use client";

import { useState } from "react";
import { Scale, TrendingUp, TrendingDown, Calendar, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageComponents";

interface BodyMetric {
    id: string;
    date: string;
    weight: number;
    bodyFat: number;
    muscleMass: number;
    BMI: number;
}

const mockMetrics: BodyMetric[] = [
    {
        id: "M-001",
        date: "2024-12-01",
        weight: 185,
        bodyFat: 22,
        muscleMass: 144.3,
        BMI: 25.1,
    },
    {
        id: "M-002",
        date: "2024-11-01",
        weight: 190,
        bodyFat: 24,
        muscleMass: 144.4,
        BMI: 25.8,
    },
    {
        id: "M-003",
        date: "2024-10-01",
        weight: 195,
        bodyFat: 26,
        muscleMass: 144.3,
        BMI: 26.5,
    },
];

export default function MetricsPage() {
    const [metrics, setMetrics] = useState<BodyMetric[]>(mockMetrics);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split("T")[0],
        weight: "",
        bodyFat: "",
        muscleMass: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const weight = parseFloat(formData.weight);
        const bodyFat = parseFloat(formData.bodyFat);
        const muscleMass = parseFloat(formData.muscleMass);
        const heightInMeters = 1.75;
        const BMI = weight / (heightInMeters * heightInMeters);

        const newMetric: BodyMetric = {
            id: `M-${Date.now()}`,
            date: formData.date,
            weight,
            bodyFat,
            muscleMass,
            BMI: parseFloat(BMI.toFixed(1)),
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMetrics([newMetric, ...metrics]);
        setFormData({
            date: new Date().toISOString().split("T")[0],
            weight: "",
            bodyFat: "",
            muscleMass: "",
        });
        setIsSaving(false);
    };

    const calculateTrend = (current: number, previous: number) => {
        const change = current - previous;
        const isPositive = change < 0;
        return { change: Math.abs(change), isPositive };
    };

    const latestMetric = metrics[0];
    const previousMetric = metrics[1];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Body Metrics"
                description="Log and track your body measurements"
            />

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Log New Metrics Form */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Log New Measurements</CardTitle>
                        <CardDescription>
                            Enter your current body measurements
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) =>
                                                setFormData({ ...formData, date: e.target.value })
                                            }
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (lbs)</Label>
                                    <div className="relative">
                                        <Scale className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="weight"
                                            type="number"
                                            step="0.1"
                                            placeholder="185.5"
                                            value={formData.weight}
                                            onChange={(e) =>
                                                setFormData({ ...formData, weight: e.target.value })
                                            }
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bodyFat">Body Fat (%)</Label>
                                    <Input
                                        id="bodyFat"
                                        type="number"
                                        step="0.1"
                                        placeholder="22.5"
                                        value={formData.bodyFat}
                                        onChange={(e) =>
                                            setFormData({ ...formData, bodyFat: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="muscleMass">Muscle Mass (lbs)</Label>
                                    <Input
                                        id="muscleMass"
                                        type="number"
                                        step="0.1"
                                        placeholder="144.3"
                                        value={formData.muscleMass}
                                        onChange={(e) =>
                                            setFormData({ ...formData, muscleMass: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? (
                                        "Saving..."
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Metrics
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Current Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Current Stats</CardTitle>
                        <CardDescription>Your latest measurements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {latestMetric && previousMetric && (
                            <>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Weight</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{latestMetric.weight} lbs</span>
                                            {calculateTrend(latestMetric.weight, previousMetric.weight)
                                                .isPositive ? (
                                                <div className="flex items-center text-green-600 text-xs">
                                                    <TrendingDown className="h-3 w-3" />
                                                    {calculateTrend(latestMetric.weight, previousMetric.weight)
                                                        .change.toFixed(1)}
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-red-600 text-xs">
                                                    <TrendingUp className="h-3 w-3" />
                                                    {calculateTrend(latestMetric.weight, previousMetric.weight)
                                                        .change.toFixed(1)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Body Fat</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{latestMetric.bodyFat}%</span>
                                            {calculateTrend(latestMetric.bodyFat, previousMetric.bodyFat)
                                                .isPositive ? (
                                                <div className="flex items-center text-green-600 text-xs">
                                                    <TrendingDown className="h-3 w-3" />
                                                    {calculateTrend(latestMetric.bodyFat, previousMetric.bodyFat)
                                                        .change.toFixed(1)}
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-red-600 text-xs">
                                                    <TrendingUp className="h-3 w-3" />
                                                    {calculateTrend(latestMetric.bodyFat, previousMetric.bodyFat)
                                                        .change.toFixed(1)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Muscle Mass</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{latestMetric.muscleMass} lbs</span>
                                            {calculateTrend(
                                                previousMetric.muscleMass,
                                                latestMetric.muscleMass
                                            ).isPositive ? (
                                                <div className="flex items-center text-green-600 text-xs">
                                                    <TrendingUp className="h-3 w-3" />
                                                    {calculateTrend(
                                                        previousMetric.muscleMass,
                                                        latestMetric.muscleMass
                                                    ).change.toFixed(1)}
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-red-600 text-xs">
                                                    <TrendingDown className="h-3 w-3" />
                                                    {calculateTrend(
                                                        previousMetric.muscleMass,
                                                        latestMetric.muscleMass
                                                    ).change.toFixed(1)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">BMI</span>
                                        <span className="font-semibold">{latestMetric.BMI}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Metrics History */}
            <Card>
                <CardHeader>
                    <CardTitle>Metrics History</CardTitle>
                    <CardDescription>Your body measurements over time</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {metrics.map((metric, index) => (
                            <div
                                key={metric.id}
                                className="flex items-center justify-between p-4 border rounded-lg"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Scale className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {new Date(metric.date).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {index === 0 ? "Latest" : `${index} month${index > 1 ? "s" : ""} ago`}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 text-center">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Weight</p>
                                        <p className="font-semibold">{metric.weight}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Body Fat</p>
                                        <p className="font-semibold">{metric.bodyFat}%</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Muscle</p>
                                        <p className="font-semibold">{metric.muscleMass}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">BMI</p>
                                        <p className="font-semibold">{metric.BMI}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
