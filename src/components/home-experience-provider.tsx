"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  parseWebsiteInput,
  type WebsiteParseError,
  type WebsiteSubject,
} from "@/lib/website-url";

type HomeExperienceContextValue = {
  subject: WebsiteSubject | null;
  submitWebsite: (rawInput: string) => WebsiteParseError | null;
  clearWebsite: () => void;
};

const HomeExperienceContext = createContext<HomeExperienceContextValue | null>(null);

export function HomeExperienceProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState<WebsiteSubject | null>(null);

  const value = useMemo<HomeExperienceContextValue>(
    () => ({
      subject,
      submitWebsite: (rawInput) => {
        const result = parseWebsiteInput(rawInput);
        if (!result.ok) return result.error;
        setSubject(result.subject);
        return null;
      },
      clearWebsite: () => setSubject(null),
    }),
    [subject],
  );

  return <HomeExperienceContext.Provider value={value}>{children}</HomeExperienceContext.Provider>;
}

export function useHomeExperience(): HomeExperienceContextValue {
  const context = useContext(HomeExperienceContext);
  if (!context) {
    throw new Error("useHomeExperience must be used inside HomeExperienceProvider");
  }
  return context;
}
