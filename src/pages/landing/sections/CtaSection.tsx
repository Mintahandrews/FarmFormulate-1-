import { useTranslation } from '../../../hooks/useTranslation';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

export function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
          {t('ctaTitle')}
        </h2>
        <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
          {t('ctaSubtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full bg-white text-indigo-600 hover:bg-indigo-50"
            >
              {t('getStarted')}
            </Button>
          </Link>
          <Link to="/demo" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full border-white text-white hover:bg-white/10"
            >
              {t('watchDemo')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
