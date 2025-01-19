import Feature from "../Feature/Feature.jsx";
import css from "./CamperFeatures.module.css";
import { useSelector } from "react-redux";
import {
  selectCurrentCamper,
  selectIsLoading,
} from "../../redux/campers/selectors.js";
import Spinner from "../Spinner/Spinner.jsx";

export default function CamperFeatures() {
  const camper = useSelector(selectCurrentCamper);
  const loading = useSelector(selectIsLoading);
  const {
    transmission,
    engine,
    kitchen,
    AC,
    TV,
    water,
    radio,
    bathroom,
    refrigerator,
    microwave,
    gas,
    form,
    length,
    width,
    height,
    tank,
    consumption,
  } = camper;

  if (!camper || loading) return <Spinner />;

  const lengthValue = parseFloat(length);
  const widthValue = parseFloat(width);
  const heightValue = parseFloat(height);
  const tankValue = parseFloat(tank);

  const formValue = () => {
    if (form === "panelTruck") return "Panel Truck";
    if (form === "fullyIntegrated") return "Fully Integrated";
    if (form === "alcove") return "Alcove";
    if (form === "van") return "Van";
  };

  return (
    <div className={css.container}>
      <ul className={css.features}>
        {transmission === "automatic" && (
          <li>
            <Feature icon="diagram" feature="Automatic" />
          </li>
        )}
        {engine === "petrol" && (
          <li>
            <Feature icon="fuel" feature="Petrol" />
          </li>
        )}
        {kitchen && (
          <li>
            <Feature icon="cup-hot" feature="Kitchen" />
          </li>
        )}
        {AC && (
          <li>
            <Feature icon="wind" feature="AC" />
          </li>
        )}
        {TV && (
          <li>
            <Feature icon="tv" feature="TV" />
          </li>
        )}
        {water && (
          <li>
            <Feature icon="water" feature="Water" />
          </li>
        )}
        {radio && (
          <li>
            <Feature icon="radios" feature="Radio" />
          </li>
        )}
        {bathroom && (
          <li>
            <Feature icon="shower" feature="Bathroom" />
          </li>
        )}
        {refrigerator && (
          <li>
            <Feature icon="fridge" feature="Refrigerator" />
          </li>
        )}
        {microwave && (
          <li>
            <Feature icon="microwave" feature="Microwave" />
          </li>
        )}
        {gas && (
          <li>
            <Feature icon="gas" feature="Gas" />
          </li>
        )}
      </ul>

      <div className={css.details}>
        <h3 className={css.subtitle}>Vehicle details</h3>
        <ul className={css.list}>
          <li className={css.item}>
            <p>Form</p>
            <p>{formValue()}</p>
          </li>
          <li className={css.item}>
            <p>Length</p>
            <p>{`${lengthValue} m`}</p>
          </li>
          <li className={css.item}>
            <p>Width</p>
            <p>{`${widthValue} m`}</p>
          </li>
          <li className={css.item}>
            <p>Height</p>
            <p>{`${heightValue} m`}</p>
          </li>
          <li className={css.item}>
            <p>Tank</p>
            <p>{`${tankValue} l`}</p>
          </li>
          <li className={css.item}>
            <p>Consumption</p>
            <p>{consumption}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
