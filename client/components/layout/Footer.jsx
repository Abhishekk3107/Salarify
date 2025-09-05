import { Link } from 'react-router-dom';
import logo from '/logo.png';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2"><Link to="/" className="flex items-center" aria-label="Salarify.io home">
                      <img
                        src={logo}
                        alt="Salarify.io"
              className="h-24 w-auto md:h-28 lg:h-32 xl:h-36"
                      />
                    </Link>
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