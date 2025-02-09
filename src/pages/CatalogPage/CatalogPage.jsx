import css from "./CatalogPage.module.css";
import Filters from "../../components/Filters/Filters.jsx";
import CampersList from "../../components/CampersList/CampersList.jsx";
import { useSelector } from "react-redux";
import { selectCampers } from "../../redux/campers/selectors.js";
import FiltersModal from "../../components/FiltersModal/FiltersModal.jsx";

export default function CatalogPage() {
  const campers = useSelector(selectCampers);
  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <Filters />
      </div>
      <FiltersModal />
      <CampersList campers={campers} showed={true} />
    </div>
  );
}
