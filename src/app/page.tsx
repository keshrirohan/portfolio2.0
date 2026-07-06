// "@/sections" is a shortcut path that points to the "sections" folder in the project.
// Each item imported here is one visible section (chunk) of the home page.
import {
  Hero,          // The big top section — name, tagline, call-to-action buttons
  About,         // A short "who am I" description
  Skills,        // A grid/list of technical skills (languages, tools, etc.)
  Experience,    // Work history — companies, roles, and dates
  Projects,      // Showcase of personal or professional projects
  Education,     // School / college / degree information
  Certifications, // Certificates earned from courses or exams
  Achievements,  // Awards, rankings, or notable milestones
  CMSCertificates, // Certificates pulled live from the CMS (content management system)
  CMSGallery,    // A photo/media gallery pulled live from the CMS
  Contact,       // Contact form or links so visitors can reach out
} from "@/sections";

// This is the main Home page of the portfolio.
// Next.js automatically shows this component when someone visits the root URL "/".
export default function Home() {
  return (
    // <main> is a semantic HTML tag — it tells browsers and screen readers
    // that this is the primary content area of the page.
    <main>
      {/* Each component below renders one section of the page, top to bottom */}

      {/* Big hero banner at the top — first thing visitors see */}
      <Hero />

      {/* A brief personal introduction */}
      <About />

      {/* All the tech skills displayed visually */}
      <Skills />

      {/* Past jobs and internships */}
      <Experience />

      {/* Highlighted projects with links and descriptions */}
      <Projects />

      {/* Academic background — school, college, degree */}
      <Education />

      {/* Hard-coded certifications from the codebase */}
      <Certifications />

      {/* Noteworthy wins — hackathons, rankings, etc. */}
      <Achievements />

      {/* Certifications fetched dynamically from the CMS */}
      <CMSCertificates />

      {/* Photos or media fetched dynamically from the CMS */}
      <CMSGallery />

      {/* Contact form or social links at the bottom */}
      <Contact />
    </main>
  );
}
