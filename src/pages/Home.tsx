import { Search, MapPin, SlidersHorizontal, Map as MapIcon, List, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/RestaurantCard";
import { MapView } from "@/components/MapView";
import heroImage from "@/assets/hero-food.jpg";
import beefStewImage from "@/assets/beef-stew.jpg";
import chickenImage from "@/assets/chicken.jpg";
import saladImage from "@/assets/salad.jpg";

const restaurants = [
  {
    id: "1",
    name: "Mama's Kitchen",
    image: beefStewImage,
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 50,
    cuisine: ["African", "Traditional"],
    location: [37.151, -0.722] as [number, number],
  },
  {
    id: "2",
    name: "Grill House",
    image: chickenImage,
    rating: 4.8,
    deliveryTime: "30-40 min",
    deliveryFee: 60,
    cuisine: ["Grill", "BBQ"],
    location: [37.148, -0.725] as [number, number],
  },
  {
    id: "3",
    name: "Fresh & Green",
    image: saladImage,
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: 40,
    cuisine: ["Healthy", "Salads"],
    location: [37.154, -0.719] as [number, number],
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden">
        <img
          src={heroImage}
          alt="Delicious food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute top-0 right-0 p-4">
          <Button
            size="icon"
            variant="outline"
            onClick={() => navigate("/auth")}
            aria-label="Sign in"
            className="bg-background/80 backdrop-blur-sm"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Food Delivered Fast
          </h1>
          <p className="text-muted-foreground">
            Discover restaurants near you
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="px-4 -mt-6 relative z-10">
        <div className="bg-card rounded-xl shadow-lg border border-border p-4 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search restaurants or dishes..."
                className="pl-10 h-11 border-border"
              />
            </div>
            <Button size="icon" variant="outline" aria-label="Filter options">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              variant="outline"
              onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
              aria-label={`Switch to ${viewMode === 'list' ? 'map' : 'list'} view`}
            >
              {viewMode === 'list' ? <MapIcon className="h-5 w-5" /> : <List className="h-5 w-5" />}
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => navigate("/map")}
          >
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-muted-foreground">Murang'a, Kenya</span>
          </Button>
        </div>
      </section>

      {/* Map or List View */}
      {viewMode === 'map' ? (
        <section className="h-[calc(100vh-280px)] mt-6">
          <MapView 
            restaurants={restaurants}
            onRestaurantClick={(id) => navigate(`/restaurant/${id}`)}
          />
        </section>
      ) : (
        <section className="px-4 mt-6">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Popular Restaurants
          </h2>
          
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
