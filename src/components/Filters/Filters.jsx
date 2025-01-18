import LocationInput from "../LocationInput/LocationInput.jsx";
import css from "./Filters.module.css";

export default function Filters() {
  return (
    <div className={css.container}>
      <LocationInput />
    </div>
  );
}
