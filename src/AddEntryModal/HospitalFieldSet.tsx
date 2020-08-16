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
    <DiagnosisSelection
      diagnoses={Object.values(diagnoses)}
      setFieldTouched={setFieldTouched}
      setFieldValue={setFieldValue}
    />
    <Field
      label="Discharge date"
      placeholder="1990-01-01"
      name="dischargeDate"
      component={TextField}
    />
    <Field
      label="Discharge criteria"
      placeholder="criteria"
      name="dischargeCriteria"
      component={TextField}
    />
  </React.Fragment>);
};

export interface Values {
  diagnosisCodes: Diagnosis[];
  dischargeDate: string;
  dischargeCriteria: string;
  type: string;
}

export const initialValues = 
{
  discharge: "",
  diagnosisCodes: [],
  dischargeDate: "",
  dischargeCriteria: "",
  type: 'Hospital'
};

export const validate = (values: Record<string,unknown>): Record<string,string> => {
  const errors: { [field: string]: string } = {};
  if (values.dischargeDate && !values.dischargeCriteria) {
    errors.dischargeCriteria = "Required when discharge date given";
  }
  if (values.dischargeCriteria && !values.dischargeDate) {
    errors.dischargeDate = "Required when discharge criteria given";
  }
  return errors;
};

export default HospitalFieldSet;