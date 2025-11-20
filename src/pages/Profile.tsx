import {
  User,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Heart,
  Settings,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const menuItems = [
  {
    section: "Account",
    items: [
      { icon: User, label: "Edit Profile", description: "Name, email, phone" },
      {
        icon: MapPin,
        label: "Addresses",
        description: "Manage delivery locations",
      },
      {
        icon: CreditCard,
        label: "Payment Methods",
        description: "Cards and wallets",
      },
    ],
  },
  {
    section: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", description: "Push, email, SMS" },
      { icon: Heart, label: "Favorites", description: "Saved restaurants" },
      { icon: Settings, label: "Settings", description: "App preferences" },
    ],
  },
  {
    section: "Support",
    items: [
      {
        icon: HelpCircle,
        label: "Help Center",
        description: "FAQs and support",
      },
    ],
  },
];

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to log out");
      return;
    }
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-b from-primary/10 to-transparent">
        <div className="p-6 pb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                N
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Nathanael</h1>
              <p className="text-sm text-muted-foreground mt-1">
                +254 718 796 084
              </p>
              <p className="text-xs text-muted-foreground">
                nathanael.mutua.m@gmail.com
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="px-4 -mt-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground mt-1">Orders</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">5</p>
            <p className="text-xs text-muted-foreground mt-1">Favorites</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">KES 8.5k</p>
            <p className="text-xs text-muted-foreground mt-1">Spent</p>
          </Card>
        </div>
      </section>

      {/* Menu Sections */}
      <div className="px-4 space-y-6">
        {menuItems.map((section, sectionIdx) => (
          <section key={sectionIdx}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              {section.section}
            </h2>
            <Card className="overflow-hidden">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                 const handleClick = () => {
                  if (item.label === "Edit Profile") {
                    navigate("/profile/edit");
                  }
                };

                return (
                  <div key={itemIdx}>
                    <button 
                      className="w-full flex items-center gap-4 p-4 hover:bg-accent/5 active:bg-accent/10 transition-colors"
                      onClick={handleClick}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="font-semibold text-foreground">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                    </button>
                    {itemIdx < section.items.length - 1 && (
                      <Separator className="ml-[72px]" />
                    )}
                  </div>
                );
              })}
            </Card>
          </section>
        ))}

        {/* Logout */}
        <section className="pb-6">
          <Button
            variant="outline"
            className="w-full text-error border-error/20 hover:bg-error/5 hover:border-error/30"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Log Out
          </Button>
        </section>
      </div>

      {/* App Version */}
      <div className="text-center pb-6">
        <p className="text-xs text-muted-foreground">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Profile;
