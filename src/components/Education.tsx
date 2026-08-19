import { GraduationCap, Calendar, CheckCircle2, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education } from "@/data/portfolio";

export function Education() {
  return (
    <section id="education" className="py-24 border-t border-border/40 bg-secondary/20">
      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs font-mono tracking-wider uppercase">
            Academic Foundation
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Education
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mt-2 font-normal">
            Undergraduate computer science degree coursework and core engineering fundamentals.
          </p>
        </div>

        {/* Education List */}
        <div className="space-y-6">
          {education.map((item) => (
            <Card
              key={item.id}
              className="bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/40 transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {item.degree} — {item.field}
                      </CardTitle>
                      <CardDescription className="text-base font-semibold text-primary mt-1">
                        {item.institution}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-secondary/60 px-3 py-1 rounded-full border border-border/40">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.duration}
                    </span>
                    <Badge variant="secondary" className="px-3 py-1 text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Award className="w-3 h-3 mr-1" />
                      {item.score}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-2">
                {item.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
