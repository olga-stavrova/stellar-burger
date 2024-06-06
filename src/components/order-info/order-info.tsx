import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

import { useParams } from 'react-router-dom';
import { selectAllIngredients } from '../../services/selectors/ingredients-selector';
import { selectUserOrders } from '../../services/selectors/order-selector';
//import { selectFeedsOrders } from '../../services/selectors/feeds-selector';
import { useSelector, useDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  /*
  const orderData = {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  };
  */
  const { selectedId } = useParams();

  //const orders: TOrder[] = useSelector(selectFeedsOrders);
  const orders = useSelector(selectUserOrders);

  const orderData = orders?.find(
    (order: TOrder) => order.number.toString() === selectedId
  );

  console.log('OrderInfo:', selectedId, orderData, orders);

  //const ingredients: TIngredient[] = [];
  const ingredients: TIngredient[] = useSelector(selectAllIngredients);

  /* Готовим данные для отображения */
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
