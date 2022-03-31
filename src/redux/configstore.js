import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import dictionary from "./modules/dictionary";

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({ dictionary });
const store = createStore(rootReducer, enhancer);

export default store;
