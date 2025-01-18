import { TailSpin } from "react-loader-spinner";
import css from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={css.spinner}>
      <TailSpin color="var(--button-hover)" />
    </div>
  );
}
