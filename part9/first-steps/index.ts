import express from 'express';
import {calculateBmi} from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(500);
    res.json({ error: 'Hey dont do that bro' });
    return;
  } 
  res.json({
    height: height,
    weight: weight,
    bmi: calculateBmi(height, weight)
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});