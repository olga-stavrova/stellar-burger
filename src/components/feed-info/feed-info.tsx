import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

//import { RootState, AppDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchFeeds } from '../../services/slices/feeds-slice';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectFeedsOrders,
  selectFeedsLoaded,
  selectFeedsTotal,
  selectFeedsTotalToday
} from '../../services/selectors/feeds-selector';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  //const orders: TOrder[] = [];
  const feed = {
    total: useSelector(selectFeedsTotal),
    totalToday: useSelector(selectFeedsTotalToday)
  };
  const orders: TOrder[] = useSelector(selectFeedsOrders);
  const loaded = useSelector(selectFeedsLoaded);
  //const error = useSelector(selectFeedsError);
  /** */
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loaded) {
      dispatch(fetchFeeds());
    }
  }, [loaded, dispatch]);
  /**/
  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
