
const baseUrl = "http://www.thecocktaildb.com/api/json/v1/1/";

const fetchDynamic = ( endpoint) => {        
    const url = `${ baseUrl }/${ endpoint }`;        
    return fetch(url);    
}

export {
    fetchDynamic    
}