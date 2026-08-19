import { ShieldCheck, Calendar, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { certifications } from "@/data/portfolio";

export function Certification() {
  return (
    <section id="certification" className="py-24 border-t border-border/40 relative">
      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs font-mono tracking-wider uppercase">
            Professional Qualifications
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Certifications & Training
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mt-2 font-normal">
            Verified virtual internships, government tech programs, and agency credentials.
          </p>
        </div>

        {/* Certifications Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((item) => (
            <Card
              key={item.id}
              className="bg-card/40 backdrop-blur-sm border-border/60 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground bg-secondary/60 px-2.5 py-0.5 rounded-full border border-border/40">
                    <Calendar className="w-3 h-3" />
                    {item.issueDate}
                  </span>
                </div>

                <CardTitle className="text-lg font-bold text-foreground">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs font-semibold text-primary mt-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{item.issuer}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
