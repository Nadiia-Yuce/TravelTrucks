import css from "./Feature.module.css";
import sprite from "../../icons/sprite.svg";

export default function Feature({ icon, feature }) {
  return (
    <div className={css.feature}>
      <svg width={20} height={20}>
        <use href={`${sprite}#icon-${icon}`} />
      </svg>
      <p>{feature}</p>
    </div>
  );
}
