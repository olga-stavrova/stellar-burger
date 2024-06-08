import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

import { useParams, useLocation } from 'react-router-dom';
import {
  selectAllIngredients,
  selectIngredientsLoaded
} from '../../services/selectors/ingredients-selector';
import { selectFeedsOrders } from '../../services/selectors/feeds-selector';
import { selectUserOrders } from '../../services/selectors/order-selector';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { getUserOrders } from '../../services/slices/order-slice';
import { fetchFeeds } from '../../services/slices/feeds-slice';
import { useSelector, useDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const { selectedId } = useParams();
  const location = useLocation();
  const userOrders = useSelector(selectUserOrders);
  const feedOrders: TOrder[] = useSelector(selectFeedsOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  const orders = location.pathname.startsWith('/profile/orders')
    ? userOrders
    : feedOrders;

  const orderData = orders?.find(
    (order: TOrder) => order.number.toString() === selectedId
  );

  const ingredients: TIngredient[] = useSelector(selectAllIngredients);
  const areIngredientsLoaded = useSelector(selectIngredientsLoaded);

  useEffect(() => {
    if (!areIngredientsLoaded) {
      dispatch(fetchIngredients());
    }
  }, [areIngredientsLoaded, dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
