export const MONEY_TO_CHAR = "MONEY_TO_CHAR";
export const SET_TEXT = "SET_TEXT";

export const moneyToCharAction = (num) => {
  return {
    type: MONEY_TO_CHAR,
    payload: num,
  };
};

export const setTextAction = (text) => {
  return {
    type: SET_TEXT,
    payload: text,
  };
};
