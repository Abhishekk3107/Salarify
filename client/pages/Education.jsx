import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { articles } from '@/lib/articles.js';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const headerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // ✅ Prevent re-initializing GSAP on back navigation
    if (!cardsContainerRef.current || ScrollTrigger.getAll().length > 0) {
      return;
    }

    // Header animation
    const headerTimeline = gsap.timeline();

    headerTimeline
      .from('.education-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from('.education-description', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    // Cards staggered animation on scroll
    gsap.fromTo('.education-card',
      {
        y: 60,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Card hover animations
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
      const cardTitle = card.querySelector('.card-title');
      const cardContent = card.querySelector('.card-content');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(cardTitle, {
          color: 'hsl(var(--primary))',
          duration: 0.2,
          ease: "power2.out"
        });

        gsap.to(cardContent, {
          y: -2,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(cardTitle, {
          color: 'hsl(var(--foreground))',
          duration: 0.2,
          ease: "power2.out"
        });

        gsap.to(cardContent, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Floating animation for alternating cards
    gsap.to('.education-card:nth-child(odd)', {
      y: -5,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5
    });

    gsap.to('.education-card:nth-child(even)', {
      y: 5,
      duration: 3.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1
    });

    // Reading time badge animation
    gsap.from('.reading-info', {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      delay: 1,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: cardsContainerRef.current,
        start: "top 85%"
      }
    });

    // Category tags subtle animation
    gsap.from('.category-tag', {
      x: -10,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      delay: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardsContainerRef.current,
        start: "top 85%"
      }
    });

    // Excerpt text reveal animation
    gsap.from('.card-excerpt', {
      y: 15,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      delay: 1.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardsContainerRef.current,
        start: "top 85%"
      }
    });

    // Background gradient animation
    gsap.to('.education-background', {
      backgroundPosition: '200% 0%',
      duration: 20,
      ease: "none",
      repeat: -1
    });

    // Cleanup only removes ScrollTrigger, not animations
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="education-background container py-10 relative overflow-hidden bg-gradient-to-r from-background via-muted/20 to-background bg-[length:200%_100%]">
      {/* Subtle floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-secondary/5 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent/5 rounded-full blur-2xl"></div>
      </div>

      <div ref={headerRef} className="mb-6 relative z-10">
        <h1 className="education-title text-3xl font-bold">Financial Education</h1>
        <p className="education-description mt-2 text-muted-foreground">Short articles to help you make better financial choices.</p>
      </div>

      <div ref={cardsContainerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {articles.map((a, index) => (
          <Link 
            key={a.slug} 
            to={`/learn/${a.slug}`}
            ref={el => cardsRef.current[index] = el}
          >
            <Card className="education-card h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader className="relative">
                <CardTitle className="card-title text-lg transition-colors duration-200">
                  {a.title}
                </CardTitle>
                <CardDescription className="reading-info flex items-center gap-2">
                  <span className="category-tag text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {a.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {a.readTime}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="card-content">
                <p className="card-excerpt text-sm text-muted-foreground leading-relaxed">
                  {a.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}