import { motion } from 'framer-motion';
import { CheckCircle2, Shield, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Home page: written with a straightforward, human tone.
export default function Home() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/40">
      <section className="container grid items-center gap-8 py-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground">
            Financial awareness & empowerment
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Understand your salary, taxes, and investments with confidence
          </h1>

          <p className="mt-4 text-muted-foreground md:text-lg">
            Salaryfy breaks down complex payroll and tax concepts into clear, actionable
            information. No jargon, just practical insights.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/salary-breakdown"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Analyze Your Salary
            </Link>

            <Link
              to="/tax-calculator"
              className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-medium hover:bg-accent"
            >
              Compare Tax Regimes
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Live calculators with clear visuals
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Side-by-side tax comparisons
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Inline explanations for key terms
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-xl border bg-card p-6 shadow">
            <div className="absolute right-6 top-6 rounded-md bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">Save more with clarity</div>

            <div className="mt-8 grid gap-3">
              <div className="flex items-center justify-between text-sm">
                <span>CTC</span>
                <span className="font-mono font-semibold">₹12,00,000</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Basic Salary</span>
                <span className="font-mono">₹4,80,000</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>HRA</span>
                <span className="font-mono">₹2,40,000</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>EPF (Employer)</span>
                <span className="font-mono">₹57,600</span>
              </div>

              <div className="mt-2 h-40 rounded-md bg-muted">
                <div className="h-full w-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-t bg-background">
        <div className="container grid gap-6 py-12 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Shield className="h-6 w-6 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">Transparency by design</h3>
            <p className="mt-2 text-sm text-muted-foreground">We show the math. No black boxes.</p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <LineChart className="h-6 w-6 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">Visual clarity</h3>
            <p className="mt-2 text-sm text-muted-foreground">Charts explain your salary composition at a glance.</p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">Built-in learning</h3>
            <p className="mt-2 text-sm text-muted-foreground">Short, helpful explanations where you need them.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
