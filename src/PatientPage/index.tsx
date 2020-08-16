import React from "react";
import axios from "axios";
import { Container, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient, PatientFull } from "../types";
import AddEntryModal from "../AddEntryModal";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientFullData } from "../state";
import PatientDataView from "./PatientDataView";
import EntryListView from "./EntryListView";
import { AddEntryFormValues } from "../AddEntryModal/AddEntryForm";

const hasFullDataAvailable = (patient: Patient): patient is PatientFull => {
  if (!patient || patient.dataCardType !== "full") return false;
  return true;
};

interface EntryFormProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddEntryFormValues) => void;
  error?: string;
}

const PatientPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: AddEntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<PatientFull>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(setPatientFullData(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
