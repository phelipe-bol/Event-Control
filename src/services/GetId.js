export const GetId = () => {
  const RandomNumber1 = Math.floor(Math.random() * 16777215).toString(36);
  const RandomNumber2 = Math.floor(Math.random() * 16777215).toString(36);
  const RandomNumber3 = Math.floor(Math.random() * 16777215).toString(36);
  const RandomNumber4 = Math.floor(Math.random() * 16777215).toString(36);

  const RandomNumber =
    RandomNumber1 +
    '-' +
    RandomNumber2 +
    '-' +
    RandomNumber3 +
    '-' +
    RandomNumber4;

  return RandomNumber.toUpperCase();
};
