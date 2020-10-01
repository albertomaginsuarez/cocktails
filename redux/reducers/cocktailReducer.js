import { types } from "../types/types";

const initialState = {
    cocktails: [],
    max: 100,
    actual: 0
};

export const cocktailReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case types.getCocktails:
            return {
                ...state,
                cocktails: [...action.payload]
            };
        case types.actualCont:
            return {
                ...state,
                actual: action.payload
            };
        case types.maxCont:
            return {
                ...state,
                max: action.payload
            };
        default:
            return state;
    }
};