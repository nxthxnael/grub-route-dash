import { CheckCircle2, Circle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const orderSteps = [
  {
    status: "confirmed",
    label: "Order Confirmed",
    time: "2:30 PM",
    completed: true,
  },
  {
    status: "preparing",
    label: "Preparing Food",
    time: "2:35 PM",
    completed: true,
  },
  {
    status: "ready",
    label: "Ready for Pickup",
    time: "2:45 PM",
    completed: true,
  },
  {
    status: "enroute",
    label: "On the Way",
    time: "Est. 3:00 PM",
    completed: false,
  },
  { status: "delivered", label: "Delivered", time: "", completed: false },
];

const Tracking = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Track Order</h1>
        </div>
      </header>

      {/* Status Banner */}
      <section className="bg-primary text-primary-foreground px-4 py-6">
        <div className="flex items-center gap-3 animate-fade-in">
          <Clock className="h-8 w-8 animate-pulse" />
          <div>
            <h2 className="text-lg font-bold">Your order is on the way!</h2>
            <p className="text-sm opacity-90">Estimated arrival: 15 minutes</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-6 space-y-6">
        <Card className="p-6 border-border">
          <h3 className="font-semibold text-foreground mb-6">Order Status</h3>

          <div className="space-y-6">
            {orderSteps.map((step, index) => (
              <div key={step.status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {step.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground shrink-0" />
                  )}
                  {index < orderSteps.length - 1 && (
                    <div
                      className={`w-0.5 h-12 mt-2 ${
                        step.completed ? "bg-success" : "bg-border"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1 pb-4">
                  <p
                    className={`font-semibold ${
                      step.completed
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.time && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.time}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Rider Info */}
        <Card className="p-4 border-border">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              JM
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">John Mwangi</p>
              <p className="text-sm text-muted-foreground">
                Your delivery rider
              </p>
            </div>
            <Badge variant="secondary">
              <span className="text-success">● </span>
              Active
            </Badge>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1">
              Call Rider
            </Button>
            <Button variant="outline" className="flex-1">
              Message
            </Button>
          </div>
        </Card>

        {/* Order Details */}
        <Card className="p-4 space-y-3 border-border">
          <h3 className="font-semibold text-foreground">Order Details</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Beef Stew</span>
              <span className="text-foreground">1x KES 350</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Grilled Chicken</span>
              <span className="text-foreground">2x KES 900</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-primary">KES 1,300</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Bottom Actions */}
      <div className="fixed bottom-20 left-0 right-0 px-4 bg-background/80 backdrop-blur-sm py-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Tracking;
