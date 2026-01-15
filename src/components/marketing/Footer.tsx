import Link from "next/link";



export function Footer() {

  return (

    <footer className="border-t bg-background/60 backdrop-blur">

      <div className="mx-auto max-w-6xl px-4 py-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="text-sm text-muted-foreground">

            © 2026 Unbranded Wellbeing. Demo environment.

          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">

            <Link href="/en/blog" className="hover:text-foreground">Blog</Link>

            <Link href="/en/pricing" className="hover:text-foreground">Pricing</Link>

            <Link href="/en/login" className="hover:text-foreground">Log in</Link>

          </div>

        </div>

        <div className="mt-4 pt-4 border-t border-border/50">

          <div className="text-xs text-muted-foreground/60 text-center">

            Developed by{" "}

            <span className="text-muted-foreground/80">Balamir Demirkan Belül</span>

          </div>

        </div>

      </div>

    </footer>

  );

}

