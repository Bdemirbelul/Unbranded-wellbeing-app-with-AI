"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Bell,
  Shield,
  Eye,
  Globe,
  Activity,
  Database,
  Download,
  Trash2,
  Save,
  Camera,
} from "lucide-react";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Demo",
    lastName: "User",
    email: "demo@wellbeing.app",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    location: "San Francisco, CA",
    bio: "Wellness enthusiast focused on HRV tracking and recovery optimization.",
    timezone: "America/Los_Angeles",
    language: "en",
    units: "metric",
    notifications: {
      email: true,
      push: true,
      sms: false,
      weeklyReport: true,
      insights: true,
      alerts: true,
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      aiInsights: true,
      publicProfile: false,
    },
    display: {
      theme: "system",
      compactMode: false,
      showAdvanced: false,
    },
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    // Show success message
    alert("Settings saved successfully!");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes(".")) {
      const [section, key] = field.split(".");
      setFormData((prev) => {
        const sectionData = prev[section as keyof typeof prev] as Record<string, unknown>;
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [key]: value,
          },
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-muted-foreground">Preferences</div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account settings, preferences, and privacy options
        </p>
      </div>

      {/* Profile Section */}
      <Card className="rounded-2xl p-6 border-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10">
              <User className="h-5 w-5 text-cyan-600" />
            </div>
            <div>
              <div className="font-semibold text-lg">Profile Information</div>
              <div className="text-sm text-muted-foreground">
                Update your personal details and profile picture
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="rounded-full">Active</Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Avatar */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                  <AvatarImage src="/photos/1.png" alt="Profile" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white">
                    DU
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center">
                <div className="font-semibold">{formData.firstName} {formData.lastName}</div>
                <div className="text-sm text-muted-foreground">{formData.email}</div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="rounded-xl"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="rounded-xl"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="rounded-xl pl-10"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="rounded-xl pl-10"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="rounded-xl pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="rounded-xl pl-10"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="rounded-xl min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
              <div className="text-xs text-muted-foreground">
                {formData.bio.length}/200 characters
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Preferences Section */}
      <Card className="rounded-2xl p-6 border-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <Globe className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <div className="font-semibold text-lg">Preferences</div>
            <div className="text-sm text-muted-foreground">
              Customize your app experience
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              id="language"
              value={formData.language}
              onChange={(e) => handleInputChange("language", e.target.value)}
              className="rounded-xl"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="tr">Türkçe</option>
              <option value="pl">Polski</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              id="timezone"
              value={formData.timezone}
              onChange={(e) => handleInputChange("timezone", e.target.value)}
              className="rounded-xl"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Istanbul">Istanbul (TRT)</option>
              <option value="Europe/Warsaw">Warsaw (CET)</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="units">Units</Label>
            <Select
              id="units"
              value={formData.units}
              onChange={(e) => handleInputChange("units", e.target.value)}
              className="rounded-xl"
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, ft)</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              id="theme"
              value={formData.display.theme}
              onChange={(e) => handleInputChange("display.theme", e.target.value)}
              className="rounded-xl"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Compact Mode</div>
                <div className="text-sm text-muted-foreground">
                  Use a more compact layout
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.display.compactMode}
              onChange={(e) => handleInputChange("display.compactMode", e.target.checked)}
              className="w-11 h-6 bg-muted rounded-full appearance-none checked:bg-primary relative cursor-pointer transition-colors"
              style={{
                background: formData.display.compactMode ? "rgb(var(--primary))" : undefined,
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Show Advanced Options</div>
                <div className="text-sm text-muted-foreground">
                  Display advanced settings and features
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.display.showAdvanced}
              onChange={(e) => handleInputChange("display.showAdvanced", e.target.checked)}
              className="w-11 h-6 bg-muted rounded-full appearance-none checked:bg-primary relative cursor-pointer transition-colors"
              style={{
                background: formData.display.showAdvanced ? "rgb(var(--primary))" : undefined,
              }}
            />
          </div>
        </div>
      </Card>

      {/* Notifications Section */}
      <Card className="rounded-2xl p-6 border-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
            <Bell className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <div className="font-semibold text-lg">Notifications</div>
            <div className="text-sm text-muted-foreground">
              Manage how you receive notifications
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
            { key: "push", label: "Push Notifications", desc: "Receive push notifications on your device" },
            { key: "sms", label: "SMS Notifications", desc: "Receive important alerts via SMS" },
            { key: "weeklyReport", label: "Weekly Reports", desc: "Get weekly summary reports" },
            { key: "insights", label: "New Insights", desc: "Notify when new insights are available" },
            { key: "alerts", label: "Important Alerts", desc: "Receive critical health alerts" },
          ].map((notif) => (
            <div
              key={notif.key}
              className="flex items-center justify-between p-4 rounded-xl border bg-muted/30"
            >
              <div>
                <div className="font-medium">{notif.label}</div>
                <div className="text-sm text-muted-foreground">{notif.desc}</div>
              </div>
              <input
                type="checkbox"
                checked={formData.notifications[notif.key as keyof typeof formData.notifications]}
                onChange={(e) =>
                  handleInputChange(`notifications.${notif.key}`, e.target.checked)
                }
                className="w-11 h-6 bg-muted rounded-full appearance-none checked:bg-primary relative cursor-pointer transition-colors"
                style={{
                  background: formData.notifications[notif.key as keyof typeof formData.notifications]
                    ? "rgb(var(--primary))"
                    : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy & Security Section */}
      <Card className="rounded-2xl p-6 border-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-lg">Privacy & Security</div>
            <div className="text-sm text-muted-foreground">
              Control your data privacy and security settings
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              key: "dataSharing",
              label: "Data Sharing",
              desc: "Allow anonymized data sharing for research",
            },
            {
              key: "analytics",
              label: "Analytics",
              desc: "Help improve the app with usage analytics",
            },
            {
              key: "aiInsights",
              label: "AI Insights",
              desc: "Enable AI-powered personalized insights",
            },
            {
              key: "publicProfile",
              label: "Public Profile",
              desc: "Make your profile visible to others",
            },
          ].map((privacy) => (
            <div
              key={privacy.key}
              className="flex items-center justify-between p-4 rounded-xl border bg-muted/30"
            >
              <div>
                <div className="font-medium">{privacy.label}</div>
                <div className="text-sm text-muted-foreground">{privacy.desc}</div>
              </div>
              <input
                type="checkbox"
                checked={formData.privacy[privacy.key as keyof typeof formData.privacy]}
                onChange={(e) =>
                  handleInputChange(`privacy.${privacy.key}`, e.target.checked)
                }
                className="w-11 h-6 bg-muted rounded-full appearance-none checked:bg-primary relative cursor-pointer transition-colors"
                style={{
                  background: formData.privacy[privacy.key as keyof typeof formData.privacy]
                    ? "rgb(var(--primary))"
                    : undefined,
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Change Password</div>
                <div className="text-sm text-muted-foreground">
                  Update your account password
                </div>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Export Data</div>
                <div className="text-sm text-muted-foreground">
                  Download all your data in JSON format
                </div>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl">
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border bg-destructive/10 border-destructive/20">
            <div className="flex items-center gap-3">
              <Trash2 className="h-5 w-5 text-destructive" />
              <div>
                <div className="font-medium text-destructive">Delete Account</div>
                <div className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </div>
              </div>
            </div>
            <Button variant="destructive" className="rounded-xl">
              Delete
            </Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="rounded-xl">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-xl"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
