import { useDispatch, useSelector } from "react-redux";
import css from "./CampersList.module.css";
import {
  selectCampers,
  selectError,
  selectIsLoading,
  selectTotal,
} from "../../redux/campers/selectors.js";
import { useEffect, useMemo } from "react";
import { selectFilters, setFilters } from "../../redux/filters/slice.js";
import { fetchCampers } from "../../redux/campers/operations.js";
import CamperItem from "../CamperItem/CamperItem.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import { useSearchParams } from "react-router-dom";

export default function CampersList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useSelector(selectFilters);
  const query = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );
  const { page = 1, limit = 4, ...initial } = query;

  useEffect(() => {
    // dispatch(setFilters(initial));
    dispatch(fetchCampers({ page, limit, filters }));
  }, [page, limit, filters, dispatch]);

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const campers = useSelector(selectCampers);
  // console.log("filters", filters);

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
