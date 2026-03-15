import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import PublicationsSection from '@/components/PublicationsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import {
  getAbout,
  getExperiences,
  getEducation,
  getProjects,
  getPublications,
  getCertifications,
  getSetting,
} from '@/actions/actions';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const about = await getAbout();
  const experiences = await getExperiences() as { id: number; date_range: string; role: string; company: string; description: string }[];
  const education = await getEducation() as { id: number; dates: string; degree: string; institution: string; description: string }[];
  const projects = await getProjects() as { id: number; title: string; description: string; image: string; tech_stack: string[]; github_link: string; live_link: string }[];
  const publications = await getPublications() as { id: number; title: string; description: string; date: string; link: string }[];
  const certifications = await getCertifications() as { id: number; title: string; issuer: string; date: string; link: string; file_path: string; file_type: string }[];
  const resumePath = await getSetting('resume_path');
  const contactAddress = await getSetting('contact_address');
  const contactEmail = await getSetting('contact_email');
  const contactGithub = await getSetting('contact_github');

  return (
    <main>
      <Navbar />
      <HeroSection
        name={about?.name || ''}
        roles={about?.roles || []}
        bio={about?.bio || ''}
        profileImage={about?.profile_image || ''}
      />
      <AboutSection
        name={about?.name || ''}
        bio={about?.bio || ''}
        experienceSummary={about?.experience_summary || ''}
        skills={about?.skills || []}
        educationSummary={about?.education_summary || ''}
        languages={about?.languages || []}
        linkedin={about?.linkedin || ''}
      />
      <ResumeSection resumePath={resumePath} />
      <ExperienceSection experiences={experiences} />
      <EducationSection education={education} />
      <ProjectsSection projects={projects} />
      <PublicationsSection publications={publications} />
      <CertificationsSection certifications={certifications} />
      <ContactSection
        address={contactAddress}
        email={contactEmail}
        github={contactGithub}
        resumePath={resumePath}
      />
      <Footer />
    </main>
  );
}
