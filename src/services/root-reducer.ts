import { combineReducers } from 'redux';

import { userSlice } from './slices/user-slice';
import { ingredientsSlice } from './slices/ingredients-slice';
import { feedsSlice } from './slices/feeds-slice';
import { orderSlice } from './slices/order-slice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderSlice.name]: orderSlice.reducer
});

export default rootReducer;
