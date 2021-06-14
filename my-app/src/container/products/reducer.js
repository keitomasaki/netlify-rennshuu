import * as Actions from "./actions";
import { initialState } from "../store/initialState";
import { moneyToChar } from "./operation";

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.SET_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    case Actions.MONEY_TO_CHAR:
      let newResult = moneyToChar(action.payload);
      let ret = null;
      if (newResult === "正常に変換することができませんでした") {
        ret = {
          ...state,
          text: "",
          result: newResult,
        };
      } else {
        ret = {
          ...state,
          result: newResult,
        };
      }
      return ret;
    default:
      return state;
  }
};
