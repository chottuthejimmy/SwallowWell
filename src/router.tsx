import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, createRoute, createRouter } from "@tanstack/react-router";
import { RootLayout } from "@/routes/__root";
import { CounselorPage } from "@/routes/counselor";
import { DashboardPage } from "@/routes/dashboard";
import { HomePage } from "@/routes/index";
import { KnowledgeBasePage } from "@/routes/knowledge-base";
import { RiskCheckPage } from "@/routes/risk-check";
import { ToolkitPage } from "@/routes/toolkit";

export interface RouterContext {
  queryClient: QueryClient;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage
});

const riskCheckRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/risk-check",
  component: RiskCheckPage
});

const toolkitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/toolkit",
  component: ToolkitPage
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage
});

const knowledgeBaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/knowledge-base",
  component: KnowledgeBasePage
});

const counselorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/counselor",
  component: CounselorPage
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
