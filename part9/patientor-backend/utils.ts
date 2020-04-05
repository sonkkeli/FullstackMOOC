import { NewPatient, Gender } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseString = (text: any): string => {
  if(!text || !isString(text)){
    throw new Error('Incorrect input value' + text);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing birth date: ' + date);
  }
  return date;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  } 
  return gender;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation)
  };
  
  return newEntry;
};

export default {
  toNewPatient
};