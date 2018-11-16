import React, { Component } from 'react';
import './dashboard.css';
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

class dashboard extends Component {


    constructor() {
        super()

        this.state = {
           meeting : false,
           user: [],
            arr: [],
            profileKey: [],
            allUsers: [],
            usersProfile: [],
            like: false , 
            person : {},
            initialMeeting : false, 
           
        }
      
    }

    componentDidMount() {
        const uid = localStorage.getItem('uid')
        // console.log(this.props.userData,'userdata')
        // firebase.database().ref()
        const { user, profile } = this.state
        console.log(this.props.userData)
        this.setState({ userData: this.props.userData }, () => {
            firebase.database().ref('/user/').on('child_added', (snapshot) => {
                // console.log(snapshot.val().profile.beverages)
                const beverages = snapshot.val().profile.beverages
                const duration = snapshot.val().profile.timeDuration
                const profile = snapshot.val().profile
                this.state.userData.beverages.map(items => {
                    if (beverages.indexOf(items) !== -1) {
                        // console.log(snapshot.key, 'profile bever')
                        // console.log(beverages)
                        user.push(snapshot.key)
                        this.setState({ user })
                    }
                    this.state.userData.duration.map(item => {
                        if (duration.indexOf(item) !== -1) {
                            // console.log(duration)
                            user.push(snapshot.key)
                            // console.log(profile, 'profile dura')
                            this.setState({ user }, () => {
                                const array = []
                                this.state.user.map(item => {
                                    if (array.indexOf(item) === -1 && item !== uid) {
                                        array.push(item)
                                        this.setState({ array }, () => {
                                            // console.log(this.state.array,'this.state.array')
                                            // console.log(profile.location, 'uprofile')
                                            const result = geolib.isPointInCircle(
                                                this.props.userData.location,
                                                { latitude: profile.location.latitude, longitude: profile.location.longitude },
                                                100000      ///isko 5 km krna ha value 5000
                                            );
                                            if (result) {
                                                if (snapshot.key !== uid) {
                                                    // console.log(snapshot.key, 'keys')
                                                    const { profileKey, allUsers, usersProfile } = this.state

                                                    if (profileKey.indexOf(snapshot.key) === -1) {
                                                        firebase.database().ref('/user/' + snapshot.key + '/profile').once('value', (snapShot) => {
                                                            // console.log(snapShot.val(), 'val()')
                                                            allUsers.push(snapShot.val())
                                                            this.setState({ allUsers }, () => {
                                                                // console.log(this.state.allUsers,'all users here')
                                                                const userPro = Object.values(this.state.allUsers.reduce((acc, cur) => Object.assign(acc, { [cur.number]: cur }), {}))
                                                                this.setState({ usersProfile: userPro })
                                                            })
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    } else {
                                    }

                                })
                                // console.log(this.state.user, 'user here')
                            })
                        }
                    })
                })
            })
        })
    }


    accept(profile) {
        console.log(profile,'profile')
        swal({
            title: 'Are you sure?',
            text: `You want to meet with ${profile.name && profile.name}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
                History.push({
                    pathname: '/meeting',
                    state : profile,
                    // status : this.status
                })
            
            }
          })
    }
    status = () => {
        this.setState({
            initialMeeting : true,
            like : false
        })

      }
    like = () => {
        this.setState({
            like : true,
        })
        console.log(this.person,'profile')

      }
    meeting = () => {
        this.setState({
            meeting : true,
        })
      }
    render() {
     const{ meeting ,  data, showUser, usersProfile, profileKey,person, like ,initialMeeting} = this.state
        return (
            <div className='appDiv'>

                <ButtonAppBar name={'Meeting App'} >
         </ButtonAppBar>
                      
            {/* <div className={'no-meeting'}> */}
             
            
             {!meeting&&
                 <div> 
                  <h1>“You haven’t done any meeting yet!”</h1>
      
              <button onClick={this.meeting}>“Set a meeting!”</button>
             
            </div>
            }
{ meeting&&
    
<Cards size={[1193, 1193]} onEnd={() => console.log('end')} className='master-root'>
                        {usersProfile.map(items =>
                            <Card
                                onSwipeLeft={() => console.log('left')}
                                onSwipeRight={() => this.accept(items)}>
                                {/* <h2>{item}</h2> */}
                                <UserCards name={items.fullname} nickname={items.name} image1 ={items.images[0]} image2 ={items.images[1]} image3 ={items.images[2]}/>
                            </Card>
                        )}
                    </Cards>
                    

}
{
    // like&&
//  <Meeting  person={person} status = {this.status}/>

}
{
    // initialMeeting && < />
}

            {/* </div> */}
             </div>
        )
    }
}
export default dashboard;



