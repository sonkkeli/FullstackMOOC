import { v4 as uuidv4 } from 'uuid';
import patientData from '../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addEntry = ( entry: NewPatient ) => {
  const patient = {
    id: uuidv4(),
    ...entry,
    entries: []
  };

  patients.push(patient);
  return patient;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addEntry,
  findById
};