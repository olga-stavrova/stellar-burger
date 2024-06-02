import { RootState } from '../../services/store';
import { createSelector } from '@reduxjs/toolkit';

const selectIngredientsState = (state: RootState) => state.ingredients;
export const selectAllIngredients = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.items
);

export const selectIngredientsLoading = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.loading
);
export const selectIngredientsLoaded = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.loaded
);

export const selectIngredientsError = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.error
);
