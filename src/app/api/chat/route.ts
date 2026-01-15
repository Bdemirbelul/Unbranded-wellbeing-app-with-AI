import { NextResponse } from "next/server";



export async function POST(req: Request) {

  const { message, locale, context } = await req.json();



  const baseUrl = process.env.OLLAMA_URL ?? "http://127.0.0.1:11434";

  const model = process.env.OLLAMA_MODEL ?? "llama3.2:3b";



  const system = `

You are a wellbeing coach. Be concise, practical, and non-medical.

Always include:

- 1-sentence insight

- 3 bullet action steps

Avoid diagnosis. If asked medical questions, advise consulting a clinician.

Reply in language: ${(locale ?? "en").toUpperCase()}.

`.trim();



  const user = `

User question: ${message}



Context:

${JSON.stringify(context ?? {}, null, 2)}

`.trim();



  const r = await fetch(`${baseUrl.replace(/\/$/, "")}/api/chat`, {

    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({

      model,

      stream: false,

      messages: [

        { role: "system", content: system },

        { role: "user", content: user }

      ],

      options: { temperature: 0.4 }

    })

  });



  if (!r.ok) {

    const text = await r.text();

    return NextResponse.json({ error: text.slice(0, 500) }, { status: 500 });

  }



  const data = await r.json();

  const content = data?.message?.content ?? "";

  return NextResponse.json({ content });

}

