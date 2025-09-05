import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import logo from '/logo.png';

const navItems = [
  { to: '/salary-breakdown', label: 'Salary Breakdown' },
  { to: '/tax-calculator', label: 'Tax Calculator' },
  { to: '/learn', label: 'Financial Education' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Brand logo only */}
          <Link to="/" className="flex items-center" aria-label="Salarify.io home">
            <img
              src={logo}
              alt="Salarify.io"
              className="h-24 w-auto md:h-28 lg:h-32 xl:h-36"
            />
          </Link>

          {/* Primary nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive || location.pathname.startsWith(item.to)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/salary-breakdown"
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Analyze Your Salary
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
