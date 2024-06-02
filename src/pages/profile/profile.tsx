import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { selectGetUser } from '../../services/selectors/user-selector';
import { updateUser } from '../../services/slices/user-slice';
import { useSelector, useDispatch } from '../../services/store';
import { TUser } from '@utils-types';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  /*
  const user = {
    name: useSelector(selectUserName),
    email: useSelector(selectUserEmail)
  };
  */
  const storeUser = useSelector(selectGetUser);
  const user: TUser = storeUser ? storeUser : { name: '', email: '' };
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({ ...user, password: '' });
  /*
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);
*/
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      ...user
    }));
  }, []);
  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUser({
        name: formValue.name ? formValue.name : '',
        email: formValue.email ? formValue.email : '',
        password: formValue.password
      })
    );
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      ...user,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  /**/
  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
  /*
  return (
    <ProfileUI
      formValue={{
        name: formValue.name ? formValue.name : '',
        email: formValue.email ? formValue.email : '',
        password: formValue.password
      }}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
  return null;
  */
};
