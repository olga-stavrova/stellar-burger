import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

interface IngredientsState {
  items: TIngredient[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}
// Define the initial state of the ingredients slice
const initialIngredientsState: IngredientsState = {
  items: [],
  loading: false,
  loaded: false,
  error: null
};

// Create an async thunk for fetching ingredients
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getIngredientsApi();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create the ingredients slice
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialIngredientsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.loaded = false;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.items = action.payload;
          state.loading = false;
          state.loaded = true;
          state.error = null;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.loaded = false;
      });
  }
});

// Export the reducer from the slice
export default ingredientsSlice.reducer;
