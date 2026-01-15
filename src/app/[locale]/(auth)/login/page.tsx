"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VALID_USERS = ["Frank", "Linda"];
const VALID_PASSWORD = "123456";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError(t("login.error.empty") || "Lütfen kullanıcı adı ve şifre giriniz");
      return;
    }

    if (VALID_USERS.includes(username) && password === VALID_PASSWORD) {
      // Başarılı giriş - dashboard'a yönlendir
      router.push("/dashboard");
    } else {
      setError(t("login.error.invalid") || "Kullanıcı adı ve şifre hatalı");
    }
  };

  return (
    <Card className="rounded-2xl p-6">
      <div className="text-sm text-muted-foreground">{t("login.welcome") || "Welcome back"}</div>
      <div className="mt-2 text-2xl font-semibold">{t("nav.login")}</div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div>
          <Input
            placeholder={t("login.usernamePlaceholder") || "Kullanıcı adı (Frank veya Linda)"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={error ? "border-destructive" : ""}
          />
        </div>

        <div>
          <Input
            placeholder={t("login.passwordPlaceholder") || "Şifre"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "border-destructive" : ""}
          />
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-xl">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full rounded-2xl">
          {t("login.continue") || "Continue"}
        </Button>
      </form>

      <div className="mt-4 text-sm text-muted-foreground">
        {t("login.newHere") || "New here?"}{" "}
        <Link className="text-foreground underline" href="/register">
          {t("nav.register")}
        </Link>
      </div>
    </Card>
  );
}

