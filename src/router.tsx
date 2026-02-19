import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  lazyRouteComponent
} from "@tanstack/react-router";
import { RootLayout } from "@/routes/__root";

export interface RouterContext {
  queryClient: QueryClient;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("@/routes/index"), "HomePage")
});

const riskCheckRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/risk-check",
  component: lazyRouteComponent(() => import("@/routes/risk-check"), "RiskCheckPage")
});

const toolkitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/toolkit",
  component: lazyRouteComponent(() => import("@/routes/toolkit"), "ToolkitPage")
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: lazyRouteComponent(() => import("@/routes/dashboard"), "DashboardPage")
});

const knowledgeBaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/knowledge-base",
  component: lazyRouteComponent(() => import("@/routes/knowledge-base"), "KnowledgeBasePage")
});

const counselorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/counselor",
  component: lazyRouteComponent(() => import("@/routes/counselor"), "CounselorPage")
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  riskCheckRoute,
  toolkitRoute,
  dashboardRoute,
  knowledgeBaseRoute,
  counselorRoute
]);

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: { queryClient },
  scrollRestoration: true
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
