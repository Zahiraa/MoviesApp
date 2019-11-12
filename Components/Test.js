import React from 'react'
import {StyleSheet,View,Platform} from 'react-native'
import Hello from './Hello'

class Test extends React.Component{
    render()
    {
        return(
            <View style={styles.container}>
                <View style={styles.body}></View>
                <Hello/>
            </View>
        )



}
}
const styles=StyleSheet.create(

{
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    body:

        {
            width:50,height:50,
          ...Platform.select({
              ios:{
                  backgroundColor:"red"
              } ,
              android:{
                  backgroundColor:"yellow"
              }
          })
        }

}
)
export default Test
