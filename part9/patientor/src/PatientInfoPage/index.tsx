import React from "react";
import axios from "axios";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import { Patient, Gender, Entry } from "../types";
import EntryDetails from './EntryDetails'
import { apiBaseUrl } from "../constants";
import { useStateValue, selectPatient, addEntry } from "../state";
import AddEntryModal from '../AddEntryModal/index'
import { EntryFormValues } from '../AddEntryModal/AddEntryForm'

const PatientInfoPage: React.FC<{id:string}> = ({id}) => {
  const [{ selected }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      var id = selected ? selected.id : '';
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      fetchPatientData();
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  React.useEffect(() => {    
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
          <Header as="h3">Entries:</Header>
          {selected.entries.map(e => <EntryDetails key={`entry-${e.id}`} entry={e}/>)}
        </React.Fragment>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add new entry</Button>
      </Container>
    </div>
    ) : <span/>  
};

export default PatientInfoPage;