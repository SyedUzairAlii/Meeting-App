import React, { Component } from 'react';
import '../../App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../confic/firebase'


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
                
                firebase.database().ref("/user/"+uid).set(userInfo)
            }
            
        }
    
    }
    render() {
        return (
          <div className="App">
            
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        );
      }
    }


export default login;





