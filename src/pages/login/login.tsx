import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUser, getUser } from '../../services/slices/user-slice';
import { selectUserErrorMessage } from '../../services/selectors/user-selector';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector(selectUserErrorMessage);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then(() => {
      dispatch(getUser()).then(() => {
        navigate(-1);
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
