import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';

class Avatar extends React.Component {

   /* constructor(props) {
        super(props)
        this.state = {
            avatar: require('../Image/ic_tag_faces.png')
        }
    }*/
        _displayAvatar=(uri)=>
        {
            const action={type:"SHOW_AVATAR",value:uri}
            this.props.dispatch(action)
        }

    _avatarClicked=()=> { //bind=> callback
        ImagePicker.showImagePicker({},(response => {
            if(response.didCancel){
                console.log('user a annulé')
            }
            else if(response.error)
            {
                console.log('Error',response.error)
            }
            else{
                console.log('Photo',response.uri)
                let requireSource={uri:response.uri}
               /* this.setState({
                    avatar:requireSource
                })*/
                this._displayAvatar(requireSource)
            }
        }))

    }

    render() {
        return(
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={this._avatarClicked}>
                <Image style={styles.avatar} source={this.props.avatarPic} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableOpacity: {
        margin: 5,
        width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    }
})

const mapStateToProps = (state) => {
    return {

        avatarPic:state.avatarPic.avatar
    }
}

export default connect(mapStateToProps)(Avatar)
