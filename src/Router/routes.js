import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import history from '../History/history'
import Login from '../screen/login/login'
import Home from '../screen/home/home'
import Meeting from '../screen/meeting/meeting'
import Direction from '../screen/direction/direction';
import { connect } from 'react-redux'
import {userAuth} from '../store/action/action'
import Status  from '../screen/status/status'
import './routes.css'
import  Request from '../screen/MeetingRequest/request'
import { RequestMeeting } from '../store/action/action'
import EditeProfile from '../screen/editeProfile/editeProfile'
class Routers extends Component {

    componentWillMount() {
        const user = localStorage.getItem('uid')
        this.props.CheckUser()
        this.props.getMeetingRequest(user)
    }
    // shouldComponentUpdate(props) {
    
    //     if(props.userPro) {
    //       console.log(props,'pojibkjubk')
    //       props.getMeetingRequest(props.userPro.userUid)
    //       return true
    //     }
    //     return true
    //   }
    render() {
        return (
            <Router history={history}>
                <div className='appDiv'>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/dashboard" component={Home} />
                    <Route exact path='/meeting' component = {Meeting}/>
                    <Route exact path='/direction' component = {Direction}/>
                    <Route exact path='/status' component = {Status}/>
                    <Route exact path='/MeetingRequest' component = {Request}/>
                    <Route exact path='/EditeProfile' component = {EditeProfile}/>


                
                </div>
                
            </Router>
        )
    }
}
function mapStateToProps(state) {
    return ({
        user: state.authReducer.newUser
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        CheckUser: () => {
            dispatch(userAuth())
        },
        getMeetingRequest: (user) => {
            dispatch(RequestMeeting(user))
          },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Routers);