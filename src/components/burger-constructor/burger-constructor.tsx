import { FC, useMemo } from 'react';
import { useEffect } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';

import { selectAllIngredients } from '../../services/selectors/ingredients-selector';
import {
  selectOrderItems,
  selectOrderData,
  selectUserOrderRequest
} from '../../services/selectors/order-selector';
import {
  selectIsAuthChecked,
  selectGetUser
} from '../../services/selectors/user-selector';
import {
  orderSlice,
  getUserOrders,
  addUserOrder
} from '../../services/slices/order-slice';
import { getUser } from '../../services/slices/user-slice';

import { useSelector, useDispatch } from '../../services/store';
//import { error } from 'console';

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
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { resetOrderData } = orderSlice.actions;

  const user = useSelector(selectGetUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  const orderItems = useSelector(selectOrderItems);

  console.log('BurgerConstructor: user', user);

  useEffect(() => {
    dispatch(getUser());
  }, [isAuthChecked, dispatch]);
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

  //const orderRequest = false;
  const orderRequest = useSelector(selectUserOrderRequest);

  //const orderModalData = null;
  const orderModalData = useSelector(selectOrderData);

  const onOrderClick = () => {
    //if (!constructorItems.bun || orderRequest) return;
    if (constructorItems.bun.price === 0 || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true, state: { from: location } });
    } else {
      const burgerItems = orderItems.items.map((x) => x._id) as string[];
      orderItems.bun && burgerItems.push(orderItems.bun?._id as string);
      orderItems.bun && burgerItems.push(orderItems.bun?._id as string);
      console.log(
        'BurgerConstructor:onOrderClick',
        burgerItems,
        user,
        orderRequest
      );
      dispatch(addUserOrder(burgerItems));
    }
  };

  const closeOrderModal = () => {
    console.log('BurgerConstructor:closeOrderModal', orderModalData);
    orderModalData && dispatch(resetOrderData(orderModalData));
  };
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
