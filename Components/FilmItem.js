import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity, ScrollView,Animated,Dimensions} from 'react-native';
import {getFilmsPoster} from '../API/TMDBApi';
import {connect} from 'react-redux';
import FadeIn from '../Animations/FadeIn'



class FilmItem extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            positionLeft:new Animated.Value(Dimensions.get('window').width)
        }
    }
    componentDidMount() {
        Animated.spring(
            this.state.positionLeft,
            {
                toValue:0
            }
        ).start()
    }

    _toggleFavoris()
    {
        const action={type:"TOGGLE_FAVORITE",value:this.props.films}
        this.props.dispatch(action)
    }
    _displayFavoriteImage()
    {
        var sourceImage =require('../Image/favorite_border.png')
        if(this.props.isFavorite)
        {
            sourceImage =require('../Image/favorite.png')
        }
        return(
            <Image  style={styles.favorite_image} source={sourceImage}/>
        )
    }
    render() {

        // const films=this.props.film
        // const filmDescription=this.props.filmDescription
        const {films,filmDescription}=this.props
        // console.log(filmDescription)
        return  (
       <FadeIn>
            <TouchableOpacity style={styles.parent_view} onPress={()=>filmDescription(films)}>
                <View style={styles.first_view}>
                    <Image
                        style={styles.image}
                        source={{uri:getFilmsPoster(films.poster_path)}}
                    />
                </View>
                <View style={styles.second_view}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={()=>{this._toggleFavoris()}}
                            style={styles.favorite_container}>
                            {this._displayFavoriteImage()}

                        </TouchableOpacity>
                        <Text style={styles.title}>{films.title}</Text>
                        <Text style={styles.vote}>{films.vote_average}</Text>
                    </View>

                   <View>
                        <Text style={{padding:5,fontStyle:"italic",color:"grey" }} numberOfLines={4}>{films.overview}</Text>
                   </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}></Text>
                        <Text style={{ flex: 2 }}>Sorti le :{films.release_date}</Text>
                     </View>
                </View>
             </TouchableOpacity>
       </FadeIn>
        )


    }
}
const styles = StyleSheet.create({
    // numberOfLines={2}
    parent_view: {
     flex:1,
     flexDirection: "row",
         height:150,
    },

    first_view: {
        flex:1,
        // backgroundColor:"pink",
      //  width:50,
       height:150,
        borderColor:'black',
        borderWidth:2
   
       },

    second_view: {

        flex:2,
        // backgroundColor:"yellow",
        height:150,
        // flexDirection: "row",
        borderColor:'black',
        borderWidth:2,
       },
    title: {

       fontWeight:"bold",
           flex:2,
        fontSize:20,
        paddingLeft:5,
        flexWrap:"wrap"
   
       },
    vote: {

       fontWeight:"bold",
           // flex:1,
        fontSize:18,
        paddingRight:10

       },
    image: {
        width: 118, height: 146,
        // margin: 5,
        backgroundColor: 'gray'
       },
    favorite_container:{
        // alignItems: "center"
    },
    favorite_image:
        {
            width:20,
            height:20,

        }
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmItem)


