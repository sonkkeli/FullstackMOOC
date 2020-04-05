import React from "react";
import axios from "axios";
import { Container, Header, Icon } from "semantic-ui-react";
import { Patient, Gender, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, selectPatient } from "../state";

const PatientInfoPage: React.FC<{id:string}> = ({id}) => {
  const [{ selected }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const { data: patientDataFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(selectPatient(patientDataFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if(!selected || (selected && selected.id !== id)){
      fetchPatientData();
    }    
  }, [dispatch]);

  const chooseIcon = ( gender: Gender ) => {
    switch (gender){
      case 'female':
        return <Icon name='venus'></Icon>
      case 'male':
        return <Icon name='mars'></Icon>
      case 'other':
        return <Icon name='genderless'></Icon>
    }
  }

  const EntryComp: React.FC<{entry: Entry}> = ({ entry }) => {
    return <React.Fragment>
      <p>{entry.date} - {entry.description}</p>
      {entry.diagnosisCodes ? entry.diagnosisCodes.map(d => <div key={`code-${d}`}>- {d} </div>) : null}
      </React.Fragment>
  }

  return selected ? (
    <div className="App">
      <Container>
        <Header as="h1">{selected.name}{chooseIcon(selected.gender)}</Header>
        <React.Fragment>
          <p>Birth date: {selected.dateOfBirth}</p>
          <p>SSN: {selected.ssn}</p>
          <p>Occupation: {selected.occupation}</p>
          <Header as="h3">Entries:</Header>
          {selected.entries.map(e => <EntryComp key={`entry-${e.id}`} entry={e}/>)}
        </React.Fragment>       
      </Container>
    </div>
    ) : <span/>  
};

export default PatientInfoPage;