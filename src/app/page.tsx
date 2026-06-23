import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import BetroffenheitsCheckSection from '@/components/BetroffenheitsCheckSection';
import GeneratorSection from '@/components/GeneratorSection';
import ValidatorSection from '@/components/ValidatorSection';
import TrustSection from '@/components/TrustSection';
import ROISection from '@/components/ROISection';
import EmailCaptureSection from '@/components/EmailCaptureSection';
import PricingSection from '@/components/PricingSection';
import FaqCtaSection from '@/components/FaqCtaSection';
export default function Home() {
  return (
    <>
      <HeroSection />
      <main id="main-content">
        <ProblemSection />
        <BetroffenheitsCheckSection />
        <GeneratorSection />
        <ValidatorSection />
        <TrustSection />
        <ROISection />
        <EmailCaptureSection />
        <PricingSection />
        <FaqCtaSection />
      </main>
    </>
  );
}
