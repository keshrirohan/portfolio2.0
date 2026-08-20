"use client";

import * as React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/portfolio";
import { gsap } from "@/lib/gsap";

export function Experience() {
  const containerRef = React.useRef<HTMLElement>(null);
  const timelineRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      if (timelineRef.current) {
        const items = timelineRef.current.children;
        gsap.fromTo(
          items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
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
    <section ref={containerRef} id="experience" className="py-24 border-t border-border/40 relative">
      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs font-mono tracking-wider uppercase">
            Career History
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Work Experience
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mt-2 font-normal">
            Hands-on full-stack and frontend development internships across healthcare tech, digital media platforms, and educational products.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative pl-6 md:pl-8 border-l border-border/60 space-y-12">
          {experience.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              {/* Card Container */}
              <Card className="bg-card/40 backdrop-blur-sm border-border/60 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.role}
                      </CardTitle>
                      <CardDescription className="text-base font-semibold text-primary mt-0.5 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        <span>{item.company}</span>
                      </CardDescription>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1.5 bg-secondary/60 px-3 py-1 rounded-full border border-border/40">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1.5 bg-secondary/60 px-3 py-1 rounded-full border border-border/40">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bulleted Achievements */}
                  <div className="space-y-2">
                    {item.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="pt-3 flex flex-wrap gap-2 border-t border-border/40">
                    {item.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="px-2.5 py-0.5 text-xs font-mono bg-secondary/50 border border-border/40"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
