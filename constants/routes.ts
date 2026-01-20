export const ROUTES = {
  LOGIN: "/admin/login",
  DASHBOARD: "/admin/dashboard",
  POST: {
    LIST: "/admin/dashboard/post",
    CREATE: "/admin/dashboard/post/create",
    EDIT: (id: string) => `/admin/dashboard/post/edit/${id}`,
    DETAIL: (id: string) => `/admin/dashboard/post/${id}`,
  },
  SURVEY: {
    LIST: "/admin/dashboard/survey",
  },
  USER: {
    LIST: "/admin/dashboard/user",
    CREATE: "/admin/dashboard/user/create",
    EDIT: (id: string) => `/admin/dashboard/user/edit/${id}`,
  },
  PROFILE: "/admin/dashboard/profile",
} as const;
