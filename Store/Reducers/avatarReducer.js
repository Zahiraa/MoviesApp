const initialState={avatar:require('../../Image/ic_tag_faces.png')}

function showAvatar(state=initialState,action)

{
  let nextState
  switch(action.type)
  {


    case 'SHOW_AVATAR':

        nextState={
        ...state,
        avatar:action.value
        }

      return nextState || state

       default:
         return state
   }
}

export default showAvatar