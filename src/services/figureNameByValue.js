import { crossValue, circleValue } from '../data/constants';

const figureNameByValue = (value) => {
  if (value === crossValue) return 'cross';
  if (value === circleValue) return 'circle';
  return '';
}

export default figureNameByValue;