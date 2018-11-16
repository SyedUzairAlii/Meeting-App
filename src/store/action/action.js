import firebase from '../../confic/firebase'
import actionTypes from '../constant/constant'

export function userAuth(){
return dispatch => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            
            console.log(user,'user here')
            firebase.database().ref('/user/'+user.uid+'/profile').on('value',(snapShot)=>{
                // console.log(snapShot.val(),'snaps')
                dispatch({ type: actionTypes.DATA, payload: snapShot.val() })
            })
          
        } else {
            

        }

    });
}
}
export function RequestMeeting(user) {
    return dispatch => {
        const arry = []
        console.log(user ,'usermil rha ha')
        firebase.database().ref('/meeting/'+user+'/').on('child_added' , (snapShot)=>{
            console.log(snapShot.val(),'meetinsgss sujd')
            arry.push(snapShot.val())
            dispatch({ type: actionTypes.REQUEST, payload: arry})
        })
    }
}