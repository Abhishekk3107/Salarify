import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateSalaryBreakdown, inr } from '@/lib/finance.js';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as ReTooltip } from 'recharts';
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

    const ctx = gsap.context(() => {
      gsap.from('.salary-title, .salary-description', {
        scrollTrigger: {
          trigger: '.salary-title',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.input-card, .results-card', {
        scrollTrigger: {
          trigger: '.input-card',
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)',
      });

      gsap.from('.chart-container', {
        scrollTrigger: {
          trigger: '.chart-container',
          start: 'top 90%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.animated-value',
      { scale: 1.1, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
  }, [breakdown]);

  return (
    <div
      ref={containerRef}
      className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative overflow-hidden"
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8 relative z-10 text-center sm:text-left">
        <h1 className="salary-title text-2xl sm:text-3xl font-bold tracking-tight">
          Salary Breakdown
        </h1>
        <p className="salary-description mt-2 text-sm sm:text-base text-muted-foreground">
          Deconstruct your CTC into clear components with visual insights.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid gap-6 lg:grid-cols-2 relative z-10">
        {/* Input Card */}
        <div className="input-card">
          <Card className="border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                Enter your details
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Start with your annual CTC.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:gap-6">
              <div className="grid gap-2">
                <Label htmlFor="ctc" className="font-medium text-sm sm:text-base">
                  Annual CTC
                </Label>
                <Input
                  id="ctc"
                  inputMode="numeric"
                  placeholder="e.g. 1200000"
                  value={ctc.toString()}
                  onChange={(e) =>
                    setCtc(Number(e.target.value.replace(/\D/g, '')) || 0)
                  }
                  aria-describedby="ctc-help"
                />
                <p id="ctc-help" className="text-xs text-muted-foreground">
                  Enter your total annual CTC in INR.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Card */}
        <div className="results-card">
          <Card className="border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                Results
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Live breakdown with definitions.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Info rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
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

              {/* Chart */}
              <div className="chart-container mt-4 h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis
                      tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                      width={50}
                    />
                    <ReTooltip formatter={(v) => inr(v)} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={6} />
                  </BarChart>
                </ResponsiveContainer>
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
        highlight
          ? 'highlight-row bg-green-500/10 text-foreground border-green-500/20'
          : 'bg-card hover:bg-accent/50'
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">{label}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                aria-label={`About ${label}`}
                className="text-muted-foreground"
              >
                <Info className="info-icon h-4 w-4 transition-all duration-200 cursor-pointer" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="animated-value font-mono font-semibold tabular-nums">
        {inr(value)}
      </span>
    </motion.div>
  );
}