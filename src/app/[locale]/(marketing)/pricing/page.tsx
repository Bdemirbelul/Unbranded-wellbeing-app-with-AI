"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Shield,
  Users,
  TrendingUp,
  HelpCircle,
  ArrowRight,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const tiers = [
    {
      name: "Starter",
      description: "Perfect for individuals getting started",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        { text: "Dashboard access", included: true },
        { text: "Basic HRV tracking", included: true },
        { text: "Sleep & stress metrics", included: true },
        { text: "7-day data history", included: true },
        { text: "Multi-language support", included: true },
        { text: "Basic insights", included: true },
        { text: "AI Coach", included: false },
        { text: "Weekly reports", included: false },
        { text: "Advanced analytics", included: false },
        { text: "Skin health tracking", included: false },
        { text: "Data export", included: false },
        { text: "Priority support", included: false },
      ],
      cta: "Get Started",
      ctaVariant: "outline" as const,
    },
    {
      name: "Pro",
      description: "For serious wellness enthusiasts",
      monthlyPrice: 9,
      annualPrice: 79,
      popular: true,
      savings: "Save 27%",
      features: [
        { text: "Everything in Starter", included: true },
        { text: "AI Coach with personalized insights", included: true },
        { text: "Weekly & monthly reports", included: true },
        { text: "90-day data history", included: true },
        { text: "Advanced HRV analytics", included: true },
        { text: "Skin health tracking & analysis", included: true },
        { text: "Pattern recognition", included: true },
        { text: "Data export (JSON, CSV)", included: true },
        { text: "Custom goals & targets", included: true },
        { text: "Email support", included: true },
        { text: "Priority support", included: false },
        { text: "Team collaboration", included: false },
      ],
      cta: "Start Free Trial",
      ctaVariant: "default" as const,
    },
    {
      name: "Team",
      description: "For teams and organizations",
      monthlyPrice: 29,
      annualPrice: 249,
      popular: false,
      savings: "Save 28%",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Unlimited team members", included: true },
        { text: "Admin dashboard", included: true },
        { text: "Team analytics & insights", included: true },
        { text: "Custom branding", included: true },
        { text: "API access", included: true },
        { text: "Advanced data quality controls", included: true },
        { text: "Feature flags & customization", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Priority support (24/7)", included: true },
        { text: "SLA guarantee", included: true },
        { text: "Custom integrations", included: true },
      ],
      cta: "Contact Sales",
      ctaVariant: "outline" as const,
    },
  ];

  const faqs = [
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and PayPal. Enterprise plans also support invoicing.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! Pro plan includes a 14-day free trial. No credit card required. Starter plan is free forever.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer:
        "Your data remains accessible for 30 days after cancellation. You can export all your data before canceling.",
    },
    {
      question: "Do you offer discounts for annual plans?",
      answer:
        "Yes! Annual plans save you up to 28% compared to monthly billing. The discount is automatically applied.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "We offer a 30-day money-back guarantee for annual plans. Monthly plans can be canceled anytime with no refund.",
    },
  ];

  const getPrice = (tier: typeof tiers[0]) => {
    return billingCycle === "annual" ? tier.annualPrice : tier.monthlyPrice;
  };

  const getPriceDisplay = (tier: typeof tiers[0]) => {
    const price = getPrice(tier);
    if (price === 0) return "Free";
    return `$${price}`;
  };

  return (
    <main className="relative overflow-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-400/10 via-teal-400/10 to-indigo-400/10 blur-3xl" />
        <div className="absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-purple-400/10 via-pink-400/10 to-rose-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="h-3 w-3 mr-1.5 inline" />
            Flexible Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Choose the right plan
            <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
              for your wellbeing journey
            </span>
          </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free, upgrade when you&apos;re ready. All plans include our core features
            with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-muted rounded-2xl">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all relative ${
                billingCycle === "annual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span className="absolute -top-1 -right-1 text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                Save
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 lg:grid-cols-3 mb-16">
          {tiers.map((tier) => {
            const price = getPrice(tier);
            const monthlyEquivalent =
              billingCycle === "annual" ? Math.round(price / 12) : price;

            return (
              <Card
                key={tier.name}
                className={`relative rounded-2xl p-8 border-2 transition-all hover:shadow-xl ${
                  tier.popular
                    ? "border-primary bg-gradient-to-br from-primary/5 to-transparent scale-105 lg:scale-110"
                    : "hover:border-primary/50"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="rounded-full px-4 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-0">
                      <Star className="h-3 w-3 mr-1 inline" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                    {tier.savings && billingCycle === "annual" && (
                      <Badge variant="secondary" className="rounded-full text-xs">
                        {tier.savings}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tier.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">
                      {getPriceDisplay(tier)}
                    </span>
                    {price > 0 && (
                      <span className="text-muted-foreground">
                        /{billingCycle === "annual" ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  {billingCycle === "annual" && price > 0 && (
                    <div className="text-sm text-muted-foreground mt-1">
                      ${monthlyEquivalent}/month billed annually
                    </div>
                  )}
                </div>

                <Button
                  asChild
                  variant={tier.ctaVariant}
                  size="lg"
                  className={`w-full rounded-xl h-12 font-medium ${
                    tier.popular
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white border-0"
                      : ""
                  }`}
                >
                  <Link href="/register">
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <div className="mt-8 space-y-3">
                  {tier.features.map((feature, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 ${
                        !feature.included ? "opacity-50" : ""
                      }`}
                    >
                      {feature.included ? (
                        <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                      ) : (
                        <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                          <X className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground line-through"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <Card className="rounded-2xl p-8 mb-16 border-2">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Compare Plans</h2>
            <p className="text-muted-foreground">
              See what&apos;s included in each plan
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold">Features</th>
                  <th className="text-center py-4 px-4 font-semibold">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold">Team</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "HRV Tracking",
                  "Sleep Analysis",
                  "Stress Monitoring",
                  "AI Coach",
                  "Weekly Reports",
                  "Skin Health",
                  "Data Export",
                  "API Access",
                  "Priority Support",
                ].map((feature, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-4 px-4">{feature}</td>
                    <td className="text-center py-4 px-4">
                      {i < 3 ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {i < 6 ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Trust Indicators */}
        <div className="grid gap-6 sm:grid-cols-3 mb-16">
          <Card className="rounded-2xl p-6 text-center border-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">
              Your data is encrypted and never shared with third parties
            </p>
          </Card>
          <Card className="rounded-2xl p-6 text-center border-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Cancel Anytime</h3>
            <p className="text-sm text-muted-foreground">
              No long-term contracts. Cancel your subscription whenever you want
            </p>
          </Card>
          <Card className="rounded-2xl p-6 text-center border-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">30-Day Guarantee</h3>
            <p className="text-sm text-muted-foreground">
              Try risk-free. Get a full refund if you&apos;re not satisfied
            </p>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground font-medium mb-3">
              <HelpCircle className="h-4 w-4" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-bold mb-2">Got questions?</h2>
            <p className="text-muted-foreground">
              We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for,{" "}
              <Link href="/contact" className="text-primary underline">
                contact our support team
              </Link>
              .
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <Card key={i} className="rounded-2xl p-6 border-2">
                <h3 className="font-semibold mb-2 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="rounded-2xl p-12 text-center bg-gradient-to-br from-cyan-500/10 via-teal-500/10 to-indigo-500/10 border-2 border-primary/20">
          <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of users tracking their wellbeing with data-driven insights.
            Start your free account today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-xl px-8 h-12">
              <Link href="/register">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8 h-12">
              <Link href="/login">Log in to existing account</Link>
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
