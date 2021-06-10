import * as Actions from "./actions";
import { initialState } from "../store/initialState";
import { moneyToChar } from "./operation";

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.MONEY_TO_CHAR:
      const newResult = moneyToChar(action.payload);
      return {
        ...state,
        result: newResult,
      };
    default:
      return state;
  }
};
