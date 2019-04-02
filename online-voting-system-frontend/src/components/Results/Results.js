import React from 'react';
import ResultArray from './ResultArray';
import HomeButton from './HomeButton'

class Results extends React.Component{
    constructor(){
        super();
        this.state={
            results:[],
            selectValue:''
        }
    }
    changeSelectValue=()=>{
        const selectBox=document.getElementById('electionTitleVoter');
        this.setState({selectValue:selectBox.value});
    }
    componentDidMount(){
        fetch('http://localhost:3000/getresults').then(response=>response.json()).then(results=>{
            this.setState({results:results});
        });
    }

    render(){
        return(
            <div className="resultsBackground">
                <HomeButton onRouteChange={this.props.onRouteChange}></HomeButton>
                <ResultArray results={this.state.results}></ResultArray>
              {/*<p>Select Election Title</p>
              <select id="electionTitleAnnounce">
                  <option value=''>Select an Election Title</option>
                  <SelectBox></SelectBox>
                  <Result results={this.state.results}></Result>
              </select>*/}
            </div>
        );
    }
    
}

export default Results;