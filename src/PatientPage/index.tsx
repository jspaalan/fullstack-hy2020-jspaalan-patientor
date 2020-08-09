import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient, PatientFull, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

const PatientPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient: Patient = patients[patientId];

  React.useEffect(() => {
    const fetchPatientFullData = async () => {
      try {
        const { data: patientFullFromApi } = await axios.get<PatientFull>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch({ type: "SET_PATIENT_FULL_DATA", payload: { ...patientFullFromApi, dataCardType: "full"} });
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
        entries: <br/>
        { patient.entries.map((entry, idx) => {
          return <div key={idx}>entry</div>;
        })
        }
        </>
      }
      </Container>      
    </div>
  );
};

export default PatientPage;
