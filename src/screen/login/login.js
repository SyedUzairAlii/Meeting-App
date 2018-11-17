import React, { Component } from 'react';
import '../../App/App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../confic/firebase';
import './login.css';
import History from '../../History/history';
import ButtonAppBar from '../../container/container';
class login extends Component {

    constructor() {
      super()
      
      this.state = {
        
      }
     
    }


    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            // firebase.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (success) => { 
                localStorage.setItem("login",true)
                
                // this.userLogin()
                // console.log('sucess',success)
                console.log('sucess',success.user.displayName)
                console.log('sucess',success.user.email)
                console.log('sucess',success.user.photoURL)
                console.log('sucess',success.user.uid)
                const users = success.user;
                const uid = users.uid
                localStorage.setItem("uid",uid)
                const userInfo = {
                    email : users.email,
                    name : users.displayName,
                    photo : users.photoURL,
                    id : users.uid,
                }
                
                
                firebase.database().ref("/user/"+uid).update(userInfo)
                History.push('/dashboard')
            }
            
        }
    
    }
    render() {
        return (
            <div className="App">
    <ButtonAppBar name={'Meeting App'} >
         </ButtonAppBar>

                     <div className="form">
                         Login here
                     <br/>
                     <br/>
            
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                     </div>
          </div>
        );
      }
    }


export default login;





