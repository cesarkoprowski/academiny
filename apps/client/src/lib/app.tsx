import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav"; 

const LandingPage = lazy(() => import("@/pages/landing-page/LandingPage"));
const ActivitiesPage = lazy(() => import("@/pages/activities/ActivitiesPage"));
const ActivityDetailPage = lazy(() => import("@/pages/activities/ActivityDetailPage"));
const ProjectsPage = lazy(() => import("@/pages/projects/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("@/pages/projects/ProjectDetailPage"));

const PageLoader: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
    <LoaderCircle className="w-32 animate-spin" />
  </div>
);

export function App() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <DashboardNav />} 
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/atividades" element={<ActivitiesPage />} />
          <Route path="/atividades/:id" element={<ActivityDetailPage />} />
          <Route path="/projetos" element={<ProjectsPage />} />
          <Route path="/projetos/:id" element={<ProjectDetailPage />} />
          <Route
            path="*"
            element={
              <div className="flex h-screen w-full items-center justify-center">
                Página não encontrada (404)
              </div>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;