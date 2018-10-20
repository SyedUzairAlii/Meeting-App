import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react';


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
    {props.isMarkerShown && <Marker onDrag={(abc)=>this.setLatlng(abc.latLng.lat(),abc.latLng.lng())} draggable ={true} position={{ lat: props.coords.latitude, lng: props.coords.longitude }} />}
  </GoogleMap>
))
class Map extends Component {
  constructor() {
    super()
    
    this.state = {
      coords : null
    }
    // this.login = this.login.bind(this)
  }

  componentDidMount(){
    this.setposition()
  }
  
  
  setposition() {
    const {coords} = this.state
    navigator.geolocation.getCurrentPosition(position =>{

console.log(position) 
this.setState({coords : position.coords},()=>console.log('state ha ye',this.state.coords))
   })
  }

  setLatlng(latitude,longitude) {
    this.setState({coords : {latitude, longitude}})
  }
  
  render() {
    const {coords} = this.state
    return (
      <div className="App">
      


   
      {
        coords &&
      <MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
      coords={coords}
/>
      }
      </div>
    );
  }
}

export default Map;
