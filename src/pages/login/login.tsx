import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUser, getUser } from '../../services/slices/user-slice';
import { selectUserErrorMessage } from '../../services/selectors/user-selector';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = useSelector(selectUserErrorMessage);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then(() => {
      dispatch(getUser()).then(() => {
        navigate((location.state && location.state.from.pathname) || '/', {
          replace: true
        });
      });
    });
  };

  return (
    <LoginUI
      errorText={errorMessage ? errorMessage : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
