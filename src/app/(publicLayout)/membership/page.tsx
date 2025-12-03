import MembershipCards from "@/components/modules/CommonPages/MembershipCard";
import { Check, Crown, Zap } from "lucide-react";


export default function PricingSection() {

  return (
    <section className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

      {/* Section Header */}
      <section className="relative py-20 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">


            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Choose Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                Perfect Plan
              </span>
            </h2>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
              Flexible plans for every fitness journey. No hidden fees, cancel anytime.
            </p>
          </div>
        </div>
      </section>
      {/* Membership Plans */}
      <MembershipCards />

      {/* Additional Info */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-linear-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white">No Hidden Fees</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Transparent pricing with no surprises
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white">Cancel Anytime</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Flexible membership with no contracts
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white">7-Day Money Back</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Not satisfied? Get a full refund
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}