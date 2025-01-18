import { TailSpin } from "react-loader-spinner";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import "./App.css";
import { Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCampers } from "./redux/campers/operations.js";
// import { selectFilters } from "./redux/filters/slice.js";

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

function App() {
  // const dispatch = useDispatch();
  // const filters = useSelector(selectFilters);

  // useEffect(() => {
  //   dispatch(fetchCampers({ filters }));
  // }, [dispatch, filters]);

  return (
    <>
      <Navigation />
      <Suspense fallback={<TailSpin />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />}>
            <Route path="features" element={<CamperFeatures />} />
            <Route path="reviews" element={<CamperReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
