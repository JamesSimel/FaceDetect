import React from "react";
import Tilt from 'react-parallax-tilt';
import './logo.css';
import brain from './brain.png';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className="bground" options={{ max : 70 }} style={{ height: 80, width: 80 }} >
              <div className="Tilt-inner br2 shadow-2"><img style={{paddingTop: '5px'}}src={brain} alt='logo'/></div>
            </Tilt>
        </div>
    );
}

export default Logo;