import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { cocktailReducer } from "../reducers/cocktailReducer";

const reducers = combineReducers({
    cocktail: cocktailReducer
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);