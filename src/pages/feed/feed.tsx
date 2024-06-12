import { Preloader } from '@ui';
import { useEffect } from 'react';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

import { useSelector, useDispatch } from '../../services/store';
import {
  selectIngredientsLoading,
  selectIngredientsLoaded
} from '../../services/selectors/ingredients-selector';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import {
  selectFeedsOrders,
  selectFeedsLoading
} from '../../services/selectors/feeds-selector';
import { fetchFeeds } from '../../services/slices/feeds-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeedsOrders);
  const isIngredientsLoading = useSelector(selectIngredientsLoading);

  const loaded = useSelector(selectIngredientsLoaded);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchIngredients());
    }
  }, [loaded, dispatch]);

  const isFeedsLoading = useSelector(selectFeedsLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }
  if (isFeedsLoading) {
    return <Preloader />;
  }
  if (isIngredientsLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
