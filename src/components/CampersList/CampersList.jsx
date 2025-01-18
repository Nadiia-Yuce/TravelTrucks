import { useDispatch, useSelector } from "react-redux";
import css from "./CampersList.module.css";
import {
  selectCampers,
  selectError,
  selectIsLoading,
  selectPagination,
  selectTotal,
} from "../../redux/campers/selectors.js";
import { useEffect } from "react";
import { selectFilters } from "../../redux/filters/slice.js";
import { fetchCampers } from "../../redux/campers/operations.js";
import CamperItem from "../CamperItem/CamperItem.jsx";
import { setPage } from "../../redux/campers/slice.js";
import Spinner from "../Spinner/Spinner.jsx";

export default function CampersList() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const { page, limit } = useSelector(selectPagination);

  useEffect(() => {
    dispatch(fetchCampers({ page, limit, filters }));
  }, [dispatch, page, limit, filters]);

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const campers = useSelector(selectCampers);
  const total = useSelector(selectTotal);

  const totalPages = Math.ceil(total / limit);

  const loadMore = () => {
    dispatch(setPage(page + 1));
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
