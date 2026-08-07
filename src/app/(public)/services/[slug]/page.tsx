import React from 'react';
import ServiceDetailClient from './ServiceDetailClient';

export function generateStaticParams() {
  return [
    { slug: 'instrumentation-installation' },
    { slug: 'electrical-installation' },
    { slug: 'mechanical-installation' },
    { slug: 'control-instrumentation' },
    { slug: 'plc-dcs-scada' },
    { slug: 'testing-commissioning' },
    { slug: 'calibration-loop-checking' },
    { slug: 'operation-maintenance' },
    { slug: 'shutdown-turnaround' }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <ServiceDetailClient slug={resolvedParams.slug} />;
}
