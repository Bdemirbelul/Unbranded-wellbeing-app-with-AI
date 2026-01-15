"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, Camera, X, CheckCircle2, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { ChartCard } from "@/components/app/ChartCard";
import { mockSkinAnalyses, mockSkinTrends, type SkinAnalysis } from "@/lib/mock";
import Image from "next/image";

export default function SkinHealthPage() {
  const t = useTranslations();
  const [analyses, setAnalyses] = useState<SkinAnalysis[]>(mockSkinAnalyses(30));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const trends = mockSkinTrends(30);
  const latest = analyses[analyses.length - 1];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setSelectedImage(imageUrl);
      setIsAnalyzing(true);
      
      // Simulate analysis
      setTimeout(() => {
        const newAnalysis: SkinAnalysis = {
          id: `SKIN-${new Date().toISOString().slice(0, 10)}`,
          date: new Date().toISOString().slice(0, 10),
          imageUrl: imageUrl,
          condition: Math.round(2 + Math.random() * 2),
          issues: ["acne", "dryness"],
          score: Math.round(60 + Math.random() * 30),
          recommendations: [
            "Increase hydration",
            "Review skincare routine",
            "Monitor stress levels"
          ],
          triggers: ["stress", "poor sleep"],
        };
        setAnalyses([...analyses, newAnalysis]);
        setIsAnalyzing(false);
        setSelectedImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const getConditionColor = (condition: number) => {
    if (condition <= 2) return "text-green-600 bg-green-50";
    if (condition <= 3) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getConditionLabel = (condition: number) => {
    if (condition <= 2) return "Excellent";
    if (condition <= 3) return "Good";
    if (condition <= 4) return "Fair";
    return "Needs Attention";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Tracking</div>
          <h1 className="text-2xl font-semibold tracking-tight">Skin Health</h1>
        </div>
        <Badge variant="secondary" className="rounded-full">AI Analysis</Badge>
      </div>

      {/* Upload Section */}
      <Card className="rounded-2xl p-6 border-2">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="font-medium mb-2">Upload Photo Analysis</div>
            <p className="text-sm text-muted-foreground mb-4">
              Take or upload a photo of your face for AI-powered skin analysis. The system will detect
              skin conditions, issues, and provide personalized recommendations.
            </p>
            
            {selectedImage && (
              <div className="relative mb-4 rounded-xl overflow-hidden border-2 border-primary/50">
                <div className="aspect-square relative bg-muted">
                  <Image
                    src={selectedImage}
                    alt="Uploaded skin photo"
                    fill
                    className="object-cover"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <div className="text-sm">Analyzing...</div>
                      </div>
                    </div>
                  )}
                </div>
                {!isAnalyzing && (
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="skin-upload"
                disabled={isAnalyzing}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="rounded-xl"
              >
                <Upload className="h-4 w-4 mr-2" />
                {selectedImage ? "Change Photo" : "Upload Photo"}
              </Button>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="rounded-xl"
              >
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>

          {latest && !selectedImage && (
            <div className="lg:w-80">
              <div className="font-medium mb-3">Latest Analysis</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall Score</span>
                  <span className="text-2xl font-semibold">{latest.score}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Condition</span>
                  <Badge className={`rounded-full ${getConditionColor(latest.condition)}`}>
                    {getConditionLabel(latest.condition)}
                  </Badge>
                </div>
                {latest.issues.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Detected Issues</div>
                    <div className="flex flex-wrap gap-2">
                      {latest.issues.map((issue) => (
                        <Badge key={issue} variant="secondary" className="rounded-full capitalize">
                          {issue}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Trends */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Skin Condition Trend"
          data={trends}
          dataKey="condition"
          yLabel="Condition (1-5)"
        />
        <ChartCard
          title="Skin Score Trend"
          data={trends}
          dataKey="score"
          yLabel="Score (0-100)"
        />
      </div>

      {/* Recent Analyses */}
      <Card className="rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium">Recent Analyses</div>
          <Badge variant="secondary" className="rounded-full">
            {analyses.length} total
          </Badge>
        </div>
        <div className="space-y-4">
          {analyses.slice(-5).reverse().map((analysis) => (
            <div
              key={analysis.id}
              className="rounded-xl border p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {analysis.imageUrl && (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={analysis.imageUrl}
                      alt={`Skin analysis ${analysis.date}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">
                        {new Date(analysis.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Score: {analysis.score}/100
                      </div>
                    </div>
                    <Badge className={`rounded-full ${getConditionColor(analysis.condition)}`}>
                      {getConditionLabel(analysis.condition)}
                    </Badge>
                  </div>
                  
                  {analysis.issues.length > 0 && (
                    <div className="mb-2">
                      <div className="text-xs text-muted-foreground mb-1">Issues detected:</div>
                      <div className="flex flex-wrap gap-1">
                        {analysis.issues.map((issue) => (
                          <Badge key={issue} variant="outline" className="text-xs capitalize">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.triggers && analysis.triggers.length > 0 && (
                    <div className="mb-2">
                      <div className="text-xs text-muted-foreground mb-1">Possible triggers:</div>
                      <div className="flex flex-wrap gap-1">
                        {analysis.triggers.map((trigger) => (
                          <Badge key={trigger} variant="secondary" className="text-xs capitalize">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.recommendations.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Recommendations:</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {analysis.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3 w-3 mt-0.5 text-green-600 shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl p-5">
          <div className="text-sm text-muted-foreground mb-1">Average Score</div>
          <div className="text-2xl font-semibold">
            {Math.round(analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length)}/100
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
            <TrendingUp className="h-3 w-3" />
            <span>+5% this month</span>
          </div>
        </Card>
        <Card className="rounded-2xl p-5">
          <div className="text-sm text-muted-foreground mb-1">Analyses This Month</div>
          <div className="text-2xl font-semibold">{analyses.length}</div>
          <div className="text-xs text-muted-foreground mt-2">Regular tracking</div>
        </Card>
        <Card className="rounded-2xl p-5">
          <div className="text-sm text-muted-foreground mb-1">Most Common Issue</div>
          <div className="text-lg font-semibold capitalize">
            {latest.issues[0] || "None"}
          </div>
          <div className="text-xs text-muted-foreground mt-2">Focus area</div>
        </Card>
      </div>
    </div>
  );
}

