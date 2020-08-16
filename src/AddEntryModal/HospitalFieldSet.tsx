import React from "react";
import { useFormikContext, Field } from "formik";
import { TextField, DiagnosisSelection } from "../components/FormField";
import EntryBaseFieldSet from "./EntryBaseFieldSet";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";

const HospitalFieldSet: React.FunctionComponent<{}> = () => {
  const [{ diagnoses }] = useStateValue();
  const { setFieldTouched, setFieldValue } = useFormikContext();

  return (<React.Fragment>
    <EntryBaseFieldSet />
    <Field
      label="Discharge"
      placeholder="discharge"
      name="discharge"
      component={TextField}
    />
    <DiagnosisSelection
      diagnoses={Object.values(diagnoses)}
      setFieldTouched={setFieldTouched}
      setFieldValue={setFieldValue}
    />
  </React.Fragment>);
};

export interface Values {
  discharge: string;
  diagnosisCodes: Diagnosis[];
}

export const initialValues = 
{
  discharge: "",
  diagnosisCodes: []
};

export const validate = (values: Record<string,unknown>): Record<string,string> => {
  const requiredError = "Field is required";
  const errors: { [field: string]: string } = {};
  if (!values.discharge) {
    errors.discharge = requiredError;
  }
  return errors;
};

export default HospitalFieldSet;