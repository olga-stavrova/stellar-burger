import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrdersData } from '../../utils/types';

interface FeedsState {
  feeds: TOrdersData;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}
// Define the initial state of the ingredients slice
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

// Create an async thunk for fetching ingredients
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

// Create the ingredients slice
export const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialFeedsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.loaded = false;
        console.log('fetchFeeds.pending');
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feeds = action.payload;
          state.loading = false;
          state.loaded = true;
          state.error = null;
          console.log('fetchFeeds.fulfilled', action);
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        console.log('fetchFeeds.rejected', action);
        state = initialFeedsState;
        state.error = JSON.stringify(action.payload as string);
        console.log('fetchFeeds.rejected', action);
      });
  }
});

// Export the reducer from the slice
export default feedsSlice.reducer;
