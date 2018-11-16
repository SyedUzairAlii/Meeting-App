import React, { Component } from 'react';
import './request.css';
import { connect } from 'react-redux'

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
// import { Button } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDirections, faCalendarAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'



class Request extends Component {
    constructor() {
        super()

        this.state = {
            users: []
        }
    }
    componentWillMount() {
        // console.log(this.props.location.state)
        const { request } = this.props.location.state
        this.setState({ users: request },()=>{
            console.log(this.state.requests,'user request')
        })

    }
    componentWillReceiveProps(props){
if(props.request){
    // console.log(props.request,'eweqweq')
    props.request.map((items)=>{
console.log(items,'iteamssasasa')

    })
}


    }
    confirm(direction){
        const user44 = localStorage.getItem('uid')
        console.log(direction)
    const obj = {
        request : 'Accepted'
    }

        firebase.database().ref('/meeting/'+user44+'/'+ direction.key).update(obj)
.then(sucess=>{
    swal({
        title: "Accepted",
        type : "success",
        timer : 1000,
    })
})
    }
    cancelRequest(direction){
        const user44 = localStorage.getItem('uid')
        console.log(direction)
    const obj = {
        request : 'Cancel'
    }

        firebase.database().ref('/meeting/'+user44+'/'+ direction.key).update(obj)
.then(sucess=>{
    swal({
        title: "Cancel",
        type : "success",
        timer : 1000,
    })
})
    }
    profilePic(user1Image, user2Image, name, date, time, location, timeDuration, direction) {
        return (
            <div className='div1'>
                <div className='user-pics'>
                    <div>
                        <img src={user1Image} />
                    </div>
                    <div>
                        <img src={user2Image} />
                    </div>
                </div>
                <div className={'nameDiv2'}>
                    {name}
                </div>
                <div className={'meeting-details'}>
                    <div>
                        <FontAwesomeIcon icon='calendar-alt' style={{ marginRight: '3px' }} />{date}
                    </div>
                    <div>
                        <FontAwesomeIcon icon='clock' style={{ marginRight: '3px' }} />{time} PM
                </div>
                    <div>
                        <FontAwesomeIcon icon='map-marker-alt' style={{ marginRight: '3px' }} />{location}
                    </div>
                    <div>
                        {timeDuration}
                    </div>
                </div>
                <div className='footer-btn'>
                    <div>
                        <Button color='default' variant={'contained'} onClick={() => this.getDirection(direction)}>
                            <FontAwesomeIcon icon='directions' style={{ marginRight: '3px' }} />
                            Get Direction
                        </Button>
                    </div>
                    <div>
                        <Button color='secondary' onClick={() => this.cancelRequest(direction)} variant={'contained'}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.confirm(direction)} color='primary' variant={'contained'}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
            )}


// static getDerivedStateFromProps(props){
// if(props.request){
//     console.log(props.request,'prorasd')
// }
// }




    render() {
        const { users } = this.state
        const userId = localStorage.getItem('uid')

        // console.log(users, 'users') 
        return (
            <div>
            <ButtonAppBar name={'Meeting App'} >
                     </ButtonAppBar>
                     <div className='profile-pic'>
                <div>
                    <h2>Requests</h2>
                </div>
                {
                    users.map((items) => {
                        const { name, images, timeDuration } = items.User1Profile
                        const { user, place, date, time } = items.request
                        const direction = {
                            user1: items.User1Profile,
                            place: items.request.place,
                            key: items.key
                        }
                        return (
                            items.request.user.userUid === userId &&
                            this.profilePic(images[0], user.images[0], name, date, time, place.name, timeDuration[0], direction)
                        )
                    })
                }
            </div>
            
            </div>
        );
    }
}



function mapStateToProps(state) {
    return ({
        request: state.authReducer.REQUEST
    })
  }
  
  function mapDispatchToProps(dispatch) {
    return ({
     
    })
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Request);
  
// export default Request;