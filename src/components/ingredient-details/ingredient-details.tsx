import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';

import { TIngredient } from '@utils-types';
import {
  selectAllIngredients,
  selectIngredientsLoaded
} from '../../services/selectors/ingredients-selector';
import { fetchIngredients } from '../../services/slices/ingredients-slice';

import { useSelector, useDispatch } from '../../services/store';

export const IngredientDetails: FC = () => {
  const ingredients: TIngredient[] = useSelector(selectAllIngredients);
  const areIngredientsLoaded = useSelector(selectIngredientsLoaded);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!areIngredientsLoaded) {
      dispatch(fetchIngredients());
    }
  }, [areIngredientsLoaded, dispatch]);

  const { selectedId } = useParams();

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === selectedId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
