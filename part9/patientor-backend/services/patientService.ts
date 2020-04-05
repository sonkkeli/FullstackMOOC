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
    ...entry
  };

  patients.push(patient);
  return patient;
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const entry = patients.find(d => d.id === id);
  if (entry) {
    return {
      id:entry.id, 
      name: entry.name, 
      dateOfBirth: entry.dateOfBirth, 
      gender: entry.gender, 
      occupation: entry.occupation
    };
  }
  return entry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addEntry,
  findById
};