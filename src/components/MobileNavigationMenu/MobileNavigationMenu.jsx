import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import css from "./MobileNavigationMenu.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function MobileNavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const getActiveClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={isOpen} onClose={handleClose}>
        <nav className={css.nav}>
          <NavLink className={getActiveClass} to="/" onClick={handleClose}>
            Home
          </NavLink>
          <NavLink
            className={getActiveClass}
            to="/catalog"
            onClick={handleClose}
          >
            Catalog
          </NavLink>
          <NavLink
            className={getActiveClass}
            to="/favorites"
            onClick={handleClose}
          >
            Favorites
          </NavLink>
        </nav>
      </Drawer>
    </>
  );
}
