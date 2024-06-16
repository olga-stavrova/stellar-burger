import feedsReducer, {
  fetchFeeds,
  feedsSlice
} from '../services/slices/feeds-slice';
import { TOrdersData } from '../utils/types';

const initialFeedsState = feedsSlice.getInitialState();
describe('feedsSlice reducer', () => {
  it('тест должен обрабатывать fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsReducer(initialFeedsState, action);
    expect(state).toEqual({
      ...initialFeedsState,
      loading: true,
      loaded: false
    });
  });

  it('тест должен обрабатывать fetchFeeds.fulfilled', () => {
    const mockFeedsData: TOrdersData = {
      orders: [
        {
          _id: '6669e8bd97ede0001d0703d6',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-06-12T18:28:13.334Z',
          updatedAt: '2024-06-12T18:28:13.761Z',
          number: 42230
        },
        {
          _id: '6669e34197ede0001d0703cb',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный био-марсианский бургер',
          createdAt: '2024-06-12T18:04:49.657Z',
          updatedAt: '2024-06-12T18:04:50.093Z',
          number: 42229
        },
        {
          _id: '6669d79b97ede0001d0703bb',
          ingredients: [
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa094a',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0948',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Астероидный краторный альфа-сахаридный экзо-плантаго люминесцентный бургер',
          createdAt: '2024-06-12T17:15:07.331Z',
          updatedAt: '2024-06-12T17:15:07.750Z',
          number: 42228
        }
      ],
      total: 15,
      totalToday: 2
    };
    const action = { type: fetchFeeds.fulfilled.type, payload: mockFeedsData };
    const state = feedsReducer(initialFeedsState, action);
    expect(state).toEqual({
      ...initialFeedsState,
      feeds: mockFeedsData,
      loading: false,
      loaded: true,
      error: null
    });
  });

  it('тест должен обрабатывать fetchFeeds.rejected', () => {
    const errorAction = {
      type: fetchFeeds.rejected.type,
      payload: 'Error message'
    };
    const state = feedsReducer(initialFeedsState, errorAction);
    const expectedState = { ...initialFeedsState, error: 'Error message' };
    expect(state).toEqual(expectedState);
  });
});
