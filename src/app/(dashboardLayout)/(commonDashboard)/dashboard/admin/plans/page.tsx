"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, CreditCard, Users, DollarSign, TrendingUp, Edit, Eye, MoreVertical, CheckCircle2, XCircle } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  activeMembers: number;
  status: "Active" | "Inactive";
  popular: boolean;
}

const mockPlans: Plan[] = [
  {
    id: "1",
    name: "Basic Plan",
    description: "Perfect for beginners starting their fitness journey",
    price: 29,
    duration: "month",
    features: ["Access to gym equipment", "Locker facility", "Basic workout plan"],
    activeMembers: 45,
    status: "Active",
    popular: false,
  },
  {
    id: "2",
    name: "Premium Plan",
    description: "For serious fitness enthusiasts",
    price: 49,
    duration: "month",
    features: [
      "All Basic features",
      "Personal trainer (2 sessions/week)",
      "Nutrition consultation",
      "Group classes access",
    ],
    activeMembers: 78,
    status: "Active",
    popular: true,
  },
  {
    id: "3",
    name: "Elite Plan",
    description: "Ultimate fitness experience with premium perks",
    price: 79,
    duration: "month",
    features: [
      "All Premium features",
      "Unlimited personal training",
      "Priority class booking",
      "Spa access",
      "Nutrition meal plans",
    ],
    activeMembers: 32,
    status: "Active",
    popular: false,
  },
];

export default function AdminPlansPage() {
  const [plans] = useState<Plan[]>(mockPlans);

  const totalRevenue = plans.reduce((sum, plan) => sum + plan.price * plan.activeMembers, 0);
  const totalMembers = plans.reduce((sum, plan) => sum + plan.activeMembers, 0);
  const avgPrice = Math.round(plans.reduce((sum, plan) => sum + plan.price, 0) / plans.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Membership Plans</h1>
            <p className="text-gray-600 mt-2">Manage and monitor your membership offerings</p>
          </div>
          <Link href="/dashboard/admin/plans/create">
            <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Plus className="w-5 h-5" />
              Create New Plan
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Plans</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{plans.length}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalMembers}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${totalRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+15%</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Price</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${avgPrice}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular ? "ring-2 ring-orange-500" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div className={`p-8 ${plan.popular ? "bg-gradient-to-br from-orange-50 to-red-50" : "bg-gray-50"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mt-6">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 text-lg">/{plan.duration}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8 space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="pt-6 mt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Members</span>
                    <span className="text-sm font-bold text-gray-900">{plan.activeMembers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <div className="flex items-center gap-2">
                      {plan.status === "Active" ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm font-medium text-green-600">Active</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span className="text-sm font-medium text-red-600">Inactive</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Monthly Revenue</span>
                    <span className="text-sm font-bold text-gray-900">
                      ${(plan.price * plan.activeMembers).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-gray-50 flex gap-3">
                <Link href={`/dashboard/admin/plans/${plan.id}`} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </Link>
                <Link href={`/dashboard/admin/plans/${plan.id}/edit`} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-medium text-white hover:shadow-lg transition-all">
                    <Edit className="w-4 h-4" />
                    Edit Plan
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for Additional Plans */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 text-center border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Plus className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Create More Plans</h3>
            <p className="text-gray-600 mb-6">
              Expand your offerings by creating additional membership plans to cater to different fitness goals and budgets.
            </p>
            <Link href="/dashboard/admin/plans/create">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
                Create New Plan
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}