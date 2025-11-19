import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const roleOptions = [
  { value: "customer", label: "Customer", description: "Order food from restaurants" },
  { value: "rider", label: "Rider", description: "Deliver food to customers" },
  { value: "restaurant_owner", label: "Restaurant Owner", description: "Manage your restaurant" },
] as const;

const emailSchema = z.string().trim().email({ message: "Invalid email address" }).max(255);
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" }).max(100);
const nameSchema = z.string().trim().min(1, { message: "Name is required" }).max(100);

type AppRole = typeof roleOptions[number]["value"];

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup" | "role-select">("login");
  const [selectedRole, setSelectedRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/");
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    try {
      emailSchema.parse(formData.email);
      passwordSchema.parse(formData.password);
      if (mode === "signup") {
        nameSchema.parse(formData.fullName);
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !selectedRole) return;

    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
          },
        },
      });

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        // Assign the selected role
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert({
            user_id: data.user.id,
            role: selectedRole,
            verified: true,
          });

        if (roleError) {
          toast({
            title: "Role Assignment Failed",
            description: "Your account was created but role assignment failed. Please contact support.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Success!",
          description: "Your account has been created.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (mode === "role-select") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Button
              variant="ghost"
              size="sm"
              className="w-fit mb-2"
              onClick={() => setMode("signup")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <CardTitle>Choose Your Role</CardTitle>
            <CardDescription>Select how you want to use the app</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {roleOptions.map((role) => (
              <button
                key={role.value}
                onClick={() => {
                  setSelectedRole(role.value);
                  setMode("signup");
                }}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-primary ${
                  selectedRole === role.value
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="font-semibold text-foreground">{role.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{role.description}</div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Welcome Back" : "Create Account"}</CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Sign in to your account to continue"
              : "Fill in your details to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
            {mode === "signup" && (
              <>
                {selectedRole && (
                  <div className="p-3 rounded-lg bg-muted border border-border">
                    <div className="text-sm font-medium text-foreground">
                      Role: {roleOptions.find((r) => r.value === selectedRole)?.label}
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-primary"
                      onClick={() => setMode("role-select")}
                    >
                      Change role
                    </Button>
                  </div>
                )}

                {!selectedRole && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setMode("role-select")}
                  >
                    Select Your Role
                  </Button>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+254 700 000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading || (mode === "signup" && !selectedRole)}>
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </Button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setSelectedRole(null);
                }}
                className="text-primary hover:underline"
              >
                {mode === "login"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
