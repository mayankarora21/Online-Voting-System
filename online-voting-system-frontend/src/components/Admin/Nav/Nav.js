import React from 'react';
import CurrentElections from '../CurrentElections/CurrentElections';
import AddElection from '../AddElection/AddElection';
import AddCandidates from '../AddCandidates/AddCandidates';
import AddVoter from '../AddVoter/AddVoter';
import Results from '../Results/Results';
import './Nav.css';
import AnnounceResults from '../AnnounceResults/AnnounceResults';

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state={
            results:[],
            elections:[]
        }
    }
    loadResults=()=>{
        fetch('http://localhost:3000/getresults').then(response=>response.json()).then(results=>{
//            results.forEach((currResult,i)=>{
//                allResults.push(currResult);
//            });
//            this.setState({results:results})
            this.setState({results:results});
        });
    }
    
    loadElections=()=>{
        fetch('http://localhost:3000/currentelections').then(response=>response.json())
            .then(currElections=>{
            this.setState({elections:currElections});
        })
    }
    componentDidMount(){
        this.loadResults();
        this.loadElections();
    }
    render(){
        return(
            <div className="ma3 pa3">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li class="nav-item ma1">
                    <a className="nav-link active grow pa3 bg-light-blue black f4" id="pills-currentElections-tab" data-toggle="pill" href="#pills-currentElections" role="tab" aria-controls="pills-currentElections" aria-selected="true">Current Elections</a>
                  </li>
                  <li class="nav-item ma1">
                    <a class="nav-link grow pa3 bg-light-blue black f4" id="pills-AddElection-tab" data-toggle="pill" href="#pills-AddElection" role="tab" aria-controls="pills-AddElection" aria-selected="false">Add Election</a>
                  </li>
                  <li class="nav-item ma1">
                    <a class="nav-link grow pa3 bg-light-blue black f4" id="pills-AddVoter-tab" data-toggle="pill" href="#pills-AddVoter" role="tab" aria-controls="pills-AddVoter" aria-selected="false">Add Voter</a>
                  </li>
                  <li class="nav-item ma1">
                    <a class="nav-link grow pa3 bg-light-blue black f4" id="pills-AddCandidates-tab" data-toggle="pill" href="#pills-AddCandidates" role="tab" aria-controls="pills-AddCandidates" aria-selected="false">Add Candidates</a>
                  </li>
                  <li class="nav-item ma1">
                    <a class="nav-link grow pa3 bg-light-blue black f4" id="pills-results-tab" data-toggle="pill" href="#pills-announce" role="tab" aria-controls="pills-announce" aria-selected="false">Announce Results</a>
                  </li>
                  <li class="nav-item ma1">
                    <a class="nav-link grow pa3 bg-light-blue black f4" id="pills-results-tab" data-toggle="pill" href="#pills-results" role="tab" aria-controls="pills-results" aria-selected="false">View Results</a>
                  </li>
                  <li class="nav-item ma1">
                    <a class="nav-link grow pa3 bg-light-blue black f4" id="signOut" data-toggle="pill" href="" role="tab" aria-controls="pills-results" aria-selected="false" onClick={()=>this.props.onRouteChange('adminsignin')}>Sign Out</a>
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div class="tab-pane fade show active" id="pills-currentElections" role="tabpanel" aria-labelledby="pills-currentElections"><CurrentElections elections={this.state.elections}></CurrentElections></div>
                  <div class="tab-pane fade" id="pills-AddElection" role="tabpanel" aria-labelledby="pills-AddElection"><AddElection loadElections={this.loadElections}></AddElection></div>
                  <div class="tab-pane fade" id="pills-AddVoter" role="tabpanel" aria-labelledby="pills-AddVoter-tab"><AddVoter elections={this.state.elections}></AddVoter></div>
                  <div class="tab-pane fade" id="pills-AddCandidates" role="tabpanel" aria-labelledby="pills-AddCandidates-tab"><AddCandidates elections={this.state.elections}></AddCandidates></div>
                  <div class="tab-pane fade" id="pills-announce" role="tabpanel" aria-labelledby="pills-announce-tab"><AnnounceResults loadResults={this.loadResults} loadElections={this.loadElections} elections={this.state.elections}></AnnounceResults></div>
                  <div class="tab-pane fade" id="pills-results" role="tabpanel" aria-labelledby="pills-results-tab"><Results results={this.state.results}></Results></div>
                </div>

            </div>
        );
    }
    
}

export default Nav;