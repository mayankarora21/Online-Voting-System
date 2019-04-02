import React from 'react';
import './HomeNavButton.css';
const onButtonClick=(onRouteChange,route)=>{
    if(route==='votersetpassword'){
        const id=parseInt(window.prompt('enter your unique voterid that you got at the time of registering as a voter'));
        let pass=null;
        if(isNaN(id)===false){
            pass=window.prompt('enter your password');
        }
        if(isNaN(id)===false && pass!==null){
            fetch('http://localhost:3000/votersetpassword',{
                method:'put',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({id:id,password:pass})
            }).then(response=>response.json()).then(data=>{
                if(data==='voter not found'){
                    window.alert('such a voter does not exists. please enter a valid voter id');
                    return;
                }
                else if(data==='password already exists'){
                    window.alert('password already exists for this voter id');
                    return;
                }
                else{
                    window.alert('password was set. please remember your password')
                }
            })
        }
    }
    else onRouteChange(`${route}`);
    
}
const HomeNavButton=({heading,imageSource,onRouteChange,route})=>{
    
    return(
        <div>
            <div className="dib bgLightBlue white ba ma1 pa4">
                <h3>{heading}</h3>
                <img src={imageSource} alt="images" height="200" width="300"/><br></br><br></br>
                <input type="button" className="btn btn-block" value="Click Here" onClick={()=>{onButtonClick(onRouteChange,route)}}/>
            </div>
        </div>
    );
}

export default HomeNavButton;