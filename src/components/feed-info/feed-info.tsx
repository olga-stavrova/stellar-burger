import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

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
  /*
  const feedsLoaded = useSelector(selectFeedsLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!feedsLoaded) {
      console.log('fetching feeds...');
      dispatch(fetchFeeds());
    }
  }, [feedsLoaded, dispatch]);
*/
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
