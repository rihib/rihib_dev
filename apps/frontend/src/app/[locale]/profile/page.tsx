import XIcon from '@/components/XIcon';
import { getTranslation, isValidLocale } from '@/lib/i18n';
import { ExternalLink, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function ProfilePage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(locale, key);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 text-foreground">{t('profile.fullName')}</h1>
            <p className="text-xl text-muted-foreground mb-4">{t('profile.currentRole')}</p>
            <p className="text-sm text-muted-foreground">{t('profile.affiliation')}</p>
          </div>
        </div>

        {/* Connect Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">{t('profile.connect')}</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/rihib"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rihito-bannai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://x.com/rihib_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              <XIcon size={24} />
              <span>X</span>
            </a>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">{t('profile.about')}</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>{t('profile.bio')}</p>
            <p>{t('profile.bio2')}</p>
            <p>{t('profile.bio3')}</p>
          </div>
        </div>

        {/* Value Section */}
        <div id="value" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">{t('profile.value')}</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>{t('profile.valuePara1')}</p>
            <p>{t('profile.valuePara2')}</p>
            <p>{t('profile.valuePara3')}</p>
            <p>{t('profile.valuePara4')}</p>
            <p>{t('profile.valuePara5')}</p>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              {t('profile.education')}
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-foreground">
                  <a
                    href="https://www.sfc.keio.ac.jp/academics/gsmg/program/ci.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.graduateSchool')}
                    <ExternalLink size={16} />
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground">{t('profile.graduateSchoolPeriod')}</p>
                <p className="text-xs text-muted-foreground">{t('profile.graduateSchoolDegree')}</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-foreground">
                  <a
                    href="https://www.sfc.keio.ac.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.undergraduateSchool')}
                    <ExternalLink size={16} />
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('profile.undergraduateSchoolPeriod')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('profile.undergraduateSchoolDegree')}
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-foreground">
                  <a
                    href="https://www.keio.ac.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.lawSchool')}
                    <ExternalLink size={16} />
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground">{t('profile.lawSchoolPeriod')}</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-foreground">
                  <a
                    href="https://www.sakaehigashi.ed.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.highSchool')}
                    <ExternalLink size={16} />
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground">{t('profile.highSchoolPeriod')}</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-foreground">
                  <a
                    href="https://www.rangitoto.school.nz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.exchangeSchool')}
                    <ExternalLink size={16} />
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground">{t('profile.exchangeSchoolPeriod')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">{t('profile.research')}</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-foreground">
                  <a
                    href="https://www.wide.ad.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.wideProject')}
                    <ExternalLink size={16} />
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground">{t('profile.wideProjectPeriod')}</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-foreground">
                  <a
                    href="https://rg.sfc.keio.ac.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.muraiJoinGroup')}
                    <ExternalLink size={16} />
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground">{t('profile.muraiJoinGroupPeriod')}</p>
                <div className="ml-4 mt-2 space-y-2">
                  <div className="border-l-4 border-red-400 pl-4">
                    <h4 className="font-medium text-foreground">
                      <a
                        href="https://delight.sfc.wide.ad.jp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                      >
                        {t('profile.delightGroup')}
                        <ExternalLink size={14} />
                      </a>
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {t('profile.delightGroupPeriod')}
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-400 pl-4">
                    <h4 className="font-medium text-foreground">
                      <a
                        href="https://delight.sfc.wide.ad.jp/ja/news/20230927_announcement_of_reforming_delight"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                      >
                        {t('profile.kumoGroup')}
                        <ExternalLink size={14} />
                      </a>
                    </h4>
                    <p className="text-xs text-muted-foreground">{t('profile.kumoGroupPeriod')}</p>
                  </div>
                </div>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-foreground">
                  <a
                    href="https://www.jn.sfc.keio.ac.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.nakasawaOkoshi')}
                    <ExternalLink size={16} />
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground">{t('profile.nakasawaOkoshiPeriod')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* OSS */}
        <div id="oss" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">{t('profile.oss')}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">
                <a
                  href="https://github.com/search?q=org%3Akubernetes+org%3Akubernetes-sigs+org%3Akubernetes-csi+org%3Akubernetes-client+is%3Apr+author%3Arihib+&type=pullrequests&query=org%3Akubernetes+org%3Akubernetes-sigs+org%3Akubernetes-csi+org%3Akubernetes-client+is%3Apr+author%3Arihib+"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.kubernetes')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <div className="ml-4 space-y-2">
                <div className="border-l-4 border-blue-400 pl-4">
                  <a
                    href="https://github.com/kubernetes-sigs/scheduler-plugins/pull/754"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.schedulerPlugins')}
                    <ExternalLink size={12} />
                  </a>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <a
                    href="https://github.com/kubernetes-sigs/cloud-provider-kind/pull/166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.cloudProviderKind')}
                    <ExternalLink size={12} />
                  </a>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <a
                    href="https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/5306"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.clusterApiAzure')}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">{t('profile.otherOss')}</h3>
              <div className="ml-4 space-y-2">
                <div className="border-l-4 border-orange-400 pl-4">
                  <a
                    href="https://github.com/nuta/operating-system-in-1000-lines/pull/26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.osIn1000Lines')}
                    <ExternalLink size={12} />
                  </a>
                </div>
                <div className="border-l-4 border-red-400 pl-4">
                  <a
                    href="https://github.com/GoogleCloudPlatform/batch-samples/pull/81"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    {t('profile.batchSamples')}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Internship */}
        <div id="internship" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            {t('profile.recentExperience')}
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://www.preferred.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.preferredNetworks')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('profile.preferredNetworksPeriod')}
              </p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://layerx.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.layerX')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.layerXPeriod')}</p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://dmm-corp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.dmmLongTerm')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.dmmLongTermPeriod')}</p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://www.cyberagent.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.cyberAgent')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.cyberAgentPeriod')}</p>
              <div className="mt-2 inline-block">
                <a
                  href="https://developers.cyberagent.co.jp/blog/archives/54054/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-sm font-medium"
                >
                  {t('profile.cyberAgentDescription')}
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
            <div className="border-l-4 border-red-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://dmm-corp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.dmmShortTerm')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.dmmShortTermPeriod')}</p>
            </div>
            <div className="border-l-4 border-yellow-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://goinc.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.goCompany')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.goCompanyPeriod')}</p>
              <div className="mt-2 inline-block">
                <a
                  href="https://go-on.goinc.jp/n/n1762aeb8a329"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-sm font-medium"
                >
                  {t('profile.goCompanyDescription')}
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://thecoo.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.thecoo')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.thecooPeriod')}</p>
            </div>
            <div className="border-l-4 border-pink-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://acesinc.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.aces')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.acesPeriod')}</p>
            </div>
            <div className="border-l-4 border-gray-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://www.dmgmori.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.dmgMori')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.dmgMoriPeriod')}</p>
            </div>
            <div className="border-l-4 border-cyan-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://diamondhead.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.diamondhead')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.diamondheadPeriod')}</p>
            </div>
            <div className="border-l-4 border-emerald-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://cafelatte.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.cafelatte')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.cafelattePeriod')}</p>
            </div>
            <div className="border-l-4 border-lime-600 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://rank-king.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.rankKing')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.rankKingPeriod')}</p>
            </div>
          </div>
        </div>

        {/* Personal Development */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            {t('profile.personalDevelopment')}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-400 pl-4">
              <a
                href="https://github.com/rihib/kubernetes/pull/1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.parallelKubeScheduler')}
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="border-l-4 border-green-400 pl-4">
              <a
                href="https://github.com/rihib/tiny-kube-scheduler"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.tinyKubeScheduler')}
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <a
                href="https://github.com/rihib/enhanced-xv6-riscv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.enhancedXv6Riscv')}
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="border-l-4 border-orange-400 pl-4">
              <a
                href="https://github.com/rihib/www-rihib-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.rihibDev')}
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="border-l-4 border-red-400 pl-4">
              <a
                href="https://github.com/rihib/http-server"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.httpServer')}
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <a
                href="https://github.com/rihib/lamport-clock-simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.lamportClockSimulator')}
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="border-l-4 border-indigo-400 pl-4">
              <a
                href="https://github.com/rihib/querychat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.querychat')}
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="border-l-4 border-pink-400 pl-4">
              <a
                href="https://github.com/rihib/eduroam-manager"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.eduroamManager')}
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="border-l-4 border-teal-400 pl-4">
              <a
                href="https://github.com/rihib/handcrafted-webapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.handcraftedWebapp')}
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="border-l-4 border-cyan-400 pl-4">
              <a
                href="https://github.com/rihib/cdn-guesser"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.cdnGuesser')}
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="border-l-4 border-emerald-400 pl-4">
              <a
                href="https://github.com/rihib/p2y-converter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                {t('profile.p2yConverter')}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Freelance Work */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            {t('profile.freelanceWork')}
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://gpu.cloud.zebra-ai.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.gpuCloudService')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.gpuCloudServicePeriod')}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://china-lab.sfc.keio.ac.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.sfcChineseLabWebsite')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('profile.sfcChineseLabWebsitePeriod')}
              </p>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">{t('profile.activities')}</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://sechack365.nict.go.jp/achievement/2023/pdf/28Ss.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.secHack365')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.secHack365Period')}</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://42tokyo.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.tokyo42')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.tokyo42Period')}</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://klab-hr.snar.jp/jobboard/detail.aspx?id=ceG7Rw98wQU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.klabExpertCamp')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.klabExpertCampPeriod')}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://archive.interop.jp/2023/shownet/noc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.interopTokyo')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.interopTokyoPeriod')}</p>
            </div>
          </div>
        </div>

        {/* Open Badges */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">{t('profile.openBadges')}</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-foreground mb-4">{t('profile.secHack365Badge')}</h3>
              <div className="flex justify-center">
                <a
                  href="https://www.openbadge-global.com/api/v1.0/openBadge/v2/Wallet/Public/GetAssertionShare/UURiTXVaYWpUYklmRkRkYWkrZkxlUT09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <Image
                    src="/img/seckhack365-badge.png"
                    alt="SecHack365修了認定"
                    width={128}
                    height={128}
                    className="w-32 h-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Speaking */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">{t('profile.speaking')}</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-foreground">
                <a
                  href="https://docomo-openlab.jp/720/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.wakamonogMeeting')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t('profile.wakamonogMeetingDate')}</p>
            </div>
          </div>
        </div>

        {/* Papers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">{t('profile.papers')}</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-foreground mb-2">
                <a
                  href="https://ipsj.ixsq.nii.ac.jp/records/213965"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t('profile.paperTitle')}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground mb-1">{t('profile.paperAuthors')}</p>
              <p className="text-sm text-muted-foreground mb-1">{t('profile.paperVenue')}</p>
              <p className="text-sm text-muted-foreground">{t('profile.paperYear')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
