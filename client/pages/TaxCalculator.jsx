import React, { useMemo, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { calculateTaxNewRegime, calculateTaxOldRegime, inr } from '@/lib/finance.js';
import { cn } from '@/lib/utils';

export default function TaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [deduction80C, setDeduction80C] = useState(150000);
  const [deduction80D, setDeduction80D] = useState(25000);
  const [age, setAge] = useState('<60');

  const oldRes = useMemo(() => calculateTaxOldRegime({ annualIncome, deduction80C, deduction80D, age }), [annualIncome, deduction80C, deduction80D, age]);
  const newRes = useMemo(() => calculateTaxNewRegime({ annualIncome, deduction80C, deduction80D, age }), [annualIncome, deduction80C, deduction80D, age]);

  const recommended = oldRes.totalTaxLiability < newRes.totalTaxLiability ? 'Old' : oldRes.totalTaxLiability > newRes.totalTaxLiability ? 'New' : 'Either';
  const savings = Math.abs(oldRes.totalTaxLiability - newRes.totalTaxLiability);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tax Clarity Hub</h1>
        <p className="mt-2 text-muted-foreground">Compare Old vs New Regime side-by-side with clear savings insight.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Your income and deductions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Field id="income" label="Gross Annual Income" value={annualIncome} onChange={setAnnualIncome} />
            <Field id="d80c" label="Section 80C (max ₹1.5L)" value={deduction80C} onChange={setDeduction80C} />
            <Field id="d80d" label="Section 80D (Health Insurance)" value={deduction80D} onChange={setDeduction80D} />
            <div className="grid gap-2">
              <Label>Age Category</Label>
              <RadioGroup className="flex flex-wrap gap-4" value={age} onValueChange={(v) => setAge(v)}>
                <div className="flex items-center gap-2"><RadioGroupItem value="<60" id="age1" /><Label htmlFor="age1">Below 60</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="60-80" id="age2" /><Label htmlFor="age2">60 - 80</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value=">80" id="age3" /><Label htmlFor="age3">Above 80</Label></div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <div className={cn('rounded-lg border p-4', savings > 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-muted')}> 
            <p className="text-sm font-medium">Recommendation</p>
            <p className="text-lg font-semibold mt-1">
              {recommended === 'Either' ? 'Both regimes result in similar tax.' : `${recommended} Regime likely saves you more.`}
            </p>
            {savings > 0 && (
              <p className="text-sm text-muted-foreground mt-1">You save approximately <span className="font-semibold">{inr(savings)}</span> with the {recommended} Regime.</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ResultCard title="Old Regime" res={oldRes} />
            <ResultCard title="New Regime" res={newRes} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, value, onChange }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} inputMode="numeric" value={value.toString()} onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, '')) || 0)} />
    </div>
  );
}

function ResultCard({ title, res }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <Row label="Taxable Income" value={inr(res.taxableIncome)} />
        <Row label="Income Tax" value={inr(res.incomeTax)} />
        <Row label="Surcharge" value={inr(res.surcharge)} />
        <Row label="Health & Education Cess (4%)" value={inr(res.cess)} />
        <Row label="Final Tax Liability" value={inr(res.totalTaxLiability)} highlight />
      </CardContent>
    </Card>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className={cn('flex items-center justify-between rounded-md border p-2', highlight ? 'bg-secondary/30' : undefined)}>
      <span>{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}
