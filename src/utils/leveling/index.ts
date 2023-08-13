export const calculateValue = (level: number): number => 100 * level || 1;

export const getRandomXp = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
