import { Github, Linkedin } from 'lucide-react';
import { getTranslation } from '@/lib/i18n';
import XIcon from '@/components/XIcon';

export default function JaHomePage() {
  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation('ja', key);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">rihib</h1>
            <p className="text-gray-600 dark:text-gray-400">ソフトウェアエンジニア</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('profile.about')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('profile.bio')}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {t('profile.bio2')}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('profile.connect')}</h2>
              <div className="space-y-3">
                <a
                  href="https://github.com/rihib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                >
                  <Github size={24} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/rihito-bannai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                >
                  <Linkedin size={24} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://x.com/rihib_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                >
                  <XIcon size={24} />
                  <span>X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}