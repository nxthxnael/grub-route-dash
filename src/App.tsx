import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import Index from "./pages/Index";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import Tracking from "./pages/Tracking";
import Map from "./pages/Map";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Index /><BottomNav /></>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/map" element={<><Map /><BottomNav /></>} />
          <Route path="/orders" element={<><Orders /><BottomNav /></>} />
          <Route path="/profile" element={<><Profile /><BottomNav /></>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
