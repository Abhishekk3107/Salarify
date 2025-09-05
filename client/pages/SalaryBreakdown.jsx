import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateSalaryBreakdown, inr } from '@/lib/finance.js';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const tooltips = {
  CTC: 'The total annual cost your employer spends on you, including salary components and contributions like PF.',
  Basic: 'The fixed core of your salary; many components (HRA, PF) are calculated from this.',
  HRA: 'House Rent Allowance to support rental expenses; can be eligible for tax exemption.',
  EPFEmployer: "Your employer's contribution (12% of Basic) to your EPF; part of CTC, not in-hand.",
  SpecialAllowance: 'Flexible component that balances the CTC after core components are allocated.',
  GrossSalary: 'Your total salary before deductions like employee PF and professional tax.',
  EPFEmployee: "Your 12% contribution to EPF, deducted from your gross salary.",
  ProfessionalTax: 'A small state tax, simplified here as ₹2,400 annually.',
  TakeHome: 'Gross salary minus deductions; pre-income-tax take-home.',
};

export default function SalaryBreakdown() {
  const [ctc, setCtc] = useState(1200000);
  const containerRef = useRef(null);

  const breakdown = useMemo(() => calculateSalaryBreakdown(ctc || 0), [ctc]);

  const data = [
    { name: 'Basic', value: Math.round(breakdown.basic) },
    { name: 'HRA', value: Math.round(breakdown.hra) },
    { name: 'Special', value: Math.round(breakdown.specialAllowance) },
    { name: 'EPF (Employer)', value: Math.round(breakdown.epfEmployer) },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up context for animations
    const ctx = gsap.context(() => {
      // Header animation
      const headerTimeline = gsap.timeline();
      
      headerTimeline
        .from('.salary-title', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .from('.salary-description', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4");

      // Cards entrance animation
      gsap.fromTo('.input-card, .results-card',
        {
          y: 60,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.2)",
          delay: 0.3
        }
      );

      // Info rows staggered animation
      gsap.from('.info-row', {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 1,
        ease: "power2.out"
      });

      // Chart animation
      gsap.from('.chart-container', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1.5,
        ease: "power3.out"
      });

      // Number counter animation for values
      const numberElements = gsap.utils.toArray('.animated-value');
      numberElements.forEach(element => {
        if (!element) return;
        
        const finalText = element.textContent;
        const finalValue = parseFloat(finalText.replace(/[₹,]/g, ''));
        
        if (!isNaN(finalValue) && finalValue > 0) {
          element.textContent = '₹0';
          gsap.to(element, {
            textContent: finalValue,
            duration: 1.5,
            delay: 1.2,
            snap: { textContent: 1000 },
            onUpdate: function() {
              const currentValue = Math.round(this.targets()[0].textContent);
              element.textContent = inr(currentValue);
            },
            ease: "power2.out"
          });
        }
      });

      // Floating background elements
      gsap.to('.floating-bg-1', {
        y: -20,
        x: 15,
        rotation: 5,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.to('.floating-bg-2', {
        y: 15,
        x: -10,
        rotation: -3,
        duration: 3.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });

      // Highlight row pulse animation
      gsap.to('.highlight-row', {
        opacity: 0.9,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

    }, containerRef); // Scope animations to containerRef

    // Input field interactions
    const ctcInput = document.getElementById('ctc');
    let inputHandlers = null;

    if (ctcInput) {
      const handleFocus = () => {
        gsap.to(ctcInput, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      const handleBlur = () => {
        gsap.to(ctcInput, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      ctcInput.addEventListener('focus', handleFocus);
      ctcInput.addEventListener('blur', handleBlur);
      inputHandlers = { handleFocus, handleBlur };
    }

    // Icon hover animations
    const infoIcons = gsap.utils.toArray('.info-icon');
    const iconHandlers = [];

    infoIcons.forEach(icon => {
      if (!icon) return;

      const handleMouseEnter = () => {
        gsap.to(icon, {
          scale: 1.3,
          rotation: 15,
          duration: 0.3,
          ease: "back.out(2)"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      icon.addEventListener('mouseenter', handleMouseEnter);
      icon.addEventListener('mouseleave', handleMouseLeave);
      iconHandlers.push({ icon, handleMouseEnter, handleMouseLeave });
    });

    // Cleanup function
    return () => {
      ctx.revert(); // This will clean up all GSAP animations
      
      // Clean up input event listeners
      if (ctcInput && inputHandlers) {
        ctcInput.removeEventListener('focus', inputHandlers.handleFocus);
        ctcInput.removeEventListener('blur', inputHandlers.handleBlur);
      }
      
      // Clean up icon event listeners
      iconHandlers.forEach(({ icon, handleMouseEnter, handleMouseLeave }) => {
        if (icon) {
          icon.removeEventListener('mouseenter', handleMouseEnter);
          icon.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, []);

  // Re-animate values when CTC changes
  useEffect(() => {
    if (ctc > 0) {
      gsap.fromTo('.animated-value', 
        { scale: 1.1, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [breakdown]);

  return (
    <div ref={containerRef} className="container py-10 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-bg-1 absolute top-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-xl"></div>
        <div className="floating-bg-2 absolute bottom-20 left-20 w-32 h-32 bg-secondary/5 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/5 rounded-full blur-2xl"></div>
      </div>

      <div className="mb-8 relative z-10">
        <h1 className="salary-title text-3xl font-bold tracking-tight">Salary Breakdown</h1>
        <p className="salary-description mt-2 text-muted-foreground">Deconstruct your CTC into clear components with visual insights.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 relative z-10">
        <div className="input-card">
          <Card className="border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Enter your details
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </CardTitle>
              <CardDescription>Start with your annual CTC.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="ctc" className="font-medium">Annual CTC</Label>
                <Input
                  id="ctc"
                  inputMode="numeric"
                  placeholder="e.g. 1200000"
                  value={ctc.toString()}
                  onChange={(e) => setCtc(Number(e.target.value.replace(/\D/g, '')) || 0)}
                  aria-describedby="ctc-help"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                <p id="ctc-help" className="text-xs text-muted-foreground">Enter your total annual CTC in INR.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="results-card">
          <Card className="border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Results
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </CardTitle>
              <CardDescription>Live breakdown with definitions.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <InfoRow label="CTC" tooltip={tooltips.CTC} value={breakdown.ctc} />
                <InfoRow label="Basic Salary" tooltip={tooltips.Basic} value={breakdown.basic} />
                <InfoRow label="HRA" tooltip={tooltips.HRA} value={breakdown.hra} />
                <InfoRow label="EPF (Employer)" tooltip={tooltips.EPFEmployer} value={breakdown.epfEmployer} />
                <InfoRow label="Special Allowance" tooltip={tooltips.SpecialAllowance} value={breakdown.specialAllowance} />
                <InfoRow label="Gross Salary" tooltip={tooltips.GrossSalary} value={breakdown.grossSalary} />
                <InfoRow label="EPF (Employee)" tooltip={tooltips.EPFEmployee} value={breakdown.epfEmployee} />
                <InfoRow label="Professional Tax" tooltip={tooltips.ProfessionalTax} value={breakdown.professionalTax} />
                <InfoRow label="Deductions" tooltip="Total deductions from gross." value={breakdown.totalDeductions} />
                <InfoRow label="Take-Home (Pre-Tax)" tooltip={tooltips.TakeHome} value={breakdown.takeHomePreTax} highlight />
              </div>
              <div className="chart-container mt-2">
                <ChartContainer
                  config={{ salary: { label: 'Component', color: 'hsl(var(--primary))' } }}
                  className="w-full"
                >
                  <BarChart data={data}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} width={50} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-salary)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, tooltip, highlight }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 4 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.25 }}
      className={cn(
        'info-row flex items-center justify-between rounded-md border p-3 transition-all duration-200 hover:shadow-md', 
        highlight ? 'highlight-row bg-green-500/10 text-foreground border-green-500/20' : 'bg-card hover:bg-accent/50'
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">{label}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button aria-label={`About ${label}`} className="text-muted-foreground">
                <Info className="info-icon h-4 w-4 transition-all duration-200 cursor-pointer" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="animated-value font-mono font-semibold tabular-nums">{inr(value)}</span>
    </motion.div>
  );
}
