import patientData from '../data/patients.json'
import { Patient, NonSensitivePatient } from '../types'

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = () : Patient[] => {
  return patients
}

const getNonSensitivePatients = () : NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }))
}

const addEntry = () => {
  return null
}

export default {
  getPatients,
  getNonSensitivePatients,
  addEntry
};