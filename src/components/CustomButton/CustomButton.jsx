import css from "./CustomButton.module.css";
import sprite from "../../icons/sprite.svg";
import { Field } from "formik";

export default function CustomButton({ name, type, icon, text, value }) {
  return (
    <>
      <label>
        <Field
          className={css.real}
          type={type}
          name={name}
          value={value}
          aria-label={text}
        />
        <span className={css.custom}>
          <svg className={css.icon}>
            <use href={`${sprite}#icon-${icon}`} />
          </svg>
          <p className={css.text}>{text}</p>
        </span>
      </label>
    </>
  );
}
