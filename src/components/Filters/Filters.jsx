import FiltersForm from "../FiltersForm/FiltersForm.jsx";
import css from "./Filters.module.css";

export default function Filters() {
  return (
    <div className={css.container}>
      <FiltersForm />
    </div>
  );
}
