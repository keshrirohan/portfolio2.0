import { Mail, Code } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/icons";
import { profile } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/40 bg-background text-xs text-muted-foreground">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Code className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-foreground text-sm">
              {profile.name}
            </div>
            <div className="text-muted-foreground">
              {profile.title}
            </div>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="text-center font-mono">
          &copy; {currentYear} {profile.name}. Built with Next.js & React.
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors p-1"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors p-1"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors p-1"
            aria-label="LeetCode"
          >
            <LeetCodeIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-foreground transition-colors p-1"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
