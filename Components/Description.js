
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image,Button,TouchableOpacity,Share,Platform } from 'react-native'
import { getFilmDetails, getFilmsPoster } from '../API/TMDBApi'
import {connect} from 'react-redux'
import fleche from '../Image/fleche.png'
import EnlargeShrink from '../Animations/EnlargeShrink'


class Description extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getFilmDetails(this.props.navigation.state.params.film.id).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }
    componentDidUpdate() {
      // console.log('componentDidUpdate')
      // console.log(this.props.favoritesFilm)
    }
    _displayFavoriteImage()
    {
        var sourceImage =require('../Image/favorite_border.png')
        var shouldEnlarge=false
        if(this.props.favoritesFilm.findIndex(item=>item.id === this.state.film.id)!==-1)
        {
            sourceImage =require('../Image/favorite.png')
            shouldEnlarge=true
        }
        return(
            <EnlargeShrink shouldEnLarge={shouldEnlarge}>
                 <Image  style={styles.favorite_image} source={sourceImage}/>
            </EnlargeShrink>
    )
    }
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }
    _toggleFavoris()
    {
        const action={type:"TOGGLE_FAVORITE",value:this.state.film}
        this.props.dispatch(action)
    }
    _displayFilm() {
        const { film } = this.state

        if (film != undefined) {
            // console.log(film.overview)
            return (

                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getFilmsPoster(film.backdrop_path)}}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity
                         onPress={()=>{this._toggleFavoris()}}
                         style={styles.favorite_container}>
                         {this._displayFavoriteImage()}

                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {film.release_date}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {film.budget}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                        return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                        return company.name;
                    }).join(" / ")}
                    </Text>
                </ScrollView>

            )
        }
    }
    _shareFilm()
    {
        const film=this.state.film
        Share.share({title:film.title,message:film.overview})
    }
    _displayFloatingButton()
    {
        const film=this.state.film
        if(film!=undefined && Platform.OS==="android")
        {
            return(
                <TouchableOpacity style={styles.share_button} onPress={()=>this._shareFilm()}>
                    <Image style={styles.share_fleche} source={require("../Image/fleche.png")}/>
                </TouchableOpacity>
            )
        }
    }

    render() {
        // console.log(this.props)
        return (

            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        // fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center',
        height:120
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        // marginBottom: 15
        height:360
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container:{
       alignItems: "center"
     },
    favorite_image:
    {
        // width:40,
        // height:40,
        flex: 1,
        width: null,
        height: null
     },
    share_button: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_fleche: {
        width: 30,
        height: 30
    }
})
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(Description)
