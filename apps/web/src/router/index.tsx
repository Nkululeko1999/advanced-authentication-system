import { createBrowserRouter, Navigate } from "react-router";

import lazyRoute from "./lazy";
import AuthLayout from "@/components/layouts/auth-layout";
import AppLayout from "@/components/layouts/app-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        lazy: () => lazyRoute(() => import("@/pages/auth/login/page")),
      },
      {
        path: "/register",
        lazy: () => lazyRoute(() => import("@/pages/auth/register/page")),
      },
      {
        path: "/forgot-password",
        lazy: () => lazyRoute(() => import("@/pages/auth/forgot-password/page")),
      },
      {
        path: "/reset-password",
        lazy: () => lazyRoute(() => import("@/pages/auth/reset-password/page")),
      },
      {
        path: "/verify-account",
        lazy: () => lazyRoute(() => import("@/pages/auth/verify-account/page")),
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/profile",
        lazy: () => lazyRoute(() => import("@/pages/profile/page")),
      },
      {
        path: "/settings",
        lazy: () => lazyRoute(() => import("@/pages/settings/page")),
      },
    ],
  },
]);