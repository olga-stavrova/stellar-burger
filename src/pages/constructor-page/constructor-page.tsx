import styles from './constructor-page.module.css';
import { FC, useEffect } from 'react';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';

import {
  selectIngredientsLoading,
  selectIngredientsLoaded
} from '../../services/selectors/ingredients-selector';
import { fetchIngredients } from '../../services/slices/ingredients-slice';

import { useSelector, useDispatch } from '../../services/store';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  //const isIngredientsLoading = false;

  const isIngredientsLoading = useSelector(selectIngredientsLoading);

  const loaded = useSelector(selectIngredientsLoaded);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loaded) {
      dispatch(fetchIngredients());
    }
  }, [loaded, dispatch]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
