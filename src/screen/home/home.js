import React, { Component } from 'react';
import '../../App/App.css';
import { connect } from 'react-redux'
import firebase from '.././../confic/firebase'; 
// import Login from './screen/login/login'
import Profile from '../Profile/profile';
import Dashboard from '../dashboard/dashbboard'
var provider = new firebase.auth.FacebookAuthProvider();
class Home extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      coords : null,
      user : false,
      daashBoard: false,
      check : false,
      profile : '',
    }
    this.login = this.login.bind(this)
    // this.userLogin = this.userLogin.bind(this)
    // this.dashboard = this.dashboard.bind(this)
  }
  componentWillMount(){
const login =  localStorage.getItem("login");
if(login === "true"){
  this.setState({
    user : true,
  })
  }

  const dashboard =  localStorage.getItem("dashboard");
if(dashboard === "true"){
  this.setState({
    daashBoard : true,
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
//  userLogin = () => {
//     this.setState({
//       user : true,
//     })
//   }
  dashboard = () => {
    this.setState({
      daashBoard : true,
    })
  }
  componentDidMount() {
    const { profile } = this.state
    const user = localStorage.getItem("uid")
    firebase.database().ref('/user/' + user + '/profile/').on('value', (snapShot) => {
      // console.log(snapShot.val().location,'profile')
      if (snapShot.val()) {
        if (snapShot.val().location) {
          console.log(snapShot.val().beverages)
          const obj = {
            location : snapShot.val().location,
            beverages: snapShot.val().beverages,
            duration: snapShot.val().timeDuration
          }
          this.setState({ profile: 'true', userData: obj, user: 'true',daashBoard:'true'})
          console.log(obj)

        } else {
          this.setState({ profile: 'false' })
        }
      }
      else {
        this.setState({ profile: 'false' })
      }
    })

    // if (profile == 'true') {

    // }
  }
 x
  
  render() {
    const { user ,daashBoard,profile,userData,photo,check} = this.state;
    return (
      <div className="App">
    
         {profile === 'false' &&<Profile dashboard = {this.dashboard}/>}
         {profile === 'true'  && daashBoard && <Dashboard  userData={userData}/>}
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log(state , 'state')
  return ({
    userPro: state.authReducer.DATA

  })
}

function mapDispatchToProps(dispatch) {
  return ({
    
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
