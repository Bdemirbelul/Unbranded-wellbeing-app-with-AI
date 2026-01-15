import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockBlog } from "@/lib/mock";

const blogContent: Record<string, { content: string; readingTime: number; image: string }> = {
  "the-recovery-loop": {
    readingTime: 8,
    image: "/photos/1.png",
    content: `
# The Recovery Loop: HRV, Sleep, and Consistency

Understanding your body's recovery signals isn't about reacting to every daily fluctuation. It's about recognizing patterns, establishing baselines, and making informed decisions that support your long-term wellbeing.

## What HRV Really Tells You

Heart Rate Variability (HRV) measures the variation in time between your heartbeats. When your nervous system is balanced and recovered, your heart rate varies more—this is a sign of adaptability and resilience. When you're stressed, fatigued, or overreaching, HRV tends to drop.

But here's the crucial point: daily HRV values are noisy. A single low reading doesn't mean you're unrecovered. What matters is the trend over days and weeks.

## The Three-Day Rule

Before making any training or lifestyle changes based on HRV, follow this simple framework. First, look at the trend. Is HRV consistently lower than your baseline for three or more days? Second, check the context. What changed? Did your sleep quality drop? Are stress levels higher? Has training load increased? Third, consider other signals. Combine HRV with resting heart rate, sleep duration, and how you actually feel.

If HRV drops for one day but everything else looks normal, it's likely just noise. If it drops for three consecutive days alongside other signals like poor sleep or elevated resting heart rate, that's when you should consider adjusting your plan.

## Sleep as the Foundation

Sleep quality directly impacts HRV. During deep sleep, your parasympathetic nervous system—the rest and digest system—dominates, allowing your body to recover. Poor sleep disrupts this process entirely.

What should you track? Total sleep duration is crucial—aim for seven to nine hours. Sleep consistency matters too, so try to maintain the same bedtime within about thirty minutes. Sleep efficiency tells you how much time you actually spend asleep versus time in bed. And don't forget subjective quality—how rested do you actually feel when you wake up?

If your HRV is low but your sleep has been excellent, look elsewhere for the cause. If both are low, prioritize sleep before making other changes.

## Building Your Baseline

Your HRV baseline is deeply personal. It's not about comparing yourself to others. It's about understanding your own patterns and what normal looks like for you.

To establish a baseline, track HRV for at least two to three weeks during a normal period. Calculate your average and standard deviation. Consider values within one standard deviation as normal for you. Values consistently below this range indicate potential stress or fatigue that needs attention.

## Practical Application

When HRV is high and stable, you're well-recovered. This is a good time for intense training, and your body can handle more stress. When HRV drops, reduce training intensity, prioritize sleep and recovery, and consider stress management techniques. Don't add new stressors like diet changes or late nights.

When HRV is consistently low, take a deload week. Focus on sleep hygiene, review your stress management strategies, and consider consulting a healthcare provider if the pattern persists.

## The Consistency Factor

The biggest predictor of improved HRV isn't any single intervention—it's consistency. Regular sleep, consistent training, and stable routines create the foundation for better recovery.

Small, sustainable habits beat dramatic changes every time. Focus on going to bed at the same time each night. Manage stress proactively rather than reactively. Build training load gradually instead of jumping into intense programs. Most importantly, listen to your body's signals and respond accordingly.

## Conclusion

HRV is a powerful tool, but it's just one signal. Use it alongside sleep data, resting heart rate, and how you actually feel. Don't overreact to daily fluctuations. Instead, focus on trends, patterns, and the bigger picture of your wellbeing.

The goal isn't perfect HRV every day. It's understanding what your body is telling you and responding appropriately.
    `,
  },
  "stress-without-guessing": {
    readingTime: 6,
    image: "/photos/2.png",
    content: `
# Stress Without Guessing: Turning Signals into Actions

Stress isn't always obvious. Sometimes it accumulates quietly, showing up as elevated resting heart rate, disrupted sleep, or subtle changes in your HRV. Learning to read these signals helps you intervene before stress becomes overwhelming.

## The Stress-Signal Connection

Your body responds to stress—both physical and mental—in predictable ways. When stressed, your resting heart rate tends to increase. A sustained elevation of five or more beats per minute above your baseline can indicate accumulated stress.

Stress activates your sympathetic nervous system, the fight-or-flight response, which typically lowers HRV. Chronic stress keeps HRV suppressed over time. Stress also disrupts sleep architecture, reducing deep sleep and REM sleep. You might sleep the same duration but feel significantly less rested.

Subjective markers often appear first. Irritability, difficulty focusing, feeling wired but tired—these are usually the earliest signs that stress is building up.

## Creating Your Stress Dashboard

Instead of guessing how stressed you are, create a composite view. Check your resting heart rate trend—is it elevated compared to your baseline? Look at your HRV trend—is it lower than usual? Assess your sleep quality—are you waking up feeling rested? Do a subjective check-in—how do you feel on a scale of one to ten?

When two or more of these signals align, you have actionable information. You're not guessing anymore. You have data to work with.

## The Stress-Sleep-Stress Loop

Stress disrupts sleep. Poor sleep increases stress. This creates a feedback loop that's hard to break, but not impossible.

To break the loop, prioritize sleep hygiene. Maintain a consistent bedtime, keep your room dark and cool. Use relaxation techniques before bed like breathing exercises or meditation. Avoid screens for one to two hours before sleep. If you wake up stressed, don't immediately check your phone. Instead, practice breathing exercises to calm your nervous system.

## Training Stress vs. Life Stress

Your body doesn't distinguish between training stress and life stress. A tough week at work plus intense training can push you over the edge, even if training alone wouldn't have that effect.

When life stress is high, reduce training intensity. Focus on recovery activities like yoga, walking, or easy movement. Don't add new stressors like diet changes or new routines. Prioritize sleep and stress management above everything else.

## Actionable Interventions

When stress signals are elevated, start with immediate actions you can take today. Spend ten minutes on breathing exercises. Go for a twenty-minute walk outside. Reduce your caffeine intake. Set boundaries and say no to non-essential commitments.

For short-term changes this week, reduce training intensity by twenty to thirty percent. Prioritize sleep and aim for eight or more hours. Practice stress management daily. Review your schedule and remove unnecessary stressors.

For long-term changes this month, build stress management into your routine permanently. Create better work-life boundaries. Consider therapy or coaching if stress is chronic. Review your training plan and ensure adequate recovery is built in.

## The Power of Small Habits

You don't need dramatic changes. Small, consistent habits compound over time. Five minutes of meditation daily adds up. Ten minutes of walking after meals makes a difference. A consistent sleep schedule within thirty minutes creates stability. Regular check-ins with yourself build self-awareness.

These small actions, done consistently, create resilience against stress. They're not dramatic, but they work.

## Conclusion

Stress isn't something to eliminate—it's something to manage. By reading your body's signals and responding appropriately, you can prevent stress from accumulating and impacting your wellbeing.

The goal is awareness and action, not perfection. Start by tracking your signals, then take small steps to manage stress before it becomes overwhelming.
    `,
  },
  "skin-as-a-signal": {
    readingTime: 7,
    image: "/photos/3.png",
    content: `
# Skin as a Signal: A Simple Tracker That Actually Works

Your skin reflects your internal state. Breakouts, dryness, redness—these aren't random. They're signals about stress, sleep, hormones, and overall health. Learning to read these signals helps you make connections and take action.

## Why Skin Tracking Matters

Most skincare routines focus on products and treatments. But if you're not addressing the root causes—stress, sleep, hormones, diet—you're treating symptoms, not the problem.

Skin tracking helps you identify triggers like stress, poor sleep, or certain foods. It helps you understand patterns such as hormonal cycles or seasonal changes. You can make data-driven decisions about your routine instead of guessing. Most importantly, you start seeing connections between lifestyle and skin health that weren't obvious before.

## The Minimal Approach

You don't need a complex system. A simple tracker beats a complicated plan you won't follow.

What should you track? Start with skin condition on a one-to-five scale—clear, minor issues, moderate problems, significant concerns, or severe flare-ups. Note triggers like stress, poor sleep, new products, or diet changes. Track routine changes including new products, skipped steps, or routine modifications. Add subjective notes about how your skin feels and what you notice.

When should you track? Do a daily check-in in the morning after washing your face. Track when you notice changes. Log entries after introducing new products or routines.

## Common Connections

Stress and breakouts often go hand in hand. Elevated cortisol can increase oil production and inflammation, leading to breakouts. If breakouts correlate with stressful periods, stress management becomes part of your skincare routine, not just something separate.

Sleep and skin quality are deeply connected. Poor sleep disrupts skin barrier function and increases inflammation. You might notice dryness, dullness, or increased sensitivity after nights of poor sleep.

Hormones and cycles affect many people. Tracking helps you anticipate and prepare for skin changes around your menstrual cycle or other hormonal shifts.

Diet and inflammation show up in your skin. Some foods trigger inflammation that manifests as breakouts or redness. Common culprits include dairy, sugar, and processed foods, but it's highly individual.

## Building Your Routine

Start simple, then refine. During weeks one and two, establish your baseline. Track skin condition daily, note any obvious triggers, and keep your current routine consistent. Don't change anything yet—just observe.

During weeks three and four, identify patterns. Look for correlations like stress leading to breakouts or poor sleep causing dryness. Note what seems to help or hurt. Still don't change your routine yet—just observe and learn.

After month two, make adjustments based on patterns. Make one change at a time, test for two to four weeks before evaluating, and keep tracking to see if changes actually help.

## The Trigger Log

When your skin changes, ask yourself what happened in the last twenty-four to forty-eight hours. Did stress increase? Did sleep quality decrease? Did you introduce something new like a product, food, or routine change? Are you in a different phase of your cycle?

Over time, patterns emerge. You might notice that work stress always precedes breakouts by two to three days. Poor sleep makes your skin more sensitive. Certain foods cause inflammation. These patterns become clear when you track consistently.

## Actionable Responses

When skin flares up, don't panic. Review your trigger log and ask what changed. For immediate response, return to your baseline routine with no new products. Prioritize sleep and stress management. Avoid known triggers. Be gentle with your skin and avoid harsh treatments.

For short-term response, address root causes like stress, sleep, and diet. Build resilience through consistent routines. Consider professional help if issues persist despite your efforts.

## The Routine That Works

The best routine is the one you'll actually do. In the morning, use cleanser, moisturizer, and sunscreen. In the evening, use cleanser, treatment if needed, and moisturizer. Weekly, do exfoliation once or twice and use a mask optionally.

Keep it simple. Consistency beats complexity every single time.

## Conclusion

Skin tracking isn't about perfection—it's about awareness. By noticing patterns and connections, you can make informed decisions about your skincare and lifestyle.

Start simple. Track daily. Look for patterns. Make small adjustments. Over time, you'll understand your skin's signals and respond appropriately.

The goal is healthy, resilient skin that reflects your overall wellbeing, not flawless skin at any cost.
    `,
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = mockBlog.find((p) => p.slug === slug);
  const content = blogContent[slug as keyof typeof blogContent];
  const t = await getTranslations("blog");

  if (!post || !content) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <Link href="/blog">
        <Button variant="ghost" className="mb-8 -ml-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("backToBlog") || "Back to blog"}
        </Button>
      </Link>

      <article>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {t(`posts.${slug}.title`)}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{content.readingTime} {t("readTime")}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="aspect-video rounded-2xl overflow-hidden mb-12 border-2 relative bg-gradient-to-br from-cyan-50 via-teal-50 to-indigo-50">
          <Image
            src={content.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-foreground leading-relaxed space-y-6">
            {content.content
              .split("\n")
              .filter((p) => p.trim() !== "")
              .map((paragraph, i) => {
                if (paragraph.startsWith("# ")) {
                  return (
                    <h2
                      key={i}
                      className="text-3xl font-bold mt-12 mb-6 text-foreground"
                    >
                      {paragraph.replace("# ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("## ")) {
                  return (
                    <h3
                      key={i}
                      className="text-2xl font-semibold mt-10 mb-4 text-foreground"
                    >
                      {paragraph.replace("## ", "")}
                    </h3>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                );
              })}
          </div>
        </div>
      </article>
    </main>
  );
}

