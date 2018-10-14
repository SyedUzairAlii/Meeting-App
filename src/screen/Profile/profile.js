import React, { Component } from 'react';
import './App.css';
import Cute from './cute.png'
import firebase from '../../confic/firebase'

class profile extends Component {

    constructor() {
        super()

        this.state = {

        }

    }

componentWillMount(){
    const userUid = localStorage.getItem("uid");
    firebase.database().ref('/user/'+ userUid).on('value',(snapshot)=>{
        console.log(snapshot.val().photo)
        this.setState({photo : snapshot.val().photo})
    })

}

    render() {
        const { photo } = this.state
        return (
            <div className="main">
                    <h1>PROFILE</h1>
                    <div className="image">
                        <img src={photo ? photo : Cute}/>
                    </div>
            </div>
        )
    }
}
export default profile;