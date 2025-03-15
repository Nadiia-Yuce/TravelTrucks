import { Link, NavLink } from "react-router-dom";
import css from "./Header.module.css";
import sprite from "../../icons/sprite.svg";
import MobileNavigationMenu from "../MobileNavigationMenu/MobileNavigationMenu.jsx";
import clsx from "clsx";

export default function Header() {
  const getActiveClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header className={css.header}>
      <Link to="/">
        <svg className={css.logo}>
          <use href={`${sprite}#icon-logo`} />
        </svg>
      </Link>
      <nav className={css.nav}>
        <NavLink className={getActiveClass} to="/">
          Home
        </NavLink>
        <NavLink className={getActiveClass} to="/catalog">
          Catalog
        </NavLink>
        <NavLink className={getActiveClass} to="/favorites">
          Favorites
        </NavLink>
      </nav>
      <div className={css.menu}>
        <MobileNavigationMenu />
      </div>
    </header>
  );
}
