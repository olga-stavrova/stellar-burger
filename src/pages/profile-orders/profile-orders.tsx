import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  selectUserOrders,
  selectUserOrdersLoading
} from '../../services/selectors/order-selector';

import { getUserOrders } from '../../services/slices/order-slice';

import { useSelector, useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  //const orders: TOrder[] = [];

  const orders = useSelector(selectUserOrders);
  const ordersLoading = useSelector(selectUserOrdersLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    //if (!ordersLoading) {
    dispatch(getUserOrders());
    //}
    //}, [ordersLoading, dispatch]);
    //}, [orders, dispatch]);
  }, []);

  return <ProfileOrdersUI orders={orders ? orders : []} />;
};
