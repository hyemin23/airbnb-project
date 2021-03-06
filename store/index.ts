import searchRoom from "./searchRoom";
// redux wrapper와 type이 지원되는 custom useSelector

import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { combineReducers } from "redux";
import auth from "./auth";
import common from "./common";
import registerRoom from "./registerRoom";
import user from "./user";
import room from "./room";

// 리듀서 묶기
const rootReducer = combineReducers({
  common: common.reducer,
  user: user.reducer,
  auth: auth.reducer,
  registerRoom: registerRoom.reducer,
  searchRoom: searchRoom.reducer,
  room: room.reducer,
});

// store type
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

// * type 지원되는 custom useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore = () => {
  const store = configureStore({
    reducer,
    devTools: true,
  });
  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);
