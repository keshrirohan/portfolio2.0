"use client";

import * as React from "react";
import { Trophy, Award, FileCheck, Flame, GitCommit } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { achievements } from "@/data/portfolio";
import { gsap } from "@/lib/gsap";

export function Achievements() {
  const containerRef = React.useRef<HTMLElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const achievementIcons: Record<string, React.ElementType> = {
    "Hackathon Winner": Trophy,
    Finalist: Award,
    "Research Publication": FileCheck,
    "Coding Milestone": Flame,
    "Open Source": GitCommit,
  };

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      if (gridRef.current) {
        const cards = gridRef.current.children;
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
              trigger: gridRef.current,
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
    <section ref={containerRef} id="achievements" className="py-24 border-t border-border/40 relative">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs font-mono tracking-wider uppercase">
            Honors & Milestones
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Achievements & Recognition
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mt-2 font-normal">
            Verified competition finishes, research paper presentations, hackathons, and algorithm problem-solving achievements.
          </p>
        </div>

        {/* Achievements Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item) => {
            const IconComponent = achievementIcons[item.badge] || Trophy;
            return (
              <Card
                key={item.id}
                className="bg-card/40 backdrop-blur-sm border-border/60 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge
                      variant="secondary"
                      className="px-2.5 py-0.5 text-[11px] font-mono font-medium bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors"
                    >
                      {item.badge}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-muted-foreground mt-1">
                        {item.organizer}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
