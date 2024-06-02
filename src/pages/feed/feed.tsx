import { Preloader } from '@ui';
import { useEffect } from 'react';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
//import { getFeedsApi } from '../../utils/burger-api';

//import { TOrdersData } from '@utils-types';
//import { useDispatch, useSelector } from 'react-redux';
import { fetchFeeds } from '../../services/slices/feeds-slice';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectFeedsOrders,
  selectFeedsLoading,
  selectFeedsLoaded,
  selectFeedsError
} from '../../services/selectors/feeds-selector';
export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  //const orders: TOrder[] = [];

  const orders: TOrder[] = useSelector(selectFeedsOrders);
  //const total = feeds.total;
  //const totalToday = feeds.totalToday;
  const loading = useSelector(selectFeedsLoading);
  const loaded = useSelector(selectFeedsLoaded);
  //const error = useSelector(selectFeedsError);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loaded) {
      dispatch(fetchFeeds());
    }
  }, [loaded, dispatch]);

  console.log('Feed:', orders);

  if (!orders.length) {
    return <Preloader />;
  }
  if (loading) {
    return <Preloader />;
  }
  //<FeedUI orders={orders} handleGetFeeds={() => {}} />;

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
