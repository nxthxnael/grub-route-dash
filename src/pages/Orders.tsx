import { Clock, Package, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import beefStewImage from "@/assets/beef-stew.jpg";
import chickenImage from "@/assets/chicken.jpg";

const orderHistory = [
  {
    id: "order_001",
    restaurantName: "Mama's Kitchen",
    restaurantImage: beefStewImage,
    items: [
      { name: "Beef Stew", quantity: 2, price: 350 },
      { name: "Rice", quantity: 1, price: 100 },
    ],
    total: 850,
    status: "delivered",
    date: "2025-01-10",
    time: "14:30",
  },
  {
    id: "order_002",
    restaurantName: "Grill House",
    restaurantImage: chickenImage,
    items: [
      { name: "Grilled Chicken", quantity: 1, price: 450 },
      { name: "Fries", quantity: 2, price: 150 },
    ],
    total: 750,
    status: "in_progress",
    date: "2025-01-12",
    time: "12:15",
    estimatedTime: "18 min",
  },
  {
    id: "order_003",
    restaurantName: "Mama's Kitchen",
    restaurantImage: beefStewImage,
    items: [
      { name: "Fish Fry", quantity: 1, price: 400 },
    ],
    total: 450,
    status: "cancelled",
    date: "2025-01-08",
    time: "19:45",
  },
];

const statusConfig = {
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  in_progress: {
    label: "In Progress",
    icon: Package,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-error",
    bgColor: "bg-error/10",
  },
};

const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your current and past orders
          </p>
        </div>
      </header>

      {/* Orders List */}
      <section className="px-4 py-6 space-y-4">
        {orderHistory.map((order) => {
          const status = statusConfig[order.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;

          return (
            <Card
              key={order.id}
              className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              onClick={() => {
                if (order.status === "in_progress") {
                  navigate("/tracking");
                }
              }}
            >
              <div className="flex gap-4 p-4">
                {/* Restaurant Image */}
                <div className="relative h-20 w-20 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={order.restaurantImage}
                    alt={order.restaurantName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Order Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-foreground leading-tight">
                        {order.restaurantName}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {order.date} • {order.time}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${status.bgColor} ${status.color} shrink-0`}
                    >
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>

                  {/* Items */}
                  <div className="space-y-0.5 mb-2">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        {item.quantity}x {item.name}
                      </p>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">
                      KES {order.total}
                    </p>
                    {order.status === "in_progress" && order.estimatedTime && (
                      <div className="flex items-center gap-1 text-xs text-primary">
                        <Clock className="h-3 w-3" />
                        <span>{order.estimatedTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {order.status === "in_progress" && (
                <div className="px-4 pb-4">
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/tracking");
                    }}
                  >
                    Track Order
                  </Button>
                </div>
              )}
              {order.status === "delivered" && (
                <div className="px-4 pb-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Reorder
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default Orders;
