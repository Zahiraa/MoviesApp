import React from 'react';
import {StyleSheet, Text,View,Animated,Easing,Dimensions,PanResponder,Image} from 'react-native';
import {connect} from 'react-redux';


class Profile extends React.Component {

  /* componentDidMount() {
        getFilmDetails(this.props.navigation.state.params.film.id).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }
    var {height,width}=Dimensions.get('window');
    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            let touches = evt.nativeEvent.touches;
            if (touches.length == 1) {
                console.log(touches)
                this.setState({
                    topPosition: touches[0].pageY - height/2,
                    leftPosition: touches[0].pageX - width/2
                })
            }
        }
    })
}*/

    // componentDidMount() {
    // // Animated.sequence([
    // Animated.parallel([ // parallel 2 parm diff
    //
    //     Animated.spring(
    //         this.state.topPosition,
    //         {
    //             toValue: 200,
    //             speed:2, // Le temps est en milliseconds ici (3000ms = 3sec)
    //            bouciness:30
    //         }
    //     ) // N'oubliez pas de lancer votre animation avec la fonction start()
    // ,
    //         Animated.timing(
    //             this.state.leftPosition,
    //             {
    //                 toValue: 100,
    //                 duration:1000, // Le temps est en milliseconds ici (3000ms = 3sec)
    //                 easing:Easing.elastic(2)
    //             }
    //         )
    //
    // ]).start()
// }
    render() {


        return (

            <View  style={styles.container}>

             <View><Image source={this.props.avatarPic} style={styles.avatar}/></View>


           </View>
        )
    }
}
const styles = StyleSheet.create
({


    container:{
        flex:1,
        // marginTop:25,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
         width:100,
         height:100,
         backgroundColor:"red"
     },

      avatar: {
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: '#9B9B9B',
                borderWidth: 2
      },
});



const mapStateToProps = (state) => {

    return {

        avatarPic:state.avatarPic.avatar
    }
}

export default connect(mapStateToProps)(Profile)
