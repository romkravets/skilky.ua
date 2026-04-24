import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/config';

const POPULAR_AMOUNTS = [
  100_000_000,
  500_000_000,
  1_000_000_000,
  5_000_000_000,
  10_000_000_000,
  // Pre-loaded corruption cases
  6_700_000_000,
  4_000_000_000,
  19_000_000_000,
  1_400_000_000,
  1_100_000_000,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/counter`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const resultRoutes: MetadataRoute.Sitemap = POPULAR_AMOUNTS.map(amount => ({
    url: `${BASE_URL}/result/${amount}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...resultRoutes];
}
