import css from "./CatalogPage.module.css";
import Filters from "../../components/Filters/Filters.jsx";
// import CampersList from "../../components/CampersList/CampersList.jsx";

export default function CatalogPage() {
  return (
    <div className={css.container}>
      <Filters />
      {/* <CampersList /> */}
    </div>
  );
}
