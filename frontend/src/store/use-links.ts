import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { IconLink } from "@/lib/types";

type LinksState = {
  iconLink: IconLink;
  pageIdx: number;
};

type LinksActions = {
  setIcon: (iconLink: IconLink, pageIdx: number) => void;
};

export type LinksStore = LinksActions & LinksState;

export const useLinksStore = create<LinksStore>()(
  devtools(
    (set) => ({
      iconLink: "home",
      pageIdx: 1,
      setIcon: (iconLink, pageIdx) => set({ iconLink, pageIdx }),
    }),
    { name: "LINKS_STORE" }
  )
);
