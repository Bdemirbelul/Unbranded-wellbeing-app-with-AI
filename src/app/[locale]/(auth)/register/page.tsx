"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Phone,
  MapPin,
  Sparkles,
  Shield,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    location: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    const newErrors: Record<string, string> = { ...errors };

    switch (name) {
      case "firstName":
        if (!value.trim()) {
          newErrors.firstName = "First name is required";
        } else if (value.length < 2) {
          newErrors.firstName = "First name must be at least 2 characters";
        } else {
          delete newErrors.firstName;
        }
        break;
      case "lastName":
        if (!value.trim()) {
          newErrors.lastName = "Last name is required";
        } else if (value.length < 2) {
          newErrors.lastName = "Last name must be at least 2 characters";
        } else {
          delete newErrors.lastName;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        if (value && !/^\+?[\d\s()-]+$/.test(value)) {
          newErrors.phone = "Please enter a valid phone number";
        } else {
          delete newErrors.phone;
        }
        break;
      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password =
            "Password must contain uppercase, lowercase, and number";
        } else {
          delete newErrors.password;
        }
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case "dateOfBirth":
        if (!value) {
          newErrors.dateOfBirth = "Date of birth is required";
        } else {
          const age = new Date().getFullYear() - new Date(value).getFullYear();
          if (age < 13) {
            newErrors.dateOfBirth = "You must be at least 13 years old";
          } else {
            delete newErrors.dateOfBirth;
          }
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (typeof value === "string") {
      validateField(name, value);
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (typeof formData[name as keyof typeof formData] === "string") {
      validateField(name, formData[name as keyof typeof formData] as string);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 3) return { strength, label: "Fair", color: "bg-yellow-500" };
    if (strength <= 4) return { strength, label: "Good", color: "bg-blue-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    Object.keys(formData).forEach((key) => {
      setTouched((prev) => ({ ...prev, [key]: true }));
      if (typeof formData[key as keyof typeof formData] === "string") {
        validateField(key, formData[key as keyof typeof formData] as string);
      }
    });

    // Check for errors
    const hasErrors = Object.keys(errors).length > 0;
    const requiredFields = ["firstName", "lastName", "email", "password", "confirmPassword", "dateOfBirth"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (hasErrors || missingFields.length > 0 || !formData.agreeToTerms) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    
    // Redirect to dashboard
    router.push("/dashboard");
  };

  const isFieldValid = (name: string) => {
    return touched[name] && !errors[name] && formData[name as keyof typeof formData];
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="rounded-2xl p-8 border-2">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 mb-4">
            <Sparkles className="h-8 w-8 text-cyan-600" />
          </div>
          <div className="text-sm text-muted-foreground mb-2">Get started</div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join thousands tracking their wellbeing with data-driven insights
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  onBlur={() => handleBlur("firstName")}
                  className={`rounded-xl pl-10 ${
                    touched.firstName && errors.firstName
                      ? "border-destructive"
                      : isFieldValid("firstName")
                      ? "border-green-500"
                      : ""
                  }`}
                  placeholder="John"
                />
              </div>
              {touched.firstName && errors.firstName && (
                <div className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.firstName}
                </div>
              )}
              {isFieldValid("firstName") && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle2 className="h-3 w-3" />
                  Looks good!
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  onBlur={() => handleBlur("lastName")}
                  className={`rounded-xl pl-10 ${
                    touched.lastName && errors.lastName
                      ? "border-destructive"
                      : isFieldValid("lastName")
                      ? "border-green-500"
                      : ""
                  }`}
                  placeholder="Doe"
                />
              </div>
              {touched.lastName && errors.lastName && (
                <div className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.lastName}
                </div>
              )}
              {isFieldValid("lastName") && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle2 className="h-3 w-3" />
                  Looks good!
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`rounded-xl pl-10 ${
                  touched.email && errors.email
                    ? "border-destructive"
                    : isFieldValid("email")
                    ? "border-green-500"
                    : ""
                }`}
                placeholder="john@example.com"
              />
            </div>
            {touched.email && errors.email && (
              <div className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </div>
            )}
            {isFieldValid("email") && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                Valid email
              </div>
            )}
          </div>

          {/* Phone & Date of Birth */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={`rounded-xl pl-10 ${
                    touched.phone && errors.phone ? "border-destructive" : ""
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {touched.phone && errors.phone && (
                <div className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.phone}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">
                Date of Birth <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  onBlur={() => handleBlur("dateOfBirth")}
                  className={`rounded-xl pl-10 ${
                    touched.dateOfBirth && errors.dateOfBirth
                      ? "border-destructive"
                      : isFieldValid("dateOfBirth")
                      ? "border-green-500"
                      : ""
                  }`}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 13))
                    .toISOString()
                    .split("T")[0]}
                />
              </div>
              {touched.dateOfBirth && errors.dateOfBirth && (
                <div className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.dateOfBirth}
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="rounded-xl pl-10"
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                className={`rounded-xl pl-10 pr-10 ${
                  touched.password && errors.password
                    ? "border-destructive"
                    : isFieldValid("password")
                    ? "border-green-500"
                    : ""
                }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {formData.password && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{passwordStrength.label}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Must contain: uppercase, lowercase, number, and be at least 8 characters
                </div>
              </div>
            )}
            {touched.password && errors.password && (
              <div className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                onBlur={() => handleBlur("confirmPassword")}
                className={`rounded-xl pl-10 pr-10 ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-destructive"
                    : isFieldValid("confirmPassword")
                    ? "border-green-500"
                    : ""
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors.confirmPassword}
              </div>
            )}
            {isFieldValid("confirmPassword") && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                Passwords match
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-primary underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary underline">
                  Privacy Policy
                </Link>
                <span className="text-destructive">*</span>
              </label>
            </div>
            {touched.agreeToTerms && !formData.agreeToTerms && (
              <div className="flex items-center gap-1 text-xs text-destructive ml-7">
                <AlertCircle className="h-3 w-3" />
                You must agree to the terms to continue
              </div>
            )}

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="subscribeNewsletter"
                checked={formData.subscribeNewsletter}
                onChange={(e) => handleChange("subscribeNewsletter", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="subscribeNewsletter" className="text-sm text-muted-foreground">
                Subscribe to our newsletter for wellness tips and updates
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl h-12 text-base font-medium"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating account...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Create Account
              </>
            )}
          </Button>

          {/* Login Link */}
          <div className="text-center text-sm text-muted-foreground pt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium underline">
              Log in
            </Link>
          </div>
        </form>
      </Card>

      {/* Trust Badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Secure & Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>GDPR Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>Privacy First</span>
        </div>
      </div>
    </div>
  );
}
