import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, Clock, MapPin, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MenuItemCard } from "@/components/MenuItemCard";
import { toast } from "sonner";
import beefStewImage from "@/assets/beef-stew.jpg";
import chickenImage from "@/assets/chicken.jpg";
import saladImage from "@/assets/salad.jpg";

const menuItems = [
  {
    id: "1",
    name: "Beef Stew",
    description: "Traditional Kenyan beef stew with vegetables",
    price: 350,
    image: beefStewImage,
    category: "Main Course",
  },
  {
    id: "2",
    name: "Grilled Chicken",
    description: "Tender grilled chicken with special spices",
    price: 450,
    image: chickenImage,
    category: "Main Course",
  },
  {
    id: "3",
    name: "Fresh Garden Salad",
    description: "Mixed greens with seasonal vegetables",
    price: 250,
    image: saladImage,
    category: "Salads",
  },
];

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (itemName: string) => {
    setCartCount((prev) => prev + 1);
    toast.success(`${itemName} added to cart`, {
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate("/cart")}
            aria-label="View cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Restaurant Info */}
      <section className="bg-card border-b border-border">
        <div className="px-4 py-6 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Wanyama's Kitchen
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">African</Badge>
              <Badge variant="secondary">Traditional</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold">4.6</span>
              <span className="text-muted-foreground">(120+)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>25-35 min</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Murang'a Town, Kenya</span>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="px-4 py-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Menu</h2>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              {...item}
              onAdd={() => handleAddToCart(item.name)}
            />
          ))}
        </div>
      </section>

      {/* Checkout Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 z-30 animate-slide-up">
          <Button
            className="w-full shadow-lg"
            size="lg"
            onClick={() => navigate("/cart")}
          >
            View Cart ({cartCount} items)
          </Button>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
