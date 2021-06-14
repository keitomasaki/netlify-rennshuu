import { createSelector } from "reselect";

const usersSelector = (state) => state.products;

export const getText = createSelector([usersSelector], (state) => state.text);

export const getResult = createSelector(
  [usersSelector],
  (state) => state.result
);
