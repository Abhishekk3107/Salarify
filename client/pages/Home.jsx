import { motion } from 'framer-motion';
import { CheckCircle2, Shield, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const featuresRef = useRef(null);
  const floatingElementsRef = useRef(null);

  const [chartData, setChartData] = useState([
    { name: 'CTC', value: 1200000 },
    { name: 'Basic', value: 480000 },
    { name: 'HRA', value: 240000 },
    { name: 'EPF (Employer)', value: 57600 },
  ]);

  useEffect(() => {
    // Hero animations
    const heroTimeline = gsap.timeline();
    heroTimeline
      .from('.hero-badge', { scale: 0, duration: 0.5, ease: "back.out(1.7)" })
      .from('.hero-title', { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .from('.hero-description', { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .from('.hero-buttons', { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .from('.hero-features li', { x: -20, opacity: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.2");

    // Floating card
    gsap.set(cardRef.current, { y: 20 });
    gsap.to(cardRef.current, { y: -10, duration: 3, ease: "power2.inOut", yoyo: true, repeat: -1 });

    // Features scroll animation
    gsap.fromTo('.feature-card', 
      { y: 60, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating elements
    gsap.to('.floating-element-1', { y: -15, x: 10, rotation: 5, duration: 4, ease: "power2.inOut", yoyo: true, repeat: -1 });
    gsap.to('.floating-element-2', { y: 10, x: -8, rotation: -3, duration: 3.5, ease: "power2.inOut", yoyo: true, repeat: -1, delay: 1 });

    // Animated numbers
    const numberElements = document.querySelectorAll('.animated-number');
    numberElements.forEach(el => {
      const finalValue = parseInt(el.textContent.replace(/[₹,]/g, ''), 10);
      if (!isNaN(finalValue)) {
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: finalValue,
          duration: 2,
          delay: 1.5,
          snap: { textContent: 1 },
          onUpdate: function() {
            el.textContent = '₹' + Math.round(this.targets()[0].textContent).toLocaleString('en-IN');
          }
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <div className="bg-gradient-to-b from-background to-muted/40">
      {/* Floating background elements */}
      <div ref={floatingElementsRef} className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-1 absolute top-20 right-10 w-20 h-20 bg-primary/5 rounded-full"></div>
        <div className="floating-element-2 absolute bottom-40 left-10 w-16 h-16 bg-secondary/5 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="container grid items-center gap-8 py-16 md:grid-cols-2 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-badge inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground">
            Financial awareness & empowerment
          </span>
          <h1 className="hero-title mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Understand your salary, taxes, and investments
          </h1>
          <p className="hero-description mt-4 text-muted-foreground md:text-lg">
            Salaryfy breaks down payroll and tax concepts into clear, actionable information.
          </p>
          <div className="hero-buttons mt-8 flex flex-wrap gap-3">
            <Link
              to="/salary-breakdown"
              className="animated-button inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-200"
            >
              Analyze Your Salary
            </Link>
            <Link
              to="/tax-calculator"
              className="animated-button inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-medium hover:bg-accent transition-all duration-200"
            >
              Compare Tax Regimes
            </Link>
          </div>
          <ul className="hero-features mt-8 grid gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Live calculators with visuals</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Side-by-side tax comparisons</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Inline explanations</li>
          </ul>
        </motion.div>

        {/* Hero Card with Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative">
          <div ref={cardRef} className="relative mx-auto w-full max-w-xl overflow-hidden rounded-xl border bg-card p-6 shadow">
            <div className="absolute right-6 top-6 rounded-md bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">Save more with clarity</div>
            
            <div className="mt-8 grid gap-3">
              {chartData.map(item => (
                <div key={item.name} className="salary-item flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="animated-number font-mono font-semibold">₹{(item.value).toLocaleString('en-IN')}</span>
                </div>
              ))}

              {/* Responsive Chart */}
              <div className="chart-container mt-4 w-full min-h-[200px] md:min-h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip formatter={val => `₹${val.toLocaleString('en-IN')}`} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-background">
        <div ref={featuresRef} className="container grid gap-6 py-12 md:grid-cols-3">
          <div className="feature-card rounded-lg border bg-card p-6 shadow-sm">
            <Shield className="feature-icon h-6 w-6 text-primary cursor-pointer" />
            <h3 className="mt-3 text-lg font-semibold">Transparency by design</h3>
            <p className="mt-2 text-sm text-muted-foreground">We show the math. No black boxes.</p>
          </div>
          <div className="feature-card rounded-lg border bg-card p-6 shadow-sm">
            <LineChart className="feature-icon h-6 w-6 text-primary cursor-pointer" />
            <h3 className="mt-3 text-lg font-semibold">Visual clarity</h3>
            <p className="mt-2 text-sm text-muted-foreground">Charts explain your salary composition at a glance.</p>
          </div>
          <div className="feature-card rounded-lg border bg-card p-6 shadow-sm">
            <CheckCircle2 className="feature-icon h-6 w-6 text-primary cursor-pointer" />
            <h3 className="mt-3 text-lg font-semibold">Built-in learning</h3>
            <p className="mt-2 text-sm text-muted-foreground">Short, helpful explanations where you need them.</p>
          </div>
        </div>
      </section>
    </div>
  );
}