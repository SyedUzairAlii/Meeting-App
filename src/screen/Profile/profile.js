import React, { Component } from 'react';
import './App.css';
import Cute from './cute.png'
import firebase from '../../confic/firebase'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Checkbox, Button } from '@material-ui/core';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import PropTypes from 'prop-types';
import ButtonAppBar from '../../container/container' 
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={12}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {props.isMarkerShown && <Marker draggable={true} position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
            onDragEnd={position => {
                props.setLatlng(position.latLng.lat(), position.latLng.lng())
            }} />}
    </GoogleMap>
))
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});




class Profile extends Component {

    constructor() {
        super()

        this.state = {
            page : 1,
            nickname: '',
            number: '',
            data: ['Juice', 'Coffee', 'Cocktail'],
            timeDuration: ['20 min', '60 min', '120 min'],
            beverages: [],
            checkTimeDuration: [],
            coords: null,
            value : 0,
        }
        this.nickname = this.nickname.bind(this)
        this.number= this.number.bind(this)   
        this.namee = this.namee.bind(this)
        this.image1 = this.image1.bind(this)
        this.image2 = this.image2.bind(this)
        this.image3 = this.image3.bind(this)
        this.next = this.next.bind(this)
        this.setLatlng = this.setLatlng.bind(this)
        this.value = this.value.bind(this)  
    }

    componentWillMount() {
        const userUid = localStorage.getItem("uid");
        firebase.database().ref('/user/' + userUid).on('value', (snapshot) => {
            // console.log(snapshot.val().photo)
            // this.setState({ photo: snapshot.val().photo })
        })
        const nameField =  localStorage.getItem("nameField");
if(nameField === "true"){
  this.setState({
   page : 2,
  })
  }
  const pictures =  localStorage.getItem("images");
if(pictures === "true"){
  this.setState({
    page : 3,
  })
  }
  const location =  localStorage.getItem("location");
if(location === "true"){
  this.setState({
    page : 5,
  })
  }

    }
    nickname(event) {
        this.setState({ nickname: event.target.value });
        console.log(this.state.nickname)
    }
    number(event) {
        this.setState({ number: event.target.value });
        console.log(this.state.number)
    }

    namee = () => {
        // const number = {
        //     nickName : this.state.nickname,
        //     numberr : this.state.number,
        // }
    // const uid =   localStorage.getItem("uid")
    // firebase.database().ref("/user/"+uid+"/number").push(number)
        // console.log(this.state.nickname)
        // console.log(this.state.number)
        // localStorage.setItem("nameField",true)
        this.setState({
            value: 1,
            
        })
    }
    
    // pic = () => {
    //     this.setState({
    //         pictures: true,
    //     })
    // }
    // beverages = () => {
     
    //     this.setState({
    //         beverages: true,
            
    //     })
    // }
    handleChange = (event, value) => {
        this.setState({ value });
      };
    image1() {
        var imageFile = document.getElementsByName('file')[0].files[0];
        // console.log(imageFile)
        var fileReader = new FileReader();
        // console.log(fileReader)
    
        fileReader.addEventListener("load", () => {
            const image1 = fileReader.result;
            console.log(image1, "imageUrl1")
            this.setState({ image1 })
        }, false);
    
        if (imageFile) {
            fileReader.readAsDataURL(imageFile)
        }
    }
    image2() {
        var imageFile2 = document.getElementsByName('file')[1].files[0];
        // console.log(imageFile2)
        var fileReader2 = new FileReader();
        // console.log(fileReader2)
    
        fileReader2.addEventListener("load", () => {
            const image2 = fileReader2.result;
            console.log(image2, "imageUrl2")
            this.setState({ image2 })
        }, false);
    
        if (imageFile2) {
            fileReader2.readAsDataURL(imageFile2)
        }
    }
    image3() {
        var imageFile3 = document.getElementsByName('file')[2].files[0];
        // console.log(imageFile3)
        var fileReader3 = new FileReader();
        // console.log(fileReader2)
    
        fileReader3.addEventListener("load", () => {
            const image3 = fileReader3.result;
            console.log(image3, "imageUrl3")
            this.setState({ image3 })
        }, false);
    
        if (imageFile3) {
            fileReader3.readAsDataURL(imageFile3)
        }
    }

