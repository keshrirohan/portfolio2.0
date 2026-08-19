import { Code, Layout, Server, Database, Wrench, Cpu } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/data/portfolio";

export function Skills() {
  const categoryIcons: Record<string, React.ElementType> = {
    Languages: Code,
    Frontend: Layout,
    Backend: Server,
    Databases: Database,
    "Tools & Platforms": Wrench,
    "Core Concepts": Cpu,
  };

  return (
    <section id="skills" className="py-24 border-t border-border/40 bg-secondary/20">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs font-mono tracking-wider uppercase">
            Technical Proficiency
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Skills & Technical Stack
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mt-2 font-normal">
            Categorized technical capabilities, languages, frameworks, and engineering concepts mastered through hands-on software development.
          </p>
        </div>

        {/* 6 Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const IconComponent = categoryIcons[category.title] || Code;
            return (
              <Card
                key={category.title}
                className="bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-md"
              >
                <CardHeader className="pb-3 flex flex-row items-center gap-3 space-y-0">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>
                  <CardTitle className="text-lg font-bold">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-2.5 py-1 text-xs font-medium bg-secondary/80 border border-border/50 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
