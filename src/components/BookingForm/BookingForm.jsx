import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/campers/selectors.js";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BookingForm.module.css";

export default function BookingForm() {
  const initialValues = {
    name: "",
    email: "",
    date: null,
    comment: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().max(32, "Max 32 letters!").required("Required!"),
    email: Yup.string().email("Email is invalid!").required("Required!"),
    date: Yup.date().nullable().required("Required!"),
    comment: Yup.string(),
  });
  const loading = useSelector(selectIsLoading);

  const handleSubmit = (values) => {
    toast.success("Camper successfully booked!");
    // console.log(values);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Book your campervan now</h2>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.inputWrap}>
            <Field
              name="name"
              label="Name"
              placeholder="Name*"
              className={css.input}
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>

          <div className={css.inputWrap}>
            <Field
              name="email"
              label="Email"
              placeholder="Email*"
              className={css.input}
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <div className={css.inputWrap}>
            <Field name="date">
              {({ field, form }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(val) => form.setFieldValue(field.name, val)}
                  placeholderText="Booking date*"
                  className={css.input}
                  minDate={new Date()}
                  popperPlacement="bottom-end"
                />
              )}
            </Field>
            <ErrorMessage name="date" component="div" className={css.error} />
          </div>

          <Field
            as="textarea"
            name="comment"
            label="Comment"
            placeholder="Comment"
            className={css.comment}
          />
          <ErrorMessage name="comment" component="div" className={css.error} />

          <button type="submit" disabled={loading} className={css.submit}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
}
