import { useDispatch, useSelector } from "react-redux";
import css from "./CampersList.module.css";
import {
  selectError,
  selectIsLoading,
  selectTotal,
} from "../../redux/campers/selectors.js";
import { useEffect, useMemo, useRef } from "react";
import { fetchCampers } from "../../redux/campers/operations.js";
import CamperItem from "../CamperItem/CamperItem.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import { useSearchParams } from "react-router-dom";
import { resetItems } from "../../redux/campers/slice.js";

export default function CampersList({
  campers,
  showed = false,
  isFavoriteList = false,
}) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );
  const { page = 1, limit = 4, ...filters } = query;

  const prevFilters = useRef(null);

  useEffect(() => {
    const prevState = JSON.stringify({
      filters: prevFilters.current,
      page: prevFilters.currentPage,
      limit: prevFilters.currentLimit,
    });
    const currentState = JSON.stringify({ filters, page, limit });

    if (prevState === currentState) return;

    if (JSON.stringify(prevFilters.current) !== JSON.stringify(filters)) {
      dispatch(resetItems());
    }

    prevFilters.current = filters;
    prevFilters.currentPage = page;
    prevFilters.currentLimit = limit;

    if (showed) {
      dispatch(fetchCampers({ page, limit, filters }));
    }
  }, [filters, page, limit, dispatch, searchParams, showed]);

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const total = useSelector(selectTotal);

  const totalPages = Math.ceil(total / limit);

  const loadMore = () => {
    const newPage = Number(page) + 1;
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  return (
    <section>
      {loading && <Spinner />}

      {(!loading && campers.length === 0) || error ? (
        isFavoriteList ? (
          <p
            className={css.notFound}
            style={{ width: "90%", transform: "translate(-50%, -50%)" }}
          >
            You don&apos;t have any Favorite campers yet!
          </p>
        ) : (
          <p className={css.notFound}>
            There are no campers matching your query! Check your filters.
          </p>
        )
      ) : (
        <div className={css.container}>
          <ul className={css.list}>
            {campers.map((camper) => (
              <li key={camper.id} className={css.item}>
                <CamperItem camper={camper} />
              </li>
            ))}
          </ul>
          {!loading && !error && showed && (
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
    </section>
  );
}
