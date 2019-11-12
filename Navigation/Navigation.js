import React from "react";
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import Description from '../Components/Description'
import Favorites from '../Components/Favorites'
import Test from '../Components/Test'
import Profile from '../Components/Profile'
import newMovies from '../Components/NewMovies'
import{ Image,StyleSheet } from "react-native";



const SeachStackNavigator= createStackNavigator({
    Search:{
        screen : Search,
        navigationOptions:{
            title : 'Rechercher'
        }
    },
    Description:{
        screen : Description,
        navigationOptions:{
            title: 'Description'
        }
    },
    Favorites:{
        screen : Favorites,
        navigationOptions:{
            title: 'Your Favorite Films'
        }
    },
})
const TabsNavigator=createBottomTabNavigator(
    {
        // Test:
        //     {
        //         screen: Test,
        //         navigationOptions:
        //             {
        //                 tabBarIcon: () =>
        //                 {
        //                     return <Image source={require('../Image/test.png')} style={styles.icon}/>
        //                 }
        //             },
        //     },
            Search:
                {
                    screen: SeachStackNavigator,
                    navigationOptions:
                     {
                            tabBarIcon: () =>
                            {
                                return <Image source={require('../Image/search.png')} style={styles.icon}/>
                            }
                     },
                },

            Favorites:
                {
                    screen: Favorites,
                    navigationOptions:
                     {
                            tabBarIcon: () =>
                            {
                                return <Image source={require('../Image/favorite.png')} style={styles.icon}/>
                            }
                      }
                },
            /*Profile:
                {
                    screen: Profile,
                    navigationOptions:
                        {
                            tabBarIcon: () =>
                            {
                                return <Image source={require('../Image/profile-icon.png')} style={styles.icon}/>
                            }
                        }
                }*/

                 newMovies:
                 {
                    screen: newMovies,
                    navigationOptions:
                       {
                          tabBarIcon: () =>
                             {
                                return <Image source={require('../Image/new.png')} style={styles.icon}/>
                              }
                       }
                  }



           },


    {
        tabBarOptions:
            {
                activeBackgroundColor:"#DDDDDD",
                inactiveBackgroundColor:"#FFFFFF",
                showIcon:true,
                showLabel:false,
            }


}
    )
const styles = StyleSheet.create
({
    icon:
     {
        width: 30,
        height: 30
    }
})
export default createAppContainer(TabsNavigator)
