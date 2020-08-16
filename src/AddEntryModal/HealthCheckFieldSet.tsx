import React from "react";
import { Field } from "formik";
import { NumberField } from "../components/FormField";
import EntryBaseFieldSet from "./EntryBaseFieldSet";
import { isPositiveInteger } from "../types";

const HealthCheckFieldSet: React.FunctionComponent<{}> = () => (
  <React.Fragment>
    <EntryBaseFieldSet />
    <Field
      label="Health check rating"
      placeholder="5"
      name="healthCheckRating"
      component={NumberField}
      min={0}
      max={3}
    />    
  </React.Fragment>
);

export interface Values {
  healthCheckRating: number;
}

export const initialValues = 
{
  healthCheckRating: ""
};

export const validate = (values: Record<string,unknown>): Record<string,string> => {
  const requiredError = "Field is required";
  const errors: { [field: string]: string } = {};
  if (!values.healthCheckRating) {
    errors.healthCheckRating = requiredError;
  } else if (!isPositiveInteger(values.healthCheckRating) || values.healthCheckRating > 3) {
    errors.healthCheckRating = "Health check must be 0-3";
    console.log(`HC validation errors: ${JSON.stringify(errors)}`);
  }
  return errors;
};

export default HealthCheckFieldSet;