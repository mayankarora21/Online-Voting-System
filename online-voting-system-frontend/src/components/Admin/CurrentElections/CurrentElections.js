import React from 'react';
import ElectionArray from './ElectionArray';
class CurrentElections extends React.Component{
    constructor(){
        super();
        this.state={
            elections:[]
        }
    }
    componentDidMount(){
//        fetch('http://localhost:3000/currentelections').then(response=>response.json())
//            .then(currElections=>{
//            this.setState({elections:currElections});
//        })
    }
    render(){
        return(
            <div className="ma2 pa2">
                <h2>Current Elections</h2>
                <ElectionArray elections={this.props.elections}></ElectionArray>
            </div>
        );
    }
    
}

export default CurrentElections;