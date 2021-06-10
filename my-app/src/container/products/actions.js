export const MONEY_TO_CHAR = "MONEY_TO_CHAR";
export const moneyToCharAction = (num) => {
  return {
    type: MONEY_TO_CHAR,
    payload: num,
  };
};
