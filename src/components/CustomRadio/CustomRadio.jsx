import css from "./CustomRadio.module.css";
import sprite from "../../icons/sprite.svg";
import { Field } from "formik";

export default function CustomRadio({ icon, text, value }) {
  return (
    <>
      <label htmlFor={value}>
        <Field
          className={css.real}
          type="radio"
          name="form"
          value={value}
          id={value}
        />
        <span className={css.custom}>
          <svg className={css.icon}>
            <use href={`${sprite}#icon-${icon}`} />
          </svg>
          <p className={css.text}>{text}</p>
        </span>
        <p className={css.real}>{text}</p>
      </label>
    </>
  );
}
