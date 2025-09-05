import { motion } from 'framer-motion';
import { CheckCircle2, Shield, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Home page: written with a straightforward, human tone.
export default function Home() {
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const salaryItemsRef = useRef(null);
  const featuresRef = useRef(null);
  const floatingElementsRef = useRef(null);

  useEffect(() => {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
      .from('.hero-badge', {
        scale: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      })
      .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.3")
      .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3")
      .from('.hero-features li', {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");

    // Floating card animation
    gsap.set(cardRef.current, {
      y: 20
    });
    
    gsap.to(cardRef.current, {
      y: -10,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Salary breakdown items animation
    gsap.from('.salary-item', {
      x: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 1,
      ease: "power2.out"
    });

    // Chart area pulse animation
    gsap.to('.chart-area', {
      scale: 1.02,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Features section scroll animation
    gsap.fromTo('.feature-card', 
      {
        y: 60,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Feature icons hover animations
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 10,
          duration: 0.3,
          ease: "back.out(1.5)"
        });
      });
      
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Button hover animations
    const buttons = document.querySelectorAll('.animated-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    });

    // Floating elements animation
    gsap.to('.floating-element-1', {
      y: -15,
      x: 10,
      rotation: 5,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    gsap.to('.floating-element-2', {
      y: 10,
      x: -8,
      rotation: -3,
      duration: 3.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1
    });

    // Number counter animation
    const numberElements = document.querySelectorAll('.animated-number');
    numberElements.forEach(element => {
      const finalValue = element.textContent.replace(/[₹,]/g, '');
      if (!isNaN(finalValue)) {
        gsap.from(element, {
          textContent: 0,
          duration: 2,
          delay: 1.5,
          snap: { textContent: 1 },
          onUpdate: function() {
            element.textContent = '₹' + Math.round(this.targets()[0].textContent).toLocaleString('en-IN');
          }
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-background to-muted/40">
      {/* Floating background elements */}
      <div ref={floatingElementsRef} className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-1 absolute top-20 right-10 w-20 h-20 bg-primary/5 rounded-full"></div>
        <div className="floating-element-2 absolute bottom-40 left-10 w-16 h-16 bg-secondary/5 rounded-full"></div>
      </div>

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
            Understand your salary, taxes, and investments with confidence
          </h1>
          <p className="hero-description mt-4 text-muted-foreground md:text-lg">
            Salaryfy breaks down complex payroll and tax concepts into clear, actionable
            information. No jargon, just practical insights.
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
          <div ref={cardRef} className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-xl border bg-card p-6 shadow">
            <div className="absolute right-6 top-6 rounded-md bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">Save more with clarity</div>
            <div ref={salaryItemsRef} className="mt-8 grid gap-3">
              <div className="salary-item flex items-center justify-between text-sm">
                <span>CTC</span>
                <span className="animated-number font-mono font-semibold">₹12,00,000</span>
              </div>
              <div className="salary-item flex items-center justify-between text-sm">
                <span>Basic Salary</span>
                <span className="animated-number font-mono">₹4,80,000</span>
              </div>
              <div className="salary-item flex items-center justify-between text-sm">
                <span>HRA</span>
                <span className="animated-number font-mono">₹2,40,000</span>
              </div>
              <div className="salary-item flex items-center justify-between text-sm">
                <span>EPF (Employer)</span>
                <span className="animated-number font-mono">₹57,600</span>
              </div>
              <div className="mt-2 h-40 rounded-md bg-muted overflow-hidden">
                <div className="chart-area h-full w-full bg-gradient-to-r from-primary/20 to-primary/40 rounded-md" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
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
