import css from "./LocationInput.module.css";
import sprite from "../../icons/sprite.svg";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/filters/slice.js";
import _ from "lodash";
import { useCallback } from "react";
import { resetItems, resetPage } from "../../redux/campers/slice.js";

export default function LocationInput() {
  const dispatch = useDispatch();

  // Використовуємо useCallback, щоб уникнути створення нової функції при кожному рендері
  const debouncedDispatch = useCallback(
    _.debounce((inputValue) => {
      dispatch(resetItems());
      dispatch(resetPage());
      dispatch(setFilters({ location: inputValue })); // Дiспачимо лише після затримки
    }, 1500),
    [dispatch]
  );

  const handleChange = (evt) => {
    debouncedDispatch(evt?.target?.value);
  };

  return (
    <div className={css.wrap}>
      <label htmlFor="location" className={css.label}>
        Location
      </label>
      <input
        className={css.input}
        type="text"
        name="location"
        onChange={handleChange}
        placeholder="City"
      />
      <svg className={css.map}>
        <use href={`${sprite}#icon-map`} />
      </svg>
    </div>
  );
}
