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
  var trainings = 0;
  var hours = 0;
  for (var i = 0; i< exercises.length; i++){
    if(exercises[i]){
      hours += exercises[i]
      trainings++
    }    
  }
  
  var average = hours / exercises.length

  var percentage = average / target
  var rating = 1
  var explanation = 'Oisit nyt edes yrittänyt...'
  if ( percentage > 0.5 && percentage < 1) {
    rating = 2
    explanation = "Melkein, ens kerralla sit onnistuu..."
  } else if (percentage >= 1) {
    rating = 3
    explanation = "Hienosti urheiltu!! Noin ne absit kasvaa."
  }

  return {
    nroOfDays: exercises.length,
    nroOfTrainingDays: trainings,
    target: target,
    average: average,
    isReached: average > target,
    rating: rating,
    explanation: explanation,
  }
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 3],2))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}