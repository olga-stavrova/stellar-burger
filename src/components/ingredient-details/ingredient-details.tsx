import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';

import { TIngredient } from '@utils-types';
import { selectAllIngredients } from '../../services/selectors/ingredients-selector';

import { useSelector } from '../../services/store';
export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  //const ingredientData = null;
  const ingredients: TIngredient[] = useSelector(selectAllIngredients);

  const { selectedId } = useParams();

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === selectedId
  );

  //console.log('IngredientDetails:', selectedId, ingredientData, ingredients);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
