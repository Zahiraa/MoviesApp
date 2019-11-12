import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import FilmItem from './FilmItem';
import Favorites from './Favorites';
// import films from '../Helpers/filmsData';
import {getFilmsFromApiWithSearchText} from '../API/TMDBApi'
import {connect} from "react-redux";


class Search extends React.Component{

    constructor(props)
    {
        super(props)
        this.state={
            films: [],
            isLoading:false
        }
        this.textSaisi= "",
            this.page=0,
            this.totalPages=0

    }

    _clearSearch() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        },()=>
            { this._loadFilms()}
        )

    }

  _showLoading()
  {
      if(this.state.isLoading)
      {
          return (
              <View style={styles.loading_container}>
                  <ActivityIndicator size='large' />
              </View>
          )
      }
  }
    _loadFilms=()=>
    {
        if(this.textSaisi.length >0)
        {
            this.setState({isLoading : true})
            getFilmsFromApiWithSearchText(this.textSaisi,this.page+1).then(data => {
                this.page=data.page
                this.totalPages=data.total_pages
                this.setState({
                    films:[...this.state.films, ...data.results],
                    isLoading:false
                })
                // this.forceUpdate()
            }
        )

        }

    }
    _filmSearched(text)
    {
        this.textSaisi=text
    }

    _filmDescription=(film)=>
    {
        // this.props.navigation.navigate("Description",{idFilm:id,textFilm:text,imgFilm:pic})
        this.props.navigation.navigate("Description",{film:film})
        // console.log(this.props)
    }
    getFavoriteFilms=(favorite)=>
    {
        // this.props.navigation.navigate("Description",{idFilm:id,textFilm:text,imgFilm:pic})
        this.props.navigation.navigate("Favorites",{favorite:favorite})
    }

    render() {
        // console.log('render')
        // console.log(this.state.isLoading)
        return  (

            <View style={styles.container}>
            <TextInput onChangeText={(text) => this._filmSearched(text)} style={styles.button} placeholder={"Cherchez un film !"}/>
            <Button style={styles.sd} color={'red'} title={"Start"} onPress={() => this._clearSearch()}/>
                {/*<TouchableOpacity style={styles.parent_view} onPress={()=>this.getFavoriteFilms(this.props.favoritesFilm)}>*/}
                    {/*/!*<Favorites favorite={this.props.favoritesFilm}/>*!/<Text>Favorites</Text>*/}
                {/*</TouchableOpacity>*/}

                <FlatList
                    style={{ marginTop: 10}}
                    data={this.state.films}

                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=>

                    <FilmItem
                        isFavorite={(this.props.favoritesFilm.findIndex(film=>film.id===item.id)!==-1)?true:false}
                        films={item}
                        filmDescription={this._filmDescription}/>}
                    onEndReachedThreshold={0.5}
                    onEndReached={()=>{
                        if(this.page<this.totalPages)
                        {
                            this._loadFilms()
                        }
                    }}
                 />
                {this._showLoading()}
            </View>
        )


    }
}
const styles = StyleSheet.create({

    button: {

        fontSize: 25,
        // marginTop:40,
        marginBottom:10,
        marginLeft:10,
        marginRight:10,
        paddingTop:10,
        paddingRight:30,
        paddingBottom:10,
        paddingLeft:30,
        borderColor:'#000',
        borderWidth:2,


    },
    sd: {
        marginLeft:10,
        marginRight:10,
    },
    container: {
      flex:1,
       marginTop:15,
       paddingTop:5,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}
export default connect(mapStateToProps)(Search);


