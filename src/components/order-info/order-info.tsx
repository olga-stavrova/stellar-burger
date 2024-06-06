import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

import { useParams } from 'react-router-dom';
import { selectAllIngredients } from '../../services/selectors/ingredients-selector';
import { selectFeedsOrders } from '../../services/selectors/feeds-selector';
import { selectFeedsLoaded } from '../../services/selectors/feeds-selector';
import { fetchFeeds } from '../../services/slices/feeds-slice';
import { useSelector, useDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const { selectedId } = useParams();
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectFeedsOrders);

  const areFeedsLoaded = useSelector(selectFeedsLoaded);
  useEffect(() => {
    if (!areFeedsLoaded) {
      dispatch(fetchFeeds());
    }
  }, [areFeedsLoaded, dispatch]);

  const orderData = orders?.find(
    (order: TOrder) => order.number.toString() === selectedId
  );

  const ingredients: TIngredient[] = useSelector(selectAllIngredients);

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
