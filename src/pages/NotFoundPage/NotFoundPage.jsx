import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.wrap}>
      <h1 className={css.title}>Error: 404! Page is not found!</h1>
      <Link to="/" className={css.link}>
        Go Home
      </Link>
    </div>
  );
}
