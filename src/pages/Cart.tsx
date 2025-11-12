import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    toast.success("Order placed successfully!", {
      description: "Your food will arrive in 25-35 minutes",
    });
    navigate("/tracking");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Your Cart</h1>
        </div>
      </header>

      {/* Cart Items */}
      <section className="px-4 py-6 space-y-4">
        <Card className="p-4 space-y-4 border-border">
          {/* Item 1 */}
          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-foreground">Beef Stew</h3>
              <p className="text-sm text-muted-foreground">
                With vegetables
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold w-8 text-center">1</span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <span className="font-bold text-foreground">KES 350</span>
            </div>
          </div>

          <Separator />

          {/* Item 2 */}
          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-foreground">Grilled Chicken</h3>
              <p className="text-sm text-muted-foreground">
                With special spices
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold w-8 text-center">2</span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <span className="font-bold text-foreground">KES 900</span>
            </div>
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-4 space-y-3 border-border">
          <h3 className="font-semibold text-foreground">Order Summary</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">KES 1,250</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium text-foreground">KES 50</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-primary">KES 1,300</span>
            </div>
          </div>
        </Card>

        {/* Delivery Address */}
        <Card className="p-4 space-y-2 border-border">
          <h3 className="font-semibold text-foreground">Delivery Address</h3>
          <p className="text-sm text-muted-foreground">
            Murang'a, Kenya
          </p>
          <Button variant="ghost" size="sm" className="text-primary">
            Change Address
          </Button>
        </Card>
      </section>

      {/* Checkout Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 bg-background/80 backdrop-blur-sm py-4 border-t border-border">
        <Button
          className="w-full shadow-lg"
          size="lg"
          onClick={handleCheckout}
        >
          Place Order • KES 1,300
        </Button>
      </div>
    </div>
  );
};

export default Cart;
