'use client';

import { useMemo } from 'react';
import { Github, Linkedin } from 'lucide-react';
import XIcon from '@/components/XIcon';
import type { ProfileData } from '@/types/profile';

export function useProfileData(): ProfileData {
  return useMemo(
    () => ({
      socialLinks: [
        {
          href: 'https://github.com/rihib',
          icon: Github,
          label: 'GitHub',
        },
        {
          href: 'https://www.linkedin.com/in/rihito-bannai/',
          icon: Linkedin,
          label: 'LinkedIn',
        },
        {
          href: 'https://x.com/rihib_dev',
          icon: XIcon,
          label: 'X',
        },
      ],

      internships: [
        {
          titleKey: 'profile.preferredNetworks',
          periodKey: 'profile.preferredNetworksPeriod',
          url: 'https://www.preferred.jp/',
          borderColor: 'border-blue-600',
        },
        {
          titleKey: 'profile.layerX',
          periodKey: 'profile.layerXPeriod',
          url: 'https://layerx.co.jp/',
          borderColor: 'border-green-600',
        },
        {
          titleKey: 'profile.dmmLongTerm',
          periodKey: 'profile.dmmLongTermPeriod',
          url: 'https://dmm-corp.com/',
          borderColor: 'border-orange-600',
        },
        {
          titleKey: 'profile.cyberAgent',
          periodKey: 'profile.cyberAgentPeriod',
          url: 'https://www.cyberagent.co.jp/',
          borderColor: 'border-purple-600',
          descriptionKey: 'profile.cyberAgentDescription',
          descriptionUrl: 'https://developers.cyberagent.co.jp/blog/archives/54054/',
        },
        {
          titleKey: 'profile.dmmShortTerm',
          periodKey: 'profile.dmmShortTermPeriod',
          url: 'https://dmm-corp.com/',
          borderColor: 'border-red-600',
        },
        {
          titleKey: 'profile.goCompany',
          periodKey: 'profile.goCompanyPeriod',
          url: 'https://goinc.jp/',
          borderColor: 'border-yellow-600',
          descriptionKey: 'profile.goCompanyDescription',
          descriptionUrl: 'https://go-on.goinc.jp/n/n1762aeb8a329',
        },
        {
          titleKey: 'profile.thecoo',
          periodKey: 'profile.thecooPeriod',
          url: 'https://thecoo.co.jp/',
          borderColor: 'border-indigo-600',
        },
        {
          titleKey: 'profile.aces',
          periodKey: 'profile.acesPeriod',
          url: 'https://acesinc.co.jp/',
          borderColor: 'border-pink-600',
        },
        {
          titleKey: 'profile.dmgMori',
          periodKey: 'profile.dmgMoriPeriod',
          url: 'https://www.dmgmori.co.jp/',
          borderColor: 'border-gray-600',
        },
        {
          titleKey: 'profile.diamondhead',
          periodKey: 'profile.diamondheadPeriod',
          url: 'https://diamondhead.jp/',
          borderColor: 'border-cyan-600',
        },
        {
          titleKey: 'profile.cafelatte',
          periodKey: 'profile.cafelattePeriod',
          url: 'https://cafelatte.jp/',
          borderColor: 'border-emerald-600',
        },
        {
          titleKey: 'profile.rankKing',
          periodKey: 'profile.rankKingPeriod',
          url: 'https://rank-king.co.jp/',
          borderColor: 'border-lime-600',
        },
      ],

      education: [
        {
          titleKey: 'profile.graduateSchool',
          periodKey: 'profile.graduateSchoolPeriod',
          url: 'https://www.sfc.keio.ac.jp/academics/gsmg/program/ci.html',
          borderColor: 'border-blue-500',
        },
        {
          titleKey: 'profile.undergraduateSchool',
          periodKey: 'profile.undergraduateSchoolPeriod',
          url: 'https://www.sfc.keio.ac.jp/',
          borderColor: 'border-green-500',
        },
        {
          titleKey: 'profile.lawSchool',
          periodKey: 'profile.lawSchoolPeriod',
          url: 'https://www.keio.ac.jp/',
          borderColor: 'border-purple-500',
        },
        {
          titleKey: 'profile.highSchool',
          periodKey: 'profile.highSchoolPeriod',
          url: 'https://www.sakaehigashi.ed.jp/',
          borderColor: 'border-orange-500',
        },
        {
          titleKey: 'profile.exchangeSchool',
          periodKey: 'profile.exchangeSchoolPeriod',
          url: 'https://www.rangitoto.school.nz/',
          borderColor: 'border-red-500',
        },
      ],

      research: [
        {
          titleKey: 'profile.wideProject',
          periodKey: 'profile.wideProjectPeriod',
          url: 'https://www.wide.ad.jp/',
          borderColor: 'border-blue-600',
        },
        {
          titleKey: 'profile.delightGroup',
          periodKey: 'profile.delightGroupPeriod',
          url: 'https://delight.sfc.wide.ad.jp/',
          borderColor: 'border-green-600',
        },
        {
          titleKey: 'profile.kumoGroup',
          periodKey: 'profile.kumoGroupPeriod',
          url: 'https://delight.sfc.wide.ad.jp/ja/news/20230927_announcement_of_reforming_delight',
          borderColor: 'border-purple-600',
        },
      ],

      oss: {
        kubernetes: {
          mainUrl:
            'https://github.com/search?q=org%3Akubernetes+org%3Akubernetes-sigs+org%3Akubernetes-csi+org%3Akubernetes-client+is%3Apr+author%3Arihib+&type=pullrequests&query=org%3Akubernetes+org%3Akubernetes-sigs+org%3Akubernetes-csi+org%3Akubernetes-client+is%3Apr+author%3Arihib+',
          contributions: [
            {
              titleKey: 'profile.schedulerPlugins',
              url: 'https://github.com/kubernetes-sigs/scheduler-plugins/pull/754',
              borderColor: 'border-blue-400',
            },
            {
              titleKey: 'profile.cloudProviderKind',
              url: 'https://github.com/kubernetes-sigs/cloud-provider-kind/pull/166',
              borderColor: 'border-green-400',
            },
            {
              titleKey: 'profile.clusterApiAzure',
              url: 'https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/5306',
              borderColor: 'border-purple-400',
            },
          ],
        },
        other: [
          {
            titleKey: 'profile.osIn1000Lines',
            url: 'https://github.com/nuta/operating-system-in-1000-lines/pull/26',
            borderColor: 'border-orange-400',
          },
          {
            titleKey: 'profile.batchSamples',
            url: 'https://github.com/GoogleCloudPlatform/batch-samples/pull/81',
            borderColor: 'border-red-400',
          },
        ],
      },

      personalProjects: [
        {
          titleKey: 'profile.parallelKubeScheduler',
          url: 'https://github.com/rihib/kubernetes/pull/1',
          borderColor: 'border-blue-400',
        },
        {
          titleKey: 'profile.tinyKubeScheduler',
          url: 'https://github.com/rihib/tiny-kube-scheduler',
          borderColor: 'border-green-400',
        },
        {
          titleKey: 'profile.enhancedXv6Riscv',
          url: 'https://github.com/rihib/enhanced-xv6-riscv',
          borderColor: 'border-purple-400',
        },
        {
          titleKey: 'profile.rihibDev',
          url: 'https://github.com/rihib/www-rihib-dev',
          borderColor: 'border-orange-400',
        },
        {
          titleKey: 'profile.httpServer',
          url: 'https://github.com/rihib/http-server',
          borderColor: 'border-red-400',
        },
        {
          titleKey: 'profile.lamportClockSimulator',
          url: 'https://github.com/rihib/lamport-clock-simulator',
          borderColor: 'border-yellow-400',
        },
        {
          titleKey: 'profile.querychat',
          url: 'https://github.com/rihib/querychat',
          borderColor: 'border-indigo-400',
        },
        {
          titleKey: 'profile.eduroamManager',
          url: 'https://github.com/rihib/eduroam-manager',
          borderColor: 'border-pink-400',
        },
        {
          titleKey: 'profile.handcraftedWebapp',
          url: 'https://github.com/rihib/handcrafted-webapp',
          borderColor: 'border-teal-400',
        },
        {
          titleKey: 'profile.cdnGuesser',
          url: 'https://github.com/rihib/cdn-guesser',
          borderColor: 'border-cyan-400',
        },
        {
          titleKey: 'profile.p2yConverter',
          url: 'https://github.com/rihib/p2y-converter',
          borderColor: 'border-emerald-400',
        },
      ],

      freelance: [
        {
          titleKey: 'profile.gpuCloudService',
          periodKey: 'profile.gpuCloudServicePeriod',
          url: 'https://gpu.cloud.zebra-ai.net/',
          borderColor: 'border-blue-600',
        },
        {
          titleKey: 'profile.sfcChineseLabWebsite',
          periodKey: 'profile.sfcChineseLabWebsitePeriod',
          url: 'https://china-lab.sfc.keio.ac.jp/',
          borderColor: 'border-green-600',
        },
      ],

      activities: [
        {
          titleKey: 'profile.secHack365',
          periodKey: 'profile.secHack365Period',
          url: 'https://sechack365.nict.go.jp/achievement/2023/pdf/28Ss.pdf',
          borderColor: 'border-blue-600',
        },
        {
          titleKey: 'profile.tokyo42',
          periodKey: 'profile.tokyo42Period',
          url: 'https://42tokyo.jp/',
          borderColor: 'border-green-600',
        },
        {
          titleKey: 'profile.klabExpertCamp',
          periodKey: 'profile.klabExpertCampPeriod',
          url: 'https://klab-hr.snar.jp/jobboard/detail.aspx?id=ceG7Rw98wQU',
          borderColor: 'border-purple-600',
        },
        {
          titleKey: 'profile.interopTokyo',
          periodKey: 'profile.interopTokyoPeriod',
          url: 'https://archive.interop.jp/2023/shownet/noc/',
          borderColor: 'border-orange-600',
        },
      ],

      badges: [
        {
          titleKey: 'profile.secHack365Badge',
          url: 'https://www.openbadge-global.com/api/v1.0/openBadge/v2/Wallet/Public/GetAssertionShare/UURiTXVaYWpUYklmRkRkYWkrZkxlUT09',
          imagePath: '/img/sechack365-badge.png',
        },
      ],

      papers: [
        {
          titleKey: 'profile.paperTitle',
          url: 'https://ipsj.ixsq.nii.ac.jp/records/213965',
        },
      ],

      speaking: [
        {
          titleKey: 'profile.wakamonogMeeting',
          periodKey: 'profile.wakamonogMeetingDate',
          url: 'https://docomo-openlab.jp/720/',
          borderColor: 'border-blue-600',
        },
      ],
    }),
    []
  );
}
