import React,{ Component } from 'react'
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai';
import './App.css'
import 'tachyons'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceDetect from './components/FaceDetect/FaceDetect'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'


const app = new Clarifai.App({
  apiKey: 'a98ffe3acb7b4ed884e7ab5a5811c7b0'
 });

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      input:'',
      imageUrl: "",
      box:{},
      route:'signin',
      isSignedIn: false,
    }
  }
 
  calculateFaceLocation =(data) => {
    const clarifaiFace =data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col *width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width -(clarifaiFace.right_col * width),
      bottomRow: height -(clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };
  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      app.models
        .predict(
          //'53e1df302c079b3db8a0a36033ed2d15'
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
          .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
          .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if( route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home') {this.setState({isSignedIn: true})}
    this.setState({route: route});
  }

  render () {
    const { isSignedIn, imageUrl,route, box} =this.state;
    return (
      <div >
        <ParticlesBg type="circle" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRoutechange={this.onRouteChange}/>
        {route === 'home'
          ?<div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceDetect box={box} imageUrl={imageUrl} />
           </div>
          :(route === 'signin'
             ?<Signin onRouteChange={this.onRouteChange}/>
             :<Register onRouteChange={this.onRouteChange}/>)
        }
     </div>
    )
  }
}

export default App;