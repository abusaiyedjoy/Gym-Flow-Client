import ContactForm from "@/components/modules/CommonPages/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export const dynamic = "force-static";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["PowerFit Gym", "Foy's Lake, Khulshi", "Chattogram - 4225", "Bangladesh"],
    action: "Get Directions"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+880 1711-123456", "+880 1811-654321", "Mon-Sat: 6:00 AM - 10:00 PM", "Sun: 8:00 AM - 8:00 PM"],
    action: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@powerfitgym.com", "support@powerfitgym.com", "membership@powerfitgym.com", "Response within 24 hours"],
    action: "Send Email"
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: ["Monday - Saturday", "6:00 AM - 10:00 PM", "Sunday", "8:00 AM - 8:00 PM"],
    action: "View Schedule"
  }
];

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
              Touch
            </span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className=" border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow group ">
                  <CardHeader>
                    <div className="w-14 h-14 bg-linear-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-zinc-600 dark:text-zinc-400">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 group/btn"
                    >
                      {info.action}
                      <Send className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content - Form & Map */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 container mx-auto">
            {/* Contact Form */}
            <ContactForm />

            {/* Map */}
            <Card className="border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  Our Location
                </CardTitle>
                <CardDescription>
                  Visit us at Foy's Lake, Chattogram
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-full">
                {/* Map Placeholder */}
                <div className="relative h-[500px] bg-zinc-100 dark:bg-zinc-900">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.7485916614326!2d91.79624731495654!3d22.36835648527943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64095dfd3%3A0x5015cc5bcb6905d9!2sFoy&#39;s%20Lake!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    title="PowerFit Gym Location"
                  />
                </div>
                <div className="p-6 h-full">
                  <Button className="w-full bg-linear-to-r from-primary to-secondary hover:from-orange-600 hover:to-red-700 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}