"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Trophy,
  Medal,
  TrendingUp,
  TrendingDown,
  Minus,
  Flame,
  Award,
  Target,
  BarChart3,
  Calendar,
  Filter,
} from "lucide-react";
import { mockLeaderboard, type LeaderboardUser } from "@/lib/mock";
import Image from "next/image";

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "alltime">("weekly");
  const [category, setCategory] = useState<"overall" | "hrv" | "recovery" | "consistency">("overall");
  const leaderboard = mockLeaderboard();
  const currentUser = leaderboard.find((u) => u.id === "user-5") || leaderboard[4];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1)
      return (
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
          <Trophy className="h-4 w-4 text-white" />
        </div>
      );
    if (rank === 2)
      return (
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-lg">
          <Medal className="h-4 w-4 text-white" />
        </div>
      );
    if (rank === 3)
      return (
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg">
          <Medal className="h-4 w-4 text-white" />
        </div>
      );
    return null;
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getChangeText = (change: number) => {
    if (change > 0) return `+${change}`;
    if (change < 0) return `${change}`;
    return "—";
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Community</div>
          <h1 className="text-2xl font-semibold tracking-tight">Leaderboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Compete with others and track your wellbeing progress
          </p>
        </div>
        <Badge variant="secondary" className="rounded-full">Live Rankings</Badge>
      </div>

      {/* Top 3 Podium */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map((user, index) => {
          const positions = [2, 1, 3];
          const heights = ["h-32", "h-40", "h-28"];
          const gradients = [
            "from-gray-400/20 to-gray-600/20",
            "from-yellow-400/20 to-yellow-600/20",
            "from-amber-500/20 to-amber-700/20",
          ];

          return (
            <Card
              key={user.id}
              className={`relative rounded-2xl p-6 border-2 ${
                index === 1 ? "border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-transparent" : ""
              }`}
            >
              {getRankBadge(user.rank)}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {user.badge && (
                    <div className="absolute -bottom-1 -right-1">
                      {user.badge === "gold" && (
                        <Trophy className="h-6 w-6 text-yellow-500" />
                      )}
                      {user.badge === "silver" && (
                        <Medal className="h-6 w-6 text-gray-400" />
                      )}
                      {user.badge === "bronze" && (
                        <Medal className="h-6 w-6 text-amber-600" />
                      )}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                <div className="text-3xl font-bold mb-2">{user.score.toLocaleString()}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span>{user.streak} day streak</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={timeframe === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("weekly")}
              className="rounded-xl"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Weekly
            </Button>
            <Button
              variant={timeframe === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("monthly")}
              className="rounded-xl"
            >
              Monthly
            </Button>
            <Button
              variant={timeframe === "alltime" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("alltime")}
              className="rounded-xl"
            >
              All Time
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            <Button
              variant={category === "overall" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("overall")}
              className="rounded-xl"
            >
              Overall
            </Button>
            <Button
              variant={category === "hrv" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("hrv")}
              className="rounded-xl"
            >
              HRV
            </Button>
            <Button
              variant={category === "recovery" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("recovery")}
              className="rounded-xl"
            >
              Recovery
            </Button>
            <Button
              variant={category === "consistency" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("consistency")}
              className="rounded-xl"
            >
              Consistency
            </Button>
          </div>
        </div>
      </Card>

      {/* Current User Card */}
      <Card className="rounded-2xl p-6 border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-4 border-primary/20">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>DU</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {currentUser.rank}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">Your Ranking</h3>
                <Badge variant="secondary" className="rounded-full">
                  You
                </Badge>
              </div>
              <div className="text-2xl font-bold">{currentUser.score.toLocaleString()}</div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span>{currentUser.metrics.hrv}ms HRV</span>
                <span>•</span>
                <span>{currentUser.metrics.recovery}% Recovery</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-orange-500" />
                  {currentUser.streak} days
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Position Change</div>
            <div className={`flex items-center gap-1 text-lg font-semibold ${getChangeColor(currentUser.change)}`}>
              {getChangeIcon(currentUser.change)}
              {getChangeText(currentUser.change)}
            </div>
          </div>
        </div>
      </Card>

      {/* Leaderboard List */}
      <Card className="rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="font-semibold text-lg">Full Rankings</div>
          <Badge variant="secondary" className="rounded-full">
            {leaderboard.length} participants
          </Badge>
        </div>

        <div className="space-y-3">
          {leaderboard.map((user) => {
            const isCurrentUser = user.id === currentUser.id;
            return (
              <div
                key={user.id}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  isCurrentUser
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/50 hover:border-primary/30 hover:bg-muted/30"
                }`}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-12 flex items-center justify-center">
                  {getRankIcon(user.rank)}
                </div>

                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {user.badge && (
                    <div className="absolute -bottom-1 -right-1">
                      {user.badge === "gold" && (
                        <Trophy className="h-4 w-4 text-yellow-500" />
                      )}
                      {user.badge === "silver" && (
                        <Medal className="h-4 w-4 text-gray-400" />
                      )}
                      {user.badge === "bronze" && (
                        <Medal className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{user.name}</h4>
                    {isCurrentUser && (
                      <Badge variant="secondary" className="rounded-full text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      {user.metrics.hrv}ms HRV
                    </span>
                    <span>•</span>
                    <span>{user.metrics.recovery}% Recovery</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      {user.streak} days
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="text-2xl font-bold">{user.score.toLocaleString()}</div>
                  <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    {getChangeIcon(user.change)}
                    <span className={getChangeColor(user.change)}>
                      {getChangeText(user.change)} this week
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Top Score</div>
            <Trophy className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold">{leaderboard[0].score.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">{leaderboard[0].name}</div>
        </Card>
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Longest Streak</div>
            <Flame className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-3xl font-bold">
            {Math.max(...leaderboard.map((u) => u.streak))} days
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {leaderboard.find((u) => u.streak === Math.max(...leaderboard.map((u) => u.streak)))
              ?.name || "—"}
          </div>
        </Card>
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Your Progress</div>
            <Target className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold">#{currentUser.rank}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {currentUser.score.toLocaleString()} points
          </div>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="rounded-2xl p-6 bg-gradient-to-br from-background to-muted/30">
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-6 w-6 text-primary" />
          <h3 className="font-semibold text-lg">How Scoring Works</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="font-medium">Points System</div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• HRV consistency: Up to 1000 points</li>
              <li>• Recovery scores: Up to 800 points</li>
              <li>• Sleep quality: Up to 600 points</li>
              <li>• Tracking streak: Up to 447 points</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Ranking Updates</div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Rankings update daily at midnight</li>
              <li>• Weekly, monthly, and all-time views</li>
              <li>• Compete fairly with similar activity levels</li>
              <li>• Focus on consistency over perfection</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

