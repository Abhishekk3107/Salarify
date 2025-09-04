import React, { useMemo, useState } from 'react';
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

  const breakdown = useMemo(() => calculateSalaryBreakdown(ctc || 0), [ctc]);

  const data = [
    { name: 'Basic', value: Math.round(breakdown.basic) },
    { name: 'HRA', value: Math.round(breakdown.hra) },
    { name: 'Special', value: Math.round(breakdown.specialAllowance) },
    { name: 'EPF (Employer)', value: Math.round(breakdown.epfEmployer) },
  ];

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Salary Breakdown</h1>
        <p className="mt-2 text-muted-foreground">Deconstruct your CTC into clear components with visual insights.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enter your details</CardTitle>
            <CardDescription>Start with your annual CTC.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="ctc">Annual CTC</Label>
              <Input
                id="ctc"
                inputMode="numeric"
                placeholder="e.g. 1200000"
                value={ctc.toString()}
                onChange={(e) => setCtc(Number(e.target.value.replace(/\D/g, '')) || 0)}
                aria-describedby="ctc-help"
              />
              <p id="ctc-help" className="text-xs text-muted-foreground">Enter your total annual CTC in INR.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Live breakdown with definitions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <InfoRow label="CTC" tooltip={tooltips.CTC} value={inr(breakdown.ctc)} />
              <InfoRow label="Basic Salary" tooltip={tooltips.Basic} value={inr(breakdown.basic)} />
              <InfoRow label="HRA" tooltip={tooltips.HRA} value={inr(breakdown.hra)} />
              <InfoRow label="EPF (Employer)" tooltip={tooltips.EPFEmployer} value={inr(breakdown.epfEmployer)} />
              <InfoRow label="Special Allowance" tooltip={tooltips.SpecialAllowance} value={inr(breakdown.specialAllowance)} />
              <InfoRow label="Gross Salary" tooltip={tooltips.GrossSalary} value={inr(breakdown.grossSalary)} />
              <InfoRow label="EPF (Employee)" tooltip={tooltips.EPFEmployee} value={inr(breakdown.epfEmployee)} />
              <InfoRow label="Professional Tax" tooltip={tooltips.ProfessionalTax} value={inr(breakdown.professionalTax)} />
              <InfoRow label="Deductions" tooltip="Total deductions from gross." value={inr(breakdown.totalDeductions)} />
              <InfoRow label="Take-Home (Pre-Tax)" tooltip={tooltips.TakeHome} value={inr(breakdown.takeHomePreTax)} highlight />
            </div>
            <div className="mt-2">
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
  );
}

function InfoRow({ label, value, tooltip, highlight }) {
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
      className={cn('flex items-center justify-between rounded-md border p-3', highlight ? 'bg-green-500/10 text-foreground border-green-500/20' : 'bg-card')}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">{label}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button aria-label={`About ${label}`} className="text-muted-foreground">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="font-mono font-semibold tabular-nums">{value}</span>
    </motion.div>
  );
}
