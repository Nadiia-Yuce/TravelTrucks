import { Field, Form, Formik } from "formik";
import css from "./FiltersForm.module.css";
import CustomButton from "../CustomButton/CustomButton.jsx";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/campers/selectors.js";
import { useSearchParams } from "react-router-dom";
import sprite from "../../icons/sprite.svg";
import { useMemo } from "react";

export default function FiltersForm() {
  const loading = useSelector(selectIsLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const initialValues = {
    location: query?.location || "",
    form: query?.form || "",
    equipment: [
      query?.AC === "true" ? "ac" : "",
      query?.transmission === "automatic" ? "automatic" : "",
      query?.kitchen === "true" ? "kitchen" : "",
      query?.TV === "true" ? "tv" : "",
      query?.bathroom === "true" ? "bathroom" : "",
      query?.refrigerator === "true" ? "refrigerator" : "",
    ].filter(Boolean),
  };

  const handleSubmit = (values) => {
    const result = {
      location: values.location,
      AC: values.equipment.includes("ac"),
      transmission: values.equipment.includes("automatic") ? "automatic" : "",
      kitchen: values.equipment.includes("kitchen"),
      TV: values.equipment.includes("tv"),
      bathroom: values.equipment.includes("bathroom"),
      refrigerator: values.equipment.includes("refrigerator"),
      form: values.form,
    };

    Object.entries(result).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ dirty }) => (
        <Form className={css.form}>
          <div className={css.wrap}>
            <label htmlFor="location" className={css.label}>
              Location
            </label>
            <Field
              className={css.input}
              type="text"
              name="location"
              placeholder="City"
            />
            <svg className={css.map}>
              <use href={`${sprite}#icon-map`} />
            </svg>
          </div>

          <p className={css.text}>Filters</p>

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
                name="form"
                type="radio"
                icon="l-grid"
                text="Van"
                value="panelTruck"
              />

              <CustomButton
                name="form"
                type="radio"
                icon="m-grid"
                text="Fully Integrated"
                value="fullyIntegrated"
              />

              <CustomButton
                name="form"
                type="radio"
                icon="s-grid"
                text="Alcove"
                value="alcove"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className={css.btn}
            disabled={!dirty || loading}
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
}
