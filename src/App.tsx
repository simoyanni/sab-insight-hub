import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EnergyOverview from "./pages/EnergyOverview";
import Individuals from "./pages/target-groups/Individuals";
import Businesses from "./pages/target-groups/Businesses";
import LocalAuthorities from "./pages/target-groups/LocalAuthorities";
import Solar from "./pages/energy-categories/Solar";
import Wind from "./pages/energy-categories/Wind";
import Heat from "./pages/energy-categories/Heat";
import Storage from "./pages/energy-categories/Storage";
import Mobility from "./pages/energy-categories/Mobility";
import Hydrogen from "./pages/energy-categories/Hydrogen";
import Grid from "./pages/energy-categories/Grid";
import Recommendations from "./pages/Recommendations";
import Reports from "./pages/Reports";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/energy-overview" element={<EnergyOverview />} />
          <Route path="/target-groups/individuals" element={<Individuals />} />
          <Route path="/target-groups/businesses" element={<Businesses />} />
          <Route path="/target-groups/local-authorities" element={<LocalAuthorities />} />
          <Route path="/energy-categories/solar" element={<Solar />} />
          <Route path="/energy-categories/wind" element={<Wind />} />
          <Route path="/energy-categories/heat" element={<Heat />} />
          <Route path="/energy-categories/storage" element={<Storage />} />
          <Route path="/energy-categories/mobility" element={<Mobility />} />
          <Route path="/energy-categories/hydrogen" element={<Hydrogen />} />
          <Route path="/energy-categories/grid" element={<Grid />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
