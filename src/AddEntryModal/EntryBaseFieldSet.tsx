import React from "react";
import { Field } from "formik";
import { TextField } from "../components/FormField";

const EntryBaseFieldSet: React.FunctionComponent<{}> = () => (
  <React.Fragment>
    <Field
      label="Date"
      placeholder="2020-08-16"
      name="date"
      component={TextField}
    />
    <Field
      label="Specialist"
      placeholder="specialist"
      name="specialist"
      component={TextField}
    />
    <Field
      label="Description"
      placeholder="description"
      name="description"
      component={TextField}
    />
  </React.Fragment>
);

export interface Values {
  date: string;
  specialist: string;
  description: string;
}

export const initialValues = 
{
  date: "2020-08-16",
  specialist: "The Specialist",
  description: "Case description",
};

export const validate = (values: Record<string,unknown>): Record<string,string> => {
  const requiredError = "Field is required";
  const errors: { [field: string]: string } = {};
  if (!values.date) {
    errors.date = requiredError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (!values.description) {
    errors.description = requiredError;
  }
  return errors;
};

export default EntryBaseFieldSet;