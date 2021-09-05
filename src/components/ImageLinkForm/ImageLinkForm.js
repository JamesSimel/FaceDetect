import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
    return(
        <div>
            <p className='f3'>{'This magic brain will detect faces in your pictures,give it a try'}</p>
            <div className='center'>
                <div className='pa2 br3 shadow-5 center form'>
                  <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                  <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 dim white bg-black'>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;