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

export enum Type {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface EntryBase {
  id: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
  description: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcare extends EntryBase {
  type: 'OccupationalHealthcare';
  sickLeave?: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface Hospital extends EntryBase {
  type: 'Hospital';
  discharge?: Discharge;
}

interface HealthCheck extends EntryBase {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry = 
  | OccupationalHealthcare 
  | Hospital 
  | HealthCheck;

export interface EntryInput {
  patientId: string;
  entry: Entry;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>;
}
