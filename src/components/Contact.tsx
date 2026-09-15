"use client";

import * as React from "react";
import { Mail, Copy, Check, ArrowUpRight, Sparkles, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

export function Contact() {
  const containerRef = React.useRef<HTMLElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 25, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
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
    <section ref={containerRef} id="contact" className="py-24 border-t border-border/40 bg-secondary/10 relative">
      <div className="container max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        {/* Section Header */}
        <Badge variant="outline" className="mb-4 px-3.5 py-1 text-xs font-mono tracking-wider uppercase">
          Get In Touch
        </Badge>

        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Let&apos;s build something useful.
        </h2>

        <p className="text-muted-foreground text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-10">
          Whether you have a full-stack engineering role, an open-source collaboration, or a technical inquiry, my inbox is always open.
        </p>

        {/* Email Highlight Card */}
        <div ref={cardRef} className="w-full max-w-lg mb-10">
          <Card className="bg-card/60 backdrop-blur-md border-border/60 shadow-xl overflow-hidden hover:border-primary/40 transition-colors">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-medium">
                    Direct Email
                  </div>
                  <div className="text-base font-bold text-foreground font-mono">
                    {profile.email}
                  </div>
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCopyEmail}
                      className="rounded-full gap-2 text-xs font-semibold px-4 w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </Button>
                  }
                />
                <TooltipContent>Copy address to clipboard</TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Phone className="w-4 h-4 text-primary" />
          <a href={`tel:${profile.phone}`} className="hover:text-foreground transition-colors font-mono">
            {profile.phone}
          </a>
        </div>

        {/* Direct Channel Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
          <a
            href={`mailto:${profile.email}`}
            className={cn(buttonVariants({ size: "lg" }), "rounded-full gap-2 px-6 font-semibold flex-1 min-w-[140px] focus-visible:ring-2 focus-visible:ring-primary")}
          >
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full gap-2 px-6 font-semibold flex-1 min-w-[140px] focus-visible:ring-2 focus-visible:ring-primary")}
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full gap-2 px-6 font-semibold flex-1 min-w-[140px] focus-visible:ring-2 focus-visible:ring-primary")}
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
          </a>

          <a
            href={profile.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full gap-2 px-6 font-semibold flex-1 min-w-[140px] focus-visible:ring-2 focus-visible:ring-primary")}
          >
            <LeetCodeIcon className="w-4 h-4" />
            <span>LeetCode</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
          </a>
        </div>

        {/* Relocation & Status footnote */}
        <div className="inline-flex items-center gap-2 mt-12 text-xs font-mono text-muted-foreground bg-secondary/40 px-4 py-2 rounded-full border border-border/40">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{profile.relocation}</span>
        </div>
      </div>
    </section>
  );
}
