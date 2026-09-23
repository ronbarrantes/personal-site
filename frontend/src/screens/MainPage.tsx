"use client";

import type { BlogPostSummary } from "@/components/blog/BlogPostList";
import { MainPageContactSection } from "@/components/main-page/MainPageContactSection";
import { MainPageHero } from "@/components/main-page/MainPageHero";
import { MainPageNowSection } from "@/components/main-page/MainPageNowSection";
import { MainPagePortfolioSection } from "@/components/main-page/MainPagePortfolioSection";
import { MainPageServicesSection } from "@/components/main-page/MainPageServicesSection";
import { MainPageToolbox } from "@/components/main-page/MainPageToolbox";
import { MainPageWorkSection } from "@/components/main-page/MainPageWorkSection";
import { MainPageWritingSection } from "@/components/main-page/MainPageWritingSection";
import { SiteShell } from "@/components/shell/SiteShell";
import { useNowEditor } from "@/hooks/use-now-editor";

type MainPageProps = {
  posts: BlogPostSummary[];
};

export const MainPage = ({ posts }: MainPageProps) => {
  const nowEditor = useNowEditor();

  return (
    <SiteShell>
      <MainPageHero />
      <MainPageNowSection {...nowEditor} />
      <MainPageServicesSection />
      <MainPageWorkSection />
      <MainPagePortfolioSection />
      <MainPageToolbox />
      <MainPageWritingSection posts={posts} />
      <MainPageContactSection />
    </SiteShell>
  );
};
