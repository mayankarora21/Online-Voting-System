import React from 'react';
import Card from './Card/Card';
import CardList from './CardList/CardList';
import SearchBox from './SearchBox/SearchBox';
import SelectBox from './SelectBox/SelectBox';
import SignOut from './SignOut/SignOut';
class Voter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectValue:'none',
            electionsToVote:[],
            candidates:[]
        }
    }
    componentDidMount(){
        this.loadElections();
    }
    loadElections=()=>{
        fetch('http://localhost:3000/getelections',{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({voterid:this.props.voterid})
        }).then(response=>response.json()).then(elections=>{
            this.setState({electionsToVote:elections});
        })
    }
    onElectionClick=()=>{
        const selectBox=document.getElementById("selectElection");
        this.setState({selectValue:selectBox.value});
        if(selectBox.value!=='none'){
            fetch('http://localhost:3000/getcandidates',{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({electiontitle:selectBox.value})
                }).then(response=>response.json()).then(candidates=>{
                    this.setState({candidates:candidates});
            })
        }
    }
    onVoteSubmit=()=>{             /////////////incomplete
        const radioButtons=document.getElementsByName("candidateSelected");
        let isChecked=false;
        radioButtons.forEach(radio=>{
            if(radio.checked===true){
                isChecked=true;
                const candidateid=radio.value;
                fetch('http://localhost:3000/vote',{
                    method:'put',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify({voterid:this.props.voterid,candidateid:candidateid,electiontitle:this.state.selectValue})
                }).then(response=>response.json()).then(data=>{
                    if(data==='error voting'){
                        window.alert('there was an error while voting');
                    }
                    else{
                        window.alert(`your vote was registered for the election ${this.state.selectValue}`);
                        this.loadElections();
                        this.setState({selectValue:'none'});
                    }
                })
                return;
            }
        })
        
        //console.log(radioButton);
    }
    render(){
        return(
            <div className="homeBackground">
                <SignOut onRouteChange={this.props.onRouteChange}></SignOut><br></br><br></br>
                <h1 style={{marginTop:0}} className="f1 white">{`Welcome ${this.props.name}`}</h1>
                <SelectBox elections={this.state.electionsToVote}></SelectBox>
                <input type="button" value="Select Election" className="ph4 mh3 btn-sm pv1 mv2 btn-danger" onClick={this.onElectionClick}></input>
                
                {
                    (this.state.selectValue!=='none')?
                    (<div>
                        <br></br>
                        {/*<SearchBox></SearchBox><br></br>*/}
                        <CardList candidates={this.state.candidates}></CardList><br></br>
                        <input type="button" value="Submit My Vote" className="pa2 mb3 mt0 btn btn-danger" onClick={this.onVoteSubmit}></input>
                    </div>):<div><br></br><br></br></div>
                }
            </div>
        );
    }
    
}
export default Voter;