"use client";

import * as React from "react";
import { ExternalLink, Sparkles, Check, Info } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { projects, Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Projects() {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 border-t border-border/40 bg-secondary/10">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs font-mono tracking-wider uppercase">
            Featured Engineering
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Projects & Built Applications
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mt-2 font-normal">
            Highlighted full-stack systems, developer extensions, AI speech applications, and computer vision sports telemetry software.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Header Accent & Category */}
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="secondary" className="text-[11px] font-mono font-medium px-2.5 py-0.5 bg-primary/10 text-primary border border-primary/20">
                      {project.category}
                    </Badge>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-amber-400">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-[11px] font-mono px-2 py-0.5 border-border/50 bg-background/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Highlights/Features */}
                  <div className="space-y-1.5 pt-2">
                    {project.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Card Footer Actions */}
              <CardFooter className="pt-4 border-t border-border/40 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(project)}
                  className="gap-1.5 text-xs font-semibold hover:text-primary p-0 h-auto"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Button>

                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repository for ${project.title}`}
                          className={buttonVariants({ variant: "outline", size: "icon", className: "w-8 h-8 rounded-full" })}
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      }
                    />
                    <TooltipContent>Source Repository</TooltipContent>
                  </Tooltip>

                  {project.live ? (
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Live demo for ${project.title}`}
                            className={buttonVariants({ size: "icon", className: "w-8 h-8 rounded-full" })}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        }
                      />
                      <TooltipContent>Live Application</TooltipContent>
                    </Tooltip>
                  ) : null}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Project Details Interactive Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          {selectedProject && (
            <DialogContent className="max-w-2xl bg-card border-border sm:rounded-2xl p-6 sm:p-8">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs font-mono bg-primary/10 text-primary border border-primary/20">
                    {selectedProject.category}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground pt-1">
                  {selectedProject.longDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                    Technologies & Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="px-2.5 py-1 text-xs font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                    Key Features
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engineering Achievements */}
                {selectedProject.achievements.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                      Engineering Highlights
                    </h4>
                    <div className="space-y-2">
                      {selectedProject.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full gap-2")}
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "sm" }), "rounded-full gap-2")}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}
