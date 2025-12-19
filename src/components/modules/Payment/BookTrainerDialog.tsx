"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    CreditCard,
    Wallet,
    Banknote,
    Loader2,
    CheckCircle,
    XCircle,
    Calendar,
    DollarSign,
} from 'lucide-react';
import { Trainer } from '@/types/trainer.types';
import { PaymentMethod } from '@/types/payment.types';
import { PaymentService } from '@/services/payment/payment.service';
import { SSLCommerzModal } from './SSLCommerzModal';
import { toast } from 'sonner';

interface BookTrainerDialogProps {
    isOpen: boolean;
    onClose: () => void;
    trainer: Trainer;
    memberId: string;
}

// Dummy plan for trainer booking - you may want to fetch this from backend
const TRAINER_BOOKING_PLAN = {
    id: 'trainer-session-plan',
    name: 'Trainer Session',
    price: 1000, // Base price per session in BDT
    discount: 0,
    durationDays: 30,
};

export function BookTrainerDialog({
    isOpen,
    onClose,
    trainer,
    memberId,
}: BookTrainerDialogProps) {
    const router = useRouter();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(
        PaymentMethod.SSLCOMMERZ
    );
    const [loading, setLoading] = useState(false);
    const [showSSLModal, setShowSSLModal] = useState(false);
    const [sslData, setSslData] = useState<{ gatewayUrl: string; sessionKey: string } | null>(null);
    const [sessions, setSessions] = useState(1);

    const totalAmount = TRAINER_BOOKING_PLAN.price * sessions;
    const discountAmount = (totalAmount * TRAINER_BOOKING_PLAN.discount) / 100;
    const finalAmount = totalAmount - discountAmount;

    const paymentMethods = [
        {
            value: PaymentMethod.SSLCOMMERZ,
            label: 'SSLCommerz',
            description: 'Pay with credit/debit card, mobile banking',
            icon: CreditCard,
        },
        {
            value: PaymentMethod.BKASH,
            label: 'bKash',
            description: 'Pay with bKash mobile wallet',
            icon: Wallet,
        },
        {
            value: PaymentMethod.NAGAD,
            label: 'Nagad',
            description: 'Pay with Nagad mobile wallet',
            icon: Wallet,
        },
        {
            value: PaymentMethod.CASH,
            label: 'Cash',
            description: 'Pay at the gym counter',
            icon: Banknote,
        },
    ];

    const handleBooking = async () => {
        try {
            setLoading(true);

            // For cash payment, create payment directly
            // if (selectedPaymentMethod === PaymentMethod.CASH) {
            //     const response = await PaymentService.createPayment({
            //         memberId,
            //         planId: TRAINER_BOOKING_PLAN.id,
            //         paymentMethod: selectedPaymentMethod,
            //         notes: `Trainer booking for ${trainer.user.name} - ${sessions} session(s)`,
            //     });

            //     toast.success('Booking confirmed!', {
            //         description: 'Please pay at the gym counter',
            //     });

            //     onClose();
            //     router.push(`/dashboard/member/payments/${response.data.id}`);
            //     return;
            // }
            console.log("Member ID for booking:", memberId);
            // For online payment methods, initiate payment
            const response = await PaymentService.initiatePayment({
                memberId,
                planId: TRAINER_BOOKING_PLAN.id,
                paymentMethod: selectedPaymentMethod,
                successUrl: `${window.location.origin}/dashboard/member/payment/success`,
                failUrl: `${window.location.origin}/dashboard/member/payment/fail`,
                cancelUrl: `${window.location.origin}/dashboard/member/payment/cancel`,
            });
            console.log("Payment initiation response:", response);

            if (response.success && response.data) {
                setSslData({
                    gatewayUrl: response.data.gatewayUrl,
                    sessionKey: response.data.sessionKey,
                });
                setShowSSLModal(true);
            }
        } catch (error: any) {
            console.error('Booking error:', error);
            toast.error('Booking failed', {
                description: error.message || 'Failed to process booking',
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = () => {
        toast.success('Payment successful!', {
            description: 'Your trainer booking is confirmed',
        });
        onClose();
        router.push('/dashboard/member/payments');
    };

    const handlePaymentFail = () => {
        toast.error('Payment failed', {
            description: 'Please try again or contact support',
        });
    };

    const handlePaymentCancel = () => {
        toast.info('Payment cancelled', {
            description: 'You can try again anytime',
        });
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Book Training Session</DialogTitle>
                        <DialogDescription>
                            Book a training session with {trainer.user.name}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Trainer Info */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                        {trainer.user.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{trainer.user.name}</h3>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                            <span>{trainer.experienceYears} years experience</span>
                                            <span>•</span>
                                            <span>Rating: {trainer.rating.toFixed(1)} ⭐</span>
                                        </div>
                                        {trainer.specializations && trainer.specializations.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {trainer.specializations.slice(0, 3).map((spec) => (
                                                    <Badge key={spec.id} variant="secondary" className="text-xs">
                                                        {spec.specialization.replace(/_/g, ' ')}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Session Selection */}
                        <div className="space-y-3">
                            <Label htmlFor="sessions">Number of Sessions</Label>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setSessions(Math.max(1, sessions - 1))}
                                    disabled={sessions <= 1}
                                >
                                    -
                                </Button>
                                <div className="flex-1 text-center">
                                    <input
                                        id="sessions"
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={sessions}
                                        onChange={(e) => setSessions(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                                        className="w-20 text-center border rounded px-2 py-1"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setSessions(Math.min(10, sessions + 1))}
                                    disabled={sessions >= 10}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        {/* Price Summary */}
                        <Card className="bg-muted/50">
                            <CardContent className="pt-6 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Price per session</span>
                                    <span className="font-medium">৳{TRAINER_BOOKING_PLAN.price}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Number of sessions</span>
                                    <span className="font-medium">{sessions}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">৳{totalAmount}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex items-center justify-between text-sm text-green-600">
                                        <span>Discount</span>
                                        <span>-৳{discountAmount}</span>
                                    </div>
                                )}
                                <div className="border-t pt-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Total Amount</span>
                                        <span className="text-2xl font-bold text-primary">৳{finalAmount}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Method Selection */}
                        <div className="space-y-3">
                            <Label>Select Payment Method</Label>
                            <RadioGroup
                                value={selectedPaymentMethod}
                                onValueChange={(value) => setSelectedPaymentMethod(value as PaymentMethod)}
                                className="space-y-3"
                            >
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon;
                                    return (
                                        <div key={method.value} className="relative">
                                            <RadioGroupItem
                                                value={method.value}
                                                id={method.value}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={method.value}
                                                className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                                            >
                                                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="font-medium">{method.label}</div>
                                                    <div className="text-sm text-muted-foreground">{method.description}</div>
                                                </div>
                                            </Label>
                                        </div>
                                    );
                                })}
                            </RadioGroup>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={onClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button onClick={handleBooking} disabled={loading || !trainer.isAvailable}>
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    Pay ৳{finalAmount}
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* SSLCommerz Modal */}
            {showSSLModal && sslData && (
                <SSLCommerzModal
                    isOpen={showSSLModal}
                    onClose={() => setShowSSLModal(false)}
                    gatewayUrl={sslData.gatewayUrl}
                    sessionKey={sslData.sessionKey}
                    onSuccess={handlePaymentSuccess}
                    onFail={handlePaymentFail}
                    onCancel={handlePaymentCancel}
                />
            )}
        </>
    );
}
