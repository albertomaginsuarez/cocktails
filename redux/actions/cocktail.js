import { fetchDynamic } from '../../helpers/fetch';

import { types } from "../types/types";

export const getCocktails = (data) => ({
    type: types.getCocktails,
    payload: data
    
});

export const actualCont = (data) => ({
    type: types.actualCont,
    payload: data
    
});

export const maxCont = (data) => ({
    type: types.maxCont,
    payload: data
    
});

export const exportCocktails = () => {
    return async(dispatch) => {            
        try {                
            const resp = await fetchDynamic('filter.php?g=Cocktail_glass');
            const body = await resp.json(); 
            
            const data = Object.values(body);

            const result = [];   
            var counter = data[0].length;
            var actual = 0;
            dispatch(maxCont(counter));

            
            data[0].map(async(d) => {                 
                const resp2 = await fetchDynamic(`lookup.php?i=${d.idDrink}`);
                const body2 = await resp2.json();
                d["details"] = Object.values(body2);                
                result.push(d);                                                
                if(actual===counter-1)dispatch(getCocktails(result));
                dispatch(actualCont(actual++));                
            });    
            
                        

        } catch (error) {
            console.log(error);
        }
    }
}