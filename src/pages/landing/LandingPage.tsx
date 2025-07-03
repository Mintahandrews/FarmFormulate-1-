import { useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { CtaSection } from './sections/CtaSection';

export function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
}
