import React from "react";
import { useFormikContext, Field } from "formik";
import { TextField, DiagnosisSelection } from "../components/FormField";
import EntryBaseFieldSet from "./EntryBaseFieldSet";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";

/*export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthCareEntry extends EntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  diagnosisCodes?: string[];
  sickLeave?: SickLeave;
} */

// eslint-disable-next-line
const OccupationalHealthCareFieldSet: React.FunctionComponent<{}> = () => {
  const [{ diagnoses }] = useStateValue();
  const { setFieldTouched, setFieldValue } = useFormikContext();

  return (<React.Fragment>
    <EntryBaseFieldSet />
    <Field
      label="Employer name"
      placeholder="employer"
      name="employer"
      component={TextField}
    />
    <DiagnosisSelection
      diagnoses={Object.values(diagnoses)}
      setFieldTouched={setFieldTouched}
      setFieldValue={setFieldValue}
    />
    <Field
      label="Sick leave start date"
      placeholder="1990-01-01"
      name="sickLeaveStartDate"
      component={TextField}
    />
    <Field
      label="Sick leave end date"
      placeholder="1990-01-01"
      name="sickLeaveEndDate"
      component={TextField}
    />
  </React.Fragment>);
};

export interface Values {
  employer: number;
  diagnosisCodes: Diagnosis[];
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  type: string;
}

export const initialValues = 
{
  employer: "",
  diagnosisCodes: [],
  sickLeaveStartDate: "",
  sickLeaveEndDate: "",
  type: 'OccupationalHealthCare'
};

export const validate = (values: Record<string,unknown>): Record<string,string> => {
  const requiredError = "Field is required";  
  const errors: { [field: string]: string } = {};
  if (!values.employer) {
    errors.employer = requiredError;
  }
  if (values.sickLeaveStartDate && !values.sickLeaveEndDate) {
    errors.sickLeaveEndDate = "Required if sick leave start date given";
  } 
  if (values.sickLeaveEndDate && !values.sickLeaveStartDate) {
    errors.sickLeaveEndDate = "Required if sick leave end date given";
  }
  return errors;
};

export default OccupationalHealthCareFieldSet;