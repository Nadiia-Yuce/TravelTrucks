import { useDispatch, useSelector } from "react-redux";
import css from "./CampersList.module.css";
import {
  selectCampers,
  selectError,
  selectIsLoading,
} from "../../redux/campers/selectors.js";
import { useEffect, useState } from "react";
import { selectFilters } from "../../redux/filters/slice.js";
import { fetchCampers } from "../../redux/campers/operations.js";
import CamperItem from "../CamperItem/CamperItem.jsx";
import { TailSpin } from "react-loader-spinner";

export default function CampersList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchCampers({ page, filters }));
  }, [dispatch, page, filters]);

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const campers = useSelector(selectCampers);

  return (
    <div className={css.list}>
      {loading ? (
        <TailSpin />
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
            onClick={() => setPage(page + 1)}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
