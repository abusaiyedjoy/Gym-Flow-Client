"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle, MessageSquare, Phone, Mail, ChevronRight, Dumbbell, CreditCard, Users, Shield } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    title: "General",
    icon: HelpCircle,
    questions: [
      {
        question: "What are your gym operating hours?",
        answer: "PowerFit Gym is open Monday to Saturday from 6:00 AM to 10:00 PM, and Sunday from 8:00 AM to 8:00 PM. We're here to accommodate your schedule, whether you're an early bird or prefer evening workouts."
      },
      {
        question: "Where is PowerFit Gym located?",
        answer: "We're located at Foy's Lake, Khulshi, Chattogram - 4225, Bangladesh. Our facility is easily accessible and offers ample parking space for members."
      },
      {
        question: "Do I need to book classes in advance?",
        answer: "While walk-ins are welcome based on availability, we recommend booking classes in advance through our mobile app or website to guarantee your spot, especially for popular classes like HIIT and Yoga."
      },
      {
        question: "What should I bring for my first visit?",
        answer: "Bring comfortable workout clothes, athletic shoes, a water bottle, and a towel. We provide lockers for storing your belongings. If you're interested in joining, bring a valid ID and payment method."
      },
      {
        question: "Is there parking available?",
        answer: "Yes, we offer free parking for all our members. We have a spacious parking area that can accommodate both cars and motorcycles."
      }
    ]
  },
  {
    id: "membership",
    title: "Membership",
    icon: CreditCard,
    questions: [
      {
        question: "What membership plans do you offer?",
        answer: "We offer four membership tiers: Basic (৳2,000/month), Standard (৳3,500/month), Premium (৳5,500/month), and Annual Elite (৳30,000/year). Each tier includes different benefits and services. Visit our Pricing page for detailed information."
      },
      {
        question: "Can I pause or freeze my membership?",
        answer: "Yes, members can freeze their membership for up to 2 months per year for medical reasons or extended travel. Please contact our membership team at least 7 days in advance. A small administrative fee may apply."
      },
      {
        question: "What is your cancellation policy?",
        answer: "You can cancel your membership anytime with 30 days written notice. We offer a 7-day money-back guarantee for new members who aren't satisfied with our services. Annual memberships are non-refundable after 30 days."
      },
      {
        question: "Do you offer student or corporate discounts?",
        answer: "Yes! Students with valid ID receive 15% off on Basic and Standard plans. We also offer corporate packages for companies with 5+ employees. Contact us at membership@powerfitgym.com for corporate rates."
      },
      {
        question: "Can I upgrade or downgrade my membership?",
        answer: "Absolutely! You can upgrade your membership at any time, and the difference will be prorated. Downgrades take effect at the start of your next billing cycle."
      }
    ]
  },
  {
    id: "training",
    title: "Training & Classes",
    icon: Dumbbell,
    questions: [
      {
        question: "What types of classes do you offer?",
        answer: "We offer 100+ classes including Weight Training, Yoga, HIIT Cardio, CrossFit, Zumba, Boxing, Pilates, Spinning, and more. All classes are led by certified instructors and cater to different fitness levels."
      },
      {
        question: "How does the AI Trainer Matching work?",
        answer: "Our AI system analyzes your fitness goals, experience level, health conditions, and preferences to match you with the most suitable trainer from our 50+ expert team. The process takes about 60 seconds and provides 5 personalized recommendations."
      },
      {
        question: "Are personal training sessions included in membership?",
        answer: "Personal training sessions vary by plan: Basic (none), Standard (4 sessions/month), Premium (8 sessions/month), Annual Elite (unlimited). Additional sessions can be purchased separately."
      },
      {
        question: "What if I'm a complete beginner?",
        answer: "Perfect! We specialize in helping beginners. All new members receive a free fitness assessment and orientation session. We have dedicated beginner classes and trainers who excel at working with first-timers."
      },
      {
        question: "Can I bring a workout partner or friend?",
        answer: "Standard and above members receive 2 guest passes per month. Annual Elite members get unlimited guest passes. Guests can try our facilities for one session to see if they'd like to join."
      }
    ]
  },
  {
    id: "facilities",
    title: "Facilities & Amenities",
    icon: Users,
    questions: [
      {
        question: "What equipment and facilities do you have?",
        answer: "We feature state-of-the-art equipment including cardio machines, free weights, resistance training equipment, functional training zones, boxing area, yoga studio, spinning room, sauna, steam room, and recovery areas."
      },
      {
        question: "Do you have shower and locker facilities?",
        answer: "Yes, we have modern shower facilities and secure lockers. Basic members get standard lockers, while Premium and Elite members receive premium lockers with charging ports and personal amenities."
      },
      {
        question: "Is there a nutrition center or supplement store?",
        answer: "Yes! Our on-site nutrition center offers diet consultations, meal planning, and a supplement store with premium brands. Premium and Elite members receive exclusive discounts on supplements."
      },
      {
        question: "Do you provide towel service?",
        answer: "Premium and Annual Elite members receive complimentary towel service. Basic and Standard members can rent towels for a small fee or bring their own."
      },
      {
        question: "Is WiFi available?",
        answer: "Yes, we provide free high-speed WiFi throughout the facility for all members. Connect to 'PowerFit-Members' network using your membership credentials."
      }
    ]
  },
  {
    id: "health",
    title: "Health & Safety",
    icon: Shield,
    questions: [
      {
        question: "What COVID-19 safety measures do you have?",
        answer: "We maintain strict hygiene protocols including regular sanitization, air purification systems, mandatory equipment cleaning after use, and capacity limits in group classes. Hand sanitizer stations are available throughout the facility."
      },
      {
        question: "Do I need a health clearance to join?",
        answer: "We recommend consulting your doctor before starting any fitness program, especially if you have pre-existing conditions. Our trainers will conduct a health screening during your first session."
      },
      {
        question: "What if I have an injury or medical condition?",
        answer: "Our trainers are certified in injury prevention and rehabilitation. During your initial assessment, inform your trainer about any injuries or conditions. We'll create a modified program that's safe and effective for you."
      },
      {
        question: "Is first aid available on-site?",
        answer: "Yes, we have certified first aid staff on duty during all operating hours, and first aid kits are strategically placed throughout the facility. Our staff receives regular emergency response training."
      },
      {
        question: "How clean is the equipment?",
        answer: "Equipment is cleaned after each use by members and sanitized by our cleaning staff every 2 hours. We conduct deep cleaning daily and maintain the highest hygiene standards."
      }
    ]
  },
  {
    id: "payment",
    title: "Payment & Billing",
    icon: CreditCard,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept cash, all major credit/debit cards (Visa, Mastercard, American Express), bKash, Nagad, Rocket, and bank transfers. Auto-renewal can be set up for monthly memberships."
      },
      {
        question: "When will I be charged for my membership?",
        answer: "Monthly memberships are charged on the same date each month. Annual memberships are charged upfront. You'll receive a reminder email 3 days before each billing date."
      },
      {
        question: "Are there any hidden fees?",
        answer: "No hidden fees! The membership price includes access to all facilities and group classes. Additional costs may apply only for personal training sessions beyond your plan limits, guest passes, and optional services like massage therapy."
      },
      {
        question: "Do you offer refunds?",
        answer: "New members can request a full refund within 7 days of joining if not satisfied. After 7 days, refunds are not provided, but you can cancel with 30 days notice to stop future charges."
      },
      {
        question: "Can I pay for multiple months in advance?",
        answer: "Yes! Paying quarterly gets you 5% off, semi-annually gets 10% off, and annually gets 25% off. Contact our membership team to set up advance payments."
      }
    ]
  }
];

