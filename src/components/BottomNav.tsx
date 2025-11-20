import { Home, MapPin, ShoppingBag, User } from "lucide-react";
import { NavLink } from "./NavLink";
// import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: MapPin, label: "Map", path: "/map" },
  { icon: ShoppingBag, label: "Orders", path: "/orders" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg text-muted-foreground transition-colors min-h-[44px] min-w-[44px] justify-center"
              activeClassName="text-primary bg-primary/10"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
