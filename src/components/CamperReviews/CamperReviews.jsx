import css from "./CamperReviews.module.css";
import sprite from "../../icons/sprite.svg";
import { useSelector } from "react-redux";
import {
  selectCurrentCamper,
  selectIsLoading,
} from "../../redux/campers/selectors.js";
import clsx from "clsx";
import Spinner from "../Spinner/Spinner.jsx";

export default function CamperReviews() {
  const camper = useSelector(selectCurrentCamper);
  const loading = useSelector(selectIsLoading);

  if (!camper || loading) return <Spinner />;

  const reviews = camper.reviews;
  const stars = [1, 2, 3, 4, 5];

  const getStarColor = (rating, star) => {
    return clsx(css.star, star <= rating && css.activeStar);
  };

  return (
    <ul className={css.mainList}>
      {reviews.map((review, idx) => (
        <li key={idx}>
          <div className={css.wrap}>
            <div className={css.avatar}>
              <p>{review.reviewer_name[0]}</p>
            </div>
            <div className={css.ratingWrap}>
              <p>{review.reviewer_name}</p>
              <ul className={css.stars}>
                {stars.map((star) => (
                  <li key={star}>
                    <svg className={getStarColor(review.reviewer_rating, star)}>
                      <use href={`${sprite}#icon-star`} />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
