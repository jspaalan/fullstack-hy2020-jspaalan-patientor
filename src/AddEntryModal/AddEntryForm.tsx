import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
//import SelectEntryTypeField, { EntryType } from "./SelectEntryTypeField";
import { Formik, Form } from "formik";
import OccupationalHealthCareFieldSet, { initialValues as ohcInitialValues, validate as validateOhc, Values as ValueTypesOhc } from "./OccupationalHealthCareFieldSet";
import HealthCheckFieldSet, { initialValues as hcInitialValues, validate as validateHc, Values as ValueTypesHc } from "./HealthCheckFieldSet";
import HospitalFieldSet, { initialValues as hospitalInitialValues, validate as validateHospital, Values as ValueTypesHospital } from "./HospitalFieldSet";
import { initialValues as baseInitialValues, validate as validateBase, Values as ValueTypesEntryBase } from "./EntryBaseFieldSet";

export type AddEntryFormValues = ValueTypesEntryBase | ValueTypesOhc | ValueTypesHc | ValueTypesHospital;
export enum EntryType {
  OccupationalHealthCare = 'OccupationalHealthCare',
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck'
}

interface Props {
  onSubmit: (values: AddEntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [ selectedEntryType, setSelectedEntryType ] = useState<EntryType>(EntryType.OccupationalHealthCare);

  return (
    <Formik
      initialValues={{
        ...baseInitialValues,
        ...ohcInitialValues,
        ...hospitalInitialValues,
        ...hcInitialValues,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors: { [field: string]: string } = 
        {
          ...validateBase(values),
          ...(selectedEntryType === EntryType.OccupationalHealthCare ? validateOhc(values) : null),
          ...(selectedEntryType === EntryType.Hospital ? validateHospital(values) : null),
          ...(selectedEntryType === EntryType.HealthCheck ? validateHc(values) : null)
        };
        return errors;
      }}
    >
    {({ isValid, dirty }) => {
      return (
        <Form className="form ui">
          <SelectEntryTypeField
            name="selectedEntryType"
            label="Select type of entry"
            selectedEntryType={selectedEntryType}
            setSelectedEntryType={setSelectedEntryType} />
          { selectedEntryType === EntryType.OccupationalHealthCare && (
            <OccupationalHealthCareFieldSet/>
          )}
          { selectedEntryType === EntryType.Hospital && (
            <HospitalFieldSet />
          )}
          { selectedEntryType === EntryType.HealthCheck && (
            <HealthCheckFieldSet />
          )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>
        );
      }}
    </Formik>
  );
};

// structure of a single option
type EntryTypeOption = {
  value: EntryType;
  label: string;
};

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.OccupationalHealthCare, label: "Occupational health care" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.HealthCheck, label: "Health check" }
];

export type EntryTypeSelectFieldProps = {
  name: string;
  label: string;
  selectedEntryType: EntryType;
  setSelectedEntryType: (entryType: EntryType) => void;
};

const SelectEntryTypeField: React.FC<EntryTypeSelectFieldProps> = ({
  name,
  label,
  selectedEntryType,
  setSelectedEntryType
}: EntryTypeSelectFieldProps) => (
  <div>
    <label>{label}</label>
    <select 
      name={name} 
      className="ui dropdown" 
      value={selectedEntryType}
      onChange={(event) => { const selected: EntryType = EntryType[event.target.value as keyof typeof EntryType]; setSelectedEntryType(selected); } }>
      {entryTypeOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </select>
  </div>
);

export default AddEntryForm;