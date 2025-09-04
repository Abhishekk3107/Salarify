import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary" />
            <span className="text-base font-semibold">Salaryfy.io</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Clarity. Transparency. Financial literacy. Understand your salary, taxes, and investments with confidence.
          </p>
        </div>
        <nav className="grid gap-2 text-sm" aria-label="Footer">
          <Link to="/salary-breakdown" className="hover:text-foreground text-muted-foreground">Salary Breakdown</Link>
          <Link to="/tax-calculator" className="hover:text-foreground text-muted-foreground">Tax Calculator</Link>
          <Link to="/learn" className="hover:text-foreground text-muted-foreground">Financial Education</Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Legal</p>
          <p className="mt-2">© {new Date().getFullYear()} Salaryfy.io</p>
          <p className="mt-1">Privacy Policy • Disclaimer</p>
        </div>
      </div>
    </footer>
  );
}
