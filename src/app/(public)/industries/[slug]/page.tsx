import React from 'react';
import IndustryDetailClient from './IndustryDetailClient';

export function generateStaticParams() {
  return [
    { slug: 'thermal-power' },
    { slug: 'steel-plants' },
    { slug: 'oil-gas' },
    { slug: 'process-industry' },
    { slug: 'cement' },
    { slug: 'sugar' }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <IndustryDetailClient slug={resolvedParams.slug} />;
}
