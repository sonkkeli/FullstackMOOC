export const calculateBmi = (pituusCm: number, paino: number): string => {
  const pituusM = pituusCm / 100;
  const bmi = (paino) / (pituusM * pituusM);

  if(bmi <= 15){
    return 'Very severely underweight';
  } else if(bmi <= 16){
    return 'Severely underweight';
  } else if(bmi <= 18.5){
    return 'Underweight';
  } else if(bmi <= 25){
    return 'Normal (healthy weight)';
  } else if(bmi <= 30){
    return 'Overweight';
  } else if(bmi <= 35){
    return 'Obese Class I (Moderately obese)';
  } else if(bmi <= 40){
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)';
  }
};

interface InputsBMI {
  pituusCm: number;
  paino: number;
}

const parseArgsBMI = (args: Array<string>): InputsBMI => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      pituusCm: Number(args[2]),
      paino: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { pituusCm, paino } = parseArgsBMI(process.argv);
  console.log(calculateBmi(pituusCm, paino));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}