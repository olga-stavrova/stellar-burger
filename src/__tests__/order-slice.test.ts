// тесты order-slice
import {
  orderSlice,
  getUserOrders,
  getOrderByNumber,
  addUserOrder
} from '../services/slices/order-slice';
import { TConstructorIngredient } from '../utils/types';
import { configureStore } from '@reduxjs/toolkit';

const { moveItem, removeItem, addItem, resetOrderData } = orderSlice.actions;

const initialState = orderSlice.getInitialState();

// Настройка мокового стора для тестирования
const store = configureStore({ reducer: orderSlice.reducer });

describe('orderSlice reducer', () => {
  //Тесты в этой секции:
  //Проверяют редьюсер слайса constructor:
  //бработку экшена добавления ингредиента;
  //обработку экшена удаления ингредиента;
  //обработку экшена изменения порядка ингредиентов в начинке;

  const bun: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: 'id_0'
  };
  const ingredient: TConstructorIngredient = {
    _id: 'id_1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: 'id_1'
  };
  const ingredient2: TConstructorIngredient = {
    _id: 'id_2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: 'id_2'
  };

  it('тест должен обрабатывать экшен addItem', () => {
    const action = addItem(ingredient);
    const stateAfterAdd = orderSlice.reducer(initialState, action);
    expect(stateAfterAdd.orderItems.items).toContainEqual(action.payload);
    expect(stateAfterAdd.orderItems.bun).toBeNull(); // добавляем не булку
  });

  it('тест должен обрабатывать экшен addItem для булки', () => {
    const action = addItem(bun);
    const stateAfterAddBun = orderSlice.reducer(initialState, action);
    expect(stateAfterAddBun.orderItems.bun).toEqual(action.payload);
  });

  it('тест должен обрабатывать экшен removeItem', () => {
    const addAction = addItem(ingredient);
    const stateAfterAdd = orderSlice.reducer(initialState, addAction);
    const removeAction = removeItem(addAction.payload);
    const stateAfterRemove = orderSlice.reducer(stateAfterAdd, removeAction);
    expect(stateAfterRemove.orderItems.items).not.toContainEqual(
      addAction.payload
    );
  });

  it('тест должен обрабатывать экшен moveItem', () => {
    const addAction1 = addItem(ingredient);
    //const addAction2 = addItem({ ...ingredient, id: 'ingredient-2' });
    const addAction2 = addItem(ingredient2);
    const stateAfterAdds = orderSlice.reducer(
      orderSlice.reducer(initialState, addAction1),
      addAction2
    );

    const moveAction = moveItem({ from: 0, to: 1 });
    const stateAfterMove = orderSlice.reducer(stateAfterAdds, moveAction);
    expect(stateAfterMove.orderItems.items[0].id).toBe(
      stateAfterAdds.orderItems.items[1].id
    );
    expect(stateAfterMove.orderItems.items[1].id).toBe(
      stateAfterAdds.orderItems.items[0].id
    );
    expect(stateAfterMove.orderItems.items[0]._id).toBe('id_2');
    expect(stateAfterMove.orderItems.items[1]._id).toBe('id_1');
  });
});

describe('orderSlice reducer', () => {
  it('тест должен проверять getUserOrders.fulfilled', async () => {
    const mockResponse = [
      {
        _id: '666af8e197ede0001d070606',
        ingredients: [
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2024-06-13T13:49:21.028Z',
        updatedAt: '2024-06-13T13:49:21.454Z',
        number: 42286
      },
      {
        _id: '666af80397ede0001d070602',
        ingredients: [
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2024-06-13T13:45:39.867Z',
        updatedAt: '2024-06-13T13:45:40.242Z',
        number: 42285
      },
      {
        _id: '666af7f897ede0001d070601',
        ingredients: [
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2024-06-13T13:45:28.179Z',
        updatedAt: '2024-06-13T13:45:28.610Z',
        number: 42284
      }
    ]; // моковый ответ API
    const action = getUserOrders.fulfilled(
      mockResponse,
      'requestId',
      undefined
    );
    const state = orderSlice.reducer(store.getState(), action);
    expect(state.isLoading).toBeFalsy();
    expect(state.userOrders).toEqual(mockResponse);
  });

  it('тест должен обрабатывать getUserOrders.pending', () => {
    const action = { type: getUserOrders.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('тест должен проверять getUserOrders.rejected', () => {
    const action = {
      type: getUserOrders.rejected.type,
      payload: 'Error message'
    };
    const state = orderSlice.reducer(store.getState(), action);
    expect(state.errorMessage).toBe('Error message');
  });

  it('тест должен проверять getOrderByNumber.fulfilled', () => {
    const orderNumber = 42286;
    const mockOrderDetails = {
      success: true,
      orders: [
        {
          _id: '666af8e197ede0001d070606',
          ingredients: [
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2024-06-13T13:49:21.028Z',
          updatedAt: '2024-06-13T13:49:21.454Z',
          number: 42286
        }
      ]
    }; // моковый объект деталей заказа
    const action = getOrderByNumber.fulfilled(
      mockOrderDetails,
      'requestId',
      orderNumber
    );
    const state = orderSlice.reducer(store.getState(), action);
    expect(state.isLoadingDetails).toBeFalsy();
    expect(state.orderDetails).toEqual(mockOrderDetails.orders[0]);
  });

  it('тест должен обрабатывать getOrderByNumber.pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderSlice.reducer(store.getState(), action);
    expect(state.isLoadingDetails).toBeTruthy();
  });

  it('тест должен проверять getOrderByNumber.rejected', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      payload: 'Error message'
    };
    const state = orderSlice.reducer(store.getState(), action);
    expect(state.errorMessage).toBe('Error message');
  });

  it('тест должен проверять addUserOrder.fulfilled', () => {
    const items = [
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d'
    ]; // Пример элементов заказа
    const mockOrderData = {
      success: true,
      name: 'Space флюоресцентный бургер',
      order: {
        _id: '666af7f897ede0001d070601',
        ingredients: [
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2024-06-13T13:45:28.179Z',
        updatedAt: '2024-06-13T13:45:28.610Z',
        number: 42284
      }
    };
    const requestId = 'requestId'; // Идентификатор запроса
    const action = addUserOrder.fulfilled(mockOrderData, requestId, items);
    const state = orderSlice.reducer(store.getState(), action);
    expect(state.orderRequest).toBeFalsy();
    expect(state.orderData).toEqual(mockOrderData.order);
  });

  it('тест должен обрабатывать addUserOrder.pending', () => {
    const action = { type: addUserOrder.pending.type };
    const state = orderSlice.reducer(store.getState(), action);
    expect(state.orderRequest).toBeTruthy();
  });

  it('тест должен проверять addUserOrder.rejected', () => {
    const action = {
      type: addUserOrder.rejected.type,
      payload: 'Error message'
    };
    const state = orderSlice.reducer(store.getState(), action);
    expect(state.errorMessage).toBe('Error message');
  });

  it('тест должен проверять resetOrderData', () => {
    const mockOrder = {
      _id: '666af8e197ede0001d070606',
      ingredients: [
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2024-06-13T13:49:21.028Z',
      updatedAt: '2024-06-13T13:49:21.454Z',
      number: 42286
    };
    const action = resetOrderData(mockOrder);
    const state = orderSlice.reducer(store.getState(), action);
    expect(state.orderData).toBeNull();
    expect(state.orderItems.items).toHaveLength(0);
    expect(state.orderItems.bun?._id).toBeUndefined();
  });
});
