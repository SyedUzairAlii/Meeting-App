import React, { Component } from 'react';
import './App.css';
import firebase from './confic/firebase'; 
import Login from './screen/login/login'
import Profile from './screen/Profile/profile';

var provider = new firebase.auth.FacebookAuthProvider();
class App extends Component {

  constructor() {
    super()
    
    this.state = {
      coords : null
    }
    this.login = this.login.bind(this)
  }
  // componentDidMount(){
  //   firebase.auth().createUserWithEmailAndPassword('uzair@pakao.com','uzair123').then(console.log('hogaya'))
  
  // }
  login() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log('login hogaya',result)
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      // ...
    });
  }

  render() {
    return (
      <div className="App">
        {/* <button onClick={this.login}>Facebook L0gin</button> */}
         {/* <Login /> */}
         <Profile />
      </div>
    );
  }
}

export default App;
