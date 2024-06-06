import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

interface IngredientsState {
  items: TIngredient[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const initialIngredientsState: IngredientsState = {
  items: [],
  loading: false,
  loaded: false,
  error: null
};

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

export default ingredientsSlice.reducer;
