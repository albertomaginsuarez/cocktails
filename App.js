import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import Cocktail from './screens/Cocktail';
import CocktailDetails from './screens/CocktailDetails';

const Stack = createStackNavigator();

function NavStack() {
  return (
     <Stack.Navigator initialRouteName="Cocktail"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle :{
            fontWeight: 'bold',
          },
        }}
      >      
      <Stack.Screen name="Cocktail" component={Cocktail}/>
      <Stack.Screen name="CocktailDetails" component={CocktailDetails}/>
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
