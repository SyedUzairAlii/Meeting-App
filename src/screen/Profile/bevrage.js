import React, { Component } from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Bevrage extends Component {

  state = {
    isMJ: false,
    isJB: false,
    isDrake: false,
    j:"",
  };

  toggleChangeMJ = (e) => {
      console.log(e.target.value)
    this.setState(prevState => ({
      isMJ: !prevState.isMJ,
    }));
  }

  toggleChangeJB = () => {
    this.setState(prevState => ({
      isJB: !prevState.isJB,
    }));
  }

  toggleChangeDrake = () => {
    this.setState(prevState => ({
      isDrake: !prevState.isDrake,
    }));
  }

  onSubmit = (e) => {
    e.preventDefault(e);
    
    console.log(e.target.value)
    // console.log(e.checked.value);
  }

  render() {
    return (
      <div className="container">
        <h2>Select Beverages”</h2>
        <hr />
        <form onSubmit = {this.onSubmit}>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                onChange={this.toggleChangeMJ}
                value="juice" />
             juice
            </label>
          </div>
          {/* <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                 value="Coffee "
                checked={this.state.isJB}
                onChange={this.toggleChangeJB}
                className="form-check-input"
              />
              JB
            </label>
          </div> */}
          {/* <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isDrake}
                onChange={this.toggleChangeDrake}
                className="form-check-input"
                value="Coffee "
              />
              Drake
            </label>
          </div> */}
          <div className="form-group">
            <button className="btn btn-primary"  >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Bevrage;