import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { selectUserOrders } from '../../services/selectors/order-selector';
import { getUserOrders } from '../../services/slices/order-slice';
import { useSelector, useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectUserOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders ? orders : []} />;
};
