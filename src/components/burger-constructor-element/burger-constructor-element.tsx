import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

import { orderSlice } from '../../services/slices/order-slice';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const { moveItem, removeItem } = orderSlice.actions;
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(moveItem({ from: index, to: index + 1 }));
    };
    const handleMoveUp = () => {
      dispatch(moveItem({ from: index, to: index - 1 }));
    };
    const handleClose = () => {
      dispatch(removeItem({ ingredient }));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
