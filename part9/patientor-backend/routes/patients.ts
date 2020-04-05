import express from 'express';
import patientService from '../services/patientService'

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('Fetching patients...')
  res.send(patientService.getNonSensitivePatients());
})

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
})

export default router;