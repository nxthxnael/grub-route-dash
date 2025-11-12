import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MenuItemCardProps {
  name: string;
  description?: string;
  price: number;
  image: string;
  onAdd?: () => void;
}

export const MenuItemCard = ({
  name,
  description,
  price,
  image,
  onAdd,
}: MenuItemCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-border">
      <div className="flex gap-3 p-3">
        <div className="flex-1 space-y-2">
          <div>
            <h4 className="font-semibold text-foreground">{name}</h4>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {description}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-lg font-bold text-foreground">
              KES {price}
            </span>
            <Button
              size="icon"
              onClick={onAdd}
              className="shrink-0"
              aria-label={`Add ${name} to cart`}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Card>
  );
};
