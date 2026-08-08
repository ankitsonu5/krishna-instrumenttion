import React from 'react';
import ProjectDetailClient from './ProjectDetailClient';
import { projectsData } from '../data';

export function generateStaticParams() {
  return projectsData.map(p => ({
    slug: p.slug
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProjectDetailClient slug={resolvedParams.slug} />;
}
