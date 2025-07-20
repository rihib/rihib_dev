'use client';

import { ArrowRight, Code, GitBranch, Cpu } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import CustomCard from '@/components/Card';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  const { t } = useTranslation(locale);

  const basePath = locale === 'ja' ? '/ja' : '/en';

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{t('home.title')}</h1>
          <p className="text-xl text-muted-foreground mb-6">{t('home.subtitle')}</p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">{t('home.profileName')}</h2>
                <p className="text-lg text-muted-foreground mb-4">{t('home.profileTitle')}</p>
                <p className="text-sm text-muted-foreground">{t('home.profileDescription')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Link href={`${basePath}/profile#about`} className="block">
            <CustomCard
              icon={<Cpu className="w-12 h-12 text-blue-500" />}
              title={t('home.mlInfrastructure')}
              description="Kubernetes, kube-scheduler"
              className="transition-transform hover:scale-105 cursor-pointer"
            />
          </Link>
          <Link href={`${basePath}/profile#oss`} className="block">
            <CustomCard
              icon={<GitBranch className="w-12 h-12 text-green-500" />}
              title={t('home.ossContribution')}
              description="Kubernetes, etc."
              className="transition-transform hover:scale-105 cursor-pointer"
            />
          </Link>
          <Link href={`${basePath}/profile#internship`} className="block">
            <CustomCard
              icon={<Code className="w-12 h-12 text-purple-500" />}
              title={t('home.softwareDevelopment')}
              description="Web, OS, Middleware"
              className="transition-transform hover:scale-105 cursor-pointer"
            />
          </Link>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <Link href={`${basePath}/profile`}>
                {t('home.learnMore')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild className="bg-green-500 hover:bg-green-600">
              <Link href={`${basePath}/news`}>
                {t('home.latestNews')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild className="bg-purple-500 hover:bg-purple-600">
              <Link href={`${basePath}/blog`}>
                {t('home.readBlog')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
