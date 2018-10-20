import React, { Component } from 'react';
import './App.css';
import firebase from './confic/firebase'; 
import Login from './screen/login/login'
import Profile from './screen/Profile/profile';
import Map from './screen/map/map'
var provider = new firebase.auth.FacebookAuthProvider();
class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      coords : null,
      user : false,
    
      daashBoard: false,
    }
    this.login = this.login.bind(this)
    this.userLogin = this.userLogin.bind(this)
    this.dashboard = this.dashboard.bind(this)
  }
  componentWillMount(){
const login =  localStorage.getItem("login");
if(login === "true"){
  this.setState({
    user : true,
  })
  }
    }
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
 userLogin = () => {
    this.setState({
      user : true,
    })
  }
  dashboard = () => {
    this.setState({
      daashBoard : true,
    })
  }
  render() {
    const { user ,daashBoard } = this.state;
    return (
      <div className="App">
        {/* <button onClick={this.login}>Facebook L0gin</button> */}
         {!user && <Login  userLogin = {this. userLogin} />}
         {user && <Profile dashboard = {this. dashboard}/>}
          {user &&  <Map/>}
      </div>
    );
  }
}

export default App;
