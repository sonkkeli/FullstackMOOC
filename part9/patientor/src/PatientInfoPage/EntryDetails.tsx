import React from "react";
import { Entry } from "../types";
import { assertNever } from '../utils';
import { useStateValue } from "../state";
import { Header, Icon } from "semantic-ui-react";

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const Generals: React.FC<{entry: Entry, iconName: 'heartbeat'|'hospital'| 'computer'}> = ({ entry, iconName }) => {
    return (
      <React.Fragment>
        <Header as="h3">{entry.date} <Icon name={iconName}></Icon></Header>
        <p>{entry.description}</p>
        { entry.diagnosisCodes 
          ? entry.diagnosisCodes.map(d => {
            return <div key={`code-${d}`}>- {d}: {diagnoses[d].name}</div>
          }) 
          : null
        }
      </React.Fragment>
    )
  }

  switch (entry.type){
    case 'HealthCheck':
      return (
        <div className="entry-tile">
          <Generals entry={entry} iconName={'heartbeat'}/>
          <p><Icon name='heart outline'></Icon>: {entry.healthCheckRating}</p>
        </div>
      )
    case 'OccupationalHealthcare':
      return (
        <div className="entry-tile">
          <Generals entry={entry} iconName={'computer'}/>
          {entry.sickLeave ? <p><br/>Sickleave: <br/>from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>: null}
        </div>
      )
    case 'Hospital':
      return (
        <div className="entry-tile">
          <Generals entry={entry} iconName={'hospital'}/>
          {entry.discharge ? <p><br/>Discharge: <br/>{entry.discharge.date}: {entry.discharge.criteria}</p>: null}
        </div>
      )
    default:
      return assertNever(entry);
  }
}

export default EntryDetails;