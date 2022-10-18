import { configureStore } from '@reduxjs/toolkit';

import dataReducer from './DataSlice';

export const store = configureStore({
  reducer: {
    dataSlice: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
