"use client";

import * as React from "react";
import { Code2, Flame, GitCommit, GraduationCap, Trophy, MapPin, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/portfolio";
import { gsap } from "@/lib/gsap";

export function About() {
  const containerRef = React.useRef<HTMLElement>(null);
  const leftColRef = React.useRef<HTMLDivElement>(null);
  const rightColRef = React.useRef<HTMLDivElement>(null);

  const statIcons: Record<string, React.ElementType> = {
    Code2,
    Flame,
    GitCommit,
    Trophy,
    GraduationCap,
  };

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (rightColRef.current) {
        const cards = rightColRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs font-mono tracking-wider uppercase">
            About Me
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Engineering with Precision & Impact
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story / Bio */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-6 text-muted-foreground text-base leading-relaxed">
            <p>
              I am a <strong className="text-foreground font-semibold">Full Stack Developer</strong> and Computer Science Engineering student with hands-on internship experience building responsive, production-grade web applications.
            </p>
            <p>
              My stack spans the modern web — from frontend interfaces in <span className="text-foreground font-medium">React.js and Next.js</span> to robust REST APIs and database layers with <span className="text-foreground font-medium">Node.js, Express.js, PostgreSQL, and MongoDB</span>. I also work with <span className="text-foreground font-medium">Prisma ORM, JWT authentication, Docker, and CI/CD pipelines</span>.
            </p>
            <p>
              I have shipped developer tooling (Chrome extensions with Manifest V3), AI-powered SaaS platforms, and real-time sports tracking systems. I am comfortable across the full development lifecycle — from designing database schemas and building APIs to debugging production issues and conducting code reviews.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <span>{profile.relocation}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Statistics Grid */}
          <div ref={rightColRef} className="lg:col-span-5 grid grid-cols-2 gap-4">
            {profile.metrics.map((metric) => {
              const IconComponent = statIcons[metric.icon] || Code2;
              return (
                <Card
                  key={metric.label}
                  className="bg-card/40 backdrop-blur-sm border-border/60 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <CardContent className="p-5 flex flex-col justify-between h-full space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-foreground tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-xs font-medium text-muted-foreground mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
