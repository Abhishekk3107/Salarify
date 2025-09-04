import './global.css';

import { Toaster } from '@/components/ui/toaster';
import { createRoot } from 'react-dom/client';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AppLayout from '@/components/layout/AppLayout';
import SalaryBreakdown from '@/pages/SalaryBreakdown';
import TaxCalculator from '@/pages/TaxCalculator';
import Education from '@/pages/Education';
import Article from '@/pages/Article';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/salary-breakdown" element={<SalaryBreakdown />} />
              <Route path="/tax-calculator" element={<TaxCalculator />} />
              <Route path="/learn" element={<Education />} />
              <Route path="/learn/:slug" element={<Article />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById('root')).render(<App />);
