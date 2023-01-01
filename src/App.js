import React,{ Component } from 'react'
// import Particles from "react-tsparticles";
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

// const particlesOptions = {
//     background: {
//       color: {
//         value: "#0d47a1",
//       },
//     },
//     fpsLimit: 60,
//     interactivity: {
//       detectsOn: "canvas",
//       events: {
//         onClick: {
//           enable: true,
//           mode: "push",
//         },
//         onHover: {
//           enable: true,
//           mode: "repulse",
//         },
//         resize: true,
//       },
//       modes: {
//         bubble: {
//           distance: 400,
//           duration: 2,
//           opacity: 0.8,
//           size: 40,
//         },
//         push: {
//           quantity: 4,
//         },
//         repulse: {
//           distance: 200,
//           duration: 0.4,
//         },
//       },
//     },
//     particles: {
//       color: {
//         value: "#ffffff",
//       },
//       links: {
//         color: "#ffffff",
//         distance: 150,
//         enable: true,
//         opacity: 0.5,
//         width: 1,
//       },
//       collisions: {
//         enable: true,
//       },
//       move: {
//         direction: "none",
//         enable: true,
//         outMode: "bounce",
//         random: false,
//         speed: 4,
//         straight: false,
//       },
//       number: {
//         density: {
//           enable: true,
//           value_area: 900,
//         },
//         value: 80,
//       },
//       opacity: {
//         value: 0.5,
//       },
//       shape: {
//         type: "circle",
//       },
//       size: {
//         random: true,
//         value: 5,
//       },
//     },
//     detectRetina: true,
// }
const app = new Clarifai.App({
  apiKey: '{YOU_API_KEY}'
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
    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
    //Events 
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit= this.onButtonSubmit.bind(this);
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
          // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
          // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
          // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
          // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
          // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
          // so you would change from:
          // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
          // to:
          // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
          .then((response) => this.displayFaceBox(this.calculateFaceLocation(response))
          .catch(err => console.log(err))
        );
  }
  onRouteChange = (route) => {
    if( route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home') {this.setState({isSignedIn: true})}
    this.setState({route: route});
  }
  
  particlesInit(main) {console.log(main);}
  particlesLoaded(container) {console.log(container)}

  render () {
    const { isSignedIn, imageUrl,route, box} =this.state;
    return (
      <body >
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
     </body>
    )
  }
}

export default App;