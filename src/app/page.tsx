import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Education,
  Certifications,
  Achievements,
  CMSCertificates,
  CMSGallery,
  Contact,
} from "@/sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Achievements />
      <CMSCertificates />
      <CMSGallery />
      <Contact />
    </main>
  );
}
