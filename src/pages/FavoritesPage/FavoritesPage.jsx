import { useSelector } from "react-redux";
import CampersList from "../../components/CampersList/CampersList.jsx";
import css from "./FavoritesPage.module.css";
import { selectFavorites } from "../../redux/favorites/slice.js";

export default function FavoritesPage() {
  const favoriteCampers = useSelector(selectFavorites);
  return (
    <div style={{ padding: "48px 0" }}>
      <CampersList campers={favoriteCampers} />
    </div>
  );
}
