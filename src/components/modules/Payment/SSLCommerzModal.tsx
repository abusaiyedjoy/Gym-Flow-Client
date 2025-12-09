"use client";

import { useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface SSLCommerzModalProps {
    isOpen: boolean;
    onClose: () => void;
    gatewayUrl: string;
    sessionKey: string;
    onSuccess?: () => void;
    onFail?: () => void;
    onCancel?: () => void;
}

export function SSLCommerzModal({
    isOpen,
    onClose,
    gatewayUrl,
    sessionKey,
    onSuccess,
    onFail,
    onCancel,
}: SSLCommerzModalProps) {
    useEffect(() => {
        if (isOpen && gatewayUrl && sessionKey) {
            // Load SSLCommerz script if not already loaded
            if (!document.getElementById('sslcommerz-script')) {
                const script = document.createElement('script');
                script.id = 'sslcommerz-script';
                script.src = 'https://sandbox.sslcommerz.com/embed.min.js';
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => {
                    initializeSSLCommerz();
                };
            } else {
                initializeSSLCommerz();
            }
        }
    }, [isOpen, gatewayUrl, sessionKey]);

    const initializeSSLCommerz = () => {
        // @ts-ignore - SSLCommerz is loaded from external script
        if (typeof window !== 'undefined' && window.sslczInit) {
            // @ts-ignore
            window.sslczInit({
                checkout_url: gatewayUrl,
                session_key: sessionKey,
                mode: process.env.NEXT_PUBLIC_SSLCOMMERZ_MODE || 'sandbox', // 'sandbox' or 'live'
                modal: true,
                success: (data: any) => {
                    console.log('Payment successful:', data);
                    onSuccess?.();
                    onClose();
                },
                failed: (data: any) => {
                    console.log('Payment failed:', data);
                    onFail?.();
                    onClose();
                },
                cancelled: (data: any) => {
                    console.log('Payment cancelled:', data);
                    onCancel?.();
                    onClose();
                },
                close: () => {
                    console.log('Modal closed');
                    onClose();
                },
            });

            // Trigger the modal
            // @ts-ignore
            window.sslczOpen();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        Complete Payment
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                    <DialogDescription>
                        Complete your payment securely with SSLCommerz
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground text-center">
                        Loading secure payment gateway...
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                        Please wait while we prepare your payment
                    </p>
                </div>

                {/* SSLCommerz will inject its content here */}
                <div id="sslcz-modal-container"></div>
            </DialogContent>
        </Dialog>
    );
}
