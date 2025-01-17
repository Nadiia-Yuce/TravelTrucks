import { useDispatch, useSelector } from "react-redux";
import css from "./CampersList.module.css";
import {
  selectCampers,
  selectError,
  selectIsLoading,
  selectTotal,
} from "../../redux/campers/selectors.js";
import { useEffect, useRef, useState } from "react";
// import { selectFilters } from "../../redux/filters/slice.js";
// import { fetchCampers } from "../../redux/campers/operations.js";
import CamperItem from "../CamperItem/CamperItem.jsx";
import { TailSpin } from "react-loader-spinner";

export default function CampersList() {
  // const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  // const filters = useSelector(selectFilters);
  let limit = 4;

  // useEffect(() => {
  //   dispatch(fetchCampers({ page, limit, filters }));
  // }, [dispatch, page, limit, filters]);

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const campers = useSelector(selectCampers);
  const total = useSelector(selectTotal);
  const scrollPosition = useRef(0);

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    if (scrollPosition.current > 0) {
      window.scrollTo({
        top: scrollPosition.current, // Встановлюємо скрол на збережену позицію
        behavior: "auto", // Без плавного скролу
      });
    }
  }, [campers]);

  const loadMore = () => {
    scrollPosition.current = window.scrollY; // Збереження поточної позиції скролу
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {loading ? (
        <div className={css.spinner}>
          <TailSpin color="var(--button-hover)" />
        </div>
      ) : campers.length === 0 && !error ? (
        <p className={css.notFound}>
          There are no campers, matching your query!
        </p>
      ) : (
        <div>
          <ul>
            {campers.map((camper) => (
              <li key={camper.id} className={css.item}>
                <CamperItem camper={camper} />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={css.btn}
            onClick={loadMore}
            disabled={page >= totalPages}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
