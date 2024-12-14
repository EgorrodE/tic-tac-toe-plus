import cloneDeep from 'lodash/cloneDeep';

const initValue = 0;
const crossValue = 1;
const circleValue = 2;
const fieldsCount = 3;
const initRow = new Array(fieldsCount).fill(initValue);
const initGameValues = new Array(fieldsCount).fill().map(() => cloneDeep(initRow));
const initGamesRow = new Array(fieldsCount).fill().map(() => ({ values: cloneDeep(initGameValues), globalValue: initValue }));
const initGames = new Array(fieldsCount).fill().map(() => cloneDeep(initGamesRow));

const winGames = [
  // each row
  0b000000111,
  0b000111000,
  0b111000000,
  // each column
  0b100100100,
  0b010010010,
  0b001001001,
  // each diagonal
  0b100010001,
  0b001010100,
];

export {
  initValue,
  crossValue,
  circleValue,
  initGameValues,
  initGamesRow,
  initGames,
  fieldsCount,
  winGames,
};