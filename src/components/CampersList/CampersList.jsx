import { useDispatch, useSelector } from "react-redux";
import css from "./CampersList.module.css";
import {
  selectCampers,
  selectError,
  selectIsLoading,
  selectTotal,
} from "../../redux/campers/selectors.js";
import { useEffect } from "react";
import { selectFilters } from "../../redux/filters/slice.js";
import { fetchCampers } from "../../redux/campers/operations.js";
import CamperItem from "../CamperItem/CamperItem.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import { useSearchParams } from "react-router-dom";

export default function CampersList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useSelector(selectFilters);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 4;

  //! Тригерить подвійний запит на сервер
  // useEffect(() => {
  //   searchParams.set("page", page);
  //   searchParams.set("limit", limit);
  //   setSearchParams(searchParams);
  // }, [searchParams, setSearchParams, page, limit]);

  useEffect(() => {
    dispatch(fetchCampers({ page, limit, filters }));
  }, [page, limit, filters, dispatch]);

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const campers = useSelector(selectCampers);
  const total = useSelector(selectTotal);

  const totalPages = Math.ceil(total / limit);

  const loadMore = () => {
    const newPage = Number(page) + 1;

    searchParams.set("page", newPage);
    searchParams.set("limit", Number(limit));
    setSearchParams(searchParams);
  };

  return (
    <div>
      {loading && <Spinner />}

      {(!loading && campers.length === 0) || error ? (
        <p className={css.notFound}>
          There are no campers, matching your query!
        </p>
      ) : (
        <div className={css.container}>
          <ul>
            {campers.map((camper) => (
              <li key={camper.id} className={css.item}>
                <CamperItem camper={camper} />
              </li>
            ))}
          </ul>
          {!loading && !error && (
            <button
              type="button"
              className={css.btn}
              onClick={loadMore}
              disabled={page >= totalPages}
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
