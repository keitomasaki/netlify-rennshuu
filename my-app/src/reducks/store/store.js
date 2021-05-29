import { createStore as reduxCreateStore, combineReducers } from "redux";
import { ProductsReducer } from "../products/reducer";

export default function createStore() {
  return reduxCreateStore(
    //オリジナル createStore の別名
    combineReducers({
      products: ProductsReducer,
    })
  );
}
