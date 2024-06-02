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
        state.error = action.payload as string;
        state.loading = false;
      });
  }
});

// Export the reducer from the slice
export default feedsSlice.reducer;