    submit = () => {
           
        this.setState({
            value : 2,
          })
        localStorage.setItem("images",true)
        
    }
    handleCheck(x) {
        const { beverages } = this.state
        if (beverages.indexOf(x) !== -1) {
            beverages.splice(beverages.indexOf(x), 1)
            this.setState({ beverages }, () => {
                console.log(this.state.beverages)
            })
        } else {
            beverages.push(x);
            this.setState({ beverages }, () => {
                console.log(this.state.beverages)
            })
        }
    }
    handleCheckTime(x) {
        const { checkTimeDuration } = this.state
        if (checkTimeDuration.indexOf(x) !== -1) {
            checkTimeDuration.splice(checkTimeDuration.indexOf(x), 1)
            this.setState({ checkTimeDuration }, () => {
                console.log(this.state.checkTimeDuration)
            })
        } else {
            checkTimeDuration.push(x)
            this.setState({ checkTimeDuration }, () => {
                console.log(this.state.checkTimeDuration)
            })
        }
    }
    next() {
        const user = localStorage.getItem('uid')
        const { beverages, checkTimeDuration,nickname, number, image1, image2, image3 } = this.state
        if (!beverages.length || !checkTimeDuration.length) {
            console.log('please select')
        } else {
            const obj = {
                name: nickname,
                number: number,
                images: [image1, image2, image3],
                beverages: beverages,
                timeDuration: checkTimeDuration,
                userUid : user,
            }
            firebase.database().ref('/user/' + user + '/profile/').update(obj)
                .then(() => {
                    console.log('profile added')
                    this.setState({ page: 4})
                })
                this.setState({value:3})
        }
    }
    componentDidMount() {
        this.setposition()

    }
    setposition() {
        const { coords } = this.state
        navigator.geolocation.getCurrentPosition(position => {

            console.log(position)
            this.setState({ coords: position.coords }, () => console.log('state ha ye', this.state.coords))
        })
    }
    nextPage3() {
        const user = localStorage.getItem('uid')
        const { coords } = this.state
        const obj = {
            location: {
                latitude: coords.latitude,
                longitude: coords.longitude
            }
        }
        localStorage.setItem("location",true)

        firebase.database().ref('/user/' + user + '/profile/').update(obj)
            .then(() => {
                console.log('submitted')
                // this.props.profileUpdated()
            })
            // this.setState({ page : 5}) 
            this.props.dashboard()
        localStorage.setItem("dashboard",true)


    }
    setLatlng(latitude, longitude) {
        this.setState({ coords: { latitude, longitude } })
    }
    
value(){
    this.setState( {value : 3 })
}    
    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const { photo,page,data,timeDuration,beverages,checkTimeDuration,coords,} = this.state
        return (
            <div>
               <ButtonAppBar name={'Meeting App'} >
         </ButtonAppBar>
                
         <div >
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item four" />

          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><div>
                        <h3>Enter your nickname:</h3> 
                        <TextField
          id="standard-name"
          label="Name"
        //   className={classes.textField}
          value={this.state.nickname}
          onChange={this.nickname}
          margin="normal"
        />
                        
                      
                       <h3> Enter phone number:</h3>  
                        <TextField
          id="standard-number"
          label="Number"
          value={this.state.age}
          onChange={this.number}
          type="number"
        //   className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          />
                  
                    <br />
                    <button onClick={this.namee}>Next</button>
                </div></TabContainer>}
        {value === 1 && <TabContainer><div> 

<h1>upload Image</h1>
      1.<input type='file' name='file' onChange={() => {this.image1()}}/><br/>
      2.<input type='file' name='file' onChange={() => {this.image2()}}/><br/>
      3.<input type='file' name='file' onChange={() => {this.image3()}}/><br/>
      <button onClick={this.submit}>Next</button>

</div>}</TabContainer>}
        {value === 2 && <TabContainer> <div className='checkbox'>
        <Card >
      <CardContent>
        {/* <Typography color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="h2">
        Choose Beverages
        </Typography>
        {/* <Typography  color="textSecondary">
          adjective
        </Typography> */}
        <Typography component="p">
        {
            data.map(x => {
                return (
                    <div >
                        <Checkbox label={x} key={x.toString()} onChange={() => this.handleCheck(x)} />
                        <p>{x}</p>
                        
                    </div>
                )
            })
        }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
       
        </div>
        <div className='checkbox1'>
        
        <Card >
      <CardContent>
        {/* <Typography color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="h2">
        Duration Of Meeting
        </Typography>
        {/* <Typography  color="textSecondary">
          adjective
        </Typography> */}
        <Typography component="p">
        {
            timeDuration.map(items => {
                return (
                    <div >
                        <Checkbox label={items} key={items.toString()} onChange={() => this.handleCheckTime(items)} />
                        <p>{items}</p>
                    </div>
                )
            })
        }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        
       
        <Button color='primary' onClick={() => this.next()} variant={'contained'} >Next</Button>
    </div>
      {/* <button onClick={this.value}>Next</button> */}

        </TabContainer>}
        {value === 3 && <TabContainer><div>
                        <h2>Set Your Location</h2>
                        {
                            coords &&
                            <MyMapComponent
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                coords={coords}
                                setLatlng={this.setLatlng}
                                coords={coords}
                            />
                         }
                        <Button color='primary' onClick={() => this.nextPage3()} variant={'contained'} >Done</Button>
                    </div>

            </TabContainer>}

      </div>
     
                
              





            </div>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Profile;



// <Checkbox
//                         checked={checkedA}
//                         onChange={this.handleChange}
//                         value="juice"
//                         color="primary"
//                     />Juice