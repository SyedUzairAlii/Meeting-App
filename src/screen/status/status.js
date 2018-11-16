import React, { Component } from 'react';
// import './dashboard.css';
import { Checkbox, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Cards, { Card } from 'react-swipe-deck'
import firebase from '../../confic/firebase'
import Meeting from '../meeting/meeting'
import UserCards from '../../component/card/card';
import geolib from 'geolib'
import swal from 'sweetalert2'
import Profile from '../Profile/profile';
import History from '../../History/history'
import ButtonAppBar from '../../container/container'
import RequestCard from '../../component/requestCard/card'
import Icon from '@material-ui/core/Icon';
class status extends Component{

constructor(){

    super()
    this.state={
        users: [],
        data : false,
        request:[],
        noti : false,
    }
    this.notificaton = this.notificaton.bind(this)
    
}
componentDidMount(){
    let { users } = this.state
    const user = localStorage.getItem('uid')

    firebase.database().ref('/meeting/').once('value', (snapShot) => {
      for (var key in snapShot.val()) {
        firebase.database().ref('/meeting/' + key + '/').on('child_added', (snaps) => {
          // console.log(snaps.key)
          const userUid = snaps.val().userUid

          if (userUid === user) {
            const obj = {
              request: snaps.val().request,
              date: snaps.val().date,
              time: snaps.val().time,
              location: snaps.val().place.name,
              image: snaps.val().user.images[0],
              name: snaps.val().user.name,
              key: snaps.key
            }
            // console.log(obj, 'userdata')
            // console.log(snaps.val(), 'userdata')
            // console.log(key, 'key')
            // console.log(user, 'user')
            users.push(obj)
            this.setState({ data : true  })
          }
        })
        firebase.database().ref('/meeting/' + key + '/').on('child_changed', (change) => {
        //   console.log(change.key, 'child chenged')
          users.map((items, index) => {
            if (items.key === change.key) {
              // console.log(items.key, 'item key')
              // console.log(change.key, 'change key')
              const obj = {
                request: change.val().request,
                date: change.val().date,
                time: change.val().time,
                location: change.val().place.name,
                image: change.val().user.images[0],
                name: change.val().user.name,
                key: change.key
              }
              users.splice(index, 1, obj)
              this.setState({ users })
            }
          })
        })
      }
    })
    const { request } = this.state
    const user2 = localStorage.getItem('uid')

    firebase.database().ref('/meeting/').once('value', (snapShot) => {
      for (var key in snapShot.val()) {
          if (key === user2)
        //   console.log(key , 'uidCurrent')
        firebase.database().ref('/meeting/' + key + '/').on('child_added', (snaps) => {
            // if (key === user2) {
    //         // console.log(key, 'key1')
                console.log(snaps.val().request)
    // //         // console.log(user, 'user1')
    //         console.log(snaps.val().userUid)
    // if(snaps.val().request === 'pending'){
            firebase.database().ref('/user/' + snaps.val().userUid + '/').once('value', (value) => {
              // console.log(value.val().profile, 'images')
              const obj = {
                User1Profile : value.val().profile,
                request: snaps.val(),
                key : snaps.key
              }
              // console.log(obj)
              request.push(obj)
              this.setState({ request }, () => {
                console.log(this.state.request,'request here')
              })
              console.log('ye dhekho ')
              swal("You Have a Meeting Request!");
              this.setState({noti : true})
            })
    
          // }
        })
      }
    })
  
    
}


notificaton() {
  const { request } = this.state

  console.log(request)
  History.push({
    pathname: '/MeetingRequest',
    state: {
      request: request
    }
  })
}




render()
{
    const{users,data,noti } = this.state
    return(
<div>
<ButtonAppBar name={'Meeting App'} >
         </ButtonAppBar>
 {data&&
          <RequestCard users={users} />
        }
  {noti&&<div>  <Button variant="contained" color="primary" onClick={this.notificaton}>
          Meeting Request
          
        </Button></div>}

</div>



    )
}




}


export default status