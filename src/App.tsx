import "./App.css";
import Layout from "./layouts";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "./pages/404";
import { ThemeProvider } from "@/components/theme-provider";
import Loader from "./components/loader/loader";
import AuthGuard from "./components/route-guards/auth";
import UnauthorizedGuard from "./components/route-guards/unauthorized";

// lazy components

const LazyHomeView = lazy(() => import("./pages/home/views/index"));
const LazyLoginPage = lazy(() => import("./pages/login/Login"));
const LazyRegisterPage = lazy(() => import("./pages/registration"));
const LazyProfilePage = lazy(() => import("./pages/profile"));
const LazyQuestionPage = lazy(() => import("./pages/question-page"));
const LazyCreateQuestionPage = lazy(
  () =>
    import(
      "@/pages/create-question-page/create-question-view/CreateQuestionView"
    ),
);

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LazyHomeView />} />
            <Route
              path="signUp"
              element={
                <AuthGuard>
                  <LazyRegisterPage />
                </AuthGuard>
              }
            />{" "}
            <Route
              path="login"
              element={
                <AuthGuard>
                  <LazyLoginPage />
                </AuthGuard>
              }
            />{" "}
            <Route
              path="profile"
              element={
                <UnauthorizedGuard>
                  <LazyProfilePage />
                </UnauthorizedGuard>
              }
            />
            <Route path="questionPage/:id" element={<LazyQuestionPage />} />
            <Route
              path="createQuestion"
              element={
                <UnauthorizedGuard>
                  <LazyCreateQuestionPage />
                </UnauthorizedGuard>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
