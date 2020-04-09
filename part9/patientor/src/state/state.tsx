import React, { createContext, useContext, useReducer } from "react";
import { Patient, Entry, Diagnose } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [id: string]: Diagnose };
  selected: Patient | null;
};

const initialState: State = {
  patients: {},
  diagnoses: {},
  selected: null
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

/**
 * Action creator function for setting patient list
 * @param patientList 
 */
export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  }
}

/**
 * Action creator function for setting diagnoses list
 * @param diagnoseList 
 */
export const setDiagnoseList = (diagnoseList: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSE_LIST",
    payload: diagnoseList
  }
}

/**
 * Action creator function for adding patient
 * @param patient 
 */
export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  }
}

/**
 * Action creator function for selecting patient / opening patient details
 * @param patientData 
 */
export const selectPatient = (patientData: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patientData
  }
}

/**
 * Action creator function for updating patient by adding new entry
 * @param entryData 
 */
export const addEntry = (entryData: Entry, id: string): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: { patientId: id, entry: entryData }
  }
}