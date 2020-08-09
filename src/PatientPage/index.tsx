import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient, PatientFull } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientFullData } from "../state";
import PatientDataView from "./PatientDataView";
import EntryListView from "./EntryListView";

const hasFullDataAvailable = (patient: Patient): patient is PatientFull => {
  if (!patient || patient.dataCardType !== "full") return false;
  return true;
};

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
        dispatch(setPatientFullData({ ...patientFullFromApi, dataCardType: "full"}));
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && !hasFullDataAvailable(patient)) {
      console.log(`Fetching full data for ${patient ? patient.name : null}...`);
      fetchPatientFullData();
    }  
  }, [dispatch, patient, patientId]);
  
  return (
    <div className="App">
      <Container textAlign="left">
        { !hasFullDataAvailable(patient)
          ? 
          <h2>Loading...</h2>
          :
          <>
          <PatientDataView patient={patient} /><br/>
          <EntryListView patient={patient} />
          </>
        }
      </Container>      
    </div>
  );
};

export default PatientPage;
