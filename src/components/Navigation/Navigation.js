import React from "react";

const Navigation = ({onRoutechange, isSignedIn}) => {
    
if (isSignedIn) {
      return (<nav style={{display: 'flex',justifyContent: 'flex-end'}}>
                <p onClick={() =>onRoutechange('signout')} className='f3 link dim underline black pa3 pointer'>Sign out</p>
              </nav>
            )
} else {
    return (<nav style={{display: 'flex',justifyContent: 'flex-end'}}>
              <p onClick={() =>onRoutechange('signin')} className='f3 link dim underline black pa3 pointer'>Sign in</p>
              <p onClick={() =>onRoutechange('register')} className='f3 link dim underline black pa3 pointer'>Register</p>
            </nav>
          )
  }
                     
}

export default Navigation;