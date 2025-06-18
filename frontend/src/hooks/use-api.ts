import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { BACKEND_URL } from "@/utils/constants";

const queryKeys = {
  NOW: "now",
  ME: "me",
};

type NowData = {
  id: number;
  title: string;
  desc: string;
  created_at: string;
  updated_at: string;
};

type Signal = {
  signal: AbortSignal | undefined;
};

export type LoginData = {
  username: string;
  password: string;
};

export const loginApi = {
  login: async (body: LoginData) => {
    return await axios({
      method: "post",
      url: `${BACKEND_URL}/login`,
      data: JSON.stringify(body),
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },

  logout: async () => {
    return await axios({
      method: "post",
      url: `${BACKEND_URL}/logout`,
      withCredentials: true,
    });
  },

  me: async () => {
    return await axios({
      method: "get",
      url: `${BACKEND_URL}/me`,
      withCredentials: true,
    });
  },
};

const nowApi = {
  get: async ({ signal }: Signal) => {
    return await axios<NowData[]>({
      method: "get",
      url: `${BACKEND_URL}/now`,
      signal,
    });
  },

  post: async ({ body }: { body: Pick<NowData, "title" | "desc"> }) => {
    return await axios({
      method: "post",
      url: `${BACKEND_URL}/now`,
      data: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  },

  put: async ({
    body,
    id,
  }: {
    id: number;
    body: Pick<NowData, "title" | "desc">;
  }) => {
    return await axios({
      method: "put",
      url: `${BACKEND_URL}/now/${id}`,
      data: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  },

  delete: async (id: number) => {
    return await axios({
      method: "delete",
      url: `${BACKEND_URL}/now/${id}`,
      withCredentials: true,
    });
  },
};

export const useAuthStatus = () => {
  const { data, isLoading, error, isPending } = useQuery({
    queryKey: [queryKeys.ME],
    retry: false,
    queryFn: async () => {
      const res = await loginApi.me();
      return res.data;
    },
  });

  return {
    me: {
      get: {
        data: data,
        isLoading: isLoading,
        error: error,
        isPending: isPending,
      },
    },
  };
};

const useNow = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, isPending } = useQuery<NowData[]>({
    queryKey: [queryKeys.NOW],
    refetchOnWindowFocus: false,
    queryFn: async ({ signal }) => {
      const res = await nowApi.get({ signal });
      return res.data;
    },
  });

  const postNow = useMutation({
    mutationFn: nowApi.post,
    onSuccess: (resData) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.NOW] });
      console.info("SUCCESS", resData);
    },

    onError: (resData) => {
      const errorData = resData as AxiosError;
      console.error("ERROR", errorData);
    },
  });

  const putNow = useMutation({
    mutationFn: nowApi.put,
    onSuccess: (resData) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.NOW] });
      console.info("SUCCESS", resData);
    },

    onError: (resData) => {
      const errorData = resData as AxiosError;
      console.error("ERROR", errorData);
    },
  });

  const deleteNow = useMutation({
    mutationFn: nowApi.delete,
    onSuccess: (resData) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.NOW] });
      console.info("SUCCESS", resData);
    },

    onError: (resData) => {
      const errorData = resData as AxiosError;
      console.error("ERROR", errorData);
    },
  });

  const refetchNow = async () =>
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.NOW],
    });

  const getState = () => queryClient.getQueryState<NowData[]>([queryKeys.NOW]);

  return {
    now: {
      get: {
        data: data,
        isLoading: isLoading,
        error: error,
        isPending: isPending,
      },
      post: postNow,
      put: putNow,
      delete: deleteNow,
      refetch: refetchNow,
      getState,
    },
  };
};

export const useRoutes = () => {
  const { now } = useNow();

  return {
    api: {
      now,
    },

    global: {
      isPending: now.get.isPending,
    },
  };
};
