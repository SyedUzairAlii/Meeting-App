import React, { Component } from 'react';
import firebase from '../../confic/firebase'
import History from '../../History/history';
// import './meeting.css'
import ButtonAppBar from '../../container/container';
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import swal from 'sweetalert2'
import GetDirection from './direction'
class Meeting extends Component {
    constructor() {
        super()

        this.state = {
            recommended: [],
            search: [],
            searchQuery: '',
            setTime: false,
            date: '2018-05-24',
            time: '07:30',
            dataUser: {},
            directionn: false,
        }
    }
    componentWillMount() {
        console.log(this.props.location.state, 'user data')

        // const { meetingLocation } = this.props.location.state
        // const user = localStorage.getItem('uid')
        // if (meetingLocation) {
        //     this.setState({ meetingPlace: meetingLocation, setTime: true })
        // }
        // else {
        // }
    }

    componentDidMount() {
        // this.setState({dataUser : this.props.location.state})
        const { location, beverages } = this.props.location.state
        console.log(this.props.location.state, 'user data')
        // console.log(this.state.dataUser, 'state')

        const CLIENT_ID = '5XDIYAOKVXSMUUWASBZIEZNUF2YMAZLCM2OLEJMCLELN5SA5'
        const CLIENT_SECRET = 'FVI4W3SKKUSDHGW4HNRWPVQDXYV25BGJGPXFRFANGQ43IS5X'
        const LATITUDE = location.latitude
        const LONGITUDE = location.longitude
        const QUERY = beverages[0]


        Axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&ll=${LATITUDE},${LONGITUDE}&query=${QUERY}`)
            .then((res) => {
                const recommend = res.data.response.groups[0].items
                this.setState({ recommended: recommend })
            })

    }

    componentDidUpdate() {
        // console.log(this.state.recommended[0].venue, 'places')
    }

    search(query) {
        const { location } = this.props.location.state
        // console.log(this.props.location.state, 'user data')
        const CLIENT_ID = '5XDIYAOKVXSMUUWASBZIEZNUF2YMAZLCM2OLEJMCLELN5SA5'
        const CLIENT_SECRET = 'FVI4W3SKKUSDHGW4HNRWPVQDXYV25BGJGPXFRFANGQ43IS5X'
        const LATITUDE = location.latitude
        const LONGITUDE = location.longitude
        const QUERY = query

        this.setState({ searchQuery: QUERY })
        Axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&ll=${LATITUDE},${LONGITUDE}&query=${QUERY}`)
            .then((res) => {
                const recommend = res.data.response.groups[0].items
                this.setState({ search: recommend })
            })
    }

    setPlace(place) {
        console.log(place)
        const venue = place.venue
        const meetingPlace = {
            name: venue.name,
            location: {
                latitude: venue.location.lat,
                longitude: venue.location.lng
            },
            address: venue.location.address ? venue.location.address : 'not available'
        }
        console.log(meetingPlace, 'meeting place')
        console.log(this.props.location.state, 'user data')
        this.setState({ meetingPlace, setTime: true, directionn: false })
    }

    sendRequest() {
        const { meetingPlace, date, time } = this.state
        const user = localStorage.getItem('uid')
        const userId = this.props.location.state.userUid
        const request = {
            user: this.props.location.state,
            place: meetingPlace,
            date: date,
            time: time,
            userUid: user,
            request: 'pending'
        }
        console.log(request)
        // swal({
        //     title: 'Are you sure?',
        //     text: `You want to send request to ${this.props.location.state.name}`,
        //     type: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes'
        // }).then((result) => {
        //     if (result.value) {
        //         swal({
        //             onOpen: () => {
        //                 swal.showLoading()
        //             }
        //         })
        //         firebase.database().ref('/meeting/' + userId + '/').push(request)
        //             .then(() => {
        //                 swal({
        //                     position: 'center',
        //                     type: 'success',
        //                     title: 'Request Sent',
        //                     showConfirmButton: false,
        //                     timer: 1500
        //                 })
        //                 History.push('/status')
        //             })
            // }
        // })
        firebase.database().ref('/meeting/' + userId + '/').push(request)
                    .then(() => {
                        swal({
                            position: 'center',
                            type: 'success',
                            title: 'Request Sent',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        History.push('/status')
                    })
    }
    getDirection(place) {
        // console.log(place)
        const venue = place.venue
        const meetingPlace = {
            name: venue.name,
            location: {
                latitude: venue.location.lat,
                longitude: venue.location.lng
            },
            address: venue.location.address ? venue.location.address : 'not available'
        }
        console.log(meetingPlace, 'meeting place')
        console.log(this.props.location.state, 'user data')
        // History.push({
        //     pathname: '/direction',
        //     state: {
        //         userData: this.props.location.state,
        //         meetingLocation: meetingPlace,
        //         // state :this.props.location.state,
        //     }
        // })
        this.setState({ directionn: true, meetingPlace })

    }

    render() {
        const { location } = this.props;
        const { meetingPlace, recommended, searchQuery, search, setTime, date, time, Index2, Index1, directionn } = this.state
        return (
            <div>
                <ButtonAppBar name={'Meeting App'} >
                </ButtonAppBar>
                <div>  {
                    !setTime &&
                    <div>
                        <h1> Meeting Places</h1>


                        <div className={'search'}>
                            <div>
                                {/* <TextField
                                    id="filled-with-placeholder"
                                    label="Search Here"
                                    placeholder="Search place here..."
                                    margin="normal"
                                    style={{ width: 300 }}
                                    variant="filled"
                                    defaultValue={searchQuery}
                                    onChange={(e) => this.search(e.target.value)}
                                /> */}
                                <TextField
                                    id="standard-with-placeholder"
                                    label="Search Here"
                                    placeholder="Search place here..."
                                    //   className={classes.textField}
                                    margin="normal"
                                    onChange={(e) => this.search(e.target.value)}
                                />
                            </div>
                            <hr />
                        </div>
                        {
                            searchQuery &&
                            <div className={'search-place'}>
                                {
                                    search.map((items, index) => {
                                        return (
                                            <div key={index} onClick={() => this.setState({ Index2: index })}>
                                                {items.venue.name}

                                                {
                                                    Index2 === index &&
                                                    <span >
                                                        <Button variant="outlined" color="secondary" onClick={() => this.getDirection(items)}>  Get Direction   </Button>
                                                        <Button variant="contained" color="primary" onClick={() => this.setPlace(items)}> NEXT  </Button>
                                                    </span>

                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {
                            !searchQuery &&
                            <div>
                                {/* <h2>Recommended Places</h2> */}
                                <div className='recommend-places'>

                                    {
                                        recommended.map((items, index) => {
                                            return (
                                                index <= 2 &&
                                                <div key={index} onClick={() => this.setState({ Index1: index })}>
                                                    {items.venue.name}
                                                    <hr />
                                                    {
                                                        Index1 === index &&
                                                        <span >
                                                            <Button variant="outlined" color="secondary" onClick={() => this.getDirection(items)}>  Get Direction   </Button>
                                                            <Button variant="outlined" color="secondary" onClick={() => this.setPlace(items)}> NEXT  </Button>
                                                        </span>

                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {/* <h3>OR</h3> */}
                            </div>
                        }

                    </div>
                }

                    {directionn && <GetDirection meetingLocation={meetingPlace} userData={location.state} />}


                    {
                        setTime &&
                        <div>
                            <h1>Set </h1>
                            <h4>Date</h4>
                            <TextField
                                id="date"
                                label="Select Date"
                                type="date"
                                style={{ width: 200 }}
                                // defaultValue={date}
                                onChange={(e) => this.setState({ date: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <h4>Time</h4>
                            <TextField
                                id="time"
                                label="Select Time"
                                type="time"
                                style={{ width: 200 }}
                                // defaultValue={time}
                                onChange={(e) => console.log(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <h3>
                                <Button color='primary' onClick={() => this.sendRequest()} variant={'outlined'}>Send</Button>
                            </h3>
                        </div>
                    }
                </div>
            </div>

        );
    }
}

export default Meeting;