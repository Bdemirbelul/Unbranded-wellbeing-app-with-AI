"use client";

import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, Download } from "lucide-react";

export function Topbar() {
  const router = useRouter();
  const locale = useLocale();

  const handleLogout = () => {
    // Clear any session data (in a real app, you'd clear cookies/tokens)
    // Redirect to home page
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between border-b bg-background/60 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="rounded-full">Demo</Badge>
        <div className="text-sm text-muted-foreground">HRV · Sleep · Stress · Skin</div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="rounded-xl">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl hover:bg-muted p-1.5 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback>DB</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-semibold">Demo User</span>
                <span className="text-xs text-muted-foreground font-normal">
                  demo@wellbeing.app
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href={`/${locale}/settings`} className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={`/${locale}/settings`} className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                Settings
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

