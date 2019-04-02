import React from 'react';

const HomeButton=({onRouteChange})=>{
    return(
        <div className="white">
            <p className="dib ba pointer f4 pa3 mb5 bgWhiteOnHover" onClick={()=>onRouteChange('home')} >Go to Home</p>
        </div>
    );
}

export default HomeButton;