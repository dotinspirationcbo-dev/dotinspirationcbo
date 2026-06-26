export interface SiteContentEntry {
  id: number;
  key: string;
  value: string;
  updated_at: Date;
}

export interface UpsertSiteContentDto {
  key: string;
  value: string;
}

export const SITE_CONTENT_KEYS = [
  "hero.title",
  "hero.subtitle",
  "about.description",
  "about.extended",
  "about.vision",
  "about.mission",
  "about.motto",
  "programs.youthEmpowerment",
  "programs.education",
  "programs.communityOutreach",
  "programs.economicDevelopment",
] as const;

export type SiteContentKey = (typeof SITE_CONTENT_KEYS)[number];
