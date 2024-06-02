import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { selectGetUser } from '../../services/selectors/user-selector';
import { getUser } from '../../services/slices/user-slice';

import { useSelector, useDispatch } from '../../services/store';
export const AppHeader: FC = () => {
  /*
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  */
  const user = useSelector(selectGetUser);
  console.log('AppHeader:', user);
  return <AppHeaderUI userName={user ? user.name : ''} />;
};
