import React from 'react'
import {FlatList,View,Image,Text,StyleSheet} from 'react-native'
import {getNewMovies} from '../API/TMDBApi';
import FilmItem from './FilmItem';
import {connect} from "react-redux";

class NewMovies extends React.Component
{
   constructor(props) {
          super(props)
           this.page = 0
              this.totalPages = 0
              this.state = {
                films: [],

              }
      }

    componentDidMount()
    {
      this._loadFilms()

    }

   _filmDescription2=(film)=>
    {

        this.props.navigation.navigate("Description",{film:film})

    }

    _loadFilms=()=>
    {
    getNewMovies(this.page+1).then(data =>
          {
           this.page = data.page
                  this.totalPages = data.total_pages

          this.setState({
            films:[ ...this.state.films, ...data.results]
          })
        })
        }

  render()
  {

  console.log("****")
  console.log(this.totalPages)
  console.log(this.page)
    return(
    <View>
       <Text style={styles.title}>New Movies</Text>
       <FlatList

                 data={this.state.films}

                 keyExtractor={(item) => item.id.toString()}
                 renderItem=
                 {({item}) =>

                   <FilmItem

                     films={item}
                     isFavorite={(this.props.favoritesFilm.findIndex(film=>film.id===item.id)!==-1)?true:false}
                     filmDescription={this._filmDescription2}

                      />
                  }
                  onEndReachedThreshold={0.5}
                    onEndReached=
                    {()=>
                     {
                        if(this.page<this.totalPages)
                        {
                            this._loadFilms()
                        }
                     }
                    }

               />
         </View>
    )
  }
}

const styles = StyleSheet.create({

    title: {
       textAlign: "center",
       fontWeight:"bold",
       fontSize: 25,
       marginTop:10,
       marginBottom:10
    }
    })

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}
export default connect(mapStateToProps)(NewMovies);