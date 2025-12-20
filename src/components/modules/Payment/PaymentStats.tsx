import { CreditCard, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentStatsProps {
    stats: {
        totalRevenue: number;
        paidPayments: number;
        pendingPayments: number;
        overduePayments: number;
    };
}

export function PaymentStats({ stats }: PaymentStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-4">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                            <h3 className="text-2xl font-bold">৳{stats.totalRevenue.toFixed(2)}</h3>
                        </div>
                        <DollarSign className="h-8 w-8 text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Paid</p>
                            <h3 className="text-2xl font-bold text-green-600">{stats.paidPayments}</h3>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Pending</p>
                            <h3 className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</h3>
                        </div>
                        <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                            <h3 className="text-2xl font-bold text-red-600">{stats.overduePayments}</h3>
                        </div>
                        <CreditCard className="h-8 w-8 text-red-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}