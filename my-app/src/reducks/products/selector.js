import { createSelector } from "reselect";

const usersSelector = (state) => state.products;

export const getResult = createSelector(
  [usersSelector],
  (state) => state.result
);
