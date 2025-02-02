import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation/Navigation.jsx";
import Spinner from "./components/Spinner/Spinner.jsx";
import "./App.css";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
const CamperDetailsPage = lazy(() =>
  import("./pages/CamperDetailsPage/CamperDetailsPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);
const CamperFeatures = lazy(() =>
  import("./components/CamperFeatures/CamperFeatures.jsx")
);
const CamperReviews = lazy(() =>
  import("./components/CamperReviews/CamperReviews.jsx")
);

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />}>
            <Route index element={<Navigate to="features" />} />
            <Route path="features" element={<CamperFeatures />} />
            <Route path="reviews" element={<CamperReviews />} />
          </Route>
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}
