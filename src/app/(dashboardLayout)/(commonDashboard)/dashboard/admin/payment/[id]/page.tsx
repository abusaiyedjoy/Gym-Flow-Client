"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, CreditCard, User, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";

const mockPayment = {
  id: "PAY-001",
  transactionId: "TXN-2024-12-001-4567",
  date: "2024-12-01",
  time: "10:30 AM",
  amount: 299,
  status: "Completed",
  paymentMethod: "Credit Card",
  cardLast4: "4242",
  member: {
    id: "M-001",
    name: "John Smith",
    email: "john.smith@email.com",
    plan: "Elite",
  },
  billingAddress: "123 Main St, New York, NY 10001",
  description: "Monthly membership fee - Elite Plan",
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/10 text-green-500";
    case "Pending":
      return "bg-yellow-500/10 text-yellow-500";
    case "Failed":
      return "bg-red-500/10 text-red-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
};

export default function PaymentDetailPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/payment">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader
          title={`Payment ${mockPayment.id}`}
          description={mockPayment.transactionId}
          action={
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          }
        />
      </div>

      {/* Payment Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-green-600/10">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <Badge className={`${getStatusColor(mockPayment.status)} text-lg px-4 py-1 mt-1`}>
                  {mockPayment.status}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Amount Paid</p>
              <p className="text-4xl font-bold text-green-600">${mockPayment.amount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>Payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium">{mockPayment.date} at {mockPayment.time}</p>
              </div>
            </div>
            <div className="border-t" />
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{mockPayment.paymentMethod} ending in {mockPayment.cardLast4}</p>
              </div>
            </div>
            <div className="border-t" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
              <p className="font-mono text-sm">{mockPayment.transactionId}</p>
            </div>
            <div className="border-t" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="text-sm">{mockPayment.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
            <CardDescription>Customer details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Member Name</p>
                <p className="font-medium">{mockPayment.member.name}</p>
              </div>
            </div>
            <div className="border-t" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Member ID</p>
              <p className="font-medium">{mockPayment.member.id}</p>
            </div>
            <div className="border-t" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-sm">{mockPayment.member.email}</p>
            </div>
            <div className="border-t" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Membership Plan</p>
              <Badge variant="outline">{mockPayment.member.plan}</Badge>
            </div>
            <div className="border-t" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Billing Address</p>
              <p className="text-sm">{mockPayment.billingAddress}</p>
            </div>
            <div className="pt-4">
              <Link href={`/dashboard/admin/members/${mockPayment.member.id}`}>
                <Button variant="outline" className="w-full">
                  View Member Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Membership Fee ({mockPayment.member.plan})</span>
              <span className="font-medium">${mockPayment.amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Discount</span>
              <span className="font-medium">$0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tax</span>
              <span className="font-medium">$0</span>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total Amount</span>
              <span className="text-xl font-bold text-green-600">${mockPayment.amount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
