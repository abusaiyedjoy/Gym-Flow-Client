"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle } from "lucide-react";

const inquiryTypes = ["General Inquiry", "Membership", "Personal Training", "Group Classes", "Facilities", "Partnership", "Other"];


const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        inquiryType: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        // Validate required fields
        if (!formData.name || !formData.email || !formData.subject || !formData.inquiryType || !formData.message) {
            return;
        }

        // Handle form submission
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                inquiryType: '',
                message: ''
            });
        }, 3000);
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    return (
        <>
            <div>
                <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                        Send Us a{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                            Message
                        </span>
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                </div>

                <Card className="border-zinc-200 dark:border-zinc-800">
                    <CardContent className="pt-6">
                        {isSubmitted ? (
                            <div className="py-12 text-center">
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                                    Message Sent Successfully!
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    We'll get back to you as soon as possible.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="border-zinc-300 dark:border-zinc-700"
                                    />
                                </div>

                                {/* Email & Phone */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className="border-zinc-300 dark:border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+880 1711-123456"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            className="border-zinc-300 dark:border-zinc-700"
                                        />
                                    </div>
                                </div>

                                {/* Inquiry Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="inquiryType">Inquiry Type *</Label>
                                    <Select value={formData.inquiryType} onValueChange={(value) => handleChange('inquiryType', value)}>
                                        <SelectTrigger className="border-zinc-300 dark:border-zinc-700">
                                            <SelectValue placeholder="Select inquiry type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {inquiryTypes.map(type => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject *</Label>
                                    <Input
                                        id="subject"
                                        placeholder="How can we help you?"
                                        value={formData.subject}
                                        onChange={(e) => handleChange('subject', e.target.value)}
                                        className="border-zinc-300 dark:border-zinc-700"
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message *</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us more about your inquiry..."
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => handleChange('message', e.target.value)}
                                        className="border-zinc-300 dark:border-zinc-700 resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    onClick={handleSubmit}
                                    className="w-full bg-linear-to-r from-primary to-secondary hover:from-orange-600 hover:to-red-700 text-white py-6 text-lg group"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </Button>

                                <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                                    By submitting this form, you agree to our privacy policy and terms of service.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
};

export default ContactForm;