export default function FAQContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');

  // Flatten all questions for search
  const allQuestions = faqCategories.flatMap(category =>
    category.questions.map(q => ({
      ...q,
      category: category.id,
      categoryTitle: category.title
    }))
  );

  // Filter questions based on search
  const filteredQuestions = searchQuery
    ? allQuestions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : faqCategories.find(c => c.id === selectedCategory)?.questions || [];

  const currentCategory = faqCategories.find(c => c.id === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-orange-500/10 border-orange-500/20 text-orange-400 hover:bg-orange-500/20">
            <HelpCircle className="w-3 h-3 mr-1" />
            Frequently Asked Questions
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            How Can We{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
              Help You?
            </span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Find answers to common questions about memberships, classes, facilities, and more
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 -mt-20 relative z-10">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all duration-300 ${selectedCategory === category.id && !searchQuery
                    ? 'border-orange-500 shadow-xl shadow-orange-500/20'
                    : 'border-zinc-200 dark:border-zinc-800 hover:shadow-lg'
                    }`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSearchQuery('');
                  }}
                >
                  <CardHeader className="pb-3 pt-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto ${selectedCategory === category.id && !searchQuery
                      ? 'bg-linear-to-r from-primary to-secondary'
                      : 'bg-zinc-100 dark:bg-zinc-800'
                      }`}>
                      <Icon className={`w-6 h-6 ${selectedCategory === category.id && !searchQuery
                        ? 'text-white'
                        : 'text-zinc-600 dark:text-zinc-400'
                        }`} />
                    </div>
                    <CardTitle className="text-center text-sm">{category.title}</CardTitle>
                    <CardDescription className="text-center text-xs">
                      {category.questions.length} questions
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Category Header (when not searching) */}
            {!searchQuery && currentCategory && (
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-full mb-4">
                  {(() => {
                    const Icon = currentCategory.icon;
                    return <Icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
                  })()}
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {currentCategory.title}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {currentCategory.questions.length} frequently asked questions
                </p>
              </div>
            )}

            {/* Search Results Header */}
            {searchQuery && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  Search Results
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              </div>
            )}

            {/* FAQ Accordion */}
            {filteredQuestions.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredQuestions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-6 bg-white dark:bg-zinc-900 hover:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-5">
                      <div className="flex items-start gap-3 pr-4">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center mt-1">
                          <span className="text-white text-xs font-bold">Q</span>
                        </div>
                        <div>
                          <span className="font-semibold text-zinc-900 dark:text-white">
                            {faq.question}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600 dark:text-zinc-400 pl-9 pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card className="text-center p-12">
                <div className="text-6xl mb-4">🔍</div>
                <CardTitle className="mb-2">No results found</CardTitle>
                <CardDescription className="mb-6">
                  We couldn't find any questions matching your search. Try different keywords or browse categories above.
                </CardDescription>
                <Button
                  onClick={() => setSearchQuery('')}
                  variant="outline"
                  className="border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                >
                  Clear Search
                </Button>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                Still Have{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                  Questions?
                </span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Can't find the answer you're looking for? Our team is here to help!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Contact Card */}
              <Card className="border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 bg-linear-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>
                    Chat with our support team in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-linear-to-r from-primary to-secondary hover:from-orange-600 hover:to-red-700 text-white">
                    Start Chat
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Phone Card */}
              <Card className="border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 bg-linear-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle>Call Us</CardTitle>
                  <CardDescription>
                    Mon-Sat: 6AM-10PM, Sun: 8AM-8PM
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    +880 1823567254
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card className="border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 bg-linear-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle>Email Us</CardTitle>
                  <CardDescription>
                    We'll respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Send Email
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}