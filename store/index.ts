// redux wrapper와 type이 지원되는 custom useSelector

import { configureStore } from "@reduxjs/toolkit";
import { Context, createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { combineReducers, createStore } from "redux";
import user from "./user";

const rootReducer = combineReducers({
  user: user.reducer,
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

// store 생성
// create a makeStore function
// const makeStore = (context: Context) => createStore(reducer);

const initStore = () => {
  const store = configureStore({
    reducer,
    devTools: true,
  });
  initialRootState = store.getState();
  return store;
};

// const initStore: makeStore = () => {
//   const store = configureStore({
//     reducer,
//     devTools: true,
//   });
//   initialRootState = store.getState();
//   return store;
// };

export const wrapper = createWrapper(initStore);
