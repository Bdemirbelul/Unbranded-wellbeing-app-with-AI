import { ChatUI } from "@/components/app/ChatUI";



export default async function CoachPage({ params }: { params: Promise<{ locale: string }> }) {

  const { locale } = await params;

  return (

    <div className="space-y-3">

      <div>

        <div className="text-sm text-muted-foreground">Assistant</div>

        <h1 className="text-2xl font-semibold tracking-tight">AI Coach</h1>

      </div>

      <ChatUI locale={locale} />

    </div>

  );

}

