import '../../index.css';
import styles from './app.module.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../services/store';

import { AppHeader } from '@components';
import { ConstructorPage, ProfileOrders } from '@pages';
import { Login } from '@pages';
import { Register } from '@pages';
import { Profile } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Feed } from '@pages';
import { OrderInfo } from '../order-info/order-info';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { NotFound404 } from '@pages';
import { ModalLayout } from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';

const App1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation =
    location.state && location.state.backgroundLocation;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <ConstructorPage />
              <Outlet />
            </>
          }
        />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path='/feed/:selectedId'
          element={
            <ModalLayout
              title=''
              onClose={() => navigate(backgroundLocation || '/feed')}
            >
              <OrderInfo />
            </ModalLayout>
          }
        />

        <Route
          path='/ingredients/:selectedId'
          element={
            <ModalLayout
              title=''
              onClose={() => navigate(backgroundLocation || '/')}
            >
              <IngredientDetails />
            </ModalLayout>
          }
        />

        <Route
          path='/profile/orders/:selectedId'
          element={
            <ProtectedRoute>
              <ModalLayout
                title=''
                onClose={() =>
                  navigate(backgroundLocation || '/profile/orders')
                }
              >
                <OrderInfo />
              </ModalLayout>
            </ProtectedRoute>
          }
        />

        <Route path='/*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <App1 />
    </Provider>
  </BrowserRouter>
);

export default App;
