import { FC, useMemo } from 'react';
import { useEffect } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { selectAllIngredients } from '../../services/selectors/ingredients-selector';
import { selectOrderItems } from '../../services/selectors/order-selector';

import { orderSlice } from '../../services/slices/order-slice';

import { useSelector, useDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  /*
  const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };
  */

  const allIngredients = useSelector(selectAllIngredients);
  console.log('BurgerConstructor:', allIngredients);

  const orderItems = useSelector(selectOrderItems);

  const dispatch = useDispatch();
  const { addItem, removeItem, setBun } = orderSlice.actions;

  /*
  if (!orderItems.bun) {
    const firstBun = allIngredients.find((obj) => obj.type === 'bun');
    dispatch(setBun(firstBun));
  }
  if (orderItems.items.length === 0) {
    const firstMain = allIngredients.find((obj) => obj.type === 'main');
    dispatch(addItem(firstMain));
  }
  /*
  const constructorItems = {
    bun: orderItems.bun,
    ingredients: orderItems.items
  };
*/

  const constructorItems = {
    bun: orderItems.bun ? orderItems.bun : { price: 0 },
    ingredients: orderItems.items
  };
  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};
  /*
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
*/
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient | undefined) =>
          s + (v && v.price ? v.price : 0),
        0
      ),
    [constructorItems]
  );

  //return null;
  console.log('BurgerConstructor:', constructorItems);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
