import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {getFilmsPoster} from '../API/TMDBApi';
import FilmItem from "./FilmItem";
import Avatar from "./Avatar";

class Favorites extends React.Component {


    constructor(props) {
        super(props)
        this.state = {favorite: undefined}
    }

    componentDidMount() {
        this.setState({
            favorite: this.props.favoritesFilm
        })
    }
    _filmDescription=(film)=>
    {
            this.props.navigation.navigate("Description",{film:film})

    }
    _casesFilm() {
        const fav = this.props.favoritesFilm;
        // if(fav.length>0)
        console.log("------------");
        console.log(fav);



    }

    render() {


        return (

            <View  style={styles.container}>
                <View  style={styles.container_avatar}>
                    <Avatar/>
                </View>
                <Text style={styles.title}>My favorite movies</Text>
                {this.props.favoritesFilm.length !=0 ?
                <FlatList

                    data={this.props.favoritesFilm}

                    keyExtractor={(item) => item.id.toString()}
                    renderItem=
                    {
                        ({item}) =>

                        <FilmItem
                            films={item}
                            isFavorite={(this.props.favoritesFilm.findIndex(film=>film.id===item.id)!==-1)?true:false}
                            filmDescription={this._filmDescription}


                        />
                    }


                />
                    :
                    <View  style={{flex:1,justifyContent:'center'}}>
                    <Text style={{marginLeft:10,marginTop:10}}>Your list is still empty.You can create your favorite movies list</Text>
                    </View>
                }
            </View>
        )
    }
}
    const styles = StyleSheet.create
({

     image:
       {
       width: 380, height: 100,

       },
    title:
       {
      fontSize:22,
           fontWeight: 'bold',
           textAlign: 'center',
           marginBottom:8,
           marginTop:25,

       },
    container:{
         flex:1,
        // flexDirection:'row'
        marginTop:23,
        paddingTop:5
    },
    container_avatar:{
         alignItems:"center"
    }
    });





const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
        //avatarPic:state.avatar
    }
}

export default connect(mapStateToProps)(Favorites)
