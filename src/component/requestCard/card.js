
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import firebase from '../../Config/Firebase/firebase'
// import History from '../../History/History';
// import Image1 from '../../Assets/images/1.png'
// import { Button } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDirections, faCalendarAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import './card.css'
library.add(faDirections, faCalendarAlt, faClock, faMapMarkerAlt,)

class RequestCard extends Component {
    constructor() {
        super()

        this.state = {
            users: null
        }
    }
    static getDerivedStateFromProps(props) {
        if (props.users) {
            // console.log(props.users, 'props')
            // const obj = {
            //     name: props.name,
            //     request: props.request,
            //     time: props.time,
            //     date: props.date,
            //     location: props.location,
            //     image: props.image
            // }
            return { users: props.users }
        }

    }
     ImgMediaCard(image,request,  date, time, name, location) {
        // const { classes } = props;
        return (
          <Card  >
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className='user-pics2'
                height="140"
                image={image}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="p">
                 {request}
                </Typography>
                <Typography component="p">
                <FontAwesomeIcon icon='calendar-alt' style={{ marginRight: '3px' }} /> {date}
                </Typography>
                <Typography component="p">
                <FontAwesomeIcon icon='clock' style={{ marginRight: '3px' }} />{time}
                  
                </Typography> <Typography component="p">
                {name}
                </Typography>
                
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
              <FontAwesomeIcon icon='map-marker-alt' style={{ marginRight: '3px' }} />{location}
              </Button>
              {/* <Button size="small" color="primary">
                Learn More
              </Button> */}
            </CardActions>
          </Card>
        );
      }

  

    render() {
        const { users } = this.state
        // console.log(users, 'uuuuuuuuuuu')
        return (
            <div className='profile-pic2'>
                <div>
                    <h2>Meetings Status</h2>
                </div>
                {
                    users &&
                    users.map((items) => {
                        return (
                            this.ImgMediaCard(items.image, items.request, items.date, items.time, items.name, items.location)
                        )
                    })
                }
            </div>
        );
    }
}


export default RequestCard;