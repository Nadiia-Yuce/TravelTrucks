import css from "./Details.module.css";
import sprite from "../../icons/sprite.svg";
import { Link, useLocation } from "react-router-dom";

export default function Details({ location, rating, reviews, id }) {
  const reviewsCount = reviews.length;
  const URLlocation = useLocation();

  return (
    <div className={css.details}>
      <div className={css.rating}>
        <svg className={css.star}>
          <use href={`${sprite}#icon-star`} />
        </svg>
        <Link
          to={`/catalog/${id}/reviews#reviews`}
          state={URLlocation}
          className={css.link}
        >{`${rating} (${reviewsCount} Reviews)`}</Link>
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
