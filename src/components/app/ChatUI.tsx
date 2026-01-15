"use client";



import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";

import { Badge } from "@/components/ui/badge";

import { mockMetrics } from "@/lib/mock";



type Msg = { role: "user" | "assistant"; content: string };



export function ChatUI({ locale }: { locale: string }) {

  const [messages, setMessages] = useState<Msg[]>([

    { role: "assistant", content: "Tell me what you want to understand: HRV, sleep, stress, or a recovery plan." }

  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);



  const context = useMemo(() => {

    const pts = mockMetrics(30);

    const last = pts[pts.length - 1];

    const avg = (k: keyof typeof last) => pts.reduce((a, p: any) => a + p[k], 0) / pts.length;

    return {

      lastDay: last,

      avg30d: {

        hrv: Math.round(avg("hrv") * 10) / 10,

        rhr: Math.round(avg("rhr") * 10) / 10,

        sleep: Math.round(avg("sleep") * 100) / 100,

        steps: Math.round(avg("steps"))

      }

    };

  }, []);



  async function send() {

    const text = input.trim();

    if (!text || loading) return;



    setMessages((m) => [...m, { role: "user", content: text }]);

    setInput("");

    setLoading(true);



    try {

      const r = await fetch("/api/chat", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ message: text, locale, context })

      });

      const data = await r.json();

      if (!r.ok) throw new Error(data?.error || "Request failed");

      setMessages((m) => [...m, { role: "assistant", content: data.content || "(empty)" }]);

    } catch (e: any) {

      setMessages((m) => [...m, { role: "assistant", content: `Error: ${e.message}` }]);

    } finally {

      setLoading(false);

    }

  }



  return (

    <div className="grid gap-4 lg:grid-cols-3">

      <Card className="rounded-2xl p-5 lg:col-span-2">

        <div className="mb-3 flex items-center justify-between">

          <div className="font-medium">AI Coach</div>

          <Badge variant="secondary" className="rounded-full">Ollama</Badge>

        </div>



        <div className="h-[420px] space-y-3 overflow-auto rounded-xl border bg-muted/30 p-4">

          {messages.map((m, i) => (

            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>

              <div className={

                m.role === "user"

                  ? "max-w-[85%] rounded-2xl bg-foreground px-4 py-2 text-background"

                  : "max-w-[85%] rounded-2xl border bg-background px-4 py-2"

              }>

                <div className="text-xs opacity-70">{m.role === "user" ? "You" : "Coach"}</div>

                <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>

              </div>

            </div>

          ))}

        </div>



        <div className="mt-4 flex gap-2">

          <Textarea

            value={input}

            onChange={(e) => setInput(e.target.value)}

            placeholder="Ask about your HRV / sleep / stress trends…"

            className="min-h-[52px] rounded-2xl"

          />

          <Button onClick={send} disabled={loading} className="h-[52px] rounded-2xl px-6">

            {loading ? "Thinking…" : "Send"}

          </Button>

        </div>

      </Card>



      <Card className="rounded-2xl p-5">

        <div className="font-medium">Today brief (context)</div>

        <div className="mt-3 space-y-2 text-sm text-muted-foreground">

          <div className="rounded-xl border bg-muted/40 p-3">

            <div className="text-xs">Last day</div>

            <div className="mt-1">HRV {context.lastDay.hrv} · RHR {context.lastDay.rhr} · Sleep {context.lastDay.sleep}h</div>

          </div>

          <div className="rounded-xl border bg-muted/40 p-3">

            <div className="text-xs">30d averages</div>

            <div className="mt-1">HRV {context.avg30d.hrv} · RHR {context.avg30d.rhr} · Sleep {context.avg30d.sleep}h</div>

          </div>

        </div>



        <div className="mt-4 text-xs text-muted-foreground">

          Safety: Not medical advice · Demo data

        </div>

      </Card>

    </div>

  );

}

