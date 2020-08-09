import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient, PatientFull, Gender, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientFullData } from "../state";

const PatientPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const patient: Patient = patients[patientId];

  React.useEffect(() => {
    const fetchPatientFullData = async () => {
      try {
        const { data: patientFullFromApi } = await axios.get<PatientFull>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(setPatientFullData({ ...patientFullFromApi, dataCardType: "full"}));
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && patient.dataCardType !== "full") {
      console.log(`Fetching full data for ${patient ? patient.name : null}...`);
      fetchPatientFullData();
    }  
  }, [dispatch, patient, patientId]);

  const genderIcon: JSX.Element | null = patient ? { 
    [Gender.Male]: (<Icon name='mars' />),
    [Gender.Female]: (<Icon name='venus' />),
    [Gender.Other]: (<Icon name='genderless' />)
  }[patient.gender] : null;

  const renderDiagnosis = (diagnoseCode: string, idx: number) => {
    const diagnosis: Diagnosis = diagnoses[diagnoseCode];
    return (<li key={idx}>{diagnoseCode} {diagnosis ? diagnosis.name : null}</li>);
  };

  const renderEntry = (entry: Entry, idx: number): JSX.Element | null => {    
    if (!entry) return null;
    return (      
      <div key={idx}>
      {entry.date} <i>{entry.description}</i><br/>
      { ((entry.type === 'OccupationalHealthcare' || entry.type === 'Hospital') && entry.diagnosisCodes)
      ? 
        <ul>
          { entry.diagnosisCodes.map((code, idx) => renderDiagnosis(code, idx) ) }                     
        </ul>
      :
      null
      }
      </div>
    );
  };
  
  return (
    <div className="App">
      <Container textAlign="left">
      { (!patient || patient.dataCardType !== "full") ? 
        <h2>Loading... {patient ? patient.dataCardType : 'patient null'}</h2> :
        <>
        <h2>{ patient.name } { genderIcon } </h2>
        ssn: { patient.ssn }<br/>
        occupation: { patient.occupation }<br/>
        date of birth: { patient.dateOfBirth}<br/>
        { patient.entries && patient.entries.length > 0 ? <h3>entries</h3> : null }
        { patient.entries.map((entry, idx) => (renderEntry(entry, idx))) }
        </>
      }
      </Container>      
    </div>
  );
};

export default PatientPage;
