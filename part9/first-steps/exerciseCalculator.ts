interface TrainingData {
  nroOfDays: number;
  nroOfTrainingDays: number;
  target: number;
  average: number;
  isReached: boolean;
  rating: number;
  explanation: string;
} 

const calculateExercises = (exercises: Array<number>, target: number): TrainingData => {
  let trainings = 0;
  let hours = 0;
  for (let i = 0; i< exercises.length; i++){
    if(exercises[i]){
      hours += exercises[i];
      trainings++;
    }
  }
  
  const average = hours / exercises.length;
  const percentage = average / target;

  let rating = 1;
  let explanation = 'Oisit nyt edes yrittänyt...';
  if ( percentage > 0.5 && percentage < 1) {
    rating = 2;
    explanation = "Melkein, ens kerralla sit onnistuu...";
  } else if (percentage >= 1) {
    rating = 3;
    explanation = "Hienosti urheiltu!! Noin ne absit kasvaa.";
  }

  return {
    nroOfDays: exercises.length,
    nroOfTrainingDays: trainings,
    target: target,
    average: average,
    isReached: average > target,
    rating: rating,
    explanation: explanation,
  };
};

interface Inputs {
  exercises: Array<number>;
  target: number;
}

const parseArgs = (args: Array<string>): Inputs => {
  const exercises = [];
  for (let i = 2; i<args.length; i++){
    if( isNaN( Number( args[i] ) ) ) {
      throw new Error('Provided values were not numbers!');
    } else {
      if (i !== args.length-1){
        exercises.push(Number(args[i]));
      }      
    }
  }
  
  return {
    exercises: exercises,
    target: Number(args[args.length-1])
  };
};

try {
  const { exercises, target } = parseArgs(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}