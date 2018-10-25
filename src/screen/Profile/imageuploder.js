import React, { Component } from 'react';
import './App.css';
import firebase from '../../confic/firebase'

// import firebase from './confic/firebase'; 
class Image extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
   

    }
    this.image1 = this.image1.bind(this)
    this.image2 = this.image2.bind(this)
    this.image3 = this.image3.bind(this)

  }
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
componentDidMount(){
    
}
submit = () => {
    this.props.pic()
    const uid =   localStorage.getItem("uid")
        //   console.log(this.state)
          console.log(uid)
const pictures = {
   pic1 : this.state.image1,
   pic2 : this.state.image2,
   pic3 : this.state.image3,


}
    firebase.database().ref("/user/"+uid+"/pictures").push(pictures)

    localStorage.setItem("images",true)
    
}



  render() {
    const { } = this.state;
    return (
      <div className="App">
      <h1>upload Image</h1>
      1.<input type='file' name='file' onChange={() => {this.image1()}}/><br/>
      2.<input type='file' name='file' onChange={() => {this.image2()}}/><br/>
      3.<input type='file' name='file' onChange={() => {this.image3()}}/><br/>
      <button onClick={this.submit}>Next</button>

      </div>
    );
  }
}

export default Image;
