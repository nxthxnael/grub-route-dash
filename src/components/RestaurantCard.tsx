import { Star, Clock, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisine: string[];
  onClick?: () => void;
}

export const RestaurantCard = ({
  name,
  image,
  rating,
  deliveryTime,
  deliveryFee,
  cuisine,
  onClick,
}: RestaurantCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-[0.98] border-border"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg text-foreground leading-tight">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-sm font-semibold shrink-0">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-foreground">{rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cuisine.map((item) => (
            <Badge key={item} variant="secondary" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground pt-1">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            {/* <DollarSign className="h-4 w-4" /> */}
            <span>KES {deliveryFee}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
