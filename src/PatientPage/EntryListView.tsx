import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";

import { PatientFull, Entry, Diagnosis, assertNever, HospitalEntry, OccupationalHealthCareEntry, HealthCheckEntry } from "../types";


const DiagnosisCodesView: React.FC<{ diagnosisCodes: string[] | undefined }> = ({ diagnosisCodes }) => {
  const [{ diagnoses }] = useStateValue();
  const renderDiagnosis = (diagnoseCode: string, idx: number) => {
    const diagnosis: Diagnosis = diagnoses[diagnoseCode];
    return (<li key={idx}>{diagnoseCode} {diagnosis ? diagnosis.name : null}</li>);
  };

  return (
    <>
    { diagnosisCodes && diagnosisCodes.length > 0
    ?
    <ul>
    { diagnosisCodes.map((code, idx) => renderDiagnosis(code, idx) ) }
    </ul>
    : 
    null }
    </>
  );
};


const HospitalEntryView: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <Segment>
    <h2>{entry.date} <Icon name="hospital"  size="large" /> in hospital</h2>
    <div>Specialist: { entry.specialist }</div>
    <div><i>{entry.description}</i></div>
    <DiagnosisCodesView diagnosisCodes={entry.diagnosisCodes} />
    { entry.discharge
    ?
    <div>Discharge { entry.discharge.date }: { entry.discharge.criteria }</div>
    :
    <div>Discharge process unfinished</div>}
  </Segment>
);


const OccupationalHealthCareEntryView: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => (
  <Segment>
    <h2>{entry.date} <Icon name="doctor" size="large" /> in occupational health care</h2>
    <div>Specialist: { entry.specialist }</div>
    <div>Occupational health care of employer {entry.employerName}</div>
    <div><i>{entry.description}</i></div>
    { entry.sickLeave
    ?
    <div>
      Sick leave: { entry.sickLeave.startDate} - { entry.sickLeave.endDate }
    </div>
    : 
    <div>No sick leave</div>
    }
    <DiagnosisCodesView diagnosisCodes={entry.diagnosisCodes} />
  </Segment>
);


const HealthCheckEntryView: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
<Segment>
    <h2>{entry.date} <Icon name="heart" size="large" /> health check</h2>
    <div>Specialist: { entry.specialist }</div>
    <div>Health check</div>
    <div><i>{entry.description}</i></div>    
  </Segment>
);


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryView entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntryView entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryView entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const EntryListView: React.FC<{ patient: PatientFull }> = ({ patient }) => {
  if (!patient || !patient.entries || patient.entries.length === 0) {
    return null;
  } else {
    return (    
      <div>
        <h3>entries</h3>
        { patient.entries.map((entry, idx) => (<EntryDetails key={idx} entry={entry} />)) };
      </div>
    );
  }
};

export default EntryListView;
