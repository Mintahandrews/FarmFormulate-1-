import { useTranslation } from '../../../hooks/useTranslation';

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: '📝',
      title: t('feature1Title'),
      description: t('feature1Desc')
    },
    {
      icon: '🌍',
      title: t('feature2Title'),
      description: t('feature2Desc')
    },
    {
      icon: '📊',
      title: t('feature3Title'),
      description: t('feature3Desc')
    },
    {
      icon: '🔄',
      title: t('feature4Title'),
      description: t('feature4Desc')
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {t('featuresTitle')}
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            {t('featuresSubtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-item bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
