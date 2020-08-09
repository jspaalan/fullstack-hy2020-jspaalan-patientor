import React from "react";
import { Icon } from "semantic-ui-react";
import { PatientFull, Gender} from "../types";

const PatientDataView: React.FC<{ patient: PatientFull }> = ({ patient }) => {
  
  const genderIcon: JSX.Element | null = patient ? { 
    [Gender.Male]: (<Icon name='mars' />),
    [Gender.Female]: (<Icon name='venus' />),
    [Gender.Other]: (<Icon name='genderless' />)
  }[patient.gender] : null;
  
  return (
    <>
      <h2>{ patient.name } { genderIcon } </h2>
      ssn: { patient.ssn }<br/>
      occupation: { patient.occupation }<br/>
      date of birth: { patient.dateOfBirth}<br/>
    </>
  );
};

export default PatientDataView;
