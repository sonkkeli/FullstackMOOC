import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const input = req.body;
  if(!input.daily_exercises || !input.target){
    res.status(500).json({ error: 'parameters missing' });
    return;
  }
  if(isNaN(Number(input.target)) || !Array.isArray(input.daily_exercises)) {
    res.status(500).json({ error: 'malformatted parameters' });
    return;
  }
  for(let i = 0; i < input.daily_exercises.length; i++){
    if(isNaN(Number(input.daily_exercises[i]))){
      res.status(500).json({ error: 'malformatted parameters' });
      return;
    }
  }

  res.send(calculateExercises(input.daily_exercises, input.target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});