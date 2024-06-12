import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import {
  selectGetUser,
  selectIsAuthChecked
} from '../../services/selectors/user-selector';
import { getUser } from '../../services/slices/user-slice';

import { useSelector, useDispatch } from '../../services/store';
export const AppHeader: FC = () => {
  const user = useSelector(selectGetUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(getUser());
    }
  }, [isAuthChecked, dispatch]);

  return <AppHeaderUI userName={user ? user.name : ''} />;
};
