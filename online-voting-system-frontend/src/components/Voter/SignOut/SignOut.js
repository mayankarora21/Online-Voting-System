import React from 'react';

const SignOut=({onRouteChange})=>{
    return(
        <p className="dib underline dim pointer f4 white mt0 float-right" onClick={()=>onRouteChange('votersignin')}>Sign Out</p>
    );
}
export default SignOut;