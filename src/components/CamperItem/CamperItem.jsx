import css from "./CamperItem.module.css";
import clsx from "clsx";
import sprite from "../../icons/sprite.svg";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Feature from "../Feature/Feature.jsx";
import { Link, useLocation } from "react-router-dom";
import {
  selectFavorites,
  toggleFavorite,
} from "../../redux/favorites/slice.js";
import Details from "../Details/Details.jsx";

export default function CamperItem({ camper }) {
  const {
    id,
    name,
    price,
    rating,
    reviews,
    location,
    description,
    gallery,
    transmission,
    engine,
    kitchen,
    AC,
    TV,
    water,
  } = camper;
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const URLlocation = useLocation();

  const favClass = () => {
    const isFavorite = favorites.some((item) => item.id === id);
    return clsx(css.icon, isFavorite && css.favorite);
  };

  return (
    <div className={css.container}>
      <img src={gallery[0].thumb} alt={`Camper: ${name}`} className={css.img} />
      <div>
        <div className={css.wrap}>
          <h3 className={css.general}>{name}</h3>
          <div>
            <p className={css.general}>{`€${price.toFixed(2)}`}</p>
            <IconButton
              aria-label="add-to-favorite"
              onClick={() => dispatch(toggleFavorite(camper))}
            >
              <svg className={favClass()}>
                <use href={`${sprite}#icon-heart`} />
              </svg>
            </IconButton>
          </div>
        </div>

        <Details
          location={location}
          rating={rating}
          reviews={reviews}
          id={id}
        />

        <p className={css.descr}>{description}</p>
        <div className={css.lastWrap}>
          <ul className={css.features}>
            {transmission === "automatic" && (
              <li>
                <Feature icon="diagram" feature="Automatic" />
              </li>
            )}
            {engine === "petrol" && (
              <li>
                <Feature icon="fuel" feature="Petrol" />
              </li>
            )}
            {kitchen && (
              <li>
                <Feature icon="cup-hot" feature="Kitchen" />
              </li>
            )}
            {AC && (
              <li>
                <Feature icon="wind" feature="AC" />
              </li>
            )}
            {TV && (
              <li>
                <Feature icon="tv" feature="TV" />
              </li>
            )}
            {water && (
              <li>
                <Feature icon="water" feature="Water" />
              </li>
            )}
          </ul>
          <Link to={`/catalog/${id}`} state={URLlocation} className={css.info}>
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}
