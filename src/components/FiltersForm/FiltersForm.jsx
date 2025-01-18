import { Form, Formik } from "formik";
import css from "./FiltersForm.module.css";
import CustomRadio from "../CustomRadio/CustomRadio.jsx";

export default function FiltersForm() {
  const initialValues = {
    form: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form className={css.form}>
        <h3 className={css.filter}>Vehicle equipment</h3>
        <h3 className={css.filter}>Vehicle type</h3>

        <div className={css.radioGroup}>
          <CustomRadio icon="l-grid" text="Van" value="van" />

          <CustomRadio
            icon="m-grid"
            text="Fully Integrated"
            value="fullyIntegrated"
          />

          <CustomRadio icon="s-grid" text="Alcove" value="alcove" />
        </div>

        <button type="submit" className={css.btn}>
          Search
        </button>
      </Form>
    </Formik>
  );
}
