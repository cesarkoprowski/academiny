import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const LandingPage = lazy(() => import("@/pages/landing-page/LandingPage.tsx"));
const ActivitiesPage = lazy(() => import("@/pages/activities/ActivitiesPage"));
const ActivityDetailPage = lazy(
  () => import("@/pages/activities/ActivityDetailPage")
);

const PageLoader: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
    <span>
      <LoaderCircle className="w-32 animate-spin" />
    </span>
  </div>
);

export function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/atividades" element={<ActivitiesPage />} />
        <Route path="/atividades/:id" element={<ActivityDetailPage />} />

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
  );
}

export default App;
