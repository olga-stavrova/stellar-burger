import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

import { orderSlice } from '../../services/slices/order-slice';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const { addItem, removeItem, setBun } = orderSlice.actions;
    const dispatch = useDispatch();
    const handleAddItem = () => {
      dispatch(addItem(ingredient));
    };
    //const handleAdd = () => {};

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAddItem}
      />
    );
  }
);
