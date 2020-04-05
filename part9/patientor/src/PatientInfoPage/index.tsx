import React from "react";
import axios from "axios";
import { Container, Header, Icon } from "semantic-ui-react";
import { Patient, Gender } from "../types";
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

  return selected ? (
    <div className="App">
      <Container>
        <Header as="h1">{selected.name}{chooseIcon(selected.gender)}</Header>
        <React.Fragment>
          <p>Birth date: {selected.dateOfBirth}</p>
          <p>SSN: {selected.ssn}</p>
          <p>Occupation: {selected.occupation}</p>
          <p>Entries: {selected.entries.map(e => <span>{e}</span>)}</p>
        </React.Fragment>       
      </Container>
    </div>
    ) : <span/>  
};

export default PatientInfoPage;