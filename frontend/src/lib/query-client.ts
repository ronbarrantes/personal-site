import { QueryClient } from "@tanstack/react-query";

import { MINUTE } from "@/utils/constants";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 10 * MINUTE,
        retry: 0,
      },
    },
  });
