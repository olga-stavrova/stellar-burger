import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrdersData } from '../../utils/types';

interface FeedsState {
  feeds: TOrdersData;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const initialFeedsState: FeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loaded: false,
  loading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'orders/fetchFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getFeedsApi();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialFeedsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.loaded = false;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feeds = action.payload;
          state.loading = false;
          state.loaded = true;
          state.error = null;
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        state = initialFeedsState;
        state.error = JSON.stringify(action.payload as string);
      });
  }
});

export default feedsSlice.reducer;
