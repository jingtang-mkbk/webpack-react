import {
  Action,
  configureStore,
  Dispatch,
  ThunkAction,
} from '@reduxjs/toolkit';
import { Root } from 'react-dom/client';

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export type RootThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type RootThunkApi<RejectValue = void> = {
  state: RootState;
  dispatch: Dispatch<any>;
  rejectValue: RejectValue;
};
