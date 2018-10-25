import React, { Component } from 'react';
import './dashboard.css';
import Cards, { Card } from 'react-swipe-deck'
// import MyUploader from './imageuploder'

class dashboard extends Component {

    constructor() {
        super()

        this.state = {
           meeting : false,
           data : ['Alexandre', 'Thomas', 'Lucien']
        }
      
    }


    meeting = () => {
        this.setState({
            meeting : true,
        })
      }
    render() {
     const{ meeting ,data} = this.state
        return (
            <div>
             
             {
                 <div> 
                  <h1>“You haven’t done any meeting yet!”</h1>
      
              <button onClick={this.meeting}>“Set a meeting!”</button>
              <hr/>
            </div>
            }
{ 
    <Cards onEnd={() => console.log('end')} className='master-root'>
    
    {
        
      <Card
        onSwipeLeft={console.log('left')}
        onSwipeRight={console.log('right')}>
        <span>
    syeduzairali
    </span>
      </Card>
    }
  </Cards>&&
<div className ="card" 

>
<div className="card-image">

</div>
<div className="card-footer" >
<div className="disselect">cancel</div>
<div className="name">
<span>
    syeduzairali
    </span>
   
</div>
<div className="select">right</div>
    
</div>


</div>



}
            </div>
        )
    }
}
export default dashboard;



