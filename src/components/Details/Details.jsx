import css from "./Details.module.css";
import sprite from "../../icons/sprite.svg";

export default function Details({ location, rating, reviews }) {
  const reviewsCount = reviews.length;

  return (
    <div className={css.details}>
      <div className={css.rating}>
        <svg className={css.star}>
          <use href={`${sprite}#icon-star`} />
        </svg>
        <p
          style={{ textDecoration: "underline" }}
        >{`${rating} (${reviewsCount} Reviews)`}</p>
      </div>

      <div className={css.rating}>
        <svg width={16} height={16}>
          <use href={`${sprite}#icon-map`} />
        </svg>
        <p>{location}</p>
      </div>
    </div>
  );
}
