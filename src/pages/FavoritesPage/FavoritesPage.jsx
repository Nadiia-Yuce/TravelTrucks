import { useSelector } from "react-redux";
import CampersList from "../../components/CampersList/CampersList.jsx";
import css from "./FavoritesPage.module.css";
import { selectFavorites } from "../../redux/favorites/slice.js";

export default function FavoritesPage() {
  const favoriteCampers = useSelector(selectFavorites);
  return (
    <div style={{ padding: "120px 0 48px" }}>
      <CampersList campers={favoriteCampers} />
    </div>
  );
}
