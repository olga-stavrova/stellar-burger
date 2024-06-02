import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/slices/user-slice';
import {
  selectGetUser,
  selectUserLoading,
  selectUserError
} from '../../services/selectors/user-selector';
import { getUser } from '../../services/slices/user-slice';
import { useSelector, useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  /*
  const user = useSelector(selectGetUser);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  */
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser()).then(() => navigate('/login', { replace: true }));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
