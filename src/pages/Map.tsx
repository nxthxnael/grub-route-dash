import { MapView } from "@/components/MapView";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const Map = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">Map View</h1>
          <Button variant="ghost" size="icon" aria-label="Filter options">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Map */}
      <div className="h-[calc(100vh-140px)]">
        <MapView
          restaurants={restaurants}
          onRestaurantClick={(id) => navigate(`/restaurant/${id}`)}
        />
      </div>
    </div>
  );
};

export default Map;
