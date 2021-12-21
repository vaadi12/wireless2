
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation';
import Search from './screens/search';
import Transaction from './screens/transaction';

export default function App() {
  return (
    <View style={styles.container}>
 <AppNav/>
      
    </View>
  );
}
const bottomtab=createBottomTabNavigator({
  search:Search,
  transaction:Transaction
},
{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:()=>{
      const routeName= navigation.state.routeName
      if (routeName==='transaction'){
        return(
       <Image source={require("./assets/book.png")}
       style={{width:40, height:40}}/>
        )
      }
      else if (routeName==='search'){
        return(
          <Image source={require("./assets/searchingbook.png")}
          style={{width:40, height:40}}/>
        )
      }
    }
  })
}
)
const AppNav=createAppContainer(bottomtab)
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});

