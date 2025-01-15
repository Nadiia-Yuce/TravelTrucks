import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import sprite from "../../icons/sprite.svg";

export default function Navigation() {
  const getActiveClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <header className={css.header}>
      <svg className={css.logo}>
        <use href={`${sprite}#icon-logo`} />
      </svg>
      <nav>
        <NavLink className={getActiveClass} to="/">
          Home
        </NavLink>
        <NavLink className={getActiveClass} to="/catalog">
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
