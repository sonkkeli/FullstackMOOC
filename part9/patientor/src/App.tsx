import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnoseList } from "./state";
import { Patient, Diagnose } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfoPage from './PatientInfoPage';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };    

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnoseListFromApi } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoseList(diagnoseListFromApi));
      } catch (e) {
        console.error(e);
      }
    }

    fetchPatientList();
    fetchDiagnosisList()
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route exact path="/" render={() => <PatientListPage />} />
            <Route exact path="/patients/:id" render={({match}) => <PatientInfoPage id={match.params.id}/>} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
