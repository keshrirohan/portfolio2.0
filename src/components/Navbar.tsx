"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, FileText, Code } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="group flex items-center gap-2 font-bold text-lg tracking-tight hover:text-primary transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <Code className="w-4 h-4" />
          </div>
          <span>{profile.name}</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-secondary/50 backdrop-blur-sm border border-border/40 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded-full hover:text-foreground hover:bg-background/60 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={buttonVariants({ variant: "ghost", size: "icon", className: "w-9 h-9 rounded-full" })}
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              }
            />
            <TooltipContent>GitHub Profile</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={buttonVariants({ variant: "ghost", size: "icon", className: "w-9 h-9 rounded-full" })}
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              }
            />
            <TooltipContent>LinkedIn Profile</TooltipContent>
          </Tooltip>

          <ThemeToggle />

          <a
            href="#contact"
            className={buttonVariants({ size: "sm", className: "rounded-full gap-1.5 font-medium ml-1" })}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Actions & Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg" aria-label="Open menu">
                  <Menu className="w-5 h-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col justify-between">
              <div>
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Code className="w-3.5 h-3.5" />
                    </div>
                    <span>{profile.name}</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 py-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2.5 rounded-lg text-base font-medium hover:bg-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3 justify-center">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className={buttonVariants({ variant: "outline", size: "icon", className: "rounded-full" })}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className={buttonVariants({ variant: "outline", size: "icon", className: "rounded-full" })}
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className={buttonVariants({ className: "w-full rounded-xl gap-2 font-medium" })}
                >
                  <FileText className="w-4 h-4" />
                  <span>Get Resume</span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
