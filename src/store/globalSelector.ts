import { createSelector } from "reselect";

export const globalSelector = (state: any) => state.global;

export const mainSelector = (state: any) => state;

export const userIdSelector = createSelector(
  globalSelector,
  (global) => global.userId
);

export const roleSelector = createSelector(
  globalSelector,
  (global) => global.role
);

export const usernameSelector = createSelector(
  globalSelector,
  (global) => global.username
);

export const validFieldSelector = createSelector(
  globalSelector,
  (global) => global.validFields
);

export const allLoadingSelector = createSelector(mainSelector, (state) => {
  const keys = Object.keys(state);
  const loading = keys.reduce((prev, curr) => {
    const currentLoading = state[curr].loading;
    if (currentLoading === undefined) {
      return prev;
    }
    return prev || state[curr].loading;
  }, false);
  return loading;
});
