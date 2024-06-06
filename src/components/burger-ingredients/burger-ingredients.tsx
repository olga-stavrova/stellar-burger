import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';

import {
  selectAllIngredients,
  selectIngredientsLoading,
  selectIngredientsLoaded
} from '../../services/selectors/ingredients-selector';
import { fetchIngredients } from '../../services/slices/ingredients-slice';

import { useSelector, useDispatch } from '../../services/store';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  //const buns: TIngredient[] = [];
  //const mains: TIngredient[] = [];
  //const sauces: TIngredient[] = [];

  const ingredients: TIngredient[] = useSelector(selectAllIngredients);
  const areIngredientsLoaded = useSelector(selectIngredientsLoaded);
  //const error = useSelector(selectFeedsError);
  /**/
  const dispatch = useDispatch();
  useEffect(() => {
    if (!areIngredientsLoaded) {
      dispatch(fetchIngredients());
    }
  }, [areIngredientsLoaded, dispatch]);
  /**/
  //console.log('BurgerIngredients:', ingredients);
  const buns: TIngredient[] = ingredients.filter(
    (item: TIngredient) => item.type === 'bun'
  );
  const mains: TIngredient[] = ingredients.filter(
    (item: TIngredient) => item.type === 'main'
  );
  const sauces: TIngredient[] = ingredients.filter(
    (item: TIngredient) => item.type === 'sauce'
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  //return null;

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
