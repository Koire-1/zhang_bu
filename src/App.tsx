import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ShakingCoins from "./pages/ShakingCoins";
import HexagramDisplay from "./pages/HexagramDisplay";
import InterpretationLoading from "./pages/InterpretationLoading";
import ResultDisplay from "./pages/ResultDisplay";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/shaking" element={<ShakingCoins />} />
          <Route path="/hexagram" element={<HexagramDisplay />} />
          <Route path="/interpretation" element={<InterpretationLoading />} />
          <Route path="/result" element={<ResultDisplay />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
