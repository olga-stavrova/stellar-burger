import ingredientsReducer, {
  ingredientsSlice,
  fetchIngredients
} from '../services/slices/ingredients-slice';
import { TIngredient } from '../utils/types';

const initialIngredientsState = ingredientsSlice.getInitialState();

describe('ingredientsSlice reducer', () => {
  it('должен обрабатывать fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialIngredientsState, action);
    expect(state).toEqual({
      ...initialIngredientsState,
      loading: true,
      loaded: false
    });
  });

  it('должен обрабатывать fetchIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      }
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialIngredientsState, action);
    expect(state).toEqual({
      ...initialIngredientsState,
      items: mockIngredients,
      loading: false,
      loaded: true,
      error: null
    });
  });

  it('должен обрабатывать fetchIngredients.rejected', () => {
    const errorAction = {
      type: fetchIngredients.rejected.type,
      payload: 'Error message'
    };
    const state = ingredientsReducer(initialIngredientsState, errorAction);
    expect(state).toEqual({
      ...initialIngredientsState,
      error: 'Error message',
      loading: false,
      loaded: false
    });
  });
});
