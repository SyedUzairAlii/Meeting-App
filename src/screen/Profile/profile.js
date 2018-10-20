import React, { Component } from 'react';
import './App.css';
import Cute from './cute.png'
import firebase from '../../confic/firebase'
import Bevrage from './bevrage'
import Image from './imageuploder'

class profile extends Component {

    constructor() {
        super()

        this.state = {
            nickname: '',
            number: '',
            nameField: false,
          
            beverages : false,
            pictures : false,
        }
        this.nickname = this.nickname.bind(this)
        this.number= this.number.bind(this)   
        this.namee = this.namee.bind(this)
    }

    componentWillMount() {
        const userUid = localStorage.getItem("uid");
        firebase.database().ref('/user/' + userUid).on('value', (snapshot) => {
            // console.log(snapshot.val().photo)
            this.setState({ photo: snapshot.val().photo })
        })

    }
    nickname(event) {
        this.setState({ nickname: event.target.value });
    }
    number(event) {
        this.setState({ number: event.target.value });
    }

    namee = () => {
        console.log(this.state.nickname)
        console.log(this.state.number)

        this.setState({
            nameField: true,
            
        })
    }
    
    pic = () => {
     

        this.props.dashboard()
        this.setState({
            pictures: true,
            
        })
    }
    beverages = () => {
     
        this.setState({
            beverages: true,
            
        })
    }


    render() {
        const { photo,nameField,beverages,pictures} = this.state
        return (
            <div>
               <div className="main">
                    <h1>PROFILE</h1>
                    <div className="image">
                        <img src={photo ? photo : Cute} />
                    </div>
                </div>
                <br />
                <br />
                <br />
                <h1>User Details</h1>
                {!nameField&&<form>
                    <label>
                        Enter your nickname: <input type="text" onChange={this.nickname} />
                        <br />
                        <br />
                        Enter phone number:  <input type="text"  onChange={this.number} />
                    </label>
                    <br />
                    <br />
                    <button onClick={this.namee}>Next</button>
                </form>}
                {nameField && !pictures && <Image  pic = {this.pic}/> }
                
                {/* {nameField && pictures &&  !beverages &&<Bevrage  beverages = {this.beverages}/>} */}
            </div>
        )
    }
}
export default profile;



// <Checkbox
//                         checked={checkedA}
//                         onChange={this.handleChange}
//                         value="juice"
//                         color="primary"
//                     />Juice