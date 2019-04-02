import React from 'react';

class VoterSignin extends React.Component{
    
     onVoterSignin=(event)=>{           //review
        event.preventDefault();
        event.stopPropagation();
        const voteridBox=document.getElementById('voterid');
        const passwordBox=document.getElementById('password');
        const voter={
            id:voteridBox.value,
            password:passwordBox.value
        }
        fetch('http://localhost:3000/votersignin',{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(voter)
        }).then(response=>response.json()).then((data)=>{
            if(data==='wrong credentials'){
                window.alert('please enter correct voterid and password');
                window.alert('it is possible that you have not set your password yet');
                return;
            }
            else{
                this.props.loadVoter(data);
                this.props.onRouteChange('voterhome');
            }
            
        }).catch(err=>{console.log(err)});
    }

    render(){
        return(
        <div className="loginBackground">
            <main class="pa4 black-80">
              <form class="measure mt5 blackBg pa4 white" onSubmit={this.onVoterSignin}>
                <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                  <legend class="f4 fw6 ph0 mh0 f2">Voter Sign In</legend>
                  <div class="mt3">
                    <label class="db fw6 lh-copy f6" for="voterid">Voter id</label>
                    <input class="pa2 white input-reset ba bg-transparent w-100" type="number" name="voterid"  id="voterid"/>
                  </div>
                  <div class="mv3">
                    <label class="db fw6 lh-copy f6" for="password">Password</label>
                    <input class="b pa2 input-reset ba bg-transparent white w-100" type="password" name="password"  id="password"/>
                  </div>
                </fieldset>
                <div class="">
                  <input className="b ph4 pv2 white input-reset ba bgWhiteOnHover bgTransparent b--black grow pointer f6 dib" type="submit" value="Sign in"/><br/><br/>
                <input className="b ph4 pv2 white input-reset ba bgWhiteOnHover bgTransparent b--black grow pointer f6 dib" type="button" value="Go to Home Page" onClick={()=>this.props.onRouteChange('home')}/>
                </div>
              </form>
            </main>
        </div>
    );   
    }
    
}

export default VoterSignin;