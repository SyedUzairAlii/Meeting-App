import React, { Component } from 'react';

import './request.css';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactAddToCalendar from 'react-add-to-calendar';

// import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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
import { faDirections, faCalendarAlt, faClock, faMapMarkerAlt , faWineGlass,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
// import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Moment from 'react-moment';
const styles = {
    row: {
      display: 'flex',
      justifyContent: 'center',
    },
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      width: 60,
      height: 60,
    },
  };

class Request extends Component {
    constructor() {
        super()

        this.state = {
            event: {
                title: 'Sample Event',
                description: 'This is the sample event provided as an example only',
                location: 'Portland, OR',
                startTime: '2016-09-16T20:15:00-04:00',
                endTime: '2016-09-16T21:45:00-04:00'
            },
            users: [],
            accepted: []
        }
    }
    componentWillMount() {
        // console.log(this.props.location.state)
        const { request } = this.props.location.state
        this.setState({ users: request },()=>{
            console.log(this.state.users,'user request')
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

componentDidMount(direction){
    const { accepted } = this.state
    const userUid = localStorage.getItem('uid')

    firebase.database().ref('/meeting/' + userUid + '/').on('child_added', (snapShot) => {
        console.log(snapShot.val(), 'snapsoshujiu')
        if (snapShot.val().request === 'Accepted') {
            accepted.push(snapShot.key)
            this.setState({
                accepted
            })
        }

    })

    firebase.database().ref('/meeting/' + userUid + '/').on('child_changed', (snapShot) => {
        // console.log(snapShot.val(), 'ye child hwa hah changed')
        if (snapShot.val().request === 'Accepted') {
            accepted.push(snapShot.key)
            this.setState({
                accepted
            })
        }

    })
}
getDirection(direction) {
    console.log(direction, 'direction')
    History.push({
        pathname: '/direction',
        state: {
            userData: direction.user1,
            meetingLocation: direction.place
        }
    })
}

    confirm(direction){
        const user44 = localStorage.getItem('uid')
        console.log(direction)
        // console.log(Accepted)


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
    addToCalendar(name, time, date) {
        var pm = time.indexOf('PM')
        var am = time.indexOf('AM')
        if (pm !== -1 || am !== -1) {
            const tm = time.slice(0, am - 1 || pm - 1)
            // console.log(time.slice(0,am-1 || pm-1))
            const obj = {
                title: 'Meeting',
                description: 'This is the sample event provided as an example only',
                location: name,
                startTime: <Moment parse="YYYY-MM-DD HH:mm">{date + 'T' + tm}</Moment>,
                endTime: <Moment parse="YYYY-MM-DD HH:mm">{date + 'T' + tm}</Moment>
            }
            this.setState({ event: obj })
        }
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

   
      
        handleExpandClick = () => {
          this.setState(state => ({ expanded: !state.expanded }));
        };


    profilePic(user1Image, user2Image, name, date, time, location, timeDuration, direction, key) {
        // const{cancle}= this.state
        const { event, icon, accepted } = this.state
        return (
            <div className='div1'>
                    <div className='user-pics'>
                 <div >
                    {/* <Avatar alt="Remy Sharp" src={user1Image} className='image12' /> */}
                        <img src={user1Image} />
                    </div>
                    <div>
                    <Avatar
        
        src={user2Image}
        
      />
                        {/* <img src={user2Image} /> */}
                    </div>
                </div>
                <div >
                 <CardContent>
          <Typography component="h6" variant="h6">
          {name}
            
          </Typography>
        </CardContent>
                </div>

                <div className={'meeting-details'}>
                <CardActions disableActionSpacing>
                <Typography paragraph>  <FontAwesomeIcon icon='clock' style={{ marginRight: '3px' }} /><br/>Meeting......  </Typography>
          <IconButton
            className={ 
               this.state.expanded
            }
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>  <FontAwesomeIcon icon='calendar-alt' style={{ marginRight: '3px' }} />{date}:</Typography>
            <Typography paragraph>
            <FontAwesomeIcon icon='clock' style={{ marginRight: '3px' }} />{time} PM
            </Typography>
            <Typography paragraph>
            <FontAwesomeIcon icon='map-marker-alt' style={{ marginRight: '3px' }} />{location}
            </Typography>
            <Typography paragraph>
            {timeDuration}
            </Typography>
            <Typography>
            
                        <Button color='default' variant={'contained'} onClick={() => this.getDirection(direction)}>
                            <FontAwesomeIcon icon='directions' style={{ marginRight: '3px' }} />
                            Get Direction
                        </Button>
                    <br/>
                    <div>
                        <Button color='secondary' onClick={() => this.cancelRequest(direction)} variant={'contained'}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.confirm(direction)} color='primary' variant={'contained'}>
                            Confirm
                        </Button>
                    </div>
                    <div className={'calendar'}>
                                    <div className={'fontawe'}>
                                        <FontAwesomeIcon style={{ marginRight: '3px' }} icon={'calendar-plus'} />
                                    </div>
                                    <div onClick={() => this.addToCalendar(location, time, date)}>
                                        <ReactAddToCalendar
                                            event={event}
                                            buttonLabel="Add to Calendar"
                                        />
                                    </div>
                                </div>
            </Typography>
          </CardContent>
        </Collapse>
      {/* </Card> */}
                    
                 
                   
                   
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
        const { classes } = this.props;
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

// {
//     accepted.length > 0 &&
//         accepted.indexOf(key) !== -1 ?
//         <div className={'calendar'}>
//             <div className={'fontawe'}>
//                 <FontAwesomeIcon style={{ marginRight: '3px' }} icon={'calendar-plus'} />
//             </div>
//             <div onClick={() => this.addToCalendar(location, time, date)}>
//                 <ReactAddToCalendar
//                     event={event}
//                     buttonLabel="Add to Calendar"
//                 />
//             </div>
//         </div>
//         :
//         <div>
//             <Button color='secondary' onClick={() => this.cancelRequest(direction)} variant={'contained'}>
//                 Cancel
//             </Button>
//             <Button onClick={() => this.confirm(direction)} color='primary' variant={'contained'}>
//                 Confirm
//             </Button>
//         </div>
// }