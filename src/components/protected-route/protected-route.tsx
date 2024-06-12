import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectGetUser,
  selectUserLoading,
  selectIsAuthChecked
} from '../../services/selectors/user-selector';
import { getUser } from '../../services/slices/user-slice';

import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};
export function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const location = useLocation();

  const dispatch = useDispatch();
  const user = useSelector(selectGetUser);
  const isLoading = useSelector(selectUserLoading);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  useEffect(() => {
    dispatch(getUser());
  }, [isAuthChecked, dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.backgroundLocation || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            backgroundLocation: location.state?.backgroundLocation
          }
        }}
      />
    );
  }

  return children;
}
