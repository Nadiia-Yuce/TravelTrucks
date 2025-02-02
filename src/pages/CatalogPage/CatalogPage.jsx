import css from "./CatalogPage.module.css";
import Filters from "../../components/Filters/Filters.jsx";
import CampersList from "../../components/CampersList/CampersList.jsx";
import { useSelector } from "react-redux";
import { selectCampers } from "../../redux/campers/selectors.js";

export default function CatalogPage() {
  const campers = useSelector(selectCampers);
  return (
    <div className={css.container}>
      <Filters />
      <CampersList campers={campers} showed={true} />
    </div>
  );
}
