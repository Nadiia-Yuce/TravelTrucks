import { Form, Formik } from "formik";
import css from "./FiltersForm.module.css";
import CustomButton from "../CustomButton/CustomButton.jsx";
import { useDispatch } from "react-redux";
import { resetFilters, setFilters } from "../../redux/filters/slice.js";
import { resetItems, resetPage } from "../../redux/campers/slice.js";

export default function FiltersForm() {
  const dispatch = useDispatch();
  const initialValues = {
    type: "",
    equipment: [],
  };

  const handleSubmit = (values) => {
    const result = {
      AC: values.equipment.includes("ac"),
      transmission: values.equipment.includes("automatic") ? "automatic" : "",
      kitchen: values.equipment.includes("kitchen"),
      TV: values.equipment.includes("tv"),
      bathroom: values.equipment.includes("bathroom"),
      refrigerator: values.equipment.includes("refrigerator"),
      form: values.type,
    };

    dispatch(resetItems());
    dispatch(resetPage());
    // dispatch(resetFilters())
    dispatch(setFilters(result));
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form className={css.form}>
        <fieldset>
          <legend className={css.filter}>Vehicle equipment</legend>
          <div className={css.checkboxGroup}>
            <CustomButton
              name="equipment"
              type="checkbox"
              icon="wind"
              text="AC"
              value="ac"
            />
            <CustomButton
              name="equipment"
              type="checkbox"
              icon="diagram"
              text="Automatic"
              value="automatic"
            />
            <CustomButton
              name="equipment"
              type="checkbox"
              icon="cup-hot"
              text="Kitchen"
              value="kitchen"
            />
            <CustomButton
              name="equipment"
              type="checkbox"
              icon="tv"
              text="TV"
              value="tv"
            />
            <CustomButton
              name="equipment"
              type="checkbox"
              icon="shower"
              text="Bathroom"
              value="bathroom"
            />
            <CustomButton
              name="equipment"
              type="checkbox"
              icon="fridge"
              text="Refrigerator"
              value="refrigerator"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className={css.filter}>Vehicle type</legend>

          <div className={css.radioGroup}>
            <CustomButton
              name="type"
              type="radio"
              icon="l-grid"
              text="Van"
              value="van"
            />

            <CustomButton
              name="type"
              type="radio"
              icon="m-grid"
              text="Fully Integrated"
              value="fullyIntegrated"
            />

            <CustomButton
              name="type"
              type="radio"
              icon="s-grid"
              text="Alcove"
              value="alcove"
            />
          </div>
        </fieldset>

        <button type="submit" className={css.btn}>
          Search
        </button>
      </Form>
    </Formik>
  );
}
