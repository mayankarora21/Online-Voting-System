import React from 'react';
import './AdminSignin.css';

class AdminSignin extends React.Component{
    onAdminSignin=(event)=>{
        event.preventDefault();
        event.stopPropagation();
        const passwordBox=document.getElementById('admin-password');
        if(passwordBox.value==='admin'){
            this.props.onRouteChange('adminhome')
        }
        else {
            window.alert('please enter valid password');
            return;
        }
    }
    render(){
        return(
            <div className="loginBackground">
                <main className="pa4 black-80">
                  <form className="measure mt5 blackBg pa4 white" onSubmit={this.onAdminSignin}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                      <legend className="f4 fw6 ph0 mh0 f2">Admin Sign In</legend>
                      {/*<div class="mt3">
                        <label class="db fw6 lh-copy f6" for="admin-email">Email</label>
                        <input class="pa2 white input-reset ba bg-transparent w-100" type="email" name="admin-email"  id="admin-email"/>
                      </div>*/}
                      <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="admin-password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent white w-100" type="password" name="admin-password"  id="admin-password"/>
                      </div>
                    </fieldset>
                    <div className="">
                      <input className="b ph3 pv2 white input-reset ba bgWhiteOnHover bgTransparent b--black grow pointer f6 dib" type="submit" value="Sign in" /><br></br><br/>
                     <input className="b ph3 pv2 white input-reset ba bgWhiteOnHover bgTransparent b--black grow pointer f6 dib" type="button" value="Go to Home Page" onClick={()=>this.props.onRouteChange('home')}/>
                    </div>
                  </form>
                </main>
            </div>
        );
    }
    
    
}

export default AdminSignin;