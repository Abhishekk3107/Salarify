export function calculateSalaryBreakdown(ctc) {
  const basic = ctc * 0.4;
  const hra = basic * 0.5;
  const epfEmployer = basic * 0.12;
  const specialAllowance = Math.max(0, ctc - basic - hra - epfEmployer);
  const grossSalary = basic + hra + specialAllowance;
  const epfEmployee = basic * 0.12;
  const professionalTax = 2400; // Simplified constant per spec
  const totalDeductions = epfEmployee + professionalTax;
  const takeHomePreTax = Math.max(0, grossSalary - totalDeductions);
  return {
    ctc,
    basic,
    hra,
    epfEmployer,
    specialAllowance,
    grossSalary,
    epfEmployee,
    professionalTax,
    totalDeductions,
    takeHomePreTax,
  };
}

export function calculateTaxOldRegime({ annualIncome, age, deduction80C, deduction80D }) {
  const stdDeduction = 50000;
  const allowed80C = Math.min(150000, Math.max(0, deduction80C || 0));
  const allowed80D = Math.max(0, deduction80D || 0);
  const taxableIncome = Math.max(0, Math.floor(annualIncome - stdDeduction - allowed80C - allowed80D));

  const tax = slabTaxOld(taxableIncome, age);
  // 87A rebate: up to 12,500 if taxable income <= 5L
  const rebate = taxableIncome <= 500000 ? Math.min(12500, tax) : 0;
  const taxAfterRebate = Math.max(0, tax - rebate);
  const surcharge = computeSurcharge(taxAfterRebate, taxableIncome, false);
  const cess = Math.round(0.04 * (taxAfterRebate + surcharge));
  const totalTaxLiability = Math.round(taxAfterRebate + surcharge + cess);
  return { taxableIncome, incomeTax: Math.round(taxAfterRebate), surcharge, cess, totalTaxLiability };
}

export function calculateTaxNewRegime({ annualIncome }) {
  const stdDeduction = 75000; // per spec
  const taxableIncome = Math.max(0, Math.floor(annualIncome - stdDeduction));
  const tax = slabTaxNew(taxableIncome);
  // 87A rebate: if taxable income <= 7L => tax rebated fully under new regime
  const rebate = taxableIncome <= 700000 ? Math.min(tax, tax) : 0;
  const taxAfterRebate = Math.max(0, tax - rebate);
  const surcharge = computeSurcharge(taxAfterRebate, taxableIncome, true);
  const cess = Math.round(0.04 * (taxAfterRebate + surcharge));
  const totalTaxLiability = Math.round(taxAfterRebate + surcharge + cess);
  return { taxableIncome, incomeTax: Math.round(taxAfterRebate), surcharge, cess, totalTaxLiability };
}

function slabTaxOld(taxable, age) {
  const base = age === '>80' ? 500000 : age === '60-80' ? 300000 : 250000;
  let remaining = Math.max(0, taxable - base);
  let tax = 0;
  const slab1 = Math.min(remaining, 250000);
  tax += slab1 * 0.05;
  remaining -= slab1;
  if (remaining <= 0) return Math.round(tax);
  const slab2 = Math.min(remaining, 500000);
  tax += slab2 * 0.2;
  remaining -= slab2;
  if (remaining <= 0) return Math.round(tax);
  tax += remaining * 0.3;
  return Math.round(tax);
}

function slabTaxNew(taxable) {
  const thresholds = [300000, 700000, 1000000, 1200000, 1500000];
  const rates = [0, 0.05, 0.1, 0.15, 0.2, 0.3];
  let prev = 0;
  let tax = 0;
  for (let i = 0; i < thresholds.length; i++) {
    const upper = thresholds[i];
    const amount = Math.max(0, Math.min(taxable, upper) - prev);
    tax += amount * rates[i];
    prev = upper;
    if (taxable <= upper) return Math.round(tax);
  }
  tax += (taxable - thresholds[thresholds.length - 1]) * rates[rates.length - 1];
  return Math.round(tax);
}

function computeSurcharge(taxAfterRebate, taxableIncome, isNewRegime) {
  const tiers = [
    { limit: 5000000, rate: 0 },
    { limit: 10000000, rate: 0.1 },
    { limit: 20000000, rate: 0.15 },
    { limit: 50000000, rate: 0.25 },
    { limit: Infinity, rate: isNewRegime ? 0.25 : 0.37 },
  ];
  let rate = 0;
  for (const t of tiers) {
    if (taxableIncome <= t.limit) {
      rate = t.rate;
      break;
    }
  }
  return Math.round(taxAfterRebate * rate);
}

export function inr(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
