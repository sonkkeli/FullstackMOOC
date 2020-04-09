import { v4 as uuidv4 } from 'uuid';
import patientData from '../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient, Entry, HealthCheck } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id, name, dateOfBirth, gender, occupation, entries
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

const addNewEntryForPatient = ( id: string, entry: Omit<Entry, "id" | "date"> ) => {
  const patientToBeUpdated = findById(id);
  const newEntry = {    
    id: uuidv4(),
    date: new Date().toISOString().slice(0,10),
    ...entry
  }

  if(patientToBeUpdated){
    const newPatient = {
      ...patientToBeUpdated,
      entries: patientToBeUpdated.entries.concat(newEntry)
    }
    for (var i = 0; i<patients.length; i++){
      if(patients[i].id == id){
        patients[i] = newPatient;
      }
    }
    return newPatient
  } else {
    throw new Error('Adding new entry for patient failed.')
  }
};

export default {
  getPatients,
  getNonSensitivePatients,
  addEntry,
  addNewEntryForPatient,
  findById
};