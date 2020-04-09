import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('Fetching patients...');
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  console.log('Saving a patient!');

  try {
    const newPatient = utils.toNewPatient(req.body);
    const addedPatient = patientService.addEntry(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message); 
  }  
});

router.post('/:id/entries', (req, res) => {
  console.log('Saving an entry for a patient!');

  try {
    const updatedPatient = patientService.addNewEntryForPatient(req.params.id, req.body);
    res.json(updatedPatient);
  } catch (e) {
    res.status(400).send(e.message); 
  }
});

export default router;