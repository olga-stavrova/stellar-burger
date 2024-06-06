import { FC, useMemo } from 'react';
import { useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  selectOrderItems,
  selectOrderData,
  selectUserOrderRequest
} from '../../services/selectors/order-selector';
import {
  selectIsAuthChecked,
  selectGetUser
} from '../../services/selectors/user-selector';
import { orderSlice, addUserOrder } from '../../services/slices/order-slice';
import { getUser } from '../../services/slices/user-slice';

import { useSelector, useDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { resetOrderData } = orderSlice.actions;

  const user = useSelector(selectGetUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  const orderItems = useSelector(selectOrderItems);

  useEffect(() => {
    dispatch(getUser());
  }, [isAuthChecked, dispatch]);

  const constructorItems = {
    bun: orderItems.bun ? orderItems.bun : { price: 0 },
    ingredients: orderItems.items
  };

  const orderRequest = useSelector(selectUserOrderRequest);

  const orderModalData = useSelector(selectOrderData);

  const onOrderClick = () => {
    if (constructorItems.bun.price === 0 || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true, state: { from: location } });
    } else {
      const burgerItems = orderItems.items.map((x) => x._id) as string[];
      orderItems.bun && burgerItems.push(orderItems.bun?._id as string);
      orderItems.bun && burgerItems.push(orderItems.bun?._id as string);
      dispatch(addUserOrder(burgerItems));
    }
  };

  const closeOrderModal = () => {
    orderModalData && dispatch(resetOrderData(orderModalData));
  };

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
