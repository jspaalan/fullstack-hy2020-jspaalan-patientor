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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

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

export type Patient = PatientPublic | PatientFull;