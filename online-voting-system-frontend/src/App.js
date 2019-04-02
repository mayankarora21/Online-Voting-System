import React, { Component } from 'react';
import './App.css';
import Admin from './components/Admin/Admin';
import 'tachyons';
import AdminSignin from './components/AdminSignin/AdminSignin';
import Voter from './components/Voter/Voter';
import VoterSignin from './components/VoterSignin/VoterSignin';
import Home from './components/Home/Home';
import Results from './components/Results/Results';

class App extends Component {
    constructor(){
        super();
        this.state={
            route:'home',
            voter:{
                voterid:0,
                name:''
            }
        }
    }
    loadVoter=(voter)=>{
        
        const currVoter={
            voterid:voter.id,
            name:voter.name
        }
        this.setState({voter:currVoter});
    }
    routeChange=(route)=>{
        this.setState({route:route});
//        console.log('hello')
    }
  render() {
      return(
          <div className="tc fullHeight">
             {
                  (this.state.route==='adminsignin')?
                  <AdminSignin onRouteChange={this.routeChange}></AdminSignin>:
                  
                      (this.state.route==='adminhome')?
                      <Admin onRouteChange={this.routeChange}></Admin>: 
                        (this.state.route==='votersignin')?<VoterSignin onRouteChange={this.routeChange} loadVoter={this.loadVoter}></VoterSignin>:
                  (this.state.route==='home')?<Home onRouteChange={this.routeChange}></Home>:(this.state.route==='results')?<Results onRouteChange={this.routeChange}></Results>:<Voter name={this.state.voter.name} onRouteChange={this.routeChange} voterid={this.state.voter.voterid}/>
                  
             }
          </div>
      );
  }
}

export default App;
