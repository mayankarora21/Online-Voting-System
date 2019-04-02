import React from 'react';
import ResultArray from './ResultArray/ResultArray';
import Scroll from './Scroll/Scroll';

class Results extends React.Component{
    constructor(){
        super();
        this.state={
            results:[]
        }
    }
    componentDidMount(){
//        const allResults=[];
//        this.setState({results:this.props.results})
    }
    render(){
        return(
            <div className="ma2 pa2" style={{height:'100vh'}}>
                <h2>Results</h2>
                
                    <ResultArray results={this.props.results}></ResultArray>
                
            </div>
        );
    }
    
}

export default Results;