export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type Patient = PatientPublic | PatientFull;

interface EntryBase {
  id: string;
  date: string;
  specialist: string;
  description: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthCareEntry extends EntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  diagnosisCodes?: string[];
  sickLeave?: SickLeave;
} 

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends EntryBase {
  type: 'Hospital';
  diagnosisCodes?: string[];
  discharge?: Discharge;
}

export interface HealthCheckEntry extends EntryBase {
  type: 'HealthCheck';
  healthCheckRating: number;
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;

interface PatientBasic {
  id: string;  
  name: string;
  occupation: string;
  gender: Gender;
  dateOfBirth?: string;
}

export interface PatientPublic extends PatientBasic {
  dataCardType: "public"; 
}

export interface PatientFull extends PatientBasic {
  dataCardType: "full";
  ssn: string;
  entries: Entry[];
}

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};