import FiltersForm from "../FiltersForm/FiltersForm.jsx";
import LocationInput from "../LocationInput/LocationInput.jsx";
import css from "./Filters.module.css";

export default function Filters() {
  return (
    <div className={css.container}>
      <LocationInput />
      <p className={css.text}>Filters</p>
      <FiltersForm />
    </div>
  );
}
