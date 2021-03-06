/* eslint-disable no-undef */
// global google
import React, { Component } from 'react';
// import firebase from './Config/firebase'
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"
// import Container from '../../Container/container';
// import './direction.css'
import { Button } from '@material-ui/core';
import History from '../../History/history'
import { useDecimal } from 'geolib';
import firebase from '../../confic/firebase'
class Directionss extends Component {
    constructor() {
        super()

        this.state = {
            coords: {}
        };

        this.getDirections = this.getDirections.bind(this);
    }

    componentDidMount() {
        // global google
        console.log(this.props, 'da here')

        const { userData, meetingLocation } = this.props
        console.log(userData, 'state here')
        console.log(meetingLocation, 'state here')
        // this.getDirections(userData.location, meetingLocation.location)

        this.setState({ userLocation: userData.location, meetingPlace: meetingLocation.location })
        const user = localStorage.getItem("uid")
        firebase.database().ref('/user/' + user + '/profile/').on('value', (snapShot) => {
          // console.log(snapShot.val().location,'profile')
          if (snapShot.val()) {
            if (snapShot.val().location) {
              
              
              this.setState({myLocation : snapShot.val().location,})
              console.log(snapShot.val().location , 'myLocation')
    
            } else {
            }
          }
          else {
          }
        })
      }
      getDirections() {
        const DirectionsService = new google.maps.DirectionsService();
       
          DirectionsService.route({
            origin: new google.maps.LatLng(24.8812296, 67.0727269),
            destination: new google.maps.LatLng(24.8861479, 67.0595196),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });
            } else {
              alert("Sorry! Can't calculate directions!")
            }
          });
      }

    next() {
        const { userData, meetingLocation } = this.props.location.state
        
    }

  

    render() {
        const { coords, directions, userLocation, meetingPlace, myLocation } = this.state;

        return (
                <div className='direction'>
                    Directions
                
                <MyMapComponent
                    isMarkerShown
                    coords={coords}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `60%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    directions={directions}
                    userLocation={userLocation}
                    meetingPlace={meetingPlace}
                />

                {/* <button onClick={this.getDirections}><h1>Get Directions</h1></button> */}
               
                    <Button color='primary' variant={'contained'} onClick={() => this.getDirections(myLocation, meetingPlace)} >Get Direction</Button>
                    <Button color='primary' variant={'contained'} onClick={() => this.next()} >Done</Button>
                </div>

        )
    }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: 24.911476592509565, lng: 67.0255108620911 }}
    >

        <Marker position={{ lat: 24.911476592509565, lng: 67.0255108620911 }} />
        <Marker position={{ lat: 24.88288245764215, lng: 67.09047825223365 }} />

        {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
))

export default Directionss;