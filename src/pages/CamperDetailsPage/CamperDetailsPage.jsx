import css from "./CamperDetailsPage.module.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getCamperDetails } from "../../redux/campers/operations.js";
import {
  selectCurrentCamper,
  selectIsLoading,
} from "../../redux/campers/selectors.js";
import Details from "../../components/Details/Details.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";
import clsx from "clsx";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCamperDetails(id));
  }, [dispatch, id]);

  const loading = useSelector(selectIsLoading);
  const camper = useSelector(selectCurrentCamper);
  const URLlocation = useLocation();
  const backLinkRef = useRef(URLlocation.state ?? "/catalog");

  //Запобігає прильоту null в селектор (через час очікування відповіді від серверу)
  if (loading || !camper) {
    return <Spinner />;
  }

  const { name, price, rating, reviews, location, description, gallery } =
    camper;

  const getActiveClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div className={css.detailsPage}>
      <div className={css.linkWrap}>
        <h2 className={css.general} style={{ marginBottom: "8px" }}>
          {name}
        </h2>
        <Link to={backLinkRef.current} className={css.back}>
          Go back
        </Link>
      </div>
      <Details location={location} rating={rating} reviews={reviews} />
      <p
        className={css.general}
        style={{ marginBottom: "28px", marginTop: "16px" }}
      >{`€${price.toFixed(2)}`}</p>

      <ul className={css.imgGroup}>
        {gallery.map((img, idx) => (
          <li key={idx}>
            <img src={img.original} alt="Camper's photo" className={css.img} />
          </li>
        ))}
      </ul>

      <p className={css.text}>{description}</p>
      <ul className={css.subPages}>
        <li>
          <NavLink to="features" className={getActiveClass}>
            Features
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={getActiveClass}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <div className={css.wrap}>
        <Outlet />
        <BookingForm />
      </div>
    </div>
  );
}